#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT_DIR"

fail() {
  echo "[host-safety] $1" >&2
  exit 1
}

assert_no_matches() {
  local pattern="$1"
  local result
  result="$(rg -n "$pattern" apps packages scripts docs .github README.md -g '!node_modules' -g '!scripts/ci/host-safety-gate.sh' || true)"
  if [[ -n "$result" ]]; then
    fail "forbidden host primitive detected:\n${result}"
  fi
}

assert_no_matches 'killall'
assert_no_matches 'pkill'
assert_no_matches 'killpg\('
assert_no_matches 'os\.kill\('
assert_no_matches 'process\.kill\('
assert_no_matches 'loginwindow'
assert_no_matches 'showForceQuitPanel'
assert_no_matches 'aevt,apwn'
assert_no_matches 'System Events'
assert_no_matches 'osascript'

if rg -n '\b(pkill -f|kill -9 -)\b' apps packages scripts docs .github README.md -g '!node_modules' -g '!scripts/ci/host-safety-gate.sh' >/dev/null; then
  fail "found forbidden broad or forceful host-process termination primitive"
fi

echo "[host-safety] ok"
