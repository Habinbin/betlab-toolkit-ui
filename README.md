# @betlab/toolkit-ui

betlab toolbox의 **디자인 토큰(Layer 1)과 UI primitive(Layer 2)**.
색·타이포·간격이 정의되는 유일한 곳이다.

## 왜 있나

`betlab-toolbox`와 `gr-toolbox`의 같은 툴이 갈라졌다. 원인은 각 툴이 자기 색을
정의할 수 있었다는 것이다. 이 패키지는 그 권한을 한 곳으로 모은다.

규약은 [`bet-lab/tool-agent-playbook`](https://github.com/bet-lab/tool-agent-playbook)
의 `rules/design-contract.md`. 위반은 `design-lint` 가 CI에서 막는다.

## 쓰는 법

toolbox에 submodule로 붙이고 별칭을 연다.

```bash
git submodule add https://github.com/Habinbin/betlab-toolkit-ui packages/ui
```

```js
// svelte.config.js — 패키지 이름 그대로 별칭을 건다.
// 나중에 npm 배포로 옮겨도 툴의 import 문은 손대지 않아도 된다.
kit: {
	alias: {
		'@betlab/toolkit-ui': 'packages/ui/src/index.ts',
		'@betlab/toolkit-ui/tool': 'packages/ui/src/tool.ts',
		'@betlab/toolkit-ui/theme.css': 'packages/ui/src/theme.css'
	}
}
```

```css
/* src/routes/layout.css — 앱 전역 CSS는 이게 전부다 */
@import '../../packages/ui/src/theme.css';
@source '../../packages/ui/src';
```

```svelte
<script>
	import { ToolShell, DropZone, Button } from '@betlab/toolkit-ui';
</script>
```


## 토큰

`dark:` 변형을 쓸 일이 없다. 토큰이 테마별 값을 이미 들고 있다.

| 유틸리티                                          | 용도                                 |
| ------------------------------------------------- | ------------------------------------ |
| `bg-surface`                                      | 페이지·카드 바탕                     |
| `bg-elevated`                                     | 살짝 떠 있는 면 (빈 상태, 보조 패널) |
| `bg-sunken`                                       | 눌린 면 (트랙, hover 배경)           |
| `border-hairline` / `border-hairline-strong`      | 기본 경계 / 컨트롤 경계              |
| `text-ink` / `text-ink-muted` / `text-ink-subtle` | 본문 / 보조 / 비활성                 |
| `bg-accent` `text-on-accent` `bg-accent-hover`    | 주 행동 (배경과 반전)                |
| `text-danger` `text-success` `text-warning`       | 의미색                               |
| `rounded-control` / `rounded-panel`               | 컨트롤 / 패널 라운딩                 |

## Primitive

| 컴포넌트           | 용도                                                 |
| ------------------ | ---------------------------------------------------- |
| `ToolShell`        | 툴 페이지 골격 — 뒤로가기 + 제목 + 본문              |
| `DropZone`         | 파일 드롭·선택. `compact` 로 좁은 형태               |
| `SortableGrid`     | 드래그로 재정렬되는 카드 그리드. 순번·개별 제거 포함 |
| `Button`           | `primary` / `secondary` / `ghost` / `danger`         |
| `TextField`        | 인라인 텍스트 입력 (`suffix` 로 확장자 등)           |
| `SegmentedControl` | 프리셋 선택. `detected` 로 자동 감지 표시            |
| `ProgressBar`      | n/total 진행률. 스피너 대신 이것을 쓴다              |
| `EmptyState`       | 빈 상태                                              |

## 새 primitive를 추가할 때

툴 안에서 만들지 않는다. 두 툴 이상에서 필요하거나 **색·간격을 새로 정하는 것**이면
여기로 온다. 판단 기준은 `design-contract.md` 참조.
