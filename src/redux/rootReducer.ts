import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './slices/auth'

export const rootPersistConfig = {
    key: 'root',
    storage,
    keyPrefix: 'redux-',
    whitelist: []
}

const authPersistConfig = {
    key: 'auth',
    storage,
    keyPrefix: 'redux-',
    whitelist: ['isAuthenticated', 'user']
}

const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer)
})

export default rootReducer
