import middlewares from './middlewares';
const todoList = require('./todo-list');

describe('middlewares iddleware', () => {
  let req;
  let res;
  let next;

  beforeAll(() => {
    console.log('--------------- 1');
    res = {
      json: jest.fn(),
    };
    next = jest.fn()
  });

  describe('sendTodoList', () => {
    beforeAll(() => {
      console.log('--------------- 2');
    });

    it('should send todoList', () => {
      middlewares.sendTodoList(req, res, next);
      expect(res.json).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(todoList);
    })

  });

});
