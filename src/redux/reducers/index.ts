import { combineReducers } from '@reduxjs/toolkit';

import auth from './auth';
import indicatorMessages from './indicatorMessages';
import indicatorMessage from './indicatorMessage';

const rootReducer = combineReducers({
  auth,
  indicatorMessages,
  indicatorMessage,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
