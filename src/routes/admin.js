const express = require('express');
const router = express.Router();
const { db } = require('../models/database');
const { requireAuth, requireAdmin } = require('../middleware/auth');

// Admin API (/api/admin/*)
// ─────────────────────────────────────────────

// GET /api/admin/users — 전체 사용자 목록
router.get('/admin/users', requireAuth, requireAdmin, (req, res) => {
  const users = db.prepare(
    "SELECT id, username, display_name, role, created_at FROM users ORDER BY created_at DESC"
  ).all();
  res.json({ users });
});

// DELETE /api/admin/users/:id — 사용자 삭제 (트랜잭션)
router.delete('/admin/users/:id', requireAuth, requireAdmin, (req, res) => {
  const userId = parseInt(req.params.id);
  if (userId === req.user.id) {
    return res.status(400).json({ error: '자기 자신은 삭제할 수 없습니다' });
  }
  const user = db.prepare('SELECT id FROM users WHERE id = ?').get(userId);
  if (!user) return res.status(404).json({ error: '사용자를 찾을 수 없습니다' });

  const deleteUser = db.transaction(() => {
    // cs_messages (cs_sessions 통해)
    const csSessions = db.prepare('SELECT id FROM cs_sessions WHERE partner_id IN (SELECT id FROM cs_partners WHERE created_by = ?)').all(userId);
    for (const s of csSessions) {
      db.prepare('DELETE FROM cs_messages WHERE session_id = ?').run(s.id);
    }
    // 채널 메시지
    db.prepare('DELETE FROM messages WHERE user_id = ?').run(userId);
    // DM 메시지 + DM 채널
    const dms = db.prepare('SELECT id FROM dm_channels WHERE user1_id = ? OR user2_id = ?').all(userId, userId);
    for (const d of dms) {
      db.prepare('DELETE FROM dm_messages WHERE dm_channel_id = ?').run(d.id);
    }
    db.prepare('DELETE FROM dm_channels WHERE user1_id = ? OR user2_id = ?').run(userId, userId);
    // 채널 멤버
    db.prepare('DELETE FROM channel_members WHERE user_id = ?').run(userId);
    // 사용자
    db.prepare('DELETE FROM users WHERE id = ?').run(userId);
  });
  deleteUser();
  res.json({ success: true });
});

// PATCH /api/admin/users/:id/role — 역할 변경 (admin↔user)
router.patch('/admin/users/:id/role', requireAuth, requireAdmin, (req, res) => {
  const userId = parseInt(req.params.id);
  const { role } = req.body;
  if (!['admin', 'user'].includes(role)) {
    return res.status(400).json({ error: 'role은 admin 또는 user만 허용됩니다' });
  }
  const user = db.prepare('SELECT id FROM users WHERE id = ?').get(userId);
  if (!user) return res.status(404).json({ error: '사용자를 찾을 수 없습니다' });
  db.prepare('UPDATE users SET role = ? WHERE id = ?').run(role, userId);
  res.json({ success: true, id: userId, role });
});

// GET /api/admin/channels — 채널 목록
router.get('/admin/channels', requireAuth, requireAdmin, (req, res) => {
  const channels = db.prepare(`
    SELECT c.id, c.name, c.type, c.created_at,
      (SELECT COUNT(*) FROM channel_members WHERE channel_id = c.id) as member_count,
      (SELECT COUNT(*) FROM messages WHERE channel_id = c.id) as message_count
    FROM channels c
    ORDER BY c.created_at DESC
  `).all();
  res.json({ channels });
});

// DELETE /api/admin/channels/:id — 채널 삭제 (트랜잭션)
router.delete('/admin/channels/:id', requireAuth, requireAdmin, (req, res) => {
  const channelId = parseInt(req.params.id);
  const channel = db.prepare('SELECT id FROM channels WHERE id = ?').get(channelId);
  if (!channel) return res.status(404).json({ error: '채널을 찾을 수 없습니다' });

  const deleteChannel = db.transaction(() => {
    // CS 세션이 참조하는 채널인 경우 처리
    const csSession = db.prepare('SELECT id FROM cs_sessions WHERE channel_id = ?').get(channelId);
    if (csSession) {
      db.prepare('DELETE FROM cs_messages WHERE session_id = ?').run(csSession.id);
      db.prepare('DELETE FROM cs_sessions WHERE channel_id = ?').run(channelId);
    }
    db.prepare('DELETE FROM messages WHERE channel_id = ?').run(channelId);
    db.prepare('DELETE FROM channel_members WHERE channel_id = ?').run(channelId);
    db.prepare('DELETE FROM channels WHERE id = ?').run(channelId);
  });
  deleteChannel();
  res.json({ success: true });
});

// GET /api/admin/stats — 통계
router.get('/admin/stats', requireAuth, requireAdmin, (req, res) => {
  const totalUsers    = db.prepare('SELECT COUNT(*) as c FROM users').get().c;
  const totalChannels = db.prepare('SELECT COUNT(*) as c FROM channels').get().c;
  const totalMessages = db.prepare('SELECT COUNT(*) as c FROM messages').get().c;
  const todayJoined   = db.prepare("SELECT COUNT(*) as c FROM users WHERE date(created_at) = date('now')").get().c;
  const csSessions    = db.prepare('SELECT COUNT(*) as c FROM cs_sessions').get().c;
  res.json({ totalUsers, totalChannels, totalMessages, todayJoined, csSessions });
});

// GET /api/admin/cs-sessions — CS 상담 세션 목록
router.get('/admin/cs-sessions', requireAuth, requireAdmin, (req, res) => {
  const sessions = db.prepare(`
    SELECT
      s.id, s.visitor_id, s.visitor_name, s.status, s.created_at, s.updated_at,
      p.name as partner_name,
      (SELECT COUNT(*) FROM cs_messages WHERE session_id = s.id) as message_count
    FROM cs_sessions s
    LEFT JOIN cs_partners p ON s.partner_id = p.id
    ORDER BY s.created_at DESC
  `).all();
  res.json({ sessions });
});

// GET /api/admin/stats/users — 사용자 상세 통계
router.get('/admin/stats/users', requireAuth, requireAdmin, (req, res) => {
  const total = db.prepare('SELECT COUNT(*) as c FROM users').get().c;
  const today = db.prepare("SELECT COUNT(*) as c FROM users WHERE date(created_at) = date('now')").get().c;
  const active_24h = db.prepare(
    "SELECT COUNT(*) as c FROM users WHERE datetime(last_seen) >= datetime('now', '-24 hours')"
  ).get().c;
  res.json({ total, today, active_24h });
});

// GET /api/admin/stats/messages — 메시지 상세 통계
router.get('/admin/stats/messages', requireAuth, requireAdmin, (req, res) => {
  const total = db.prepare('SELECT COUNT(*) as c FROM messages').get().c;
  const by_channel = db.prepare(`
    SELECT c.name, m.channel_id, COUNT(*) as count
    FROM messages m
    JOIN channels c ON c.id = m.channel_id
    GROUP BY m.channel_id
    ORDER BY count DESC
  `).all();
  res.json({ total, by_channel });
});

module.exports = router;
