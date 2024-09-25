import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IAuthState } from '../../interfaces/user'

const initialState: IAuthState = {
    isLoading: false,
    isAuthenticated: false,
    error: null,
    user: null,
    warrantyEndDate:null 
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        init(state, action) {
            state.isLoading = false
            state.isAuthenticated = true
            state.error = null
            state.user = action.payload
        },
        reset(state) {
            state.isLoading = false
            state.isAuthenticated = false
            state.error = null
            state.user = null
        },
        setUserData(state, action) {
            state.user = action.payload
        },
        setWarrantyEndDate(state, action) {
            state.warrantyEndDate = action.payload
        }
    }
})

export const { init, reset, setUserData,setWarrantyEndDate  } = authSlice.actions

export default authSlice.reducer
