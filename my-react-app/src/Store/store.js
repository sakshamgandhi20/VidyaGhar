import {configureStore} from '@reduxjs/toolkit'
import  cartReducer from './Slice/slice'

const store=configureStore(
    {
        reducer:{
           cartlist:cartReducer,
        }
    }
)
export default store