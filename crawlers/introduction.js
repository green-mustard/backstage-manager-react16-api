const crawler = require('../libs/crawler')
const { crawlerOptions } = require('../config/account_config')
const agencyIntro = require('../services/agencyIntro')

crawler({
  url: crawlerOptions.url.introduction,
  callback() {
    const logoElement = document.querySelector(
      '.agency-info-ctn .kc-agency-hd-avatar-pc img',
    )
    const item = document.querySelector('.kc-agency-hd-count-ctn.pc')
    try {
      if (logoElement && item) {
        const logoUrl = logoElement.getAttribute('src')
        const name = document.querySelector(
          '.agency-name-ctn .agency-name',
        ).textContent
        const logoKey = ''

        // 机构介绍
        const agencyIntro =
          document.querySelector('.aiwi-content span').innerText

        // 分别尝试获取每个数据项，增加错误处理
        let studentCount, feedbackRate, courseCount

        // 好评度
        feedbackRate = item.querySelector(
          '.item:nth-child(1) span.val',
        ).textContent

        // 学生数
        studentCount = item.querySelector(
          '.item:nth-child(2) span.val',
        ).textContent

        // 课程数
        courseCount = item.querySelector(
          '.item:nth-child(3) span.val',
        ).textContent

        return {
          logoUrl,
          name,
          agencyIntro,
          studentCount,
          feedbackRate,
          courseCount,
          logoKey,
        }
      } else {
        console.log('logoElement or item is not found.')
        return 'error'
      }
    } catch (err) {
      console.log(err)
    }
  },
})
