// ============================================================
// createElement.js — VDOM 노드를 쉽게 만들어주는 도우미 함수
// ============================================================
//
// HTML을 직접 쓰지 않고, 자바스크립트 함수 호출로 화면 구조를 만든다.
//
// 예를 들어 이런 HTML을:
//   <div class="card">
//     <h2>제목</h2>
//     <p>내용</p>
//   </div>
//
// 이렇게 자바스크립트로 표현할 수 있다:
//   h('div', { class: 'card' },
//     h('h2', null, '제목'),
//     h('p', null, '내용')
//   )
//
// React에서 JSX가 하는 일을 이 함수가 대신한다고 보면 된다.
// ============================================================

import { createElementVNode, createTextVNode } from '../core/vnode.js';

// ------------------------------------------------------------
// h(tag, props, ...children)
// ------------------------------------------------------------
// "h"는 "hyperscript"의 약자로, 가상 DOM 노드를 만드는 함수다.
//
// [매개변수]
//   tag      — 문자열이면 HTML 태그('div', 'p' 등)
//              함수이면 컴포넌트(나중에 reconciler가 처리)
//   props    — 속성 객체. 예: { class: 'box', id: 'main' }
//              없으면 null을 넣으면 된다.
//   children — 자식 노드들. 문자열이면 텍스트 노드로 변환한다.
//
// [반환값]
//   VNode 객체 (vnode.js에서 정의한 형태)
//
// [사용 예시]
//   h('button', { class: 'btn' }, '클릭!')
//   → { type: 'element', tag: 'button', props: { class: 'btn' }, children: [...], key: null }
// ------------------------------------------------------------
export function h(tag, props, ...children) {
  // TODO: 구현하기

  // 1단계: props가 null이면 빈 객체로 바꿔준다
  //        → 나중에 props.key 같은 걸 읽을 때 에러가 안 나도록

  // 2단계: children 배열을 정리한다
  //   - 문자열이나 숫자 → createTextVNode()으로 텍스트 노드로 변환
  //   - 배열이 중첩되어 있으면 → 펼쳐서(flat) 하나의 배열로 만든다
  //   - null, undefined, false → 무시한다 (조건부 렌더링용)

  // 3단계: tag의 종류에 따라 다르게 처리한다
  //   - tag가 함수이면 → 컴포넌트다. 컴포넌트 정보를 담은 특별한 VNode를 반환
  //     예: { type: 'component', fn: tag, props: { ...props, children } }
  //   - tag가 문자열이면 → 일반 HTML 태그다. createElementVNode()으로 만든다

  // 4단계: 완성된 VNode를 반환한다
}

// ------------------------------------------------------------
// 내부 도우미: normalizeChildren
// ------------------------------------------------------------
// children 배열 안에 섞여 있는 다양한 타입을
// 모두 VNode 형태로 통일해주는 함수
//
// [처리 규칙]
//   '안녕'       → createTextVNode('안녕')
//   42           → createTextVNode('42')
//   null         → 건너뛴다
//   false        → 건너뛴다 (조건부 렌더링: show && h('div', ...))
//   [a, b, c]    → 펼쳐서 a, b, c 각각을 다시 정리
//   VNode 객체   → 그대로 유지
// ------------------------------------------------------------
function normalizeChildren(children) {
  // TODO: 구현하기
  // 힌트: Array.isArray()로 배열 여부 확인,
  //       typeof value === 'string'으로 문자열 확인
}
