  // {
  //   notes: [
  //     {
  //       content: 'reducer defines how redux store works',
  //       important: true,
  //       id: 1,
  //     },
  //     {
  //       content: 'state of store can contain any data',
  //       important: false,
  //       id: 2,
  //     },
  //   ],
  //   filter: 'NONE',
  // };

const filterReducer = (state = 'ALL', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload;
    default:
      return "ALL";
  }
}

export const filterChange = (filter) => {
  return {
    type: 'SET_FILTER',
    payload: filter,
  };
};

export default filterReducer;