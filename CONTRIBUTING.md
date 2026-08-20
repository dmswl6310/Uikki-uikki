# Contributing to Uikki

버그 수정과 접근성 개선, 새 컴포넌트 제안을 환영합니다.

## 개발 시작

Node.js 20 이상에서 저장소를 설치하고 개발 서버를 실행합니다.

```bash
npm ci
npm run dev
```

변경 전후에는 전체 검사를 실행해 주세요.

```bash
npm run check
```

## 컴포넌트 추가

스캐폴딩 명령으로 기본 구조를 만들 수 있습니다.

```bash
npm run generate ui/my-component
```

생성된 디렉터리에서 구현 파일, `meta.ts`, `examples.tsx`, `index.ts`를 완성합니다.

- 컴포넌트 Props는 명시적인 타입으로 작성합니다.
- 키보드 조작, 포커스 표시, ARIA 이름을 확인합니다.
- 기본 모드와 다크 모드를 모두 확인합니다.
- Playground에서 필요한 Props만 `propControls`에 선언합니다.
- CLI로도 배포할 항목은 `cli/index.js`의 `REGISTRY`에 추가하고 테스트를 보강합니다.

## Pull request

PR에는 해결한 문제, 주요 변경점, 확인 방법을 적어 주세요. UI가 달라졌다면 전후 화면이나 짧은 녹화를 함께 첨부해 주세요. 관련 없는 포매팅 변경은 가능한 한 분리해 주세요.

기여한 코드는 저장소의 [MIT License](./LICENSE)에 따라 배포됩니다.
