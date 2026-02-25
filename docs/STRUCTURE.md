# SaaS UI Component Library — 기능별 구조 정리

---

## 1. 앱 진입점 (Entry Point)

사용자가 웹사이트에 접속했을 때 가장 먼저 실행되는 파일들.

```
frontend/src/
├── main.tsx          # ReactDOM 렌더링 진입점 (StrictMode 적용)
├── App.tsx           # AppRouter를 렌더링하는 루트 컴포넌트
├── index.css         # Tailwind CSS + 커스텀 애니메이션 (shimmer, marquee, spin)
└── vite-env.d.ts     # Vite 타입 선언
```

**흐름:** `main.tsx` → `App.tsx` → `AppRouter` → `MainLayout` → 각 페이지

---

## 2. 라우팅 (Routing)

URL 경로에 따라 어떤 페이지를 보여줄지 결정.

```
frontend/src/router/
└── index.tsx         # react-router-dom의 createBrowserRouter 사용
```

| 경로 | 페이지 | 설명 |
|------|--------|------|
| `/` | HomePage | 메인 페이지 (히어로 + 추천 컴포넌트 + 카테고리) |
| `/explore` | ExplorePage | 전체 컴포넌트 탐색 (그리드 + 필터 + 검색) |
| `/explore/:category` | ExplorePage | 카테고리별 필터링된 탐색 |
| `/components/:slug` | DetailPage | 컴포넌트 상세 (라이브 프리뷰 + 코드 뷰어) |

모든 경로는 `MainLayout` 안에서 렌더링된다.

---

## 3. 레이아웃 (Layout)

모든 페이지에 공통으로 적용되는 뼈대 구조.

```
frontend/src/components/layout/
├── main-layout.tsx   # Navbar + <Outlet> + Toaster (모든 페이지의 공통 레이아웃)
├── navbar.tsx        # 상단 내비게이션 바 (로고, 탐색 링크, 검색, GitHub 링크)
└── root-layout.tsx   # <Outlet> + Toaster (현재 미사용, 예비)
```

### Navbar 주요 기능
- **로고:** `SaaS UI` 클릭 시 홈(`/`)으로 이동
- **네비게이션:** `탐색` 링크 → `/explore`
- **검색:** `⌘K` 단축키로 검색 모달 열기, 검색어 입력 시 `/explore?q=검색어`로 이동
- **GitHub 링크:** 외부 링크

---

## 4. 홈 페이지 기능 (Home)

사이트 첫 화면. 프로젝트 소개 + 컴포넌트 미리보기.

```
frontend/src/features/home/pages/
└── home-page.tsx     # 히어로 + Featured 그리드 + 카테고리 카드 + 푸터
```

### 구성 요소
| 섹션 | 설명 |
|------|------|
| Hero | 프로젝트 소개 타이틀, 컴포넌트 수 배지, `컴포넌트 탐색` CTA 버튼 |
| Featured | `is_featured=true`인 컴포넌트 최대 8개를 카드 그리드로 표시 |
| Categories | 7개 카테고리를 아이콘 + 설명이 포함된 카드로 표시 |
| Footer | 저작권 안내 |

### 데이터 흐름
1. 페이지 마운트 → `fetchCategories()` + `fetchComponents(null, 'featured')` 호출
2. Zustand 스토어에서 `categories`, `components` 가져옴
3. `components`에서 `is_featured` 필터링 → Featured 섹션 렌더링

---

## 5. 탐색 페이지 기능 (Explore)

모든 컴포넌트를 탐색하고 필터/검색/정렬하는 페이지.

```
frontend/src/features/explore/
├── pages/
│   └── explore-page.tsx        # 탐색 페이지 (FilterBar + ComponentGrid 조합)
└── components/
    ├── filter-bar.tsx           # 카테고리 필 + 정렬 버튼
    ├── component-grid.tsx       # 반응형 컴포넌트 카드 그리드 (1/2/3/4열)
    ├── component-card.tsx       # 개별 컴포넌트 카드 (썸네일 + 정보 + 통계)
    ├── component-preview.tsx    # 정적 SVG/CSS 기반 썸네일 (카드용)
    └── live-preview.tsx         # 실제 동작하는 라이브 데모 (상세 페이지용)
```

### 5-1. 카테고리 필터 (FilterBar)
- **All** + 7개 카테고리 필 버튼 (토글 방식)
- 정렬 옵션: `Featured` / `Newest` / `Popular`
- 카테고리 변경 시 → `setCategory(slug)` → Supabase 재조회

