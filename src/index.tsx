import { Hono } from 'hono'
import { AdminPage } from './pages/admin'
import { CsAdminPage } from './pages/cs-admin'
import cssContent from './static/style.css'

type Env = {
  Bindings: {
    BACKEND_URL: string
  }
}

// 요청의 Host 헤더에서 hostname을 추출하여 동일 hostname의 :8787로 백엔드 URL 결정
function resolveBackendUrl(c: any): string {
  const host = c.req.header('Host') || 'localhost:8790'
  const hostname = host.split(':')[0]

  // localhost인 경우 환경변수 그대로 사용 (기존 호환)
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return c.env.BACKEND_URL
  }

  // 외부 접근: 같은 hostname의 Backend 포트(8787)로 연결
  const proto = c.req.header('X-Forwarded-Proto') || 'http'
  return `${proto}://${hostname}:8787`
}

const app = new Hono<Env>()

// CSS 정적 파일 서빙
app.get('/css/style.css', (c) => {
  return c.body(cssContent, 200, {
    'Content-Type': 'text/css; charset=utf-8',
    'Cache-Control': 'public, max-age=3600',
  })
})

// Admin 대시보드 페이지
app.get('/admin', (c) => {
  return c.html(<AdminPage />)
})

// CS 파트너 관리 페이지
app.get('/admin/cs', (c) => {
  return c.html(<CsAdminPage />)
})

// API 프록시: /api/* 요청을 BACKEND_URL로 전달
app.all('/api/*', async (c) => {
  const backendUrl = resolveBackendUrl(c)
  const path = c.req.path
  const url = new URL(c.req.url)
  const targetUrl = `${backendUrl}${path}${url.search}`

  const headers = new Headers(c.req.raw.headers)
  // Host 헤더를 백엔드에 맞게 변경
  const backendHost = new URL(backendUrl).host
  headers.set('Host', backendHost)

  const init: RequestInit = {
    method: c.req.method,
    headers,
  }

  // GET, HEAD 요청에는 body를 포함하지 않음
  if (c.req.method !== 'GET' && c.req.method !== 'HEAD') {
    init.body = c.req.raw.body
  }

  const res = await fetch(targetUrl, init)

  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers: res.headers,
  })
})

export default app
