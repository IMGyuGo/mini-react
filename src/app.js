import { createLayout } from './ui/layout.js';
import { renderSectionNavigation } from './ui/layout.js';
import { createComponentSection } from './pages/componentSection.js';
import { createHooksSection } from './pages/hooksSection.js';
import { createStateSection } from './pages/stateSection.js';
import { createVdomSection } from './pages/vdomSection.js';
import { createWorkshopSection } from './pages/workshopSection.js';

// ============================================================
// app.js — 학습 페이지 스텁 부트스트랩
// ============================================================
//
// 예전에는 스마트홈 데모를 켜는 파일이었지만,
// 이제는 React 학습 페이지의 큰 조립 순서를 담당한다.
//
// 이 파일은 아직 "콘텐츠를 붙이는 단계"까지만 담당한다.
// 실제 mini React 실행, playground 연결, diff 시각화 연결은
// 다음 작업에서 붙일 예정이다.
// ============================================================

const SECTION_FACTORIES = [
  { id: 'component-section', title: '1. Component와 Props', create: createComponentSection },
  { id: 'hooks-section', title: '2. Hooks 배우기', create: createHooksSection },
  { id: 'state-section', title: '3. State 위치 올리기', create: createStateSection },
  { id: 'vdom-section', title: '4. Virtual DOM이 하는 일', create: createVdomSection },
  { id: 'workshop-section', title: '5. 컴포넌트 조립 워크숍', create: createWorkshopSection },
];

function buildSections() {
  return SECTION_FACTORIES.map((sectionInfo) => ({
    ...sectionInfo,
    element: sectionInfo.create(),
  }));
}

function mountSections(container, sections) {
  const elements = sections.map((section) => section.element);
  container.replaceChildren(...elements);
}

function bootstrap() {
  const root = document.querySelector('#app');
  if (!root) return;

  const ui = createLayout(root);
  const sections = buildSections();

  mountSections(ui.content, sections);
  renderSectionNavigation(ui.nav, sections);
}

bootstrap();
