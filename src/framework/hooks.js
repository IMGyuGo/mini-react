// ============================================================
// hooks.js — useState, useEffect, useMemo 구현
// ============================================================
//
// "함수는 매번 새로 실행되는데, 상태는 어떻게 유지할까?"
// → 이 질문의 답이 바로 이 파일에 있다.
//
// 비유:
//   함수형 컴포넌트 = "매일 새로 쓰는 일기"
//   hooks 배열 = "일기장" (어제 뭐 했는지 기록이 남아있음)
//
//   매일(=매 렌더링마다) 새 일기를 쓰지만,
//   일기장(=hooks 배열)을 넘기면서 이전 기록을 참고할 수 있다.
//
// 핵심 원리:
//   컴포넌트 함수가 실행될 때마다 hookIndex가 0부터 시작한다.
//   useState를 호출하면 hooks[0], hooks[1], ... 순서대로 읽는다.
//   그래서 hook 호출 순서가 매번 같아야 한다! (조건문 안에서 쓰면 안 됨)
//
//   hooks 배열 시각화:
//   ┌─────────────────────────────────────────┐
//   │ hooks = [ state0, state1, effect2, ... ] │
//   │           ↑                              │
//   │       hookIndex = 0 (처음부터 다시 읽기)   │
//   └─────────────────────────────────────────┘
// ============================================================

import { currentComponent } from './component.js';

// ============================================================
//  useState — 상태를 기억하고, 바꿀 수 있게 해주는 hook
// ============================================================
//
// [매개변수]
//   initialValue — 상태의 처음 값. 예: 0, '', [], {}
//
// [반환값]
//   [현재 상태값, 상태를 바꾸는 함수] (배열)
//
// [사용 예시]
//   function Counter() {
//     const [count, setCount] = useState(0);
//     // count = 현재 숫자
//     // setCount = 숫자를 바꾸는 함수
//     return h('div', null,
//       h('p', null, `카운트: ${count}`),
//       h('button', { onclick: () => setCount(count + 1) }, '+1')
//     );
//   }
//
// [동작 원리]
//   1. 컴포넌트가 처음 실행될 때:
//      hooks[0]에 initialValue를 저장한다.
//
//   2. 두 번째 실행부터:
//      hooks[0]에 이미 값이 있으므로 그걸 읽는다.
//      (initialValue는 무시된다)
//
//   3. setCount(5)를 호출하면:
//      hooks[0]을 5로 바꾸고,
//      컴포넌트의 update()를 호출한다.
//      → 함수가 다시 실행된다.
//      → hooks[0]을 읽으면 5가 나온다.
//      → 화면에 5가 표시된다!
// ============================================================
export function useState(initialValue) {
  // TODO: 구현하기

  // 1. 현재 컴포넌트와 hook 인덱스를 가져온다
  //    const component = currentComponent;
  //    const idx = component.hookIndex++;

  // 2. 처음 호출이면(hooks[idx]가 없으면) 초기값을 저장한다
  //    if (component.hooks[idx] === undefined) {
  //      component.hooks[idx] = initialValue;
  //    }

  // 3. 상태를 바꾸는 함수(setter)를 만든다
  //    const setState = (newValue) => {
  //      // 함수가 넘어오면 이전 값을 인자로 실행한다
  //      // 예: setCount(prev => prev + 1)
  //
  //      // hooks[idx]를 새 값으로 바꾼다
  //      // component.update()를 호출해서 다시 그린다
  //    };

  // 4. [현재값, setter]를 반환한다
  //    return [component.hooks[idx], setState];
}

