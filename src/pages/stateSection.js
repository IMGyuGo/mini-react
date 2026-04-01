// ============================================================
// stateSection.js — 섹션 5 스텁
// ============================================================
//
// 이 파일은 "Lifting State Up"을 설명하는 부분의 뼈대다.
// 어려운 말을 쉽게 바꾸면:
//   "같이 써야 하는 값은 위쪽에서 같이 관리하자"라는 뜻이다.
// ============================================================

const LIFTING_STEPS = [
  '둘 이상의 자식이 같은 값을 써야 하는지 먼저 확인한다.',
  '같이 써야 한다면 그 값을 부모 컴포넌트로 올린다.',
  '부모가 props로 값을 내려주고, 변경 함수도 함께 내려준다.',
];

const TEMPERATURE_EXAMPLE = `function App() {
  const [temperature, setTemperature] = useState('');

  return h('section', null,
    h(TemperatureInput, {
      label: '섭씨',
      value: temperature,
      onChange: setTemperature,
    }),
    h(ResultCard, { value: temperature })
  );
}`;

export function createStateSection() {
  const section = document.createElement('section');
  section.id = 'state-section';
  section.className = 'panel-card learning-section';

  section.appendChild(createHeader(
    '3. State 위치 올리기',
    '여러 컴포넌트가 같은 데이터를 같이 써야 할 때 상태를 어디에 두면 좋은지 배우는 섹션입니다.',
  ));

  section.appendChild(createParagraphCard(
    '핵심 개념',
    '형제 컴포넌트끼리는 직접 대화하지 않고, 부모를 통해 같은 데이터를 나눠 갖는 것이 더 안전합니다. 그래서 state를 부모 쪽으로 올리는 패턴을 자주 씁니다.',
  ));
  section.appendChild(createListCard('실행 순서', LIFTING_STEPS));
  section.appendChild(createCodeCard('온도 변환기 예제 스텁', TEMPERATURE_EXAMPLE));
  section.appendChild(createParagraphCard(
    '나중에 붙일 기능',
    '[STUB] 한쪽 입력창을 바꾸면 다른 카드와 결과 카드가 함께 바뀌는 데모를 붙일 예정입니다.',
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

function createParagraphCard(title, text) {
  const article = createCardShell(title);
  const paragraph = document.createElement('p');

  paragraph.textContent = text;
  article.appendChild(paragraph);

  return article;
}

function createListCard(title, items) {
  const article = createCardShell(title);
  const list = document.createElement('ol');

  for (const item of items) {
    const li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
  }

  article.appendChild(list);
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
