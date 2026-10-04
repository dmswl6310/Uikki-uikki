# Uikki CLI

[Uikki Playground](https://uikki.vercel.app/)에서 확인한 React 컴포넌트의 구현 소스를 프로젝트에 추가하는 CLI입니다. `npx`로 실행하고, 내려받은 파일을 직접 수정해 사용할 수 있습니다.

## 요구사항

- Node.js 18 이상
- React와 Tailwind CSS v4가 설정된 프로젝트
- GitHub 원본을 다운로드할 수 있는 인터넷 연결

CLI는 React·Tailwind나 npm 의존 패키지를 설치하지 않습니다. 생성된 파일의 클래스를 Tailwind가 스캔하도록 프로젝트를 설정하세요.

## 빠른 시작

프로젝트 루트에서 실행합니다.

```bash
npx -y uikki@latest list
npx -y uikki@latest add button
```

`src/components/ui/Button.tsx`가 생성됩니다. 프로젝트 루트의 `App.tsx`에서 사용하는 예시는 다음과 같습니다. 실제 파일 위치에 맞게 import 경로를 조정하세요.

```tsx
import { Button } from "./src/components/ui/Button";

export default function App() {
  return <Button label="시작하기" />;
}
```

## 명령

```bash
npx -y uikki@latest --help
npx -y uikki@latest --version
npx -y uikki@latest list
npx -y uikki@latest add ui/drawer
npx -y uikki@latest add blocks/data-table
npx -y uikki@latest add templates/admin-dashboard
```

UI 항목은 `ui/`를 생략할 수 있습니다. Block과 Template은 카테고리를 함께 입력하세요. 출력 경로는 현재 작업 폴더를 기준으로 `src/components/<category>/<PascalCaseName>.tsx`입니다.

```text
src/components/ui/Drawer.tsx
src/components/blocks/DataTable.tsx
src/components/templates/AdminDashboard.tsx
```

## 의존 컴포넌트와 기존 파일

Block이나 Template에서 사용하는 Uikki 컴포넌트 소스도 함께 설치합니다. 예를 들어 `blocks/data-table`은 `ui/dropdown-menu`를 함께 추가합니다. 이는 소스 파일 설치이며 npm 패키지 설치는 아닙니다.

- 직접 요청한 파일이 이미 있으면 오류로 종료합니다.
- 이미 존재하는 의존 파일은 건너뛰어 기존 내용을 유지합니다.
- `--force`를 사용하면 요청한 파일과 함께 설치되는 의존 파일도 덮어씁니다.

```bash
# 기존 파일을 교체할 때 사용
npx -y uikki@latest add button --force
```

파일은 의존 컴포넌트부터 순서대로 저장합니다. 오류로 중단되면 일부 파일이 이미 생성되어 있을 수 있으며, 설치 전체를 되돌리는 기능은 없습니다.

## 지원 항목

| 분류 | 항목 |
| --- | --- |
| UI | `accordion`, `avatar`, `badge`, `button`, `card`, `checkbox`, `drawer`, `dropdown-menu`, `input`, `list`, `modal`, `progress`, `radio-group`, `select`, `skeleton`, `tabs`, `toast`, `toggle`, `tooltip` |
| Blocks | `data-table`, `newsletter-cta` |
| Templates | `admin-dashboard`, `checkout-page` |

## 소스 다운로드 방식

- 허용 목록에 등록된 컴포넌트만 설치합니다.
- 입력값과 최종 출력 경로를 검증합니다.
- GitHub의 Uikki `main` 브랜치에서 원본을 내려받습니다.
- 다운로드 제한 시간과 최대 리다이렉트 횟수를 적용합니다.
- 갤러리 내부의 `Custom` 접두사를 제거하고 내부 import 경로를 프로젝트용 상대 경로로 변환합니다.

CLI 버전을 고정해도 다운로드되는 컴포넌트 소스까지 특정 커밋에 고정되지는 않습니다. 가져온 소스의 변경 이력은 사용하는 프로젝트의 Git으로 관리하세요.

## 링크

[Playground](https://uikki.vercel.app/components)에서 컴포넌트 미리보기와 Props를 확인할 수 있습니다. 소스와 이슈는 [GitHub 저장소](https://github.com/dmswl6310/Uikki-uikki)에서 관리합니다.

[MIT License](./LICENSE)
