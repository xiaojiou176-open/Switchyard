import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { resolve } from "node:path";

const CONCRETE_SECRET_RULES = [
  {
    label: "openai-style-secret",
    pattern: /sk-[A-Za-z0-9]{20,}/g,
  },
  {
    label: "github-classic-token",
    pattern: /ghp_[A-Za-z0-9]{20,}/g,
  },
  {
    label: "github-oauth-token",
    pattern: /gho_[A-Za-z0-9]{20,}/g,
  },
  {
    label: "github-personal-access-token",
    pattern: /github_pat_[A-Za-z0-9_]{20,}/g,
  },
  {
    label: "aws-access-key-id",
    pattern: /AKIA[0-9A-Z]{16}/g,
  },
  {
    label: "google-api-key",
    pattern: /AIza[0-9A-Za-z\-_]{20,}/g,
  },
  {
    label: "slack-bot-token",
    pattern: /xoxb-[A-Za-z0-9-]{20,}/g,
  },
  {
    label: "rsa-private-key",
    pattern: /BEGIN RSA PRIVATE KEY/g,
  },
  {
    label: "openssh-private-key",
    pattern: /BEGIN OPENSSH PRIVATE KEY/g,
  },
];

function isForbiddenTrackedPath(filePath) {
  const segments = filePath.split("/");
  const basename = segments.at(-1) ?? filePath;

  if (basename === ".env" || basename === ".env.local" || basename === ".envrc") {
    return basename === ".envrc" ? "tracked-envrc-file" : "tracked-local-env-file";
  }

  if (segments.includes(".runtime-cache") || segments.includes("logs") || segments.includes("cache") || segments.includes(".cache")) {
    return "tracked-runtime-cache";
  }

  if (
    /\.(pem|p12|pfx|key|crt|cer|sqlite|db|har|log|out)$/iu.test(basename) ||
    /^(Cookies|Cookies-journal|first_party_sets\.db)$/u.test(basename)
  ) {
    return "tracked-sensitive-artifact";
  }

  return null;
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function readTrackedFiles() {
  const stdout = execFileSync("git", ["ls-files", "-z"], {
    encoding: "utf8",
  });

  return stdout.split("\0").filter(Boolean);
}

function readTextFile(filePath) {
  const content = readFileSync(filePath, "utf8");
  if (content.includes("\0")) {
    return null;
  }

  return content;
}

function isAllowedDetectorDefinition(filePath, label, line) {
  if (filePath !== "scripts/check-sensitive-material.mjs") {
    return false;
  }

  const trimmedLine = line.trim();
  if (!trimmedLine.startsWith("pattern: /")) {
    return false;
  }

  return label === "rsa-private-key" || label === "openssh-private-key";
}

function collectFindings() {
  const trackedFiles = readTrackedFiles();
  const findings = [];
  const cwd = resolve(process.cwd());
  const currentHome = resolve(homedir());
  const machineSpecificRules = [
    {
      label: "machine-home-path",
      pattern: new RegExp(escapeRegex(currentHome), "g"),
    },
    {
      label: "machine-workspace-path",
      pattern: new RegExp(escapeRegex(cwd), "g"),
    },
    {
      label: "macos-temp-path",
      pattern: /\/private\/var\/folders\/[A-Za-z0-9._-]{4,}/g,
    },
  ];

  for (const filePath of trackedFiles) {
    const forbiddenPathLabel = isForbiddenTrackedPath(filePath);
    if (forbiddenPathLabel) {
      findings.push({
        type: "tracked-path",
        label: forbiddenPathLabel,
        filePath,
      });
    }

    let content = null;

    try {
      content = readTextFile(filePath);
    } catch {
      continue;
    }

    if (content === null) {
      continue;
    }

    const lines = content.split(/\r?\n/);

    for (const [index, line] of lines.entries()) {
      const lineNumber = index + 1;

      for (const rule of CONCRETE_SECRET_RULES) {
        rule.pattern.lastIndex = 0;
        if (!rule.pattern.test(line)) {
          continue;
        }

        if (isAllowedDetectorDefinition(filePath, rule.label, line)) {
          continue;
        }

        findings.push({
          type: "content",
          label: rule.label,
          filePath,
          lineNumber,
        });
      }

      for (const rule of machineSpecificRules) {
        rule.pattern.lastIndex = 0;
        if (!rule.pattern.test(line)) {
          continue;
        }

        findings.push({
          type: "content",
          label: rule.label,
          filePath,
          lineNumber,
        });
      }
    }
  }

  return findings;
}

function renderFindings(findings) {
  if (findings.length === 0) {
    return "No tracked sensitive material findings.\n";
  }

  const lines = ["Tracked sensitive material findings:"];
  for (const finding of findings) {
    if (finding.type === "tracked-path") {
      lines.push(`- ${finding.label}: ${finding.filePath}`);
      continue;
    }

    lines.push(`- ${finding.label}: ${finding.filePath}:${finding.lineNumber}`);
  }

  return `${lines.join("\n")}\n`;
}

const findings = collectFindings();
process.stdout.write(renderFindings(findings));

if (findings.length > 0) {
  process.exit(1);
}
