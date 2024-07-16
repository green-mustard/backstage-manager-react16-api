const crawler = require('../libs/crawler')
const { crawlerOptions } = require('../config/account_config')

crawler({
  url: crawlerOptions.url.course,
  callback() {
    const data = []
    const courseItems = document.querySelectorAll(
      '.agency-courses-content .kc-course-card---BW18DE a',
    )

    courseItems.forEach((item, index) => {
      const footer = item.querySelector('.kc-course-card-footer-info---iNSdzI')
      const course = {
        cid: index + 1,
        imgUrl: item.querySelector('img').src,
        imgKey: '',
        href: item.href,
        title: item
          .querySelector('.kc-course-card-name---QUOvPQ')
          .innerText.trim(),
        price: footer.querySelector(
          '.kc-course-card-price-current---iUq7LY span',
        ).innerText,
        studentCount: footer.querySelector('span:nth-child(2)').innerText,
        // 课程分类，用于后期筛选
        filed: -1,
        courseCount: item.querySelector('.kc-course-card-tag-chapter---BvIeIq')
          .innerText,
      }
      data.push(course)
    })

    return data
  },
})
