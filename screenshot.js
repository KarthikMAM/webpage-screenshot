module.exports = async (browserInstance, url) => {
  const browser = await browserInstance
  const page = await browser.newPage()

  await page.goto(url)

  const screenshot = await page.screenshot({
    type: 'jpeg',
    fullPage: true,
    omitBackground: true,
    quality: 60,
  })

  await page.close()

  return screenshot
}
