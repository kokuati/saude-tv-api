const Model = require("../../models/Content");
const Service = require('../service');
const { uploadBase64, getObjectFromS3 } = require('../../helpers/s3');
const { default: axios } = require("axios");
const Entity = 'content'

class Content extends Service {
  constructor() {
    super(Entity, Model);
  }

  index = (req, res) => {
    super.index(req, res);
  }

  show = (req, res) => {
    super.show(req, res, async () => {
      try {
        const content = await Model.findById(req.params.id);
        if (content.type != "RSS") {
          const fileName = `${req.user.customer._id.toString()}/${content._id.toString()}`
          const file = await getObjectFromS3("saude-tv-contents", fileName)
          content.file = file
        }
        return content
      } catch (error) {
        console.error(error);
      }
    });
  }

  store = (req, res) => {
    super.store(req, res, async () => {
      try {
        if (req.body.type === "VIDEO") {
          const fileBase64 = req.body.file
          delete req.body.file;
          const content = await Model.create(req.body);
          const fileName = `${req.user.customer.toString()}/${content._id.toString()}`
          await uploadBase64("saude-tv-contents", fileName, fileBase64)
          const type = fileName.split(';')[0].split('/')[1];
          content.file = `${fileBase64}.${type}`
          content.save()
          return content
        } else {
          return await Model.create(req.body);
        }
      } catch (error) {
        console.error(error);
      }
    });
  }

  getupdatedAt = async (req, res) => {
    try {
      const updatedAt = await axios.get()
      res.status(200).json(updatedAt.data);
      console.log(updatedAt);
    } catch (error) {
      res.status(404).json({"error": "Não encontrado."});
    }
  }

  update = (req, res) => {
    super.update(req, res)
  }

  destroy = (req, res) => {
    super.destroy(req, res)
  }
}

module.exports = Content