// ============================================================
//  useEffect — 렌더링 이후에 실행할 작업을 등록하는 hook
// ============================================================
//
// [매개변수]
//   callback — 실행할 함수. 예: () => { console.log('마운트됨!') }
//   deps     — 의존성 배열. 이 값이 바뀔 때만 callback을 다시 실행한다.
//              예: [count] → count가 바뀔 때만 실행
//              예: []      → 처음 한 번만 실행
//              예: 생략    → 매번 실행
//
// [사용 예시]
//   // 컴포넌트가 처음 그려질 때만 실행
//   useEffect(() => {
//     console.log('안녕! 컴포넌트가 화면에 나타났어.');
//   }, []);
//
//   // count가 바뀔 때마다 실행
//   useEffect(() => {
//     document.title = `카운트: ${count}`;
//   }, [count]);
//
// [동작 원리]
//   1. hook 정보를 hooks 배열에 저장한다:
//      { type: 'effect', callback, deps, prevDeps, cleanup }
//
//   2. 렌더링이 끝난 후, runEffects()가 호출되면:
//      - deps가 없으면 → 항상 실행
//      - deps가 있고 이전과 같으면 → 건너뛴다
//      - deps가 있고 이전과 다르면 → 이전 cleanup 실행 후 callback 실행
//
//   3. callback이 함수를 반환하면 그게 cleanup 함수가 된다.
//      (다음에 다시 실행되기 전에 정리 작업을 한다)
//      예: 타이머를 시작했으면 → cleanup에서 타이머를 멈춘다
// ============================================================
export function useEffect(callback, deps) {
  // TODO: 구현하기

  // 1. 현재 컴포넌트와 hook 인덱스를 가져온다

  // 2. 이전 hook 정보를 읽는다 (있으면)

  // 3. hook 정보를 저장/갱신한다
  //    component.hooks[idx] = {
  //      type: 'effect',
  //      callback,
  //      deps,
  //      prevDeps: 이전에 저장된 deps,
  //      cleanup: 이전에 저장된 cleanup 함수,
  //      needsRun: deps가 바뀌었는지 여부
  //    };
}

// ============================================================
//  useMemo — 비싼 계산 결과를 기억해두는 hook
// ============================================================
//
// [매개변수]
//   factory — 계산을 수행하는 함수. 예: () => heavyCalculation(data)
//   deps    — 의존성 배열. 이 값이 바뀔 때만 다시 계산한다.
//
// [반환값]
//   계산된 값 (deps가 안 바뀌었으면 이전에 계산한 값을 그대로 반환)
//
// [사용 예시]
//   function TodoList({ todos, filter }) {
//     // todos나 filter가 바뀔 때만 필터링을 다시 한다
//     const filtered = useMemo(
//       () => todos.filter(t => t.status === filter),
//       [todos, filter]
//     );
//     return h('ul', null, ...filtered.map(t => h('li', null, t.text)));
//   }
//
// [왜 필요할까?]
//   컴포넌트 함수는 상태가 바뀔 때마다 처음부터 다시 실행된다.
//   만약 무거운 계산이 있다면 매번 다시 하는 건 낭비다.
//   useMemo를 쓰면 "재료(deps)가 같으면 이전 결과를 재활용"한다.
//
// [동작 원리]
//   1. hooks 배열에 { type: 'memo', value, deps } 형태로 저장
//   2. 다음 렌더링에서 deps를 비교
//   3. 같으면 → hooks[idx].value를 그대로 반환 (계산 안 함!)
//   4. 다르면 → factory()를 다시 실행하고 결과를 저장
// ============================================================
export function useMemo(factory, deps) {
  // TODO: 구현하기

  // 1. 현재 컴포넌트와 hook 인덱스를 가져온다

  // 2. 이전 hook 정보를 읽는다

  // 3. deps를 비교한다 (depsChanged 함수 사용)
  //    - 이전 정보가 없으면 → 첫 실행이므로 factory() 실행
  //    - deps가 바뀌었으면 → factory() 다시 실행
  //    - deps가 같으면 → 이전 값을 그대로 사용

  // 4. 결과를 hooks[idx]에 저장하고 반환
}

// ============================================================
//  내부 도우미: depsChanged — 의존성 배열 비교
// ============================================================
// 두 deps 배열을 하나씩 비교해서 바뀌었는지 확인한다.
//
// [반환값]
//   true  — 바뀌었다 (다시 실행해야 한다)
//   false — 안 바뀌었다 (이전 결과를 쓸 수 있다)
//
// [비교 규칙]
//   - 이전 deps가 없으면 → true (첫 실행)
//   - 길이가 다르면 → true
//   - 같은 위치의 값이 하나라도 다르면 → true
//   - Object.is()로 비교 (=== 와 비슷하지만 NaN 처리가 다름)
// ============================================================
export function depsChanged(prevDeps, nextDeps) {
  // TODO: 구현하기

  // if (!prevDeps) return true;
  // if (prevDeps.length !== nextDeps.length) return true;
  // return prevDeps.some((dep, i) => !Object.is(dep, nextDeps[i]));
}
