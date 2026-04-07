# Switchyard Default First Success

如果你第一次接触 `Switchyard`，最容易犯的错是：

> 一上来开 20 个文档页，  
> 结果一条最小成功链都没先跑通。

这页只做一件事：

> **把当前最诚实、最短、最值得先跑通的默认 first-success 路径压成一条线。**

先说人话：

- 先把 `Switchyard` 服务跑起来
- 先证明它真的活着
- 再证明它真的能接一条最小 runtime invoke
- 之后再去 builder lane / starter pack / compat lane

## 默认路线

### Step 1. 启动本地 service runtime

```bash
pnpm run start:service-local
```

你可以先把这步理解成“先给整套系统通电”。

默认端口是：

- `http://127.0.0.1:4010`

### Step 2. 先做一条 read-only 活性证明

```bash
pnpm run example:mcp-inspector
```

这一步证明的是：

- service runtime 能被本地 client 找到
- MCP read-only surface 能起
- tool inventory 能列
- `runtime.health` 真能读

如果你现在只想先证明“这台机器上的 runtime 是活的”，做到这里就已经是一把有价值的 first success。

### Step 3. 再做一条最小 invoke 证明

```bash
pnpm run example:runtime-bridge
```

这一步才是最接近 `Switchyard` 主价值的一把：

- 通过最小 JSON body 打通 `/v1/runtime/invoke`
- 证明 shared provider runtime 不是只会列状态和打印目录

这一步需要你自己的合法凭证材料：

- 如果走 `BYOK`
  - 需要对应 provider 的 API key
- 如果走 `Web/Login`
  - 需要对应 provider 的网页登录态 / cookie bundle / user agent

## 如果你卡住了，先这样分流

### 你连 Step 2 都过不去

先看：

- [docs/runbooks/dev-bootstrap.md](./runbooks/dev-bootstrap.md)
- [docs/api/service-http-reference.md](./api/service-http-reference.md)
- [docs/mcp.md](./mcp.md)

### 你 Step 2 过了，但 Step 3 过不去

这通常不是“repo 彻底坏了”，而是：

- 目标 provider 还没准备好凭证
- 当前这台机器缺 session material
- browser session / cookie bundle / user agent 还不够

先看：

- [docs/public-proof-pack.md](./public-proof-pack.md)
- [docs/api/error-diagnostics-reference.md](./api/error-diagnostics-reference.md)
- [docs/api/web-login-acquisition.md](./api/web-login-acquisition.md)

## 跑成之后，下一步去哪

### 你想继续接 builder path

看：

- [docs/plugin-skill-starter-kits.md](./plugin-skill-starter-kits.md)
- [docs/starter-pack-chooser.md](./starter-pack-chooser.md)
- [starter-packs/README.md](../starter-packs/README.md)

### 你想接进具体宿主

看：

- [docs/host-integration-playbooks.md](./host-integration-playbooks.md)
- [docs/host-integration-examples.md](./host-integration-examples.md)
- [examples/hosts/README.md](../examples/hosts/README.md)

## 这条默认路径证明什么

- `Switchyard` 真的有 service-first runtime frontdoor
- repo 里真的有可运行的 read-only MCP surface
- repo 里真的有可执行的最小 invoke starter
- 你不需要先假装自己已经在做 full Codex / Claude Code / OpenClaw parity

## 这条默认路径不证明什么

- 不证明 full consumer parity
- 不证明 MCP execution brain
- 不证明任何 marketplace 已经 listed
- 不证明当前机器上的每个 Web/Login provider 都已经 live-ready

一句收尾：

> **先跑成一把最小成功，**
>
> **再去开 builder lane。**
>
> 这比一上来先读完整目录树，更符合 `Switchyard` 当前最诚实的前门。**
