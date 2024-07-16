const SliderModel = require('../database/models/slider')

class SliderService {
  async addSliderData(data) {
    try {
      // 查找是否已经存在表数据, 如果已存在数据则更新数据
      const cid = data.cid
      const result = await SliderModel.findOne({
        where: {
          cid,
        },
      })
      if (result) {
        return await SliderModel.update(data, {
          where: {
            cid,
          },
        })
      } else {
        return await SliderModel.create(data)
      }
    } catch (error) {
      console.log(error)
    }
  }
}
module.exports = new SliderService()
