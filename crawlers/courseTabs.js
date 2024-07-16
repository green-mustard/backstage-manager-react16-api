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
      // 因为tab中的‘全部’的id应该为0，所以编号从0开始
      const tid = index
      data.push({
        tid,
        tabName,
      })
    })
    return data
  },
})
