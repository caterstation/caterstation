import { configureStore } from "@reduxjs/toolkit";
import myPackageReducer from '../redux/MyPackageSlice'
import UserInfo from '../redux/MyUserSlice'
export const MyStore=configureStore({
    reducer:{
        package:myPackageReducer,
        user:UserInfo,
        
        
    },
});