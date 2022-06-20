import storage from 'redux-persist/lib/storage'
import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import isLoggedInReducer from './../state/reducers/isLoggedInReducer'
import tokenReducer from './../state/reducers/tokenReducer' 

const persistConfig = {
    key: 'root',
    storage,
    whitelist:['isLoggedIn','token']
};



const rootReducer = combineReducers({ isLoggedIn: isLoggedInReducer, token:tokenReducer});
const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer);
export const persistor = persistStore(store);