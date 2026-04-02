const fs = require('fs');
const path = require('path');

describe('Admin 라우트 파일 구조 확인', () => {
  const routeFilePath = path.join(__dirname, '../src/routes/admin.js');

  test('src/routes/admin.js 파일이 존재해야 한다', () => {
    expect(fs.existsSync(routeFilePath)).toBe(true);
  });

  test('admin 라우트 파일에 /users 경로가 포함되어 있어야 한다', () => {
    const content = fs.readFileSync(routeFilePath, 'utf8');
    expect(content).toMatch(/\/admin\/users/);
  });

  test('admin 라우트 파일에 /channels 경로가 포함되어 있어야 한다', () => {
    const content = fs.readFileSync(routeFilePath, 'utf8');
    expect(content).toMatch(/\/admin\/channels/);
  });

  test('admin 라우트 파일에 /stats 경로가 포함되어 있어야 한다', () => {
    const content = fs.readFileSync(routeFilePath, 'utf8');
    expect(content).toMatch(/\/admin\/stats/);
  });

  test('admin 라우트 파일에 requireAdmin 미들웨어가 포함되어 있어야 한다', () => {
    const content = fs.readFileSync(routeFilePath, 'utf8');
    expect(content).toMatch(/requireAdmin/);
  });

  test('admin 라우트 파일이 router를 export해야 한다', () => {
    const content = fs.readFileSync(routeFilePath, 'utf8');
    expect(content).toMatch(/module\.exports\s*=\s*router/);
  });
});