### 5-2. 컴포넌트 그리드 (ComponentGrid)
- 반응형 그리드: 모바일 1열, SM 2열, LG 3열, XL 4열
- 로딩 상태: Spinner 표시
- 빈 상태: "컴포넌트를 찾을 수 없습니다" 메시지

### 5-3. 컴포넌트 카드 (ComponentCard)
- **썸네일:** `ComponentPreview` (정적 SVG 이미지)
- **정보:** 이름, 설명 (2줄 제한), 작성자 (Avatar + 이름)
- **통계:** 좋아요 수, 조회수
- **태그:** 최대 3개 표시
- 전체 카드 클릭 → `/components/:slug` 상세 페이지로 이동

### 5-4. 정적 프리뷰 (ComponentPreview)
- 45개 컴포넌트 각각에 대한 SVG/CSS 기반 시각적 썸네일
- 카드 목록에서 빠른 미리보기 용도
- slug → JSX 매핑 테이블로 관리

### 5-5. 라이브 프리뷰 (LivePreview)
- 45개 컴포넌트를 실제 React 컴포넌트로 렌더링
- **상세 페이지에서만 사용** (카드에서는 정적 프리뷰 사용)
- 두 가지 모드: `compact` (카드용, 스케일 0.85) / `full` (상세 페이지용)
- 실제 UI 컴포넌트 30개 import + 합성 컴포넌트 15개 조합 렌더링
- 인터랙티브 상태 관리 (Toggle, Tabs, Pagination 등은 useState 사용)

---

## 6. 상세 페이지 기능 (Detail)

개별 컴포넌트의 라이브 데모 + 코드 확인 + 복사.

```
frontend/src/features/detail/
├── pages/
│   └── detail-page.tsx         # 상세 페이지 (LivePreview + Info + CodeViewer)
└── components/
    ├── component-info.tsx       # 컴포넌트 메타 정보 패널
    └── code-viewer.tsx          # 코드 탭 + 구문 강조 + 복사 버튼
```

### 6-1. 상세 페이지 (DetailPage)
- **구조:** 뒤로가기 → 라이브 프리뷰 (전폭) → 2단 레이아웃 (정보 2:코드 3)
- 페이지 진입 시 → `fetchComponentBySlug(slug)` + `incrementViewCount(id)`

### 6-2. 컴포넌트 정보 (ComponentInfo)
| 항목 | 설명 |
|------|------|
| 제목/설명 | 컴포넌트 이름 (h1) + 설명 |
| 작성자 | Avatar + 이름 + 작성일 |
| 통계 | 조회수, 좋아요 수 |
| 카테고리 | Badge로 표시, 클릭 시 해당 카테고리 탐색 페이지로 이동 |
| 태그 | 모든 태그 필 형태로 표시 |
| 프레임워크 | React 표시 |

### 6-3. 코드 뷰어 (CodeViewer)
- **탭:** `Usage Example` / `Full Source` 전환
- **구문 강조:** `prism-react-renderer` (oneLight 테마)
- **복사 버튼:** `navigator.clipboard.writeText()` → 2초간 "복사됨" 표시
- 최대 높이 600px, 스크롤 가능

---

## 7. 검색 기능 (Search)

컴포넌트를 이름/설명으로 Full-text 검색.

**관련 파일:**
- `navbar.tsx` — 검색 모달 UI
- `component-store.ts` — `searchComponents()` 함수
- Supabase RPC — `search_components(search_query)` 함수

### 검색 흐름
1. Navbar에서 `⌘K` 또는 검색 버튼 클릭 → 모달 오픈
2. 검색어 입력 후 Enter → `searchComponents(query)` 호출
3. Supabase `search_components` RPC 실행 (tsvector 기반 FTS)
4. `/explore?q=검색어`로 네비게이션
5. ExplorePage에서 검색 결과 그리드 표시

---

## 8. 상태 관리 (State Management)

전역 상태를 Zustand로 관리.

```
frontend/src/stores/
└── component-store.ts   # Zustand 스토어
```

### 상태값
| 상태 | 타입 | 설명 |
|------|------|------|
| `categories` | Category[] | 7개 카테고리 목록 |
| `components` | ComponentItem[] | 현재 표시 중인 컴포넌트 목록 |
| `currentComponent` | ComponentItem \| null | 상세 페이지에서 보고 있는 컴포넌트 |
| `isLoading` | boolean | 데이터 로딩 상태 |
| `selectedCategory` | string \| null | 선택된 카테고리 slug |
| `sortBy` | SortOption | 정렬 기준 (featured/newest/popular) |
| `searchQuery` | string | 현재 검색어 |

