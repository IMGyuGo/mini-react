// ============================================================
// integration.test.js — 통합 테스트 스텁
// ============================================================
//
// 여기서는 "각 부품이 따로는 되는데 같이 붙였을 때도 되는가?"를
// 확인할 시나리오를 적어 둔다.
// ============================================================

const INTEGRATION_SCENARIOS = [
  {
    name: '컴포넌트 mount 후 실제 DOM이 컨테이너에 붙어야 한다',
    reason: 'render 단계가 끝나면 사용자가 실제 결과를 눈으로 볼 수 있어야 한다.',
  },
  {
    name: 'setState 후 diff와 patch가 연결되어 DOM 일부만 바뀌어야 한다',
    reason: '이번 주 핵심인 Virtual DOM 파이프라인을 검증하는 테스트다.',
  },
  {
    name: '학습용 playground에서 실행한 코드가 preview 컨테이너에 렌더링돼야 한다',
    reason: '직접 해보기 섹션의 가장 중요한 사용자 경험이기 때문이다.',
  },
];

export function getIntegrationScenarios() {
  return INTEGRATION_SCENARIOS;
}

export function runIntegrationStubTests() {
  return INTEGRATION_SCENARIOS.map((scenario) => ({
    ...scenario,
    status: 'pending',
    nextStep: 'app/framework/playground 연결 후 실제 테스트로 교체 예정',
  }));
}
