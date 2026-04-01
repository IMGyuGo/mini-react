# Tests Folder Guide

`tests/` 폴더는 지금 두 가지 역할을 함께 합니다.

- 브라우저에서 바로 돌려볼 수 있는 최소 smoke test 모음
- 아직 전부 assertion으로 바꾸지 못한 학습/검증 시나리오 문서

즉, 지금의 `tests/`는 완전한 테스트 러너라기보다
"현재 어디까지 자동 검증됐는지"와
"다음에 무엇을 실제 테스트로 바꿔야 하는지"를 함께 보여주는 작업 보드에 가깝습니다.

## 폴더 목적

- A가 만든 framework 동작이 어디까지 실제로 연결됐는지 빠르게 확인하기
- C가 설계한 학습 흐름을 테스트 시나리오로 번역해 두기
- smoke test로 지금 바로 검증 가능한 핵심 연결고리를 브라우저에서 확인하기
- 아직 막힌 부분은 `blocked`나 `pending` 상태로 남겨 다음 작업 대상을 분명히 하기

## 파일 구성

### `framework.test.html`

- 브라우저에서 여는 테스트 보드입니다.
- `component.test.js`, `hooks.test.js`, `integration.test.js`를 ES module로 import 합니다.
- 위쪽에는 `run...SmokeTests()` 결과를, 아래쪽에는 `run...StubTests()` 시나리오 목록을 렌더링합니다.
- 중간에는 현재 `blocked` 시나리오만 따로 모아 보여주는 blocker 요약 섹션이 있습니다.

### `component.test.js`

- `FunctionComponent`의 가장 기본적인 렌더 흐름을 다룹니다.
- mount, props update, text node 렌더를 smoke test로 검증합니다.
- 현재 시나리오는 모두 `covered` 상태입니다.

### `hooks.test.js`

- `useState`, `useEffect`, `useMemo` 학습 포인트를 다룹니다.
- 기본 hook 저장/재실행/deps 비교/memo 재사용은 smoke test로 연결돼 있습니다.
- 실제 `click`/`input` 상호작용 시나리오도 테스트는 붙어 있지만, 현재 framework의 이벤트 props 연결 빈칸 때문에 `blocked` 상태가 포함됩니다.

### `integration.test.js`

- `render -> state update -> DOM 반영`처럼 기능이 함께 이어지는 흐름을 다룹니다.
- playground preview 렌더, VDOM 시각화, workshop answer code, 섹션 DOM 구조, reset 흐름까지 smoke test로 확인합니다.
- workshop preview 내부 버튼 클릭처럼 framework 이벤트 연결에 의존하는 일부 시나리오는 `blocked` 상태입니다.

### `testUtils.js`

- assertion, sandbox DOM 생성/정리, 공용 smoke test runner, click/input helper를 모아 둔 공용 유틸 파일입니다.

## 시나리오 상태 읽는 법

`run...StubTests()`가 돌려주는 시나리오는 아래 상태를 가질 수 있습니다.

- `covered`
  이미 smoke test가 연결돼 있는 시나리오입니다.
- `blocked`
  smoke test는 만들어졌지만 현재 framework 빈칸 때문에 막혀 있는 시나리오입니다.
- `pending`
  아직 문서형 시나리오로만 남아 있고, 실제 assertion으로는 연결되지 않은 항목입니다.

`blocked` 상태에는 보통 아래 정보가 같이 붙습니다.

- `coverage`: 어떤 smoke test가 이미 연결돼 있는지
- `blocker`: 현재 무엇이 막고 있는지
- `owner`: 다음에 어느 역할이 이어서 보면 좋은지

## 브라우저에서 보는 방법

가장 쉬운 시작점은 `tests/framework.test.html`입니다.

페이지를 열면 아래 순서로 읽으면 됩니다.

1. 상단 `통합 진행 현황`
   지금 Phase 기준으로 어디까지 왔는지 봅니다.
2. `실행 가능한 스모크 테스트`
   실제 브라우저 환경에서 바로 돌아가는 최소 assertion 결과를 봅니다.
3. `현재 blocker 요약`
   framework 빈칸 때문에 막힌 시나리오만 빠르게 확인합니다.
4. `컴포넌트 / Hook / 통합 테스트`
   아직 남아 있는 시나리오를 `covered`, `blocked`, `pending` 상태와 함께 읽습니다.

## 코드에서 직접 쓰는 함수

각 `.test.js` 파일은 공통적으로 아래 함수를 제공합니다.

- `get...Scenarios()`
  시나리오 목록을 메타정보와 함께 가져옵니다.
- `run...SmokeTests()`
  브라우저에서 바로 실행 가능한 최소 assertion 결과를 돌려줍니다.
- `run...StubTests()`
  시나리오 목록을 테스트 보드가 읽기 좋은 형태로 돌려줍니다.

## `framework.test.html` 동작 과정

1. HTML 안의 `<script type="module">`이 각 `.test.js` 파일을 import 합니다.
2. `run...SmokeTests()`가 실행돼 `passed` / `failed` 결과를 만듭니다.
3. `run...StubTests()`가 시나리오 목록과 `covered` / `blocked` / `pending` 메타정보를 돌려줍니다.
4. `renderAll()`이 위 결과를 `#progress`, `#smoke-results`, `#results`에 나눠서 렌더링합니다.
5. `테스트 다시 실행` 버튼을 누르면 같은 과정을 다시 수행합니다.

## 현재 해석 포인트

- `passed`: 현재 연결된 smoke test가 통과한 상태
- `failed`: smoke test가 실제로 실패한 상태
- `blocked`: 시나리오 자체는 중요하고 테스트도 붙었지만, 아직 framework 기능이 부족해서 막힌 상태

특히 최근 추가된 상호작용 smoke test는 `click`과 `input`까지 보므로,
여기서 실패가 난다면 학습 콘텐츠 문제라기보다
`onclick`, `oninput` 같은 이벤트 props가 실제 DOM listener로 연결되지 않는 framework 빈칸일 가능성이 큽니다.

## 다음 확장 방향

- `blocked` 시나리오가 A 작업 이후 실제 통과로 바뀌는지 확인하기
- `pending` 시나리오를 하나씩 smoke test 또는 더 촘촘한 assertion으로 전환하기
- 최종적으로는 문서형 시나리오 비중을 줄이고, 실행형 테스트 비중을 늘리기
