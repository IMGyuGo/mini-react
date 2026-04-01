// ============================================================
// component.test.js — 컴포넌트 테스트 스텁
// ============================================================
//
// 아직 실제 자동 테스트는 아니고,
// "나중에 꼭 검증해야 할 항목 목록"을 코드로 정리해 둔 상태다.
//
// 이렇게 해두면 팀원이 구현을 시작할 때
// 무엇을 확인해야 하는지 바로 알 수 있다.
// ============================================================

const COMPONENT_TEST_SCENARIOS = [
  {
    name: 'FunctionComponent가 mount 시 첫 화면을 렌더링해야 한다',
    reason: '학습 페이지의 모든 예제는 처음 진입했을 때 바로 보여야 하기 때문이다.',
  },
  {
    name: 'props를 바꾸면 새 Virtual DOM이 만들어져야 한다',
    reason: '부모가 값을 바꾸면 자식 화면도 함께 바뀌어야 하기 때문이다.',
  },
  {
    name: '컴포넌트가 text node를 반환해도 깨지지 않아야 한다',
    reason: '아주 단순한 예제도 실습에서 자주 쓰이기 때문이다.',
  },
];

export function getComponentTestScenarios() {
  return COMPONENT_TEST_SCENARIOS;
}

export function runComponentStubTests() {
  return COMPONENT_TEST_SCENARIOS.map((scenario) => ({
    ...scenario,
    status: 'pending',
    nextStep: '구현 후 실제 assertion으로 교체 예정',
  }));
}
