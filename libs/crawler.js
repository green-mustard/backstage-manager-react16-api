const pt = require('puppeteer')

module.exports = async function (options) {
  try {
    const browser = await pt.launch({
        headless: false,
        slowMo: 100,
        devtools: true,
      }),
      page = await browser.newPage(),
      url = options.url

    page.setViewport({ width: 1920, height: 1080 })

    await page.goto(url, {
      timeout: 30 * 1000,
      waitUntil: 'networkidle2',
    })

    const result = await page.evaluate(options.callback)

    // �ȴ� process.send() �� browser.close() �����
    await Promise.all([process.send(result), browser.close()])

    // �˳�����
    process.exit(0)
  } catch (err) {
    console.log(err)
  }
}