### 액션 함수
| 함수 | 설명 |
|------|------|
| `fetchCategories()` | Supabase에서 카테고리 목록 조회 (sort_order 정렬) |
| `fetchComponents(categorySlug?, sort?)` | 컴포넌트 목록 조회 (카테고리/정렬 필터 적용) |
| `fetchComponentBySlug(slug)` | 단일 컴포넌트 상세 조회 (카테고리 조인) |
| `searchComponents(query)` | FTS 검색 (Supabase RPC) |
| `setCategory(slug)` | 카테고리 변경 → 자동 재조회 |
| `setSortBy(sort)` | 정렬 변경 → 자동 재조회 |
| `setSearchQuery(query)` | 검색어 상태만 업데이트 |
| `incrementViewCount(id)` | 조회수 +1 (Supabase RPC) |

---

## 9. 데이터 연결 (Supabase)

Supabase PostgreSQL에 연결하여 데이터를 읽어오는 계층.

```
frontend/src/lib/
├── supabase.ts      # Supabase 클라이언트 생성 (환경변수에서 URL/Key 읽기)
└── utils.ts         # cn() — clsx + tailwind-merge 유틸리티
```

### 환경변수
| 변수 | 설명 |
|------|------|
| `VITE_SUPABASE_URL` | Supabase 프로젝트 REST API URL |
| `VITE_SUPABASE_ANON_KEY` | 공개 API 키 (읽기 전용, RLS로 보호) |

### DB 테이블
| 테이블 | 레코드 수 | 용도 |
|--------|-----------|------|
| `categories` | 7 | 카테고리 (UI Components, Data Display, Navigation, Forms, Layouts, Page Templates, Feedback) |
| `components` | 45 | 컴포넌트 정보 (이름, 코드, 사용법, 태그, 통계) |

### RPC 함수
| 함수 | 설명 |
|------|------|
| `search_components(search_query)` | tsvector 기반 Full-text Search, 관련도순 정렬 |
| `increment_view_count(component_id)` | 조회수 +1 |

### RLS 정책
- `categories`: 모든 사용자 SELECT 허용
- `components`: 모든 사용자 SELECT 허용

---

## 10. 타입 정의 (Types)

TypeScript 타입을 별도 파일로 관리.

```
frontend/src/types/
├── component.ts     # 프론트엔드 타입 정의
├── database.ts      # Supabase 자동생성 Database 타입
└── user.ts          # 사용자 타입 (Phase 2 용, 현재 미사용)
```

### 주요 타입 (component.ts)
| 타입 | 설명 |
|------|------|
| `Category` | id, name, slug, description, icon, sort_order, created_at |
| `ComponentItem` | id, name, slug, description, code, usage_code, tags, 통계, category 등 |
| `SortOption` | `'featured' \| 'newest' \| 'popular'` |
| `ComponentFilters` | category, search, sort 조합 |

---

## 11. UI 컴포넌트 (UI Components)

재사용 가능한 30개 UI 컴포넌트. 각 파일은 독립적으로 사용 가능.

```
frontend/src/components/ui/   # 30개 파일
```

### 기본 UI (21개)
| 파일 | 컴포넌트 | 주요 기능 |
|------|----------|-----------|
| `button.tsx` | Button | 5 variant (primary/secondary/outline/ghost/danger), 3 size |
| `input.tsx` | Input | label, error 메시지, forwardRef |
| `card.tsx` | Card, CardHeader, CardTitle, CardContent | 합성 패턴 카드 |
| `badge.tsx` | Badge | 4 variant (default/success/warning/danger) |
| `avatar.tsx` | Avatar | 이름 이니셜 폴백, 3 size |
| `spinner.tsx` | Spinner | 로딩 애니메이션, 3 size |
| `modal.tsx` | Modal, ModalHeader, ModalContent, ModalFooter | 오버레이 모달, ESC 닫기 |
| `dropdown.tsx` | Dropdown, DropdownTrigger, DropdownMenu, DropdownItem | 클릭 토글 드롭다운 |
| `tabs.tsx` | Tabs, TabList, Tab, TabPanel | 탭 전환 UI |
| `toggle.tsx` | Toggle | On/Off 토글 스위치, 2 size |
| `select.tsx` | Select | 옵션 목록 선택, label, error |
| `textarea.tsx` | Textarea | 다중 행 입력, label, error |
| `alert.tsx` | Alert | 4 variant (info/success/warning/error), 닫기 버튼 |
| `tooltip.tsx` | Tooltip | 4 position (top/bottom/left/right), 호버 표시 |
| `pagination.tsx` | Pagination | 페이지 이동, currentPage, totalPages |
| `search-input.tsx` | SearchInput | 검색 아이콘 + 입력 + 클리어 버튼 |
| `file-upload.tsx` | FileUpload | 드래그&드롭, 파일 선택, 사이즈 제한 |
| `table.tsx` | Table, TableHeader, TableBody, TableRow, TableHead, TableCell | HTML 테이블 래퍼 |
| `breadcrumbs.tsx` | Breadcrumbs | 경로 탐색, items 배열 |
| `empty-state.tsx` | EmptyState | 빈 화면 안내, icon + title + description + action |
| `stats-card.tsx` | StatsCard | 통계 카드, value + change + changeType |

