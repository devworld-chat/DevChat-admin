# Admin 기능 체크리스트

## 사용자 관리
- [ ] 전체 사용자 목록 조회 (GET /api/admin/users)
- [ ] 사용자 역할 변경 (PATCH /api/admin/users/:id/role)
- [ ] 사용자 상태 변경 (PATCH /api/admin/users/:id/status)

## 채널 관리
- [ ] 전체 채널 목록 조회 (GET /api/admin/channels)
- [ ] 채널 삭제 (DELETE /api/admin/channels/:id)

## 통계
- [ ] 시스템 통계 조회 (GET /api/admin/stats)

## 초대 관리
- [ ] 초대 목록 조회 (GET /api/admin/invites)
- [ ] 초대 생성 (POST /api/admin/invites)
- [ ] 초대 삭제 (DELETE /api/admin/invites/:id)

## CS 파트너 관리 (cs-admin)
- [ ] 파트너 목록 조회
- [ ] 파트너 등록
- [ ] 파트너 비활성화/활성화
- [ ] 파트너 토큰 재생성

## UI 뷰
- [ ] admin.ejs 대시보드
- [ ] cs-admin.ejs CS 관리 페이지
