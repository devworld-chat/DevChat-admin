import { html } from 'hono/html'
import type { FC } from 'hono/jsx'

type LayoutProps = {
  title: string
  children: any
}

export const Layout: FC<LayoutProps> = ({ title, children }) => {
  return (
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <title>{title}</title>
        <link rel="stylesheet" href="/css/style.css" />
        {html`<style>
          body { background: var(--bg); color: var(--text); }
          .admin-nav { background: var(--bg2); border-bottom: 1px solid var(--border); padding: 12px 24px; display: flex; align-items: center; gap: 16px; }
          .admin-nav .logo { font-size: 16px; font-weight: 700; text-decoration: none; color: var(--text); }
          .admin-nav .nav-sep { color: var(--text3); }
          .admin-nav .nav-current { font-size: 14px; color: var(--text2); }
          .admin-nav .nav-back { margin-left: auto; font-size: 13px; color: var(--primary); text-decoration: none; }
          .admin-nav .nav-back:hover { color: var(--primary-hover); }
        </style>`}
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
