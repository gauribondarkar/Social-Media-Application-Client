import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";


export const getMyInfo = createAsyncThunk('user/getMyInfo', async() => {
    try {
        console.log("we r inside thunk");
        const response = await axiosClient.get('/user/getMyInfo')
        console.log('api called data', response);
        return response.result;
    } catch (error) {
        return Promise.reject(error);
    }
})


export const updateMyProfile = createAsyncThunk('user/updateMyProfile', async (body) => {
    try {
        console.log ("this is body from appconfigslice", body);
        const response = await axiosClient.put('/user/', body);
        console.log ("api us called", response);
        return response.result;
    } catch (e) {
        return Promise.reject(e);
    }
})


const appConfigSlice = createSlice({
    name : 'appConfigSlice',
    initialState: {
        isLoading: false,
        toastData: {},
        myprofile: null
    },

    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },

        showToast: (state, action) => {
            state.toastData = action.payload;
        }
    },

    extraReducers: (builder) => {
        builder.addCase(getMyInfo.fulfilled, (state, action) => {
            state.myProfile = action.payload.user
        })
        .addCase(updateMyProfile.fulfilled, (state, action) => {
            state.myProfile = action.payload.user
        })
    }
})

export default appConfigSlice.reducer;

export const {setLoading, showToast} = appConfigSlice.actions;