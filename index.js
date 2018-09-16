const url = require('url')
const http = require('http')
const throng = require('throng')
const puppeteer = require('puppeteer')
const screenshot = require('./screenshot')

throng(() => {
  const browserInstance = puppeteer.launch()

  http.createServer((request, response) => {
    const { query } = url.parse(request.url, true)

    const successResponse = (buffer) => {
      response.writeHead(200, { 'Content-Type': 'image/jpeg' })
      response.end(buffer)
    }

    const errorResponse = () => {
      response.writeHead(404)
      response.end()
    }

    screenshot(browserInstance, query.url)
      .then(successResponse)
      .catch(errorResponse)
  }).listen(process.env.PORT || 3000)

  process.on('SIGTERM', async () => {
    const browser = await browserInstance

    await browser.close()

    process.exit()
  })
})
