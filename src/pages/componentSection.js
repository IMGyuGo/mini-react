// ============================================================
// componentSection.js — 섹션 1, 2 스텁
// ============================================================
//
// 이 파일은 "컴포넌트"와 "props"를 소개하는 학습 섹션의
// 뼈대만 먼저 만드는 파일이다.
//
// 아직 실제 코드 에디터나 라이브 프리뷰는 연결하지 않았다.
// 대신 나중에 어떤 내용이 들어갈지 한눈에 보이도록
// 설명 카드와 예시 코드 칸을 만들어 둔다.
// ============================================================

const LEARN_ITEMS = [
  '컴포넌트가 왜 화면을 나누는 단위인지 이해한다.',
  '함수형 컴포넌트가 어떤 입력을 받아 어떤 화면을 만드는지 본다.',
  'props로 부모가 자식에게 데이터를 보내는 흐름을 익힌다.',
];

const STARTER_CODE = `function ProfileCard(props) {
  return h('article', { class: 'profile-card' },
    h('h3', null, props.name),
    h('p', null, props.job)
  );
}

function App() {
  return h(ProfileCard, {
    name: '김정글',
    job: '프론트엔드 학습자',
  });
}`;

// ------------------------------------------------------------
// createComponentSection()
// ------------------------------------------------------------
// app.js에서 이 함수를 부르면 "컴포넌트 섹션 한 덩어리"가 만들어진다.
// 만들어진 DOM을 그대로 화면에 붙이면 된다.
// ------------------------------------------------------------
export function createComponentSection() {
  const section = document.createElement('section');
  section.id = 'component-section';
  section.className = 'panel-card learning-section';

  section.appendChild(createTitleBlock(
    '1. Component와 Props',
    'UI를 조립하는 가장 기본적인 단위를 먼저 익히는 섹션입니다.',
  ));

  section.appendChild(createListCard('이번 섹션에서 배울 것', LEARN_ITEMS));
  section.appendChild(createTextCard(
    '설명',
    '컴포넌트는 화면을 여러 조각으로 나눈 뒤, 필요한 곳에 다시 조립할 수 있게 해주는 작은 함수입니다. props는 부모 컴포넌트가 자식 컴포넌트에게 건네주는 정보 상자라고 생각하면 쉽습니다.',
  ));
  section.appendChild(createCodeCard('예제 코드 스텁', STARTER_CODE));
  section.appendChild(createPlaceholderCard(
    '직접 해보기 영역',
    '여기에 codePlayground.js를 연결해서 이름과 직업을 바꾸면 오른쪽 프리뷰가 바로 바뀌도록 만들 예정입니다.',
  ));
  section.appendChild(createPlaceholderCard(
    '체크포인트',
    '나중에는 "컴포넌트를 두 번 재사용해 같은 모양의 카드를 여러 장 찍어내기" 미션을 붙일 예정입니다.',
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

function createListCard(title, items) {
  const card = createCardShell(title);
  const list = document.createElement('ul');

  for (const item of items) {
    const li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
  }

  card.appendChild(list);
  return card;
}

function createTextCard(title, text) {
  const card = createCardShell(title);
  const body = document.createElement('p');
  body.textContent = text;
  card.appendChild(body);
  return card;
}

function createCodeCard(title, code) {
  const card = createCardShell(title);
  const pre = document.createElement('pre');
  const codeEl = document.createElement('code');

  codeEl.textContent = code;
  pre.appendChild(codeEl);
  card.appendChild(pre);
  return card;
}

function createPlaceholderCard(title, text) {
  const card = createCardShell(title);
  const body = document.createElement('p');

  // 이 문구를 보면 "아직 기능 연결 전이구나"를 바로 알 수 있다.
  body.textContent = `[STUB] ${text}`;

  card.appendChild(body);
  return card;
}

function createCardShell(title) {
  const article = document.createElement('article');
  const heading = document.createElement('h3');

  article.className = 'panel-card learning-subsection';
  heading.textContent = title;

  article.appendChild(heading);
  return article;
}
