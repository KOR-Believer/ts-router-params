import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { join, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import serverModule from './dist/server/server.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const PORT = process.env.PORT || 3000
const CLIENT_DIR = join(__dirname, 'dist', 'client')

// MIME 타입 매핑
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'font/otf',
  '.webp': 'image/webp',
  '.webm': 'video/webm',
  '.mp4': 'video/mp4',
  '.txt': 'text/plain',
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`)
    const pathname = url.pathname

    // 정적 파일 서빙 (assets, public 파일들)
    if (pathname.startsWith('/assets/') ||
        pathname.match(/\.(css|js|mjs|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|otf|webp|json|html|txt)$/)) {
      try {
        const filePath = join(CLIENT_DIR, pathname)
        const content = await readFile(filePath)
        const ext = extname(pathname)
        const mimeType = MIME_TYPES[ext] || 'application/octet-stream'

        res.statusCode = 200
        res.setHeader('Content-Type', mimeType)
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
        res.end(content)
        return
      } catch (err) {
        // 파일을 찾을 수 없으면 SSR로 넘어감
        if (err.code !== 'ENOENT') {
          console.error('Static file error:', err)
        }
      }
    }

    // SSR 처리
    const headers = new Headers()
    for (const [key, value] of Object.entries(req.headers)) {
      if (value) {
        if (Array.isArray(value)) {
          value.forEach(v => headers.append(key, v))
        } else {
          headers.append(key, value)
        }
      }
    }

    // Body 읽기 (POST 등)
    const chunks = []
    for await (const chunk of req) {
      chunks.push(chunk)
    }
    const body = chunks.length > 0 ? Buffer.concat(chunks) : null

    // Fetch Request 생성
    const request = new Request(url.toString(), {
      method: req.method,
      headers,
      body: body && req.method !== 'GET' && req.method !== 'HEAD' ? body : null,
    })

    // TanStack Start 서버 fetch handler 호출
    const response = await serverModule.fetch(request)

    // Fetch Response를 Node.js Response로 변환
    res.statusCode = response.status
    res.statusMessage = response.statusText

    response.headers.forEach((value, key) => {
      res.setHeader(key, value)
    })

    if (response.body) {
      const reader = response.body.getReader()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        res.write(value)
      }
    }

    res.end()
  } catch (error) {
    console.error('Server error:', error)
    res.statusCode = 500
    res.end('Internal Server Error')
  }
})

server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`)
})

