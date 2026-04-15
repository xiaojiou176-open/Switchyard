# Wave 6 Outward Packaging Threshold

## Status

`partial landed from fresh 2026-04-03 program truth`

这页不是 launch plan。

它更像门槛线：

> **哪些条件满足后，`CLI / MCP / Skills packs / plugin-facing surfaces / landing` 才有资格升格。**

---

## Why This Exists

如果没有这页，后面最容易发生的事情是：

- 底盘还没收稳，就先做门面
- compat 还没 landed，就先写 plugin
- MCP 还只是 research，就先写 outward support

这会让项目看起来更大，但真相更松。

---

## Current Truth

当前 fresh truth 现在是：

- `CLI` = `partial`
- `MCP` = `partial`
- public `Codex / Claude Code / OpenClaw compat` = `partial`
- current repo now contains landed thin compat adapters plus a read-only CLI starter
- outward packaging beyond this thin builder/runtime layer still not landed

所以 `Wave 6` 当前已经不是纯 threshold-only。  
它现在至少完成了：

> **把 `CLI` 从 local-only starter 推到了可诚实写成 `partial` 的 narrow surface。**

---

## Threshold Rules

### `CLI`

只有在下面都成立时，才允许把 `CLI` 从 `not now` 升格：

1. Wave 5 至少已有一个 landed thin compat slice
2. CLI 不再只是包装旧 consumer shell
3. CLI 有自己清楚的 builder/runtime value

### `MCP`

只有在下面都成立时，才允许把 `MCP` 从 `partial read-only adapter` 继续升格：

1. 已有 committed MCP adapter artifact
2. 若要再往上升，必须明确新增 server transport 或 bridge-hosting artifact
3. 它仍然是 thin runtime surface，不是新的 execution brain
4. 对应 docs/compat/support matrix 同步更新

### `Skills packs`

只有在下面都成立时，才允许对外写：

1. 有 landed runtime adapter 能被这些 skills 真消费
2. skills 不是空壳 prompt 模板
3. 当前 support matrix 能说明哪些是真的 support

### `plugin-facing surfaces`

只有在下面都成立时，才允许继续：

1. thin compat 已 landed
2. plugin-facing package 不是假壳
3. 它不会把 consumer product shell 偷搬进 `Switchyard`

### `SEO / landing / launch surfaces`

只有在下面都成立时，才允许升格：

1. Wave 5 至少已有 landed slice
2. `CLI / MCP / compat` 的 status 已不再只是 `planned`
3. 对外页面不会把未 landed 能力写强

---

## Current Honest Verdict

今天最诚实的说法是：

- `Wave 6 threshold defined`
- `Wave 6 CLI promotion landed as partial`
- `Wave 6 MCP` 已 landed 为 `partial` read-only server/tool surface
- `Wave 6 plugin / landing` 仍未升格
- current repo now carries a read-only CLI starter:
  - `pnpm run switchyard:cli -- providers`
  - `pnpm run switchyard:cli -- health`
  - `pnpm run switchyard:cli -- auth-status`
  - `pnpm run switchyard:cli -- provider-current-page --provider <providerId>`
  - `pnpm run switchyard:cli -- provider-current-console --provider <providerId>`
  - `pnpm run switchyard:cli -- provider-current-network --provider <providerId>`
  - `pnpm run switchyard:cli -- provider-store-readiness --provider <providerId>`
  - `pnpm run switchyard:cli -- provider-live-readiness --provider <providerId>`
  - `pnpm run switchyard:cli -- provider-attach-target --provider <providerId>`
  - `pnpm run switchyard:cli -- provider-diagnose-ladder --provider <providerId>`
  - `pnpm run switchyard:cli -- provider-support-bundle --provider <providerId>`
  - `pnpm run switchyard:cli -- provider-diagnose --provider <providerId>`
  - `pnpm run switchyard:mcp`

这不等于所有 outward surface 都已经升格。

更直白一点说：

> 现在机房里已经装了一个只读仪表盘，  
> 又多装了一个只读 MCP 窗口，  
> 所以 `CLI = partial`、`MCP = partial` 都已经诚实；  
> 但还没到把整栋楼都写成“CLI/MCP/plugin 全支持”的程度。

---

## Decision Summary

> `Wave 6` 不是“做漂亮门面”的权限。  
> 它仍然是“只有当前面真的 landed 了，才允许升格门面”的门槛线。  
>
> 当前最诚实的终态是：
> - `CLI = partial`
> - `MCP = partial (read-only server/tool surface only)`
> - `plugin / landing / launch = still not landed`
