const crawler = require('../libs/crawler')
const { crawlerOptions } = require('../config/account_config')

crawler({
  url: crawlerOptions.url.recommend,
  callback() {
    const data = []
    const items = document.querySelectorAll(
      '.gems-render-box .kc-course-card---BW18DE',
    )
    const itemsArray = [...items]
    try {
      itemsArray.forEach((item, index) => {
        const courseLink = item.querySelector('a')
        const cid = index + 1
        if (courseLink) {
          const href = courseLink.getAttribute('href')
          const courseImg = item.querySelector('img')
          if (courseImg) {
            const imgSrc = courseImg.getAttribute('src')
            const imgKey = ''
            const courseName = item.querySelector(
              '.kc-course-card-name---QUOvPQ',
            ).innerText
            const feedbackRate = item.querySelector(
              '.kc-course-card-label---KF4sN3:nth-child(2)',
            ).innerText
            const studentsNumber = item
              .querySelector('.kc-course-card-footer-info---iNSdzI')
              .querySelector('span:nth-child(2)').innerText

            data.push({
              cid,
              href,
              imgSrc,
              imgKey,
              courseName,
              feedbackRate,
              studentsNumber,
            })
          }
          return data
        } else {
          console.log('没有找到课程链接')
        }
      })
    } catch (error) {
      console.log(error)
    }
    return data
  },
})
