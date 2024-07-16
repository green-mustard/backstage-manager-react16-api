const { startProcess, qiniuUpload } = require('../libs/utils')
const { qiniu } = require('../config/account_config')
const { addSliderData } = require('../services/slider')
const { addAgencyIntro } = require('../services/agencyIntro')
const { addPopularCourses } = require('../services/popularCourses')
const { addTeacher } = require('../services/teachers')
const { addCourseTab } = require('../services/courseTabs')
const { addCourseData } = require('../services/courseData')

class Crawler {
  crawlSliderData() {
    // 启动子进程
    startProcess({
      path: '../crawlers/slider',
      /*
       * 异步处理消息。
       * @param {Array} data - 包含图片信息的数据数组。
       */
      async message(data) {
        // 创建一个数组，用于存放每个图片处理的Promise
        const promises = data.map(async item => {
          // 检查如果图片URL存在但key不存在，则尝试上传图片
          if (item.imgUrl && !item.key) {
            try {
              // 调用七牛云上传函数，上传图片
              const imgData = await qiniuUpload({
                url: item.imgUrl,
                bucket: qiniu.bucket.crawlSlider.name,
                ext: '.jpg',
              })
              // 如果上传成功，更新item的key值
              if (imgData.key) {
                item.key = imgData.key
              }
              const result = await addSliderData(item)
              if (result) {
                console.log('Data create successfully')
              } else {
                console.log('Data create failed')
              }
            } catch (error) {
              // 错误处理
            }
          }

          // 返回处理后的item
          // 返回每个Promise，以便Promise.all等待
          return item
        })
        // 等待所有图片处理Promise完成
        await Promise.all(promises)
      },
      async exit(code) {
        console.log(`child process exited with code ${code}`)
      },
      async error(err) {
        console.log(err)
      },
    })
  }
  crawlAgencyIntro() {
    // 启动子进程
    startProcess({
      path: '../crawlers/introduction',
      // 定义子进程与主进程间的消息通信回调
      async message(data) {
        console.log(data)
        // 当收到包含logoURL但没有key的数据时，尝试上传图片到七牛云
        if (data.logoUrl && !data.key) {
          try {
            // 调用qiniuUpload函数上传图片，并等待上传结果
            const logoData = await qiniuUpload({
              url: data.logoUrl,
              bucket: qiniu.bucket.crawlSlider.name,
              ext: '.jpg',
            })
            // 如果上传成功，更新数据的logoKey字段
            if (logoData) {
              data.logoKey = logoData.key
            }
            const result = await addAgencyIntro(data)
            if (result) {
              console.log('Data create successfully')
            } else {
              console.log('Data create failed')
            }

            return logoData
          } catch (err) {
            console.log(err)
          }
        } else {
          // 如果数据不包含logoURL或者已经包含key，则不进行上传操作
          console.log('logo图片不存在')
        }
      },
      // 定义子进程退出事件的回调
      async exit(code) {
        // 当子进程退出时，打印退出码
        console.log(`child process exited with code ${code}`)
      },
      // 定义子进程错误事件的回调
      async error(err) {
        // 当子进程发生错误时，打印错误信息
        console.log(err)
      },
    })
  }
  crawlPopularCourse() {
    startProcess({
      path: '../crawlers/popularCourses',
      // 定义子进程与主进程间的消息通信回调
      async message(data) {
        try {
          data.map(async item => {
            // 当收到包含imgSrc但没有imgKey的数据时，尝试上传图片到七牛云
            if (item.imgSrc && !item.imgKey) {
              // 调用qiniuUpload函数上传图片，并等待上传结果
              const coursesData = await qiniuUpload({
                url: item.imgSrc,
                bucket: qiniu.bucket.crawlSlider.name,
                ext: '.jpg',
              })
              // 如果上传成功，更新数据的imgKey字段
              if (coursesData) {
                item.imgKey = coursesData.key
              }
              const result = await addPopularCourses(item)
              if (result) {
                console.log('Data create successfully')
              } else {
                console.log('Data create failed')
              }
            } else {
              // 如果数据不包含imgSrc或者已经包含key，则不进行上传操作
              console.log('imgSrc图片不存在')
            }
          })
        } catch (err) {
          console.log(err)
        }
      },
      // 定义子进程退出事件的回调
      async exit(code) {
        // 当子进程退出时，打印退出码
        console.log(`child process exited with code ${code}`)
      },
      // 定义子进程错误事件的回调
      async error(err) {
        // 当子进程发生错误时，打印错误信息
        console.log(err)
      },
    })
  }
  crawlTeacher() {
    startProcess({
      path: '../crawlers/teachers',
      async message(data) {
        data.map(async item => {
          if (item.teacherImgSrc && !item.teacherImgKey) {
            try {
              const teacherData = await qiniuUpload({
                url: item.teacherImgSrc,
                bucket: qiniu.bucket.crawlSlider.name,
                ext: '.jpg',
              })
              if (teacherData) {
                item.teacherImgKey = teacherData.key
              }
              const result = await addTeacher(item)
              if (result) {
                console.log('Data create successfully')
              } else {
                console.log('Data create failed')
              }
            } catch (err) {
              console.log(err)
            }
          }
        })
      },
      async exit(code) {
        console.log(`child process exited with code ${code}`)
      },
      async error(err) {
        console.log(err)
      },
    })
  }
  crawlCourseTabs() {
    startProcess({
      path: '../crawlers/courseTabs',
      async message(data) {
        data.map(async item => {
          try {
            const result = await addCourseTab(item)
            if (result) {
              console.log('Data create successfully')
            } else {
              console.log('Data create failed')
            }
          } catch (err) {
            console.log(err)
          }
        })
      },
      async exit(code) {
        console.log(`child process exited with code ${code}`)
      },
      async error(err) {
        console.log(err)
      },
    })
  }
  crawlCourseData() {
    startProcess({
      path: '../crawlers/courseData',
      async message(data) {
        data.map(async item => {
          if (item.imgUrl && !item.imgKey) {
            try {
              const courseData = await qiniuUpload({
                url: item.imgUrl,
                bucket: qiniu.bucket.crawlSlider.name,
                ext: '.jpg',
              })
              if (courseData) {
                item.imgKey = courseData.key
              }

              const result = await addCourseData(item)
              if (result) {
                console.log('Data create successfully')
              } else {
                console.log('Data create failed')
              }
            } catch (err) {
              console.log(err)
            }
          }
        })
      },
      async exit(code) {
        console.log(`child process exited with code ${code}`)
      },
      async error(err) {
        console.log(err)
      },
    })
  }
}

module.exports = new Crawler()
