const fs = require('fs');
const path = require('path');

describe('Admin 뷰 파일 존재 확인', () => {
  const viewsDir = path.join(__dirname, '../views/pages');

  test('admin.ejs 파일이 존재해야 한다', () => {
    const filePath = path.join(viewsDir, 'admin.ejs');
    expect(fs.existsSync(filePath)).toBe(true);
  });

  test('cs-admin.ejs 파일이 존재해야 한다', () => {
    const filePath = path.join(viewsDir, 'cs-admin.ejs');
    expect(fs.existsSync(filePath)).toBe(true);
  });

  test('admin.ejs 파일이 내용을 포함해야 한다 (크기 > 0)', () => {
    const filePath = path.join(viewsDir, 'admin.ejs');
    const stats = fs.statSync(filePath);
    expect(stats.size).toBeGreaterThan(0);
  });

  test('cs-admin.ejs 파일이 내용을 포함해야 한다 (크기 > 0)', () => {
    const filePath = path.join(viewsDir, 'cs-admin.ejs');
    const stats = fs.statSync(filePath);
    expect(stats.size).toBeGreaterThan(0);
  });
});
