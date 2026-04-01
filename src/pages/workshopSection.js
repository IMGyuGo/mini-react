// ============================================================
// workshopSection.js — 섹션 7 스텁
// ============================================================
//
// 이 파일은 마지막 종합 실습 섹션의 뼈대다.
// 학생이 직접 컴포넌트를 조립해 하나의 작은 앱을 완성하는 공간이 된다.
// ============================================================

const WORKSHOP_PARTS = [
  'Header 컴포넌트',
  'ProfileCard 컴포넌트',
  'SkillList 컴포넌트',
  '루트 App 컴포넌트',
];

const WORKSHOP_GOAL = `function App() {
  return h('main', { class: 'profile-app' },
    h(Header, { title: 'React 학습 카드' }),
    h(ProfileCard, { name: '정글', track: 'Frontend' }),
    h(SkillList, { skills: ['Component', 'State', 'Hooks'] })
  );
}`;

export function createWorkshopSection() {
  const section = document.createElement('section');
  section.id = 'workshop-section';
  section.className = 'panel-card learning-section';

  section.appendChild(createHeader(
    '5. 컴포넌트 조립 워크숍',
    '앞에서 배운 내용을 한 번에 써보는 종합 실습 섹션의 스텁입니다.',
  ));

  section.appendChild(createChecklistCard('조립할 부품', WORKSHOP_PARTS));
  section.appendChild(createParagraphCard(
    '워크숍 목표',
    '작은 컴포넌트를 여러 개 만든 뒤, App에서 조립해서 하나의 화면을 완성하는 경험을 제공할 예정입니다.',
  ));
  section.appendChild(createCodeCard('완성 목표 예시', WORKSHOP_GOAL));
  section.appendChild(createParagraphCard(
    '도전 과제 예정',
    '[STUB] 나중에는 "props를 바꿔 카드 모양을 다시 꾸미기", "state를 추가해 선택된 스킬 강조하기" 같은 미션을 추가할 예정입니다.',
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

function createChecklistCard(title, items) {
  const article = createCardShell(title);
  const list = document.createElement('ul');

  for (const item of items) {
    const li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
  }

  article.appendChild(list);
  return article;
}

function createParagraphCard(title, text) {
  const article = createCardShell(title);
  const paragraph = document.createElement('p');

  paragraph.textContent = text;
  article.appendChild(paragraph);

  return article;
}

function createCodeCard(title, code) {
  const article = createCardShell(title);
  const pre = document.createElement('pre');
  const codeEl = document.createElement('code');

  codeEl.textContent = code;
  pre.appendChild(codeEl);
  article.appendChild(pre);

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
