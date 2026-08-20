# Uikki CLI

[Uikki Playground](https://uikki.vercel.app/)에서 확인한 React 컴포넌트의 원본 소스를 현재 프로젝트에 추가하는 CLI입니다. 설치 없이 `npx`로 실행할 수 있습니다.

## 요구사항

- Node.js 18 이상
- React 프로젝트
- Tailwind CSS v4

## 사용법

```bash
npx -y uikki list
npx -y uikki add button
npx -y uikki add ui/drawer
npx -y uikki add blocks/data-table
npx -y uikki add templates/admin-dashboard
```

UI 항목은 `ui/`를 생략할 수 있습니다. 출력 경로는 다음과 같습니다.

```text
src/components/ui/Button.tsx
src/components/blocks/NewsletterCta.tsx
src/components/templates/CheckoutPage.tsx
```

Block이나 Template이 다른 Uikki UI를 사용하면 필요한 파일도 함께 설치합니다. 이미 존재하는 파일은 자동으로 덮어쓰지 않습니다.

```bash
# 기존 파일을 의도적으로 교체할 때만 사용
npx -y uikki add button --force
```

## 지원 항목

- UI: `accordion`, `avatar`, `badge`, `button`, `card`, `checkbox`, `drawer`, `dropdown-menu`, `input`, `list`, `modal`, `progress`, `radio-group`, `select`, `skeleton`, `tabs`, `toast`, `toggle`, `tooltip`
- Blocks: `data-table`, `newsletter-cta`
- Templates: `admin-dashboard`, `checkout-page`

## 동작과 안전장치

- 허용 목록에 있는 컴포넌트만 설치합니다.
- 입력값과 최종 출력 경로를 검증해 경로 이탈을 막습니다.
- GitHub의 Uikki `main` 브랜치에서 원본을 내려받습니다.
- 요청 제한 시간과 최대 리다이렉트 횟수를 적용합니다.
- 갤러리 내부의 `Custom` 접두사와 import 경로를 소비자 프로젝트용으로 변환합니다.

컴포넌트 미리보기와 Props 조작은 [Uikki Playground](https://uikki.vercel.app/components)에서 확인할 수 있습니다. 소스와 이슈는 [GitHub 저장소](https://github.com/dmswl6310/Uikki-uikki)에서 관리합니다.
