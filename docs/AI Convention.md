# AI Convention

## 목적

이 문서는 `jungle-week5-coding-session` 저장소에서 AI가 작업할 때 지켜야 할 공통 규칙과 역할별 규칙을 정리한 문서다.
이번 프로젝트의 목표는 **미니 React 프레임워크로 동작하는 React 학습 페이지**를 만드는 것이다.
이 문서를 읽는 AI는 먼저 `docs/project-plan.md`를 읽고, 그 다음 이 문서를 읽어 역할과 파일 소유 범위를 확인한다.

---

## 공통 규칙

### 1. 프로젝트 목표를 벗어나지 않는다

- 이 저장소의 최종 결과물은 `Nexus Home`이 아니라 **React 학습 페이지**다.
- `Component`, `Props`, `State`, `Hooks`, `Virtual DOM`, `Diff`, `Patch`, `Workshop` 흐름을 중심으로 구현한다.
- 레거시 스마트홈 데모 코드를 되살리는 방향으로 작업하지 않는다.

### 2. 기술 제약을 유지한다

- 외부 프레임워크를 추가하지 않는다.
- 순수 JavaScript와 현재 저장소의 `core / diff / patch` 모듈을 재사용한다.
- 새로운 상태 관리 라이브러리나 번들러를 도입하지 않는다.

### 3. 문서부터 읽고 움직인다

작업 시작 순서:

1. `docs/project-plan.md` 확인
2. `docs/AI Convention.md` 확인
3. 자신이 맡은 역할의 소유 파일 확인
4. 관련 파일만 먼저 읽고 최소 범위로 수정

### 4. 역할 범위를 존중한다

- 사용자가 특정 역할을 지정하면 그 역할의 소유 파일 안에서 먼저 해결한다.
- 다른 역할 파일을 건드려야 하면 "왜 필요한지"가 분명할 때만 최소 범위로 수정한다.
- 대규모 교차 수정은 마지막 통합 단계에서만 한다.

### 5. 교육용 코드라는 점을 잊지 않는다

- 주석은 중학생도 이해할 수 있는 수준으로 작성한다.
- 너무 똑똑한 축약형보다 읽기 쉬운 이름과 단순한 흐름을 우선한다.
- 학습 페이지에 들어가는 예제는 "설명 → 예제 → 직접 해보기 → 챌린지" 흐름을 유지한다.

### 6. 현재 코드 상태를 기준으로 이어서 작업한다

현재까지 확인된 상태:

- `docs/project-plan.md`가 존재한다.
- `src/app.js`, `src/ui/layout.js`는 학습 페이지 스텁 구조로 전환되었다.
- `src/pages/*`, `tests/*`는 기본 스텁이 생성되어 있다.
- `src/framework/*`, `src/ui/codePlayground.js`, `src/ui/contentBlocks.js`, `src/ui/diffVisualizer.js`는 아직 구현해야 할 `TODO`가 많다.
- `README.md`, `src/styles/main.css`는 아직 레거시 설명과 스타일이 남아 있을 수 있으므로 작업 전 반드시 확인한다.

### 7. 정의되지 않은 import를 만들지 않는다

- 이미 삭제된 파일을 다시 import하지 않는다.
- 진입 파일을 바꿀 때는 `index.html -> src/app.js -> 실제 존재하는 모듈` 흐름이 끊기지 않는지 확인한다.
- 작업이 끝나면 최소한 문법 체크나 실행 진입 체크를 한다.

---

## 역할 A: 프레임워크 엔진 담당

### 역할 목표

미니 React의 핵심 동작을 구현한다.
즉, 컴포넌트 함수가 돌아가고, hook이 상태를 기억하고, state 변경 시 diff와 patch까지 이어지게 만든다.

### 주 소유 파일

- `src/framework/createElement.js`
- `src/framework/component.js`
- `src/framework/hooks.js`
- `src/framework/reconciler.js`

### 협업 파일

- `src/core/*`
- `src/diff/*`
- `src/patch/*`

위 파일은 읽고 연결할 수는 있지만, 계약을 깨는 큰 수정은 신중하게 한다.

### A가 지켜야 할 규칙

- `h()`는 문자열 태그와 함수형 컴포넌트를 모두 받을 수 있어야 한다.
- `FunctionComponent`는 `hooks` 배열, `hookIndex`, `mount()`, `update()` 흐름을 명확하게 가져야 한다.
- `useState`, `useEffect`, `useMemo`는 동작이 단순하고 설명 가능해야 한다.
- Hook은 호출 순서에 의존하므로 조건문 안에서 사용하지 않는다는 전제를 문서와 예제에서 유지한다.
- `setState -> render -> diff -> applyPatches` 흐름이 한 눈에 읽히게 구현한다.

### A의 완료 기준

- 최소 카운터 예제가 돌아간다.
- `setState` 후 DOM 일부만 업데이트된다.
- `useEffect`, `useMemo`가 기본 의존성 비교 규칙을 가진다.
- 코드만 읽어도 hook이 어떻게 기억되는지 이해할 수 있다.

### A의 핸드오프 규칙

