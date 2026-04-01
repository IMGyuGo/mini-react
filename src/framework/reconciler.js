// ============================================================
// reconciler.js — 컴포넌트 트리를 실제 화면에 연결하는 중재자
// ============================================================
//
// "Reconciler"는 "중재자" 또는 "조정자"라는 뜻이다.
// 컴포넌트가 만든 VDOM과 실제 화면(DOM) 사이를 연결해준다.
//
// 전체 흐름:
//   ┌──────────────────────────────────────────────────┐
//   │  컴포넌트 함수 실행                                │
//   │       ↓                                          │
//   │  VDOM 트리 생성 (h 함수로 만든 가상 DOM)            │
//   │       ↓                                          │
//   │  expandTree: 컴포넌트 VNode를 일반 VNode로 변환     │
//   │       ↓                                          │
//   │  diff(이전 VDOM, 새 VDOM) → patches 목록           │
//   │       ↓                                          │
//   │  applyPatches(실제 DOM, patches) → 화면 업데이트    │
//   └──────────────────────────────────────────────────┘
//
// 왜 필요한가?
//   h('div', ...) → 바로 VDOM 노드가 된다.
//   h(Counter, ...) → 이건 "Counter 컴포넌트를 실행해라"라는 뜻이다.
//                     실제 VDOM을 얻으려면 Counter() 함수를 실행해야 한다.
//   이 "실행"을 담당하는 게 reconciler다.
// ============================================================

import { FunctionComponent, setCurrentComponent } from './component.js';
import { renderVdom } from '../core/renderVdom.js';
import { diff } from '../diff/diff.js';
import { applyPatches } from '../patch/applyPatch.js';

// ------------------------------------------------------------
// expandTree(vnode)
// ------------------------------------------------------------
// VDOM 트리를 순회하면서, 컴포넌트 타입의 VNode를 만나면
// 해당 컴포넌트 함수를 실행해서 일반 VNode로 변환한다.
//
// [매개변수]
//   vnode — h() 함수가 만든 VNode. 컴포넌트 VNode가 섞여있을 수 있다.
//
// [반환값]
//   모든 컴포넌트가 실행된 후의 순수 element/text VNode 트리
//
// [예시]
//   h(Header, { title: '안녕' })
//   → expandTree가 Header({ title: '안녕' })을 실행
//   → Header가 반환한 h('header', ..., h('h1', null, '안녕'))
//   → 이걸 다시 expandTree로 재귀 처리
//
// [왜 재귀적으로 처리하나?]
//   컴포넌트 안에 또 다른 컴포넌트가 있을 수 있기 때문이다.
//   예: App → Header → Logo (컴포넌트가 컴포넌트를 포함)
// ------------------------------------------------------------
export function expandTree(vnode) {
  // TODO: 구현하기

  // 1. vnode가 없으면(null, undefined) → null 반환

  // 2. vnode.type === 'text'이면 → 그대로 반환 (더 할 게 없음)

  // 3. vnode.type === 'component'이면:
  //    a. vnode.fn(vnode.props)를 실행해서 결과 VDOM을 얻는다
  //    b. 그 결과를 다시 expandTree()로 재귀 처리한다
  //    (컴포넌트가 또 다른 컴포넌트를 반환할 수 있으므로)

  // 4. vnode.type === 'element'이면:
  //    a. children 각각을 expandTree()로 재귀 처리한다
  //    b. 처리된 children으로 새 VNode를 만들어 반환한다
}

// ------------------------------------------------------------
// reconcile(container, oldVdom, newVdom)
// ------------------------------------------------------------
// 이전 VDOM과 새 VDOM을 비교해서, 실제 DOM에 필요한 변경만 적용한다.
//
// [매개변수]
//   container — 컴포넌트가 그려진 DOM 컨테이너
//   oldVdom   — 이전 렌더링 결과 (null이면 첫 렌더링)
//   newVdom   — 새 렌더링 결과
//
// [반환값]
//   업데이트된 실제 DOM 노드
//
// [실행 순서]
//   1. 첫 렌더링이면 (oldVdom === null):
//      → renderVdom(newVdom)으로 DOM을 만들어 container에 넣는다
//
//   2. 업데이트면 (oldVdom이 있으면):
//      → diff(oldVdom, newVdom)으로 변경 목록을 구한다
//      → applyPatches(실제DOM, patches)로 화면에 반영한다
// ------------------------------------------------------------
export function reconcile(container, oldVdom, newVdom) {
  // TODO: 구현하기
}

// ------------------------------------------------------------
// renderApp(componentFn, container, props)
// ------------------------------------------------------------
// 앱 전체를 렌더링하는 최상위 함수.
// 컴포넌트 함수를 받아서 FunctionComponent를 만들고 mount한다.
//
// [사용 예시]
//   function App() {
//     const [page, setPage] = useState('home');
//     return h('div', { class: 'app' },
//       h(Navigation, { current: page, onChange: setPage }),
//       h(Content, { page })
//     );
//   }
//   renderApp(App, document.getElementById('app'));
//
// [반환값]
//   생성된 FunctionComponent 인스턴스
// ------------------------------------------------------------
export function renderApp(componentFn, container, props = {}) {
  // TODO: 구현하기

  // 1. FunctionComponent 인스턴스를 만든다
  // 2. mount(container)를 호출한다
  // 3. 인스턴스를 반환한다
}
