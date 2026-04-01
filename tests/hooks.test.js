// ============================================================
// hooks.test.js — hooks 테스트 스텁
// ============================================================
//
// Hook은 순서가 아주 중요해서,
// 어떤 상황을 꼭 검사해야 하는지 먼저 적어두는 것이 유용하다.
// ============================================================

const HOOK_TEST_SCENARIOS = [
  {
    name: 'useState가 첫 렌더링에서 초기값을 저장해야 한다',
    reason: '카운터나 입력창 예제가 모두 여기서 시작하기 때문이다.',
  },
  {
    name: 'setState 호출 후 update가 다시 실행돼야 한다',
    reason: '상태가 바뀌었는데 화면이 그대로면 Hook 학습이 성립하지 않는다.',
  },
  {
    name: 'useEffect가 의존성 배열에 따라 실행 여부를 결정해야 한다',
    reason: '무한 실행을 막고, 필요한 때만 effect가 동작해야 하기 때문이다.',
  },
  {
    name: 'useMemo가 같은 deps에서는 이전 계산 결과를 재사용해야 한다',
    reason: '비싼 계산을 줄이는 목적을 실제로 검증해야 하기 때문이다.',
  },
];

export function getHookTestScenarios() {
  return HOOK_TEST_SCENARIOS;
}

export function runHookStubTests() {
  return HOOK_TEST_SCENARIOS.map((scenario) => ({
    ...scenario,
    status: 'pending',
    nextStep: 'framework/hooks.js 구현 후 자동화 예정',
  }));
}
