# Running Log

React를 학습하며 만든 러닝 기록 SPA입니다. 러닝 기록을 등록·조회·수정·삭제하고 평균 케이던스를 기준으로 추천 음악 BPM 범위를 확인합니다.

- 저장소: [yhana972/B1-2](https://github.com/yhana972/B1-2)
- 앱 소스 위치: 저장소의 `running-log/`
- 배포 URL: [Running Log](https://b1-2-flame.vercel.app/)
- 배포 실행 증거: [CRUD 수행 로그와 화면 캡처 3장](docs/deployment-verification.md)
- 평가 설명: [질문 16개에 대한 학습·설명 Wiki](https://github.com/yhana972/B1-2/wiki/B1-2-Learning-Guide)
- 평가 보완: [15개 피드백별 대응 위치](docs/evaluation-followup.md)

## 주요 기능

- 날짜 내림차순으로 러닝 기록 목록 조회
- 카드 클릭으로 개별 기록 상세 조회
- 기록 작성·수정 및 필수값 검증, 필드별 오류 표시
- 제출 중 버튼 비활성화와 저장 실패 메시지 표시
- 확인 창을 거친 삭제, 삭제 중 상태와 실패 메시지 표시
- 평균 케이던스 기반 추천 음악 BPM 표시
- 공통 로딩·오류·빈 상태 UI 및 Not Found 페이지

추천 범위는 `평균 케이던스 - 5 ~ 평균 케이던스 + 5 BPM`입니다. 케이던스가 172 spm이면 167 ~ 177 BPM을 표시합니다. 실제 음악 API는 연동하지 않았습니다.

## 기술 스택

React 19, Vite 8, JavaScript, React Router, Supabase, ESLint, CSS

## 로컬 실행

Node.js와 npm이 필요합니다. 개발 시 확인한 환경은 Node.js 24와 npm 11입니다.

```powershell
git clone https://github.com/yhana972/B1-2.git
cd B1-2/running-log
npm.cmd ci
```

이후 명령은 모두 `package.json`이 있는 `running-log` 폴더에서 실행합니다. Windows PowerShell에서는 `npm.cmd`를 사용하면 npm 스크립트 실행 정책 문제를 피할 수 있습니다. 다른 셸에서는 `npm`을 사용해도 됩니다.

### 환경변수

`running-log/.env.local` 파일을 만들고 본인 Supabase 프로젝트의 값을 설정합니다.

```dotenv
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

위 값은 예시입니다. 실제 환경변수 파일은 Git에 올리지 않습니다. `.gitignore`에는 `.env`와 `.env.local`이 포함되어 있습니다. 브라우저용 publishable key를 사용하며 secret key나 service role key는 넣지 않습니다. `VITE_` 환경변수는 브라우저 빌드에 포함되므로 데이터 접근 범위는 RLS 정책으로 제어합니다.

Supabase 테이블과 정책도 아래 설명에 맞게 준비한 후 실행합니다.

```powershell
npm.cmd run dev
```

터미널의 Local 주소로 접속합니다. 기본 주소는 `http://localhost:5173`이며 포트 사용 여부에 따라 달라질 수 있습니다. 종료는 `Ctrl + C`입니다. 환경변수를 변경하면 개발 서버를 다시 실행합니다.

### 검증 및 빌드

```powershell
npm.cmd run lint
npm.cmd run build
npm.cmd run preview
```

`build`는 `dist/`에 배포용 파일을 생성합니다. `preview`는 빌드 결과를 로컬에서 확인하는 서버를 실행하며, 접속 주소는 터미널에 표시됩니다.

## 페이지와 라우팅

| 경로 | 화면 |
| --- | --- |
| `/` | 홈 |
| `/runs` | 러닝 기록 목록 |
| `/runs/new` | 새 기록 작성 |
| `/runs/:id` | 기록 상세 및 BPM 추천 |
| `/runs/:id/edit` | 기록 수정 |
| 그 외 경로 | Not Found |

존재하지 않는 기록 ID는 상세·수정 화면에서 기록 없음으로 처리하고, 등록되지 않은 페이지 경로는 Not Found로 처리합니다.

## 프로젝트 구조와 역할

```text
src/
├── components/   # RunForm.jsx, FormField.jsx, RunCard.jsx 등 재사용 UI
├── hooks/        # useRun.js: 단건 조회 Hook
├── lib/          # supabaseClient.js: Supabase 연결
├── pages/        # RunListPage.jsx, RunDetailPage.jsx, RunEditPage.jsx 등
├── App.jsx       # 라우트 구성
├── App.css
├── main.jsx      # React 진입점과 BrowserRouter
└── index.css
```

### 재사용 컴포넌트

| 컴포넌트 | 주요 props와 역할 | 사용하는 상황 |
| --- | --- | --- |
| Layout | children으로 받은 페이지에 공통 헤더 적용 | 모든 라우트의 공통 틀 |
| RunCard | id와 기록 데이터로 카드 표시 및 상세 이동 | 목록의 각 기록과 상세 기록 표시 |
| RunForm | initialData와 mode에 따라 작성·수정 폼 구성 | 새 기록 작성 및 기존 기록 편집 |
| FormField | 입력 속성, 값, 변경 함수, 오류, step으로 입력 UI 구성 | 폼의 날짜·거리·시간·페이스·케이던스 입력 |
| SubmitButton | isSubmitting과 label로 문구·비활성화 제어 | 작성·수정 폼 제출 |
| Loading | message로 로딩 안내 | 조회 응답을 기다리는 동안 |
| ErrorState | message로 오류 안내, role="alert" 사용 | 조회·저장·삭제 요청 실패 |
| EmptyState | message로 빈 상태 안내 | 요청은 성공했지만 목록이 비었거나 기록이 없을 때 |

위 8개는 props에 따라 내용이나 동작이 달라집니다. Header와 Navigation은 공통 화면 구조를 담당합니다.

### 상태와 데이터 흐름

`useRun(id)`는 상세·수정 페이지에서 반복하던 단건 조회와 상태 처리를 공유하기 위해 분리했습니다. 페이지는 화면 구성을, Hook은 조회를 담당하며 `{ run, loading, error }`를 반환합니다. 각 호출은 독립적인 state를 갖습니다.

```jsx
// RunDetailPage와 RunEditPage에서 같은 조회 로직 사용
const { id } = useParams()
const { run, loading, error } = useRun(id)
```

Effect의 의존성은 `[id]`입니다. 최초 실행 및 ID 변경 후 새 요청을 시작할 때 `loading=true`, `error=''`, `run=null`로 초기화합니다. ID 변경 시 이전 Effect의 cleanup에서 `ignore=true`로 바꿔 늦은 응답이 새 기록을 덮어쓰지 않게 합니다. 이는 요청 취소가 아니라 결과 무시입니다. 목록 조회는 RunListPage의 빈 의존성 배열 `[]`을 사용하며, 페이지가 마운트될 때 실행됩니다.

폼은 formData로 입력값을 관리합니다. 필수값 검증을 통과하면 DB 컬럼명에 맞는 recordData를 만들어 작성 모드에서는 INSERT, 수정 모드에서는 ID 조건을 지정한 UPDATE를 실행합니다. 수정·삭제 결과가 0개면 실패로 처리합니다. 성공 후 목록 또는 상세 페이지로 이동합니다.

#### props와 state의 위치

RunForm은 `formData`, `errors`, `isSubmitting`, `submitError`를 관리하고, 자식 FormField에는 `value`와 `onChange`를 props로 전달합니다. FormField가 입력 이벤트를 전달하면 부모의 handleChange가 state를 바꿔 새 값을 다시 내려줍니다.

```jsx
// RunForm: 입력값과 변경 함수를 자식에게 전달
<FormField name="distance" value={formData.distance} onChange={handleChange} />
// RunEditPage: 조회한 기록과 모드를 폼에 전달
<RunForm initialData={run} mode="edit" />
```

목록 데이터는 RunListPage, 단건 데이터는 useRun에 두었습니다. 삭제 중 상태와 삭제 오류는 RunDetailPage에 둬 조회 실패와 구분합니다. `initialData`는 폼의 최초 state를 채우는 값이며, props 변경이 기존 입력 state를 자동으로 덮어쓰는 구조는 아닙니다.

#### 저장·삭제 후 화면 갱신

전역 캐시를 직접 변경하거나 자동 무효화하는 방식은 사용하지 않습니다. 원격 작업 성공 후 이동한 페이지가 마운트되면서 SELECT를 다시 수행합니다.

| 작업 | 이동·재조회 흐름 |
| --- | --- |
| 생성 | `/runs/new` → RunForm 제출 → INSERT → `navigate('/runs')` → RunListPage 마운트 → 목록 SELECT → 새 카드 표시 |
| 수정 | `/runs/:id/edit` → 기존 값 입력 → UPDATE → `navigate('/runs/:id')`에 실제 ID 사용 → 상세 SELECT → 변경값·BPM 표시 |
| 삭제 | 상세의 삭제 클릭 → 확인 → DELETE → `navigate('/runs')` → 목록 SELECT → 삭제한 카드 제외 |

`App`의 Route가 페이지를 선택하고, 입력·제출 이벤트가 state를 변경하며, 요청 응답에 따라 페이지가 다시 렌더링됩니다. 같은 목록 화면에서 백그라운드 동기화를 수행하는 기능은 없습니다.

### 공통 상태 UI와 접근성 규칙

조회 화면은 **로딩 → 오류 → 빈 결과 → 성공** 순서로 분기합니다. 문구는 호출부에서 `message`로 전달하며 컴포넌트 자체의 기본 문구는 없습니다.

| 상태 | 컴포넌트·접근성 | 현재 사용하는 안내 문구 |
| --- | --- | --- |
| 로딩 | Loading의 `<p role="status">` | 러닝 기록을 불러오는 중... |
| 조회 실패 | ErrorState의 `<p role="alert">` | 러닝 기록을 불러오는 중 오류가 발생했습니다. 또는 단건 조회 안내 |
| 빈 목록 | EmptyState의 일반 `<p>` | 아직 러닝 기록이 없습니다. |
| 없는 단건 | EmptyState의 일반 `<p>` | 러닝 기록을 찾을 수 없습니다. |
| 저장·삭제 실패 | ErrorState의 `<p role="alert">` | 기록 저장/삭제 중 오류가 발생했습니다. 다시 시도해주세요. |

공통 상태 컴포넌트는 전역 p 스타일을 따르는 텍스트 UI입니다. 별도의 색상·아이콘·개별 className이나 추가 aria 속성은 아직 없으며, 페이지별 장식을 추가하지 않고 동일한 컴포넌트를 사용합니다. status는 진행 안내, alert는 실패 안내, 일반 p는 빈 결과 안내로 구분합니다. 필드 검증 오류는 FormField에서 입력 근처에 표시하며 현재 aria-describedby 연결은 구현하지 않았습니다.

### 폼 검증 범위와 오류 후 재시도

다섯 필드는 비어 있으면 제출을 막고 필드별 오류를 표시합니다. 시간은 `45:10` 같은 분:초 문자열을 받지만 현재 빈 값 검증만 하며 초 범위·정규식 형식 검사는 하지 않습니다. 거리의 `step="0.01"`로 소수점 두 자리 입력을 허용하지만 양수 범위 같은 도메인 검증은 향후 보완 대상입니다. 서버가 값을 거부하면 catch에서 공통 저장 실패 메시지를 표시합니다.

조회 전용 재시도 버튼과 자동 재시도 로직은 구현하지 않았습니다. 네트워크 복구 후 다른 경로로 이동했다가 돌아오거나 페이지를 새로고침하면 재조회합니다. 저장·삭제 실패는 finally에서 버튼을 다시 활성화하므로 같은 화면에서 재제출할 수 있습니다. 향후 Hook에 명시적인 refetch와 ErrorState의 재시도 버튼을 추가할 수 있습니다.

### state 변경에 따른 화면 예시

| 계기 | state 변경 | 화면 변화 |
| --- | --- | --- |
| 거리 입력 | `setFormData` | controlled input에 새 값 표시 |
| 필수값 누락 제출 | `setErrors` | 해당 입력 근처에 오류 문구 표시 |
| 오류 필드 재입력 | 해당 `errors[name]` 비우기 | 해당 필드 오류 문구 제거 |
| 제출 시작·종료 | `setIsSubmitting(true/false)` | 저장 중... 및 버튼 비활성화·복구 |
| 목록 조회 성공 | `setRuns(data)`와 로딩 종료 | 로딩 대신 runs.map의 카드 목록 표시 |
| 단건 조회 성공 | `setRun(data)`와 로딩 종료 | 상세 카드·BPM 또는 초기값이 채워진 수정 폼 표시 |
| 삭제 실패 | `setDeleteError` | 기록은 유지하고 실패 안내 표시 |

실제 수정·삭제 후 화면은 [배포 실행 증거](docs/deployment-verification.md)에 첨부했습니다.

### Supabase 선택 이유와 연동 문제 해결

서버를 직접 구축하는 범위를 줄이고 React의 state·이벤트·비동기 렌더링 학습에 집중하기 위해 Supabase를 사용했습니다. 한 개의 running_records 테이블로 원격 CRUD를 구성했습니다.

| 실제 겪은 문제 | 확인한 원인 | 해결 |
| --- | --- | --- |
| UPDATE 후 이동했지만 값이 그대로 | `data: []`, `error: null`이고 UPDATE RLS 정책이 없었음 | 공용 데모의 anon UPDATE 정책 추가. 수정 결과 0개 검사도 추가 |
| 기록이 없을 때 상세 오류 | 객체 또는 null인 run에 length로 접근 | `run === null`로 빈 상태 검사 |
| 수정 폼에 기존 시간 미표시 | `45:10`을 number input에 넣음 | text input과 시간(분:초) 라벨 사용 |
| 소수점 거리 제출 제한 | number input의 기본 step이 1 | FormField에 step prop 전달, 거리에서 0.01 지정 |

공개 데모 권한은 아래에 명시했으며, CORS 문제처럼 실제 겪지 않은 사례는 해결 경험에 포함하지 않습니다.

## Supabase 설정

테이블 이름은 `public.running_records`입니다. 새 프로젝트에서 실행하려면 아래 컬럼을 준비하고 앱이 사용하는 값과 호환되는 타입을 지정해야 합니다. 저장소에는 테이블 생성용 마이그레이션이 포함되어 있지 않습니다.

| DB 컬럼 | 용도 | 폼 필드 |
| --- | --- | --- |
| id | 기록 식별자, 기본 키 및 자동 생성값 필요 | — |
| date | 러닝 날짜 | date |
| distance | 거리(km) | distance |
| duration | 러닝 시간(분:초, 예: 45:10) | duration |
| avg_pace | 평균 페이스 | avgPace |
| avg_cadence | 평균 케이던스(spm) | avgCadence |

### 공용 학습 데모 정책

현재 로그인과 기록 소유자 구분은 없습니다. 방문자가 테스트 기록을 함께 조회·작성·수정·삭제하는 공용 데모입니다. 개인 정보나 보관이 필요한 실제 기록은 입력하지 않습니다.

RLS를 켜둔 상태에서 로그인하지 않은 브라우저 요청에 사용하는 anon 역할에 다음 접근 범위가 필요합니다.

| 작업 | 역할 | USING | WITH CHECK |
| --- | --- | --- | --- |
| SELECT | anon | true | 해당 없음 |
| INSERT | anon | 해당 없음 | true |
| UPDATE | anon | true | true |
| DELETE | anon | true | 해당 없음 |

이 정책에서는 누구나 모든 테스트 기록을 수정·삭제할 수 있습니다. 개인별 서비스로 확장하려면 인증과 소유자 기반 정책을 추가해야 합니다. 수정·삭제 결과 조회를 위해 SELECT 정책도 필요하며, 테이블의 Data API 접근 권한도 설정되어 있어야 합니다.

대시보드에서 만든 정책은 Git push에 포함되지 않습니다. 다른 Supabase 프로젝트를 사용하면 테이블과 정책을 별도로 구성해야 합니다.

## 배포

Vercel에 배포했습니다. [배포된 앱 열기](https://b1-2-flame.vercel.app/)

- 앱 폴더: running-log
- 빌드 명령: npm run build
- 결과 폴더: dist
- 배포 환경에 Supabase 환경변수 두 개 등록
- `vercel.json`의 rewrites 설정으로 페이지 요청을 `/index.html`에 연결합니다. React Router가 상세·수정 화면과 Not Found를 처리합니다.
- GitHub 연동으로 변경 사항을 push하면 연결된 브랜치의 배포가 실행됩니다. 실제 반영 여부는 Vercel 배포 완료 상태에서 확인합니다.
- 아래 동작 점검은 로컬과 배포 환경에서 각각 수행합니다.

## 동작 점검 항목

### 배포 환경 실행 증거

2026-10-28 배포 앱에서 테스트 기록을 작성·조회하고, 거리와 케이던스를 수정한 뒤 새로고침 후 유지까지 확인했습니다. 테스트 기록 삭제는 사용자가 수행했고, 이후 해당 ID의 기록 없음 화면과 목록에서 사라진 상태를 다시 조회해 확인했습니다.

- [입력값·URL·단계별 결과가 포함된 CRUD 실행 기록](docs/deployment-verification.md)
- [수정 후 새로고침 화면](docs/evidence/01-updated-record-after-reload.png)
- [삭제한 ID 재조회 화면](docs/evidence/02-deleted-record.png)
- [삭제 후 목록 화면](docs/evidence/03-list-after-delete.png)

![배포 앱에서 수정 후 새로고침한 결과](docs/evidence/01-updated-record-after-reload.png)

### 점검 목록

- 빈 폼 제출 시 필드별 오류 표시
- 작성 후 목록 반영 및 카드 클릭 시 상세 이동
- 수정 폼의 기존 값 표시와 수정 후 새로고침 시 값 유지
- 케이던스 변경에 따른 추천 BPM 변경
- 삭제 취소 시 유지, 확인 시 삭제 후 목록 이동
- 존재하지 않는 기록과 잘못된 페이지 주소 처리
- 네트워크 실패 시 오류 표시 및 복구 후 재조회
- npm run lint와 npm run build 통과

## 학습 내용

컴포넌트 분리, props와 state, controlled input, 이벤트 처리, 조건부·배열 렌더링, React Router, 비동기 요청, useEffect와 cleanup, Custom Hook, Supabase CRUD를 학습했습니다. 사용자 입력과 서버 응답이 state를 변경하고 화면 렌더링으로 이어지는 흐름을 중심으로 구현했습니다.
