// pt = require('puppeteer')
// ;(async () => {
//   // 配置浏览器的启动选项
//   const browser = await pt.launch({
//       headless: false, // 是否无头模式
//       // slowMo: 100, // 放慢速度
//       // devtools: true,
//     }),
//     url = 'https://duyi.ke.qq.com/?activeTab=head_recommend',
//     page = await browser.newPage()

//   // 设置页面视口大小
//   page.setViewport({
//     width: 1920,
//     height: 1080,
//   })

//   // 载入页面至指定URL
//   await page.goto(url, {
//     // 设置超时时间，处理网站链接超时的情况
//     timeout: 30 * 1000,
//     // 设置页面加载的等待条件
//     waitUntil: 'networkidle2', //  等待网络空闲, networkidle2表示不超过2个连接，networkidle0表示没有连接
//   })

//   // 分析页面并返回结果
//   const result = await page.$$eval(
//     '.swiper-slide.kc-w-banner-item.w-banner-item .rotation-chart-item-img',
//     imgs => {
//       return imgs.map((img, index) => ({
//         imgUrl: img.src,
//         id: index + 1,
//         title: img.alt + (index + 1),
//       }))
//     },
//   )

//   // 关闭页面
//   await page.close()

//   // 发送结果
//   process.send(result)

//   // 结束子进程
//   setTimeout(() => {
//     process.exit(0)
//   })
// })()
