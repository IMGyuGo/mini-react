// ============================================================
// hooksSection.js — 섹션 3, 4 스텁
// ============================================================
//
// 이 파일은 useState, useEffect, useMemo를 소개하는 학습 영역의
// 큰 흐름을 먼저 잡아두는 역할을 한다.
//
// 지금은 "어떤 예제를 넣을지"가 보이는 수준까지만 만들고,
// 실제 hook 동작은 framework 폴더 구현이 끝난 뒤 연결한다.
// ============================================================

const HOOK_CARDS = [
  {
    name: 'useState',
    summary: '화면에 기억해야 할 값을 저장하는 도구',
    starter: `function Counter() {
  const [count, setCount] = useState(0);
  return h('button', { onclick: () => setCount(count + 1) }, '카운트: ' + count);
}`,
  },
  {
    name: 'useEffect',
    summary: '화면이 그려진 뒤 실행해야 하는 일을 등록하는 도구',
    starter: `useEffect(() => {
  console.log('컴포넌트가 화면에 나타났어요.');
}, []);`,
  },
  {
    name: 'useMemo',
    summary: '무거운 계산을 매번 다시 하지 않도록 기억해두는 도구',
    starter: `const total = useMemo(() => {
  return numbers.reduce((sum, number) => sum + number, 0);
}, [numbers]);`,
  },
];

export function createHooksSection() {
  const section = document.createElement('section');
  section.id = 'hooks-section';
  section.className = 'panel-card learning-section';

  section.appendChild(createTitleBlock(
    '2. Hooks 배우기',
    'State를 기억하고, 렌더링 뒤 동작을 실행하고, 계산 결과를 아끼는 법을 배우는 섹션입니다.',
  ));

  section.appendChild(createIntroCard());

  for (const cardInfo of HOOK_CARDS) {
    section.appendChild(createHookCard(cardInfo));
  }

  section.appendChild(createTodoCard(
    '직접 해보기 연결 예정',
    '나중에는 각 카드 아래에 playground를 붙여서 학생이 버튼을 눌러 보고, effect 로그와 memo 재계산 횟수도 직접 확인할 수 있게 만들 예정입니다.',
  ));

  return section;
}

function createTitleBlock(title, description) {
  const wrapper = document.createElement('div');
  const heading = document.createElement('h2');
  const text = document.createElement('p');

  heading.textContent = title;
  text.textContent = description;
  wrapper.append(heading, text);

  return wrapper;
}

function createIntroCard() {
  const article = createCardShell('왜 Hook이 필요할까?');
  const paragraph = document.createElement('p');

  paragraph.textContent = '함수형 컴포넌트는 매번 새로 실행되지만, 이전에 저장한 값은 잊어버리면 안 됩니다. Hook은 그 값을 기억하는 작은 서랍장 같은 역할을 합니다.';
  article.appendChild(paragraph);

  return article;
}

function createHookCard({ name, summary, starter }) {
  const article = createCardShell(name);
  const paragraph = document.createElement('p');
  const pre = document.createElement('pre');
  const code = document.createElement('code');

  paragraph.textContent = summary;
  code.textContent = starter;
  pre.appendChild(code);

  article.append(paragraph, pre);
  return article;
}

function createTodoCard(title, text) {
  const article = createCardShell(title);
  const paragraph = document.createElement('p');

  paragraph.textContent = `[STUB] ${text}`;
  article.appendChild(paragraph);

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
