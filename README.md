# Uikki✦Uikki (위키위키) - React UI Component Gallery
[위키위키 사이트 바로가기](https://uikki.vercel.app/)

**Uikki✦Uikki**는 별도의 npm 의존성 패키지 설치 없이 코드를 복사하거나 터미널 명령어로 직접 쏙 빼서 쓸 수 있는, 가볍고 빠르며 무의존성(Zero-dependency)을 지향하는 React 기반 UI 컴포넌트 라이브러리/플레이그라운드입니다.

## 🚀 왜 Uikki인가요?

1. **무의존성 (Zero-dependency):** 복잡한 외부 라이브러리(Framer Motion 등) 없이 오직 React 상태(State)와 순수 CSS(Tailwind)만을 이용해 애니메이션과 로직을 모두 구현했습니다. 코드가 아주 가볍고 충돌할 일이 없습니다.
2. **다크 모드 완벽 지원:** 모든 컴포넌트가 Tailwind CSS v4를 기반으로 다크 모드 속성(`dark:`)을 내장하고 있습니다.
3. **직접 코드를 내 품으로:** 라이브러리를 `npm install`해서 블랙박스로 쓰는 게 아니라, 내 프로젝트의 `src` 폴더로 코드를 직접 가져와 입맛대로 수정할 수 있습니다. (shadcn/ui 방식)

---

## 💻 컴포넌트 추가 방법 (CLI)

Uikki가 제공하는 꿀기능! 터미널에서 아래 명령어 한 줄만 치면 깃허브에서 컴포넌트 코드를 실시간으로 다운받아 내 프로젝트의 `src/components/...` 폴더에 자동으로 만들어 줍니다.

```bash
# npx -y uikki add <컴포넌트명>
npx -y uikki add button
npx -y uikki add drawer
```

> **지원하는 컴포넌트 목록:** `button`, `input`, `card`, `avatar`, `badge`, `list`, `modal`, `toast`, `progress`, `toggle`, `accordion`, `tooltip`, `drawer`, `tabs`

---

## 🛠️ 개발 환경 설정 가이드

본 저장소를 로컬에서 실행하고 직접 컴포넌트를 추가해 보고 싶다면 아래 가이드를 따라주세요.

### 1. 설치 및 실행
```bash
git clone https://github.com/dmswl6310/Uikki-uikki.git
cd Uikki-uikki
npm install
npm run dev
```

### 2. 새 컴포넌트 만들기 (개발자용)
명령어 하나로 새로운 컴포넌트를 만들기 위한 `tsx`, `meta.ts`, `examples.tsx` 등 필수 뼈대 파일 4개를 1초 만에 자동 생성할 수 있습니다.
```bash
npm run generate ui/my-new-component
```

---

## 📚 주요 컴포넌트 하이라이트

- **Accordion (아코디언):** 상태 관리를 통해 부드럽게 펼쳐지는 메뉴
- **Drawer (드로워/시트):** 상하좌우 어디서든 부드럽게 미끄러져 들어오는 모달 패널
- **Tabs (탭 메뉴):** `line` 모드와 `pill` 모드를 지원하는 콘텐츠 전환 내비게이션
- **Tooltip (툴팁):** 마우스를 올렸을 때 추가 설명을 보여주는 예쁜 말풍선
- ... 기타 등등 (웹사이트의 플레이그라운드에서 직접 확인해 보세요!)

## 🤝 기여 (Contributing)
컴포넌트를 개선하거나 추가하고 싶다면 PR을 환영합니다! 모든 컴포넌트는 `src/data/components/...` 경로에 위치하고 있으며, Vite의 `import.meta.glob`를 통해 자동으로 갤러리 메인 화면에 반영됩니다.
