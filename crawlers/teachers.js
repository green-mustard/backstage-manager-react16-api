/**
 * 使用爬虫工具爬取教师信息。
 *
 * 本段代码通过调用爬虫库，针对指定的教师信息页面进行爬取，提取每个教师的关键信息，
 * 包括教师编号、教师头像、教师名称、课程数量、教师简介和学生数量，并将这些信息
 * 存储在一个数组中。
 *
 * @requires crawler 爬虫库，用于发起HTTP请求并解析页面。
 * @requires crawlerOptions.url.teacher 爬取的教师信息页面URL。
 */
const crawler = require('../libs/crawler')
const { crawlerOptions } = require('../config/account_config')

// 调用爬虫库，指定要爬取的URL和回调函数
crawler({
  url: crawlerOptions.url.teacher,
  callback() {
    // 获取页面中所有教师信息的元素节点
    const teachers = document.querySelectorAll('.teacher-list-card-pc')
    const data = []
    const href = 'https://ke.qq.com/teacher/842605007#'

    // 遍历每个教师元素，提取并存储教师信息
    teachers.forEach((teacher, index) => {
      // 提取并构造单个教师的信息对象
      const teacherData = {
        tid: index + 1, // 教师编号，从1开始
        // 占位link
        href,
        teacherImgSrc: teacher
          .querySelector('.tlc-avatar')
          .getAttribute('src')
          .replace('//', ''), // 教师头像URL，去除双斜杠
        teacherName: teacher.querySelector('.tlci-title-pc').innerText, // 教师名称
        courseCount: parseInt(teacher.querySelector('.tlci-num').innerText), // 课程数量，转换为整数
        teacherDescription: teacher.querySelector('.tlci-summary-pc').innerText, // 教师简介
        studentCount: parseInt(
          teacher
            .querySelector('.tlci-detail-pc')
            .querySelector('span:nth-child(5)').innerText,
        ), // 学生数量，转换为整数
        teacherImgKey: '', // 教师头像的存储键名，预留但未使用
      }
      data.push(teacherData) // 将教师信息对象添加到数据数组中
    })
    return data // 返回提取的教师信息数组
  },
})
