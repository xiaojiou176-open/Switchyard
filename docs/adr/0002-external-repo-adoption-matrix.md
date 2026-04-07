# ADR 0002: External Repo Adoption Matrix

## Status

Accepted

## Date

2026-03-29

## Context

`Switchyard` 的外部参考仓很多，如果没有正式矩阵，后续 Agent 最容易犯两种错：

1. 把 consumer-side 产品仓误当 V1 内核主参考
2. 把不同层的仓都用同一种方式处理

这份 ADR 的目标是把“参考谁、怎么借、借到哪一层”写成正式合同。

---

## Workspace-local Reference Roots

当前工作区内，主线参考仓的本地路径按占位写法记为：

- `Vercel AI SDK`
  `<local-reference-root>/ai`
- `LiteLLM`
  `<local-reference-root>/litellm`
- `openclaw-zero-token`
  `<local-reference-root>/openclaw-zero-token`

其中 `<local-reference-root>` 表示当前操作者在本机放第三方参考仓的根目录；公开 ADR 不写个人绝对路径。

这 3 个本地镜像不是“随手翻一眼”的材料，而是当前 `Switchyard V1` 的主技术依据。

---

## 采用形式定义

### `pnpm` 直接依赖

适用于边界清晰、可作为 TypeScript 包稳定引入的上游。

### `lab sidecar`

适用于完整服务型/运行时型上游。  
先把它跑起来，作为对照运行时、技术实验对象和功能 oracle。

### `vendor / transplant`

适用于不适合作为稳定依赖，但局部运行时逻辑值得迁移进 `Switchyard` 自己代码库的上游。

### `reference only`

适用于只需要读结构、读产品边界、读样板，不纳入主干依赖体系的上游。

---

## [已确认] 主线主参考

| Repo | 当前角色 | 采用形式 | 是否纳入 V1 | 为什么 |
| --- | --- | --- | --- | --- |
| `ai` (`Vercel AI SDK`) | SDK/contracts/TS provider abstraction 骨架 | `pnpm` 直接依赖 | 是 | 它提供 provider-agnostic TypeScript toolkit 和 unified provider architecture，最适合作为 `Switchyard` 的 SDK/contract 骨架 |
| `litellm` | BYOK gateway / proxy / routing 样本 | `lab sidecar` | 是 | 它更像 AI Gateway / Proxy Server，而不是 SDK；适合拿来学 BYOK gateway、routing、统一 OpenAI-compatible service |
| `openclaw-zero-token` | Web/Login 技术母本 | `lab sidecar` + `vendor / transplant` | 是 | 它覆盖了 V1 供给侧最难的 Web/Login runtime，且已具备 gateway、auth、openresponses HTTP surface、tool calling 等完整能力 |

### 主线三者的分层含义

- `Vercel AI SDK` = **SDK/contracts 骨架**
- `LiteLLM` = **BYOK gateway/sidecar 样本**
- `openclaw-zero-token` = **Web/Login 技术母本**

这三者允许同时使用，但**不允许同层重复归一化**。

### [已确认] Web/Login lane 的主参考优先级

在 `Web/Login` 这条 lane 上，当前优先级已经收敛成：

1. **`openclaw-zero-token`**
2. 其他小型、局部样本（仅在需要做差异对照时回看）

也就是说：

> **`openclaw-zero-token` 不是“重要参考之一”，而是当前 Web/Login lane 的头号主参考。**
>
> 它必须优先于历史上那些更小、更旧、维护活跃度更弱的局部样本。

---

## [已确认] 边缘/补充参考

| Repo | 当前角色 | 采用形式 | 是否纳入 V1 主干 | 为什么不进主干 |
| --- | --- | --- | --- | --- |
| `ChatALL` | 产品壳 / Web Access vs API 能力矩阵样板 | `reference only` | 否 | 它更像产品样板与能力矩阵样板，不是 runtime 内核、也不是供给侧技术母本 |

---

## [已确认] 后续 consumer compat 参考

