import {combineReducers, configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, PersistConfig, persistStore} from 'redux-persist';
import * as rp from 'redux-persist';
import categories, {CategoriesState} from './slices/categories';
import machines, {MachinesState} from './slices/machines';

export interface RootState {
  categories: CategoriesState;
  machines: MachinesState;
}

const rootReducer = combineReducers<RootState>({
  categories,
  machines,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
} as PersistConfig<RootState>;

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    if (__DEV__) {
      const createDebugger = require('redux-flipper').default;
      return getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            rp.FLUSH,
            rp.REHYDRATE,
            rp.PAUSE,
            rp.PERSIST,
            rp.PURGE,
            rp.REGISTER,
          ],
        },
      }).concat(createDebugger());
    }

    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          rp.FLUSH,
          rp.REHYDRATE,
          rp.PAUSE,
          rp.PERSIST,
          rp.PURGE,
          rp.REGISTER,
        ],
      },
    });
  },
});

export const persistor = persistStore(store);
export default store;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
