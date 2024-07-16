const crawler = require('../libs/crawler')
const { crawlerOptions } = require('../config/account_config')

crawler({
  url: crawlerOptions.url.recommend,
  callback() {
    const items = document.querySelectorAll(
      '.swiper-slide.kc-w-banner-item.w-banner-item .rotation-chart-item-img',
    )

    const data = []

    // 使用扩展运算符将获取到的数据转换成数组
    const itemsArray = [...items]

    itemsArray.forEach((item, index) => {
      if (item) {
        const title = '图片' + (index + 1)
        const imgUrl = item.src
        const cid = index + 1
        const key = ''

        data.push({
          cid,
          title,
          imgUrl,
          key,
        })
      } else {
        console.warn(`第${index + 1}个项没有找到img标签.`)
      }
    })
    return data
  },
})