- B에게 넘길 때: `renderApp`, `createApp`, `h`, `useState` 같은 진입 API를 분명히 알려준다.
- C에게 넘길 때: 테스트 가능한 공개 함수와 예상 동작을 명확히 남긴다.

---

## 역할 B: 학습 페이지 UI 담당

### 역할 목표

학습자가 실제로 보고 누르고 입력할 화면을 만든다.
즉, 레이아웃, 네비게이션, 코드 에디터, 프리뷰, 콘텐츠 블록, diff 시각화를 담당한다.

### 주 소유 파일

- `index.html`
- `src/app.js`
- `src/ui/layout.js`
- `src/ui/codePlayground.js`
- `src/ui/contentBlocks.js`
- `src/ui/diffVisualizer.js`
- `src/styles/main.css`
- `README.md`

### B가 지켜야 할 규칙

- 섹션 이동 구조가 분명해야 한다.
- "직접 해보기"가 잘 보이도록 코드 영역과 프리뷰 영역을 명확히 나눈다.
- 교육용 UI 블록은 재사용 가능하게 만든다.
- `react.dev`를 참고하되, 현재 저장소의 학습 서비스 목적에 맞는 레이아웃으로 구현한다.
- 프레임워크가 아직 완성되지 않았더라도 스텁 화면이 깨지지 않게 유지한다.

### B의 완료 기준

- 상단 소개, 왼쪽 네비게이션, 오른쪽 학습 섹션 구조가 안정적으로 보인다.
- Playground는 실행, 초기화, 에러 표시 흐름을 가진다.
- Note, DeepDive, Challenge 같은 블록이 독립적으로 재사용 가능하다.
- VDOM 변화 시각화 패널이 들어갈 위치와 API가 정리되어 있다.

### B의 핸드오프 규칙

- A에게 넘길 때: 프리뷰 컨테이너와 실행 진입점이 어디인지 알려준다.
- C에게 넘길 때: 어떤 DOM 슬롯에 어떤 콘텐츠를 넣으면 되는지 분명히 남긴다.

---

## 역할 C: 학습 콘텐츠 + 테스트 담당

### 역할 목표

각 학습 섹션의 설명, 예제, 직접 해보기 코드, 챌린지, 그리고 테스트 시나리오를 만든다.

### 주 소유 파일

- `src/pages/componentSection.js`
- `src/pages/hooksSection.js`
- `src/pages/stateSection.js`
- `src/pages/vdomSection.js`
- `src/pages/workshopSection.js`
- `tests/framework.test.html`
- `tests/component.test.js`
- `tests/hooks.test.js`
- `tests/integration.test.js`

### C가 지켜야 할 규칙

- 설명은 쉬운 말부터 시작하고, 필요한 경우에만 심화 내용을 붙인다.
- 예제는 작은 성공 경험을 먼저 주고, 그 다음 확장 예제를 보여준다.
- 테스트는 "무엇을 왜 검증하는지"가 먼저 보이게 작성한다.
- 워크숍은 조립형 과제로 만들고, 학생이 직접 컴포넌트를 구성하게 유도한다.

### C의 완료 기준

- 각 섹션이 `설명 -> 예제 -> 직접 해보기 -> 챌린지` 흐름을 가진다.
- `Component`, `Props`, `useState`, `useEffect`, `useMemo`, `Lifting State Up`, `Virtual DOM`이 모두 포함된다.
- 테스트는 프레임워크 동작과 학습 UI 연결을 검증할 수 있는 수준으로 정리된다.

### C의 핸드오프 규칙

- B에게 넘길 때: 각 섹션에 필요한 UI 블록과 예제 코드 구조를 알려준다.
- A에게 넘길 때: 테스트로 드러난 프레임워크 엣지 케이스를 구체적으로 남긴다.

---

## 역할 간 계약

### A -> B

- B는 A가 제공한 프레임워크 공개 API만 사용한다.
- B는 프레임워크 내부 상태 구조를 직접 만지지 않는다.

### B -> C

- C는 B가 준비한 레이아웃과 블록 컴포넌트 안에 콘텐츠를 넣는다.
- C는 스타일링보다 학습 흐름과 예제 품질을 우선한다.

### C -> A

- C는 "이 예제가 왜 실패하는지"를 재현 가능한 형태로 전달한다.
- A는 그 시나리오를 다시 구현 코드와 테스트에 반영한다.

---

## 통합 우선순위

현재 기준 권장 순서:

1. A가 `src/framework/*` 핵심 동작 구현
2. B가 `codePlayground`, `contentBlocks`, `diffVisualizer` 구현
3. C가 각 섹션에 실제 학습 내용과 테스트 시나리오 연결
4. 마지막에 `README.md`, `main.css`, 발표용 흐름 정리

---

## AI가 작업 시작 전에 스스로 확인할 질문

- 지금 하려는 작업이 React 학습 페이지 목표와 직접 연결되는가?
- 나는 지금 A/B/C 중 어떤 역할로 움직이는가?
- 내가 바꾸려는 파일이 그 역할의 소유 범위 안에 있는가?
- 지금 필요한 수정이 기존 스텁을 발전시키는 방향인가?
- 작업 후 최소 검증까지 할 수 있는가?
