// ============================================================
// vdomSection.js — 섹션 6 스텁
// ============================================================
//
// 이 파일은 "state가 바뀌면 내부에서 어떤 일이 일어나는지"
// 순서대로 보여줄 섹션의 뼈대다.
//
// 지금 단계에서는 실제 diff 결과를 실시간으로 계산하지 않고,
// 어떤 패널이 들어갈지만 먼저 준비한다.
// ============================================================

const PIPELINE = [
  'setState가 호출된다.',
  '컴포넌트 함수가 다시 실행된다.',
  '새 Virtual DOM 트리가 만들어진다.',
  '이전 트리와 새 트리를 diff로 비교한다.',
  'patch를 실제 DOM에 적용한다.',
];

export function createVdomSection() {
  const section = document.createElement('section');
  section.id = 'vdom-section';
  section.className = 'panel-card learning-section';

  section.appendChild(createHeader(
    '4. Virtual DOM이 하는 일',
    '보이지 않는 내부 작업을 눈에 보이게 설명하는 시각화 섹션의 스텁입니다.',
  ));

  section.appendChild(createPipelineCard());
  section.appendChild(createPlaceholderPanel(
    '이전 VDOM / 다음 VDOM 패널',
    '나중에는 diffVisualizer.js를 붙여서 이전 트리와 다음 트리를 나란히 보여줄 예정입니다.',
  ));
  section.appendChild(createPlaceholderPanel(
    'Patch 목록 패널',
    '나중에는 CREATE, REMOVE, TEXT, PROPS 같은 patch가 어떤 순서로 나오는지 카드 형태로 보여줄 예정입니다.',
  ));

  return section;
}

function createHeader(title, description) {
  const wrapper = document.createElement('div');
  const heading = document.createElement('h2');
  const paragraph = document.createElement('p');

  heading.textContent = title;
  paragraph.textContent = description;
  wrapper.append(heading, paragraph);

  return wrapper;
}

function createPipelineCard() {
  const article = createCardShell('렌더링 파이프라인');
  const list = document.createElement('ol');

  for (const step of PIPELINE) {
    const li = document.createElement('li');
    li.textContent = step;
    list.appendChild(li);
  }

  article.appendChild(list);
  return article;
}

function createPlaceholderPanel(title, text) {
  const article = createCardShell(title);
  const paragraph = document.createElement('p');
  const placeholder = document.createElement('div');

  paragraph.textContent = `[STUB] ${text}`;
  placeholder.className = 'panel';
  placeholder.textContent = '시각화 패널이 나중에 이곳에 렌더링됩니다.';

  article.append(paragraph, placeholder);
  return article;
}

function createCardShell(title) {
  const article = document.createElement('article');
  const heading = document.createElement('h3');

  article.className = 'panel-card learning-subsection';
  heading.textContent = title;
  article.appendChild(heading);

  return article;
}
