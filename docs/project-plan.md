# Week 5 프로젝트 계획: React 학습 페이지

## 프로젝트 개요

**React의 핵심 개념을 직접 체험하며 배우는 인터랙티브 학습 페이지**를 만든다.
페이지 자체가 우리가 직접 구현한 미니 React 프레임워크 위에서 동작하며,
학습자는 Component, Hooks, State를 단계별로 익히고 직접 조립해볼 수 있다.

> 레퍼런스: [ko.react.dev/learn](https://ko.react.dev/learn/importing-and-exporting-components) 스타일의 교육 흐름

---

## 발제 요구사항 매핑

| 발제 요구사항 | 프로젝트에서 충족하는 방법 |
|---|---|
| 함수형 컴포넌트 + FunctionComponent 클래스 | `src/framework/component.js`에서 구현 |
| hooks 배열, mount(), update() | FunctionComponent 내부에 hooks 배열 관리, mount/update 메서드 |
| useState, useEffect, useMemo | `src/framework/hooks.js`에서 구현 |
| State 변경 시 자동 re-render | setState가 reconciler를 통해 diff → patch 파이프라인 실행 |
| Hook은 최상위 컴포넌트에서만 사용 | 루트 컴포넌트만 hooks 사용, 자식은 props only |
| Lifting State Up | 루트에서 state 관리, 자식에 props로 전달하는 패턴을 학습 섹션에서 시연 |
| Virtual DOM + Diff + Patch | 기존 core/diff/patch 모듈 재활용 |
| 테스트 페이지 (사용자 입력에 따라 화면 변경) | 학습 페이지 자체가 테스트 페이지 (인터랙티브 코드 에디터, 라이브 프리뷰) |
| 단위/기능 테스트 | `tests/` 디렉터리에 모듈별 테스트 작성 |
| 외부 프레임워크 사용 금지 | 순수 JS + 자체 프레임워크만 사용 |

---

## 학습 페이지 구성 (섹션별)

react.dev 스타일로 **개념 설명 → 코드 예제 → 직접 해보기 → 챌린지** 흐름을 따른다.

### 섹션 1: Component란?

- 개념 설명: UI를 나누는 단위, 함수형 컴포넌트란 무엇인가
- 라이브 예제: 간단한 컴포넌트 정의와 렌더링
- **직접 해보기**: 코드 에디터에서 컴포넌트를 수정하면 오른쪽 프리뷰에 결과 반영
- Deep Dive: FunctionComponent 클래스가 내부적으로 어떻게 동작하는지

### 섹션 2: Props로 데이터 전달하기

- 개념 설명: 부모 → 자식 데이터 흐름, props의 역할
- 라이브 예제: props를 받아 렌더링하는 자식 컴포넌트
- **직접 해보기**: props 값을 변경하면 자식 컴포넌트가 업데이트되는 모습
- Note 박스: "자식 컴포넌트는 Stateless, props만 받는 순수 함수"

### 섹션 3: State와 useState

- 개념 설명: 동적 데이터, state가 바뀌면 화면이 다시 그려지는 이유
- 라이브 예제: 카운터 (버튼 클릭 → 숫자 증가)
- **직접 해보기**: useState로 상태를 추가하고 버튼 이벤트 연결
- Deep Dive: "함수는 매번 새로 실행되는데, 상태는 어떻게 유지할까?" → hooks 배열 시각화

### 섹션 4: useEffect와 useMemo

- 개념 설명: 사이드 이펙트 처리, 의존성 배열, 메모이제이션
- 라이브 예제: useEffect로 타이머 구현 / useMemo로 비싼 계산 캐싱
- **직접 해보기**: 의존성 배열을 변경하며 실행 타이밍 관찰

### 섹션 5: Lifting State Up

- 개념 설명: 왜 state를 최상위에 두는가, 여러 컴포넌트 간 상태 공유
- 라이브 예제: 두 자식이 같은 state를 공유하는 온도 변환기
- **직접 해보기**: state 위치를 바꿔보며 동작 차이 확인

### 섹션 6: Virtual DOM이 하는 일

- 개념 설명: setState 호출 → re-render → diff → patch 파이프라인
- 시각화: state 변경 시 Virtual DOM diff 결과를 실시간으로 보여주는 패널
- Deep Dive: 실제 React의 Reconciliation과 우리 구현의 비교

### 섹션 7: 컴포넌트 조립 워크숍 (종합 챌린지)

- 제공된 컴포넌트 조각들을 조합해 완성된 앱을 만드는 실습
- 예: 프로필 카드 앱 — Header, ProfileCard, SkillList 컴포넌트를 조립
- 학습자가 코드 에디터에서 직접 컴포넌트를 작성하고 조합

---

## 프로젝트 구조

```
jungle-week5-coding-session/
├── index.html                    # 학습 페이지 진입점
│
├── src/
│   ├── framework/                # [신규] 미니 React 프레임워크
│   │   ├── createElement.js      #   h() 함수 — VDOM 노드 생성 헬퍼
│   │   ├── component.js          #   FunctionComponent 클래스
│   │   ├── hooks.js              #   useState, useEffect, useMemo
│   │   └── reconciler.js         #   컴포넌트 트리 → VDOM 변환 + diff/patch 실행
│   │
│   ├── core/                     # [유지] Virtual DOM 기반 (Week 3)
│   │   ├── vnode.js              #   VNode 구조 정의
│   │   ├── domToVdom.js          #   DOM → VDOM 변환
│   │   ├── renderVdom.js         #   VDOM → DOM 렌더링
│   │   └── core.md              #   문서 (유지)
│   │
│   ├── diff/                     # [유지] Diff 알고리즘 (Week 3)
│   │   ├── diff.js
│   │   ├── diffProps.js
│   │   ├── diffChildren.js
│   │   ├── keyedDiff.js
│   │   ├── patchTypes.js
│   │   ├── diff.md              #   문서 (유지)
│   │   └── diffChildren.md      #   문서 (유지)
│   │
│   ├── patch/                    # [유지] Patch 적용 (Week 3)
│   │   ├── applyPatch.js
│   │   ├── domOps.js
│   │   └── README.md            #   문서 (유지)
│   │
│   ├── pages/                    # [신규] 학습 페이지 섹션별 콘텐츠
│   │   ├── componentSection.js   #   섹션 1-2: Component + Props
│   │   ├── hooksSection.js       #   섹션 3-4: useState/useEffect/useMemo
│   │   ├── stateSection.js       #   섹션 5: Lifting State Up
│   │   ├── vdomSection.js        #   섹션 6: Virtual DOM 시각화
│   │   └── workshopSection.js    #   섹션 7: 컴포넌트 조립 워크숍
│   │
│   ├── ui/                       # [대폭 수정] 학습 페이지 UI 컴포넌트
│   │   ├── layout.js             #   전체 레이아웃 (네비게이션 + 콘텐츠 영역)
│   │   ├── codePlayground.js     #   코드 에디터 + 라이브 프리뷰 (Sandpack 스타일)
│   │   ├── contentBlocks.js      #   Note, DeepDive, Hint, Challenge 박스
│   │   └── diffVisualizer.js     #   VDOM diff 결과 시각화 패널
│   │
│   ├── styles/                   # [대폭 수정]
│   │   └── main.css              #   학습 페이지용 스타일
│   │
│   ├── utils/                    # [유지]
│   │   ├── clone.js
│   │   └── logger.js
│   │
│   └── app.js                    # [수정] 학습 페이지 부트스트랩
│
├── tests/                        # [수정] 테스트
│   ├── README.md
│   ├── framework.test.html       #   프레임워크 단위 테스트
│   ├── component.test.js         #   FunctionComponent 테스트
│   ├── hooks.test.js             #   Hooks 테스트
│   └── integration.test.js       #   통합 테스트 (컴포넌트 → diff → patch)
│
├── docs/
│   ├── project-plan.md           #   이 문서
│   └── diff-5-cases.md           #   유지
│
├── img/                          #   이미지 (기존 유지 + 필요시 추가)
└── README.md                     #   [수정] 새 프로젝트 설명
```

---

## 기존 파일 처리 계획

### 유지 (그대로 사용)

| 파일 | 이유 |
|---|---|
| `src/core/vnode.js` | VNode 구조는 그대로 재사용 |
| `src/core/domToVdom.js` | DOM→VDOM 변환 유지 |
| `src/core/renderVdom.js` | VDOM→DOM 렌더링 유지 |
| `src/diff/*` | Diff 알고리즘 전체 유지 |
| `src/patch/*` | Patch 적용 전체 유지 |
| `src/utils/*` | 유틸리티 유지 |
| 기존 md 문서들 | 참조용 유지 |

### 삭제 (이번 주제와 무관)

| 파일 | 이유 |
|---|---|
| `src/ui/nexusDemo.js` | Nexus Home 데모 전용 |
| `src/ui/fridgeBoard.js` | 레거시 어댑터 |
| `src/ui/controls.js` | 이전 데모 컨트롤 |
| `src/ui/jsonTreeViewer.js` | 이전 시각화 (diffVisualizer로 대체) |
| `src/ui/mutationObserverPanel.js` | 이전 MutationObserver 패널 |
| `src/samples/fridgeSample.js` | 이전 샘플 데이터 |
| `src/state/store.js` | 새 reconciler가 상태 관리 담당 |
| `src/state/history.js` | 이번 주제에서는 불필요 |

### 대폭 수정

| 파일 | 변경 내용 |
|---|---|
| `index.html` | 학습 페이지 구조로 전면 교체 |
| `src/app.js` | 학습 페이지 부트스트랩으로 교체 |
| `src/ui/layout.js` | 학습 페이지 레이아웃으로 교체 |
| `src/styles/main.css` | react.dev 스타일 학습 페이지 디자인으로 교체 |
| `README.md` | 새 프로젝트 설명으로 교체 |

### 신규 생성

| 파일 | 역할 |
|---|---|
| `src/framework/createElement.js` | `h(tag, props, ...children)` — VDOM 생성 헬퍼 |
| `src/framework/component.js` | FunctionComponent 클래스 (hooks 배열, mount, update) |
| `src/framework/hooks.js` | useState, useEffect, useMemo 구현 |
| `src/framework/reconciler.js` | 컴포넌트 함수 실행 → VDOM 생성 → diff → patch |
| `src/pages/componentSection.js` | Component 학습 콘텐츠 |
| `src/pages/hooksSection.js` | Hooks 학습 콘텐츠 |
| `src/pages/stateSection.js` | State/Lifting State Up 콘텐츠 |
| `src/pages/vdomSection.js` | Virtual DOM 시각화 콘텐츠 |
| `src/pages/workshopSection.js` | 종합 실습 콘텐츠 |
| `src/ui/codePlayground.js` | 인터랙티브 코드 에디터 + 프리뷰 |
| `src/ui/contentBlocks.js` | Note, DeepDive 등 교육용 UI 블록 |
| `src/ui/diffVisualizer.js` | diff 결과 실시간 시각화 |
| `tests/framework.test.html` | 테스트 러너 페이지 |
| `tests/component.test.js` | 컴포넌트 테스트 |
| `tests/hooks.test.js` | Hooks 테스트 |
| `tests/integration.test.js` | 통합 테스트 |

---

## 핵심 모듈 설계

### 1. createElement (h 함수)

```js
// JSX 없이 VDOM을 선언적으로 작성하는 헬퍼
function h(tag, props, ...children) {
  // tag가 함수면 → 컴포넌트로 처리
  // tag가 문자열이면 → createElementVNode 호출
}

// 사용 예시
h('div', { class: 'card' },
  h('h2', null, '제목'),
  h('p', null, '내용')
)
```

### 2. FunctionComponent 클래스

```js
class FunctionComponent {
  constructor(fn, props) {
    this.fn = fn;           // 함수형 컴포넌트 함수
    this.props = props;
    this.hooks = [];        // 상태 저장용 배열
    this.hookIndex = 0;     // 현재 hook 위치
    this.vdom = null;       // 마지막 렌더링 결과
    this.container = null;  // 마운트 대상 DOM
  }

  mount(container) { /* 첫 렌더링 */ }
  update() { /* 상태 변경 후 re-render → diff → patch */ }
}
```

### 3. Hooks

```js
// useState: hooks 배열에 상태 저장, setter 호출 시 update() 트리거
function useState(initialValue) {
  const idx = currentComponent.hookIndex++;
  if (currentComponent.hooks[idx] === undefined) {
    currentComponent.hooks[idx] = initialValue;
  }
  const setState = (newVal) => {
    currentComponent.hooks[idx] = newVal;
    currentComponent.update();
  };
  return [currentComponent.hooks[idx], setState];
}

// useEffect: 의존성 비교 후 콜백 실행
function useEffect(callback, deps) { /* ... */ }

// useMemo: 의존성이 같으면 캐시된 값 반환
function useMemo(factory, deps) { /* ... */ }
```

### 4. Reconciler (핵심 파이프라인)

```
setState 호출
  → FunctionComponent.update()
    → 컴포넌트 함수 재실행 (새 VDOM 생성)
      → diff(이전 VDOM, 새 VDOM)
        → applyPatches(실제 DOM, patches)
          → 화면 업데이트 완료
```

### 5. Code Playground (Sandpack 스타일)

```
┌─────────────────────────────────────────────┐
│  코드 에디터          │  라이브 프리뷰        │
│                      │                      │
│  function App() {    │  ┌──────────────┐    │
│    const [count,     │  │  카운터: 3    │    │
│      setCount]       │  │  [+] [-]      │    │
│      = useState(0);  │  └──────────────┘    │
│    ...               │                      │
│  }                   │                      │
│                      │                      │
│  [▶ 실행]            │  [초기화]             │
└─────────────────────────────────────────────┘
```

- 왼쪽: `<textarea>` 기반 코드 에디터 (구문 강조는 선택)
- 오른쪽: 코드를 `new Function()`으로 실행하여 실제 렌더링
- 실행 버튼 클릭 시 코드 파싱 → 컴포넌트 생성 → mount

---

## 역할 분담 (3인)

### A. 프레임워크 엔진 담당

**담당 파일:**
- `src/framework/createElement.js`
- `src/framework/component.js`
- `src/framework/hooks.js`
- `src/framework/reconciler.js`

**핵심 책임:**
- FunctionComponent 클래스 구현 (hooks 배열, mount, update)
- useState / useEffect / useMemo 구현
- h() 함수로 VDOM 생성하는 인터페이스 구현
- 기존 core/diff/patch와 연결하는 reconciler 구현
- setState 호출 → re-render → diff → patch 파이프라인 완성

**다른 역할에 넘기는 것:**
- B에게: "컴포넌트 함수를 넘기면 mount/update 해주는 API"
- C에게: "프레임워크 모듈별 테스트 가능한 인터페이스"

**우선순위:**
1. createElement + FunctionComponent 기본 동작 (mount)
2. useState 구현 + update 연결
3. useEffect, useMemo 구현
4. Batching (선택 과제)

---

### B. 학습 페이지 UI 담당

**담당 파일:**
- `index.html`
- `src/app.js`
- `src/ui/layout.js`
- `src/ui/codePlayground.js`
- `src/ui/contentBlocks.js`
- `src/ui/diffVisualizer.js`
- `src/styles/main.css`
- `README.md`

**핵심 책임:**
- 전체 학습 페이지 레이아웃 구성 (네비게이션 + 콘텐츠 영역)
- Sandpack 스타일 코드 에디터 + 라이브 프리뷰 구현
- Note, DeepDive, Challenge 등 교육용 UI 블록 구현
- diff 결과 시각화 패널 구현
- react.dev 스타일 CSS 디자인
- 기존 Nexus Home UI 파일 정리/삭제

**다른 역할에 넘기는 것:**
- C에게: "섹션 콘텐츠를 끼워넣을 수 있는 레이아웃 구조"
- A에게: "코드 실행 결과를 프리뷰에 렌더링하는 컨테이너"

**우선순위:**
1. 페이지 레이아웃 + 네비게이션 + CSS
2. 코드 에디터 + 프리뷰 (codePlayground)
3. 교육용 UI 블록 (contentBlocks)
4. diff 시각화 패널

---

### C. 학습 콘텐츠 + 테스트 담당

**담당 파일:**
- `src/pages/componentSection.js`
- `src/pages/hooksSection.js`
- `src/pages/stateSection.js`
- `src/pages/vdomSection.js`
- `src/pages/workshopSection.js`
- `tests/framework.test.html`
- `tests/component.test.js`
- `tests/hooks.test.js`
- `tests/integration.test.js`

**핵심 책임:**
- 각 섹션의 학습 콘텐츠 작성 (개념 설명 텍스트 + 코드 예제)
- 섹션별 "직접 해보기" 초기 코드와 정답 코드 준비
- 챌린지 문제 설계
- 프레임워크 모듈 단위 테스트 작성
- 통합 테스트 (컴포넌트 mount → state 변경 → DOM 업데이트 검증)
- 컴포넌트 조립 워크숍 시나리오 설계

**다른 역할에 넘기는 것:**
- B에게: "각 섹션에 들어갈 콘텐츠 데이터와 예제 코드"
- A에게: "테스트 결과로 발견된 엣지 케이스 목록"

**우선순위:**
1. Component 섹션 + 기본 테스트
2. Hooks 섹션 (useState → useEffect → useMemo 순)
3. State/Lifting State Up 섹션
4. Virtual DOM 시각화 섹션 + 워크숍

---

## 통합 순서

```
Phase 1: 기반 구축 (각자 병렬 작업)
├── A: FunctionComponent + useState 기본 동작
├── B: 페이지 레이아웃 + 코드 에디터 껍데기
└── C: Component 섹션 콘텐츠 + 단위 테스트 골격

Phase 2: 연결 (A+B 통합)
├── A+B: 프레임워크를 코드 에디터에서 실행 가능하게 연결
├── A: useEffect, useMemo 완성
└── C: Hooks 섹션 콘텐츠 + 테스트 확장

Phase 3: 콘텐츠 완성 (B+C 통합)
├── B+C: 모든 섹션을 페이지에 통합
├── C: 워크숍 섹션 + 통합 테스트
└── B: diff 시각화 패널 + CSS 마무리

Phase 4: 발표 준비
├── 전원: 엣지 케이스 수정, 테스트 검증
├── B: README.md 작성
└── 전원: 발표 데모 시나리오 확인
```

---

## 발표 데모 시나리오 (4분)

1. **페이지 소개** (30초)
   - 학습 페이지 전체 구조 보여주기
2. **Component 섹션 시연** (1분)
   - 코드 에디터에서 컴포넌트 작성 → 라이브 프리뷰
3. **Hooks 시연** (1분)
   - useState로 카운터 만들기 → state 변경 시 자동 re-render
   - hooks 배열 시각화로 "상태가 어떻게 유지되는지" 설명
4. **Virtual DOM 파이프라인** (1분)
   - state 변경 → diff 결과 시각화 → patch 적용 과정
5. **테스트 결과** (30초)
   - 단위 테스트 실행 결과 보여주기

---

## 핵심 질문에 대한 답변 준비

| 발제 질문 | 우리 프로젝트에서의 답 |
|---|---|
| UI를 어떻게 Component로 나눌 것인가? | 학습 페이지 자체를 Section, CodePlayground, ContentBlock 등으로 분리 |
| State는 어디에 두는 것이 좋은가? | 루트 컴포넌트에서 관리, 자식에게 props로 전달 (Lifting State Up 섹션에서 직접 시연) |
| setState는 상태 변경 외에 무엇을 해야 할까? | re-render 트리거 → diff → patch 파이프라인 실행 |
| 여러 상태 변경을 한 번에 처리하는 방법은? | Batching: setState 호출을 모아서 한 번에 update() (선택 과제) |
| 우리 React와 실제 React의 차이점은? | Deep Dive 섹션에서 Fiber, Concurrent Mode 등 실제 React와 비교 설명 |