| Repo | 当前角色 | 采用形式 | 当前地位 | 为什么不是 V1 内核主参考 |
| --- | --- | --- | --- | --- |
| `codex` | 后续 consumer compat 参考 | `reference only` | 后置 | 它是本地运行的 coding agent / terminal agent 产品，不是 V1 供给侧主参考 |
| `claude-code` | 后续 consumer compat 参考 | `reference only` | 后置 | 它是 terminal-native coding tool，属于未来 consumer compat 维度，不属于 V1 供给侧内核 |
| `openclaw` | 后续 consumer compat 参考 | `reference only` | 后置 | 它是更大的 personal AI assistant 产品世界，当前只作为 future consumer-side contract 对照，不作为 V1 主内核 |

---

## [已确认] 当前非主线

| Repo | 当前角色 | 采用形式 | 当前判断 |
| --- | --- | --- | --- |
| `gemini-cli` | 暂不纳入 V1 的 consumer-side / agent-side 产品参考 | `reference only` | 当前非主线 |
| `aider` | coding-agent 产品参考 | `reference only` | 会把注意力从供给侧 runtime 拉回消费侧产品，不进入当前主线 |
| `opencode` | coding-agent / product 参考 | `reference only` | 当前与 V1 供给侧主线无直接关系 |
| `oh-my-openagent` | 开放式 agent/workbench 产品参考 | `reference only` | 会把项目带偏到另一条产品战线，不纳入 V1 主线 |

---

## [已确认] 已降级的历史样本

以下仓历史上讨论过，也可能仍有局部阅读价值，但**已经被正式移出当前主采购清单**：

| Repo | 当前地位 | 原因 |
| --- | --- | --- |
| `ai-sdk-provider-chatgpt-oauth` | `reference only / differential sample` | 过于局部，且在 Web account conversion 现实里已经不再适合作为主参考 |
| `deerflow-oauth-bridge` | `reference only / bridge sample` | 更适合看局部桥接思路，不适合作为当前主线基座 |
| `oc-chatgpt-multi-auth` | `reference only / mechanism sample` | V1 不做多账户池化，因此只保留少量 refresh/health 机制参考价值 |

---

## [当前默认] 采用矩阵的解释规则

### 1. 主线不等于“全量继承”

即使是主线三者，也不是都以同一种方式吃进去：

- `Vercel AI SDK` 适合直接依赖
- `LiteLLM` 适合作为 sidecar/gateway 样本
- `openclaw-zero-token` 适合先跑起来研究，再有选择地 transplant

### 2. `reference only` 不等于“没价值”

它的意思是：

- 值得看
- 但不进入 V1 主干
- 不应主导当前目录结构与 runtime contract

### 3. 任何 consumer-side 产品仓都不能反过来定义 V1 内核

这条是强约束，尤其适用于：

- `codex`
- `claude-code`
- `openclaw`
- `gemini-cli`
- `aider`
- `opencode`
- `oh-my-openagent`

---

## [非目标]

这份 ADR 不负责：

- 规定具体 `pnpm add` 命令
- 规定 transplant 的精确文件列表
- 规定 sidecar 的部署脚本
- 规定消费者兼容实现何时开始

这些内容属于后续 runbook、delivery plan 和 implementation 文档。

---

## [后续目标]

未来可以在后续 ADR 或 delivery plan 中再补：

- `openclaw-zero-token` 哪些模块进入 transplant 清单
- `LiteLLM` 是以实验 sidecar、集成 sidecar、还是对照 gateway 的形式出现
- `codex / claude-code / openclaw` 的 consumer compat contract
- `gemini-cli` 是否重新进入 roadmap

当前仓已经把更细的 adoption truth 额外落到：

- `docs/blueprints/openclaw-zero-token-adoption-ledger.md`

---

## 结论

`Switchyard V1` 的外部采购清单已经足够清楚：

### 主线主参考

- `Vercel AI SDK`
- `LiteLLM`
- `openclaw-zero-token`

### 边缘/补充

- `ChatALL`

### 后续 consumer compat 参考

- `codex`
- `claude-code`
- `openclaw`

### 当前非主线

- `gemini-cli`
- `aider`
- `opencode`
- `oh-my-openagent`

任何后续实现若偏离这张矩阵，必须先写新的 ADR，而不是静默改口。
