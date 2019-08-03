const express = require('express');
const router = express.Router();
const middlewares = require('./middlewares')

router.get('/todos', middlewares.sendTodoList);

router.post('/todos', [
    middlewares.validateRequest,
    middlewares.extendTodoList,
    middlewares.sendTodoList
]);

module.exports = router;