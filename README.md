# DevChat Admin

DevChat 모놀리식 저장소에서 분리된 관리자 대시보드 및 admin API 파트입니다.

## 개요

DevChat의 관리자 기능을 담당하는 독립 모듈입니다. 사용자 관리, 채널 관리, 시스템 통계, CS 파트너 관리 등 admin 전용 API 라우트와 뷰를 포함합니다.

## 파일 구조

```
admin/
├── package.json
├── jest.config.js
├── CHECKLIST.md
├── README.md
├── views/pages/
│   ├── admin.ejs          # 관리자 대시보드 뷰
│   └── cs-admin.ejs       # CS 관리 페이지 뷰
├── src/routes/
│   └── admin.js           # Admin 전용 API 라우트
└── tests/
    ├── admin-views.test.js   # 뷰 파일 존재 확인 테스트
    └── admin-routes.test.js  # 라우트 파일 구조 확인 테스트
```

## 포함된 Admin API 엔드포인트

| HTTP Method | Path | 기능 |
|-------------|------|------|
| GET | /api/admin/users | 전체 사용자 목록 조회 |
| DELETE | /api/admin/users/:id | 사용자 삭제 (트랜잭션) |
| PATCH | /api/admin/users/:id/role | 사용자 역할 변경 (admin/user) |
| GET | /api/admin/channels | 채널 목록 조회 (member_count 포함) |
| DELETE | /api/admin/channels/:id | 채널 삭제 (트랜잭션) |
| GET | /api/admin/stats | 종합 통계 조회 |
| GET | /api/admin/cs-sessions | CS 상담 세션 목록 |
| GET | /api/admin/stats/users | 사용자 상세 통계 |
| GET | /api/admin/stats/messages | 메시지 상세 통계 |

모든 엔드포인트는 `requireAuth + requireAdmin` 이중 미들웨어로 보호됩니다.

## 테스트 방법

```bash
# 의존성 설치
npm install

# 테스트 실행
npm test
```

### 테스트 항목

- **admin-views.test.js**: `views/pages/admin.ejs`, `views/pages/cs-admin.ejs` 파일 존재 및 내용 포함 여부 확인
- **admin-routes.test.js**: `src/routes/admin.js` 파일 존재, `/users`/`/channels`/`/stats` 경로 포함 여부, `requireAdmin` 미들웨어 사용 여부, `module.exports` 확인

## 원본 저장소와의 관계

이 저장소는 [devworld-ltd/DevChat](https://github.com/devworld-ltd/DevChat)의 git submodule로 등록되어 있습니다.

```bash
# 원본 저장소에서 서브모듈 초기화
git submodule update --init --recursive
```

원본 통합 실행 시 `src/routes/admin.js`의 `require('../models/database')` 경로를 `../../backend/src/models/database`로 조정해야 합니다.
