import { configureStore } from '@reduxjs/toolkit'

import noteReducer from './reducers/noteReducerRefactored'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})

export default store;