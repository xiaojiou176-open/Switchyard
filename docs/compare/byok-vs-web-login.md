# BYOK vs Web/Login in Switchyard

## Why Both Exist

`Switchyard V1` keeps both lanes because real users do not all arrive with the same kind of access.

### BYOK

- official API key
- cleaner provider API path
- simpler production-style integration

### Web/Login

- browser login / OAuth / subscription session
- useful when the user has real product access but no API key

## Why This Matters for AI App Builders

很多 AI app 会卡在这里：

- 只做 BYOK，很多真实用户进不来
- 只做 Web/Login，正规 API developer path 又不完整

所以这两条 lane 不是“重复”，而是：

> 一条给标准 API，  
> 一条给真实网页登录资格。

## Truthful Status Today

- Gemini BYOK: live verification exists, but the current fresh rerun is blocked by missing local API-key material
- Web/Login:
  - all 5 providers now have a real acquisition / remediation path in the repo
  - current fresh rerun is blocked because the local browser session materials are missing
  - on a credentialed workstation, Gemini can narrow further to a browser-session repair blocker

这不代表 lane 自己被删了，也不代表 repo regression。

它表示的是：

> 当前这台机器上的用户自带凭证和浏览器会话材料没有在 fresh rerun 时就位。
