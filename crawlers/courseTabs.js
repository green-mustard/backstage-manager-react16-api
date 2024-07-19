const crawler = require('../libs/crawler')
const { crawlerOptions } = require('../config/account_config')

crawler({
  url: crawlerOptions.url.course,
  callback() {
    const coursetabs = document.querySelectorAll(
      '.agency-list-filter-label .agency-list-filter-item',
    )
    const data = []
    coursetabs.forEach((item, index) => {
      const tabName = item.innerText
      const tid = index
      // 检查tabName是否为"全部"，如果不是，则添加到data数组
      if (tabName !== '全部') {
        data.push({
          tid,
          tabName,
        })
      }
    })
    return data
  },
})
