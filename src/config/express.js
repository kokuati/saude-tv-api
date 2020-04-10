const express = require('express');
const bodyParser = require('body-parser');

module.exports = () => {
    const app = express();

    // SETANDO VARIÁVEIS DA APLICAÇÃO
    app.set('port', process.env.PORT || 8080);

    // MIDDLEWARES
    app.use(bodyParser.json());

    return app;
};