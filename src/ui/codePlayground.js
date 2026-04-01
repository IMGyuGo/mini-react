// ============================================================
// codePlayground.js — 코드 에디터 + 라이브 프리뷰
// ============================================================
//
// react.dev의 "Sandpack" 같은 인터랙티브 코드 편집기.
// 왼쪽에서 코드를 쓰면 오른쪽에서 결과를 바로 볼 수 있다.
//
// 생김새:
//   ┌────────────────────────┬────────────────────────┐
//   │   📝 코드 에디터        │   👁️ 라이브 프리뷰      │
//   │                        │                        │
//   │  function App() {      │  ┌──────────────────┐  │
//   │    return h('div',     │  │ 안녕하세요!        │  │
//   │      null,             │  │ 카운트: 0         │  │
//   │      '안녕하세요!'      │  │ [+1]             │  │
//   │    );                  │  └──────────────────┘  │
//   │  }                     │                        │
//   │                        │                        │
//   │  [▶ 실행]  [↺ 초기화]   │  [🔍 VDOM 보기]       │
//   └────────────────────────┴────────────────────────┘
//
// 사용자가 학습 중에 직접 코드를 수정하고 결과를 확인할 수 있어야
// "읽기만 하는 학습"이 아닌 "직접 해보는 학습"이 된다.
// ============================================================

// ------------------------------------------------------------
// createPlayground(options)
// ------------------------------------------------------------
// 코드 에디터 + 프리뷰 조합을 생성한다.
//
// [매개변수]
//   options = {
//     initialCode  — 에디터에 처음 표시할 코드 문자열
//     title        — 에디터 상단에 표시할 제목 (예: "Counter.js")
//     description  — 에디터 아래에 표시할 설명 텍스트
//     readOnly     — true면 코드 수정 불가 (시연용)
//     showVdom     — true면 VDOM 구조 보기 버튼 표시
//   }
//
// [반환값]
//   {
//     element    — 전체 playground DOM 요소 (페이지에 넣을 것)
//     editor     — 코드 에디터 textarea 요소
//     preview    — 프리뷰가 렌더링되는 div 요소
//     run()      — 현재 코드를 실행하는 함수
//     reset()    — 코드를 초기 상태로 되돌리는 함수
//     getCode()  — 현재 에디터의 코드를 가져오는 함수
//   }
//
// [사용 예시]
//   const pg = createPlayground({
//     initialCode: `function App() {\n  return h('p', null, '안녕!');\n}`,
//     title: 'App.js',
//   });
//   document.getElementById('section-1').appendChild(pg.element);
//   pg.run(); // 첫 실행
// ------------------------------------------------------------
export function createPlayground(options = {}) {
  // TODO: 구현하기

  // 1. 전체 컨테이너를 만든다
  //    <div class="playground">

  // 2. 에디터 패널을 만든다
  //    <div class="playground-editor">
  //      <div class="editor-header">파일 이름 탭</div>
  //      <textarea class="editor-textarea">코드</textarea>
  //      <div class="editor-actions">실행 버튼, 초기화 버튼</div>
  //    </div>

  // 3. 프리뷰 패널을 만든다
  //    <div class="playground-preview">
  //      <div class="preview-header">프리뷰</div>
  //      <div class="preview-container">결과가 여기에 렌더링됨</div>
  //    </div>

  // 4. 실행 버튼에 이벤트를 연결한다
  //    클릭 시 → run() 호출

  // 5. 반환 객체를 만든다
}

// ------------------------------------------------------------
// executeCode(code, previewContainer)
// ------------------------------------------------------------
// 에디터에 작성된 코드를 실행하고 결과를 프리뷰에 표시한다.
//
// [매개변수]
//   code              — 실행할 코드 문자열
//   previewContainer  — 결과를 렌더링할 DOM 요소
//
// [실행 방식]
//   1. previewContainer를 비운다
//   2. 코드를 new Function()으로 감싸서 실행한다
//   3. 코드 안에서 h, useState 등 프레임워크 함수를 사용할 수 있도록
//      이 함수들을 스코프에 주입한다
//   4. 에러가 발생하면 에러 메시지를 프리뷰에 표시한다
//
// [보안 참고]
//   new Function()은 eval()과 비슷하지만 스코프가 제한된다.
//   학습용이므로 사용하지만, 실제 서비스에서는 iframe sandbox 등을 사용한다.
// ------------------------------------------------------------
function executeCode(code, previewContainer) {
  // TODO: 구현하기

  // try {
  //   previewContainer.innerHTML = '';
  //
  //   // 프레임워크 함수들을 코드에서 쓸 수 있게 만든다
  //   const runnable = new Function(
  //     'h', 'useState', 'useEffect', 'useMemo', 'renderApp',
  //     code
  //   );
  //
  //   // 프레임워크 모듈에서 가져온 함수들을 넘겨준다
  //   runnable(h, useState, useEffect, useMemo, renderApp);
  //
  // } catch (error) {
  //   // 에러 발생 시 프리뷰에 에러 메시지를 표시
  //   showError(previewContainer, error);
  // }
}

// ------------------------------------------------------------
// showError(container, error)
// ------------------------------------------------------------
// 코드 실행 중 에러가 발생했을 때 사용자에게 보여주는 함수.
//
// 빨간 배경 박스 안에 에러 메시지를 표시한다.
// 사용자가 코드를 고칠 수 있도록 어떤 줄에서 에러가 났는지도 보여준다.
// ------------------------------------------------------------
function showError(container, error) {
  // TODO: 구현하기

  // container.innerHTML = `
  //   <div class="error-box">
  //     <strong>⚠️ 에러 발생!</strong>
  //     <pre>${error.message}</pre>
  //   </div>
  // `;
}

// ------------------------------------------------------------
// createEditorTextarea(initialCode, readOnly)
// ------------------------------------------------------------
// 코드 편집용 textarea를 만든다.
//
// [기능]
//   - Tab 키로 들여쓰기 (기본 동작인 포커스 이동을 막음)
//   - 줄 번호 표시 (선택)
//   - 코드 변경 시 자동 높이 조절
// ------------------------------------------------------------
function createEditorTextarea(initialCode, readOnly = false) {
  // TODO: 구현하기

  // 1. textarea 요소 생성
  // 2. initialCode를 값으로 설정
  // 3. Tab 키 이벤트 처리 (들여쓰기)
  // 4. readOnly 설정
}