### 트렌디 컴포넌트 (9개)
| 파일 | 컴포넌트 | 특징 |
|------|----------|------|
| `gradient-button.tsx` | GradientButton | 4 gradient variants + glow shadow |
| `shimmer-button.tsx` | ShimmerButton | shimmer 애니메이션 + 어두운 배경 |
| `glass-card.tsx` | GlassCard | glassmorphism + backdrop-blur |
| `spotlight-card.tsx` | SpotlightCard | 마우스 따라다니는 spotlight 효과 |
| `bento-grid.tsx` | BentoGrid, BentoItem | 비대칭 그리드 + gradient overlay |
| `animated-counter.tsx` | AnimatedCounter | requestAnimationFrame 카운트업 |
| `marquee.tsx` | Marquee | 무한 스크롤 + mask-image 페이드 |
| `animated-border.tsx` | AnimatedBorder | 회전 gradient 테두리 + blur glow |
| `interactive-showcase.tsx` | InteractiveShowcase | SVG clip-path 마스크 3종 전환 |

---

## 12. 공유 컴포넌트 (Shared)

여러 기능에서 공통으로 사용하는 컴포넌트.

```
frontend/src/components/shared/
└── code-block.tsx    # prism-react-renderer 기반 코드 구문 강조
```

### CodeBlock
- `prism-react-renderer`의 `Highlight` 사용
- oneLight 테마, 라인 넘버 표시
- `code-viewer.tsx`에서 사용

---

## 13. 빌드 & 설정 (Config)

```
frontend/
├── package.json          # 의존성 + 스크립트 (dev, build, preview, lint)
├── vite.config.ts        # Vite 설정 (포트 3002, @/ alias)
├── tailwind.config.ts    # Tailwind 설정 (primary 커스텀 컬러)
├── tsconfig.json         # TypeScript 설정
├── postcss.config.js     # PostCSS (Tailwind + Autoprefixer)
└── public/
    └── _redirects        # Netlify SPA 라우팅 (/* → /index.html 200)
```

### 주요 의존성
| 패키지 | 용도 |
|--------|------|
| `react` + `react-dom` | UI 프레임워크 |
| `react-router-dom` | 클라이언트 사이드 라우팅 |
| `@supabase/supabase-js` | Supabase DB 연결 |
| `zustand` | 전역 상태 관리 |
| `prism-react-renderer` | 코드 구문 강조 |
| `lucide-react` | 아이콘 라이브러리 |
| `sonner` | 토스트 알림 |
| `clsx` + `tailwind-merge` | 조건부 CSS 클래스 병합 |

### 커맨드
| 명령 | 설명 |
|------|------|
| `cd frontend && npm run dev` | 개발 서버 (port 3002) |
| `cd frontend && npm run build` | 프로덕션 빌드 (tsc + vite build) |
| `cd frontend && npx tsc --noEmit` | 타입 체크만 |

---

## 기능별 데이터 흐름 요약

```
[사용자 접속]
     │
     ▼
  main.tsx → App.tsx → AppRouter
     │
     ▼
  MainLayout (Navbar + Toaster)
     │
     ├── / ──────────── HomePage
     │                    ├── fetchCategories()
     │                    ├── fetchComponents(null, 'featured')
     │                    └── 카드 클릭 → /components/:slug
     │
     ├── /explore ───── ExplorePage
     │                    ├── FilterBar (카테고리 필 + 정렬)
     │                    ├── ComponentGrid → ComponentCard
     │                    │                    └── ComponentPreview (정적 SVG)
     │                    └── 카드 클릭 → /components/:slug
     │
     └── /components/:slug ── DetailPage
                               ├── LivePreview (실제 동작하는 데모)
                               ├── ComponentInfo (메타 정보)
                               ├── CodeViewer (코드 탭 + 복사)
                               └── incrementViewCount()

[Zustand Store]
     │
     ▼
  Supabase REST API
     │
     ▼
  PostgreSQL (categories + components 테이블)
```
