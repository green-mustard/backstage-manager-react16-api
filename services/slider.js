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

  async getSliderData() {
    return await SliderModel.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt', 'imgUrl'] },
    })
  }

  async changeSliderStatus(id, status) {
    const result = await SliderModel.update(
      { status },
      {
        where: {
          cid: id,
        },
      },
    )
    return result[0]
  }
}
module.exports = new SliderService()
