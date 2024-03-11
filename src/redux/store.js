import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import createFilter from 'redux-persist-transform-filter';
import storage from 'redux-persist/lib/storage';

//slices
import authReducer from './features/auth/authSlice.js';
import emailReducer from './features/email/emailSlice.js';
import filterReducer from './features/auth/filterSlice.js';
import chatReducer from './features/chat/chatSlice.js';

//saveAuthOnlyFilter
const saveAuthOnlyFilter = createFilter('auth', ['auth']);

//persist config
const persistConfig = {
	key: 'auth',
	storage,
	whitelist: ['auth'],
	transforms: [saveAuthOnlyFilter],
};

const rootReducer = combineReducers({
	auth: authReducer,
	email: emailReducer,
	filter: filterReducer,
	chat: chatReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
	devTools: true,
});
