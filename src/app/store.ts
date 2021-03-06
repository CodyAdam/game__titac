import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import boardReducer from '../features/board/boardSlice';
import undoable from 'redux-undo';

export const store = configureStore({
  reducer: {
    board: undoable(boardReducer),
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
