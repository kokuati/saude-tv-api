const auth = require("../middleware/auth");

const simpleGit = require('simple-git')();
const v1ApiController = require('./apis/v1');
var versionGit = '0.0.1'

var swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('../config/swagger.json');

module.exports = {
  async register(app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    // app.use("/v1/auth", UserController.login);
    // app.use(auth);
    app.use('/v1', v1ApiController);
    app.get("/", ({ res }) => {
      res.json({
        appName: "Bora! API",
        currentVersionApi: versionGit
      });
    });
  }
};
