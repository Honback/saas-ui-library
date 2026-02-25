# SaaS UI Component Library

21st.dev 스타일의 커뮤니티 UI 컴포넌트 라이브러리.
React + Tailwind CSS 기반 컴포넌트를 브라우징하고, 코드를 복사해서 바로 사용할 수 있습니다.

**Live Demo:** [https://saasui.netlify.app](https://saasui.netlify.app)

---

## 주요 기능

- **45개 컴포넌트** — 버튼, 카드, 모달 등 기본 UI부터 Gradient Button, Glass Card, Bento Grid 등 트렌디한 컴포넌트까지
- **라이브 프리뷰** — 상세 페이지에서 실제 동작하는 인터랙티브 컴포넌트 확인
- **코드 복사** — Usage Example / Full Source 코드를 한 클릭으로 복사
- **카테고리 필터** — UI Components, Data Display, Navigation, Forms, Layouts, Page Templates, Feedback
- **검색** — 컴포넌트 이름/설명 Full-text 검색
- **정렬** — Featured / Newest / Popular 순 정렬

## 스크린샷

| 홈 | 탐색 | 상세 (라이브 프리뷰) |
|:---:|:---:|:---:|
| `/` | `/explore` | `/components/:slug` |

---

## 기술 스택

| 영역 | 기술 |
|------|------|
| Frontend | React 18, Vite 6, TypeScript |
| Styling | Tailwind CSS |
| State | Zustand |
| Backend / DB | Supabase (PostgreSQL + REST API + RLS) |
| Code Highlight | prism-react-renderer |
| Toast | Sonner |
| Deployment | Netlify |

---

## 프로젝트 구조

```
frontend/src/
├── lib/
│   ├── supabase.ts              # Supabase 클라이언트
│   └── utils.ts                 # cn() 유틸리티
├── stores/
│   └── component-store.ts       # Zustand 상태 관리
├── types/
│   ├── component.ts             # ComponentItem, Category 타입
│   └── database.ts              # Supabase Database 타입
├── components/
│   ├── ui/                      # 30개 UI 컴포넌트
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── gradient-button.tsx
│   │   ├── glass-card.tsx
│   │   ├── spotlight-card.tsx
│   │   ├── bento-grid.tsx
│   │   ├── animated-counter.tsx
│   │   ├── shimmer-button.tsx
│   │   ├── marquee.tsx
│   │   ├── animated-border.tsx
│   │   ├── interactive-showcase.tsx
│   │   └── ... (19개 더)
│   ├── shared/
│   │   └── code-block.tsx       # 코드 구문 강조
│   └── layout/
│       ├── root-layout.tsx
│       ├── main-layout.tsx      # Navbar + Outlet + Toaster
│       └── navbar.tsx           # 로고, 검색(Cmd+K), 네비게이션
├── features/
│   ├── home/pages/
│   │   └── home-page.tsx        # 히어로 + Featured + 카테고리
│   ├── explore/
│   │   ├── pages/
│   │   │   └── explore-page.tsx # 그리드 + 필터 + 검색
│   │   └── components/
│   │       ├── component-card.tsx
│   │       ├── component-grid.tsx
│   │       ├── component-preview.tsx  # 정적 SVG 썸네일
│   │       ├── live-preview.tsx       # 45개 라이브 데모
│   │       └── filter-bar.tsx
│   └── detail/
│       ├── pages/
│       │   └── detail-page.tsx  # 라이브 프리뷰 + 코드 뷰어
│       └── components/
│           ├── code-viewer.tsx
│           └── component-info.tsx
└── router/
    └── index.tsx                # 라우트 정의
```

---

## 컴포넌트 목록

### 기본 UI (21개)
Button, Input, Card, Badge, Avatar, Spinner, Modal, Dropdown, Tabs, Toggle, Select, Textarea, Alert, Tooltip, Pagination, Search Input, File Upload, Table, Stats Card, Empty State, Breadcrumbs

### 트렌디 컴포넌트 (9개)
Gradient Button, Shimmer Button, Glass Card, Spotlight Card, Bento Grid, Animated Counter, Marquee, Animated Border, Interactive Showcase

### 합성 컴포넌트 (15개)
List, Sidebar, Topbar, Tab Bar, Login Form, Signup Form, Settings Form, Auth Layout, Dashboard Layout, Landing Page, Dashboard Page, Settings Page, Toast, Loading States, Error States

---

## 시작하기

### 요구사항
- Node.js 18+
- npm 9+

### 설치 및 실행

```bash
# 클론
git clone https://github.com/Honback/saas-ui-library.git
cd saas-ui-library/frontend

# 의존성 설치
npm install

# 환경변수 설정
cp .env.example .env
# .env 파일에 Supabase URL과 Anon Key 입력

# 개발 서버 시작
npm run dev
```

브라우저에서 `http://localhost:3002` 접속

### 빌드

```bash
npm run build    # dist/ 폴더에 프로덕션 빌드 생성
```

---

## 환경변수

| 변수 | 설명 |
|------|------|
| `VITE_SUPABASE_URL` | Supabase 프로젝트 URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase 공개 API 키 (anon key) |

---

## 데이터베이스

Supabase PostgreSQL에 2개 테이블:

**categories** (7개)
- UI Components, Data Display, Navigation, Forms, Layouts, Page Templates, Feedback

**components** (45개)
- name, slug, description, code, usage_code, category_id
- tags, framework, likes_count, views_count, is_featured

RLS (Row Level Security)로 공개 읽기 허용. RPC 함수:
- `search_components(search_query)` — Full-text 검색
- `increment_view_count(component_id)` — 조회수 증가

---

## 배포

Netlify에 GitHub 레포 연결:

| 설정 | 값 |
|------|-----|
| Base directory | `frontend` |
| Build command | `npm run build` |
| Publish directory | `frontend/dist` |

환경변수 `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`를 Netlify Environment variables에 추가.

---

## 라이선스

MIT
