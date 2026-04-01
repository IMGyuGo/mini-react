// ============================================================
// layout.js — 학습 페이지의 바깥 뼈대를 만드는 파일
// ============================================================
//
// 앱 전체를 집으로 비유하면:
//   - 이 파일은 "방의 구조"를 만드는 설계도다.
//   - 각 섹션 파일은 그 방 안에 들어갈 책상, 의자, 칠판 같은 내용물이다.
//
// 그래서 이 파일은 "어떤 내용을 보여줄지"보다
// "어디에 보여줄지"를 먼저 준비하는 역할을 한다.
// ============================================================

// ------------------------------------------------------------
// createLayout(root)
// ------------------------------------------------------------
// index.html에 있는 #app 안에 학습 페이지의 큰 뼈대를 만든다.
//
// [구성]
//   1. 상단 소개 영역
//   2. 왼쪽 학습 순서 네비게이션
//   3. 오른쪽 실제 섹션이 들어갈 콘텐츠 영역
//
// [반환값]
//   이후 app.js가 쉽게 사용할 수 있도록
//   자주 쓰는 DOM 요소를 한 객체로 묶어서 돌려준다.
// ------------------------------------------------------------
export function createLayout(root) {
  root.innerHTML = `
    <main class="nexus-shell learning-shell">
      <header class="hero">
        <p class="eyebrow">Mini React Learning Page</p>
        <h1>React 핵심 개념 학습 페이지</h1>
        <p>
          Component, Props, State, Hooks, Virtual DOM을
          직접 보고 만지면서 배우는 학습용 서비스의 스텁 화면입니다.
        </p>
      </header>

      <section class="main-grid learning-grid">
        <aside class="panel-card learning-sidebar">
          <h2>학습 순서</h2>
          <p>왼쪽 메뉴는 나중에 현재 섹션 하이라이트와 진행률 표시로 확장할 예정입니다.</p>
          <nav id="learning-nav" aria-label="학습 섹션 목록"></nav>
        </aside>

        <section id="learning-content" class="learning-content" aria-live="polite"></section>
      </section>
    </main>
  `;

  return {
    nav: root.querySelector('#learning-nav'),
    content: root.querySelector('#learning-content'),
  };
}

// ------------------------------------------------------------
// renderSectionNavigation(nav, sections)
// ------------------------------------------------------------
// 학습 섹션 목록을 받아 왼쪽 메뉴를 만든다.
//
// [입력 예시]
//   [
//     { id: 'component-section', title: '1. Component란?' },
//     { id: 'hooks-section', title: '2. Hooks 배우기' },
//   ]
//
// 지금은 단순한 앵커 목록이지만,
// 나중에는 "현재 어디를 보고 있는지" 표시하는 기능도 붙일 수 있다.
// ------------------------------------------------------------
export function renderSectionNavigation(nav, sections) {
  const list = document.createElement('ol');
  list.className = 'learning-nav-list';

  for (const section of sections) {
    const item = document.createElement('li');
    const link = document.createElement('a');

    link.href = `#${section.id}`;
    link.textContent = section.title;

    item.appendChild(link);
    list.appendChild(item);
  }

  nav.replaceChildren(list);
}
