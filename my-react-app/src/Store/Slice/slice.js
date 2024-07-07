import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doRemovePrdt, doShowBookInCart } from "../../Service/home-controller";

export const fetchCartList = createAsyncThunk('fetchcartList', async () =>{
    // console.log("first")
    const serverMsg = await doShowBookInCart()
    console.log(serverMsg.data.result)
    return serverMsg.data.result
})

export const removePrdtFromCart = createAsyncThunk('removePrdtFromCart', async (uId) =>{
    const serverMsg = await doRemovePrdt(uId)
    // if(serverMsg.data.status)
    return serverMsg.data
    
})
const cartSlice = createSlice(
    {
        name: "cartlist",
        initialState:{
            items: [],
            status: 'idle',
            error: null,
        },
        extraReducers: (builder) =>{
            builder.addCase(fetchCartList.pending, (state,action)=>{
                state.status = 'loading';
            })
            builder.addCase(fetchCartList.fulfilled, (state,action) =>{
                state.status = 'successed';
                state.items = action.payload;
            })
            builder.addCase(fetchCartList.rejected, (state,action)=>{
                console.log('error', action.payload);
                state.status = 'failed'
                state.error = action.error.message
            })
            builder.addCase(removePrdtFromCart.fulfilled, (state,action)=>{
                alert(action.payload.msg)
                if(action.payload.msg==='deleted')
                state.items = state.items.filter(item => item.uId !== action.payload.data)
            })
            builder.addCase(removePrdtFromCart.rejected, (state,action)=>{
                state.error = action.payload.err
            })
        }
    }
);


export default cartSlice.reducer;