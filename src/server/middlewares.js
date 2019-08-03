const todoList = require('./todo-list');

function validateRequest(req, res, next) {
    if (!req.body.item.match(/^[A-Za-z0-9 ]*$/)) {
        throw new Error('Validation error asd');
    }

    next();
}

function extendTodoList(req, res, next) {
    todoList.push(req.body.item);
    next();
}

function sendTodoList(req, res, next) {
    res.json(todoList);
}

module.exports = {
    validateRequest,
    extendTodoList,
    sendTodoList
};
