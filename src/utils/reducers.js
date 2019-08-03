import * as actions from 'utils/actions';

const initialState = {
  todo: ['test'],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_TODO:
      return {
        ...state,
        todo: state.todo.concat(action.payload),
      };
    default:
      return state;
  }
};
