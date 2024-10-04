import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";




const INITIAL_STATE = {
    cartList: [],
    cartCount: 0,
    userDetail: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState: INITIAL_STATE,
    reducers: {
        updateUser: (state, action) => {
            state.userDetail.push(action.payload);
        },
        addToCart: (state, action) => {
            const itemExist = state.cartList.find((item) => item?.id === action.payload.id);
            if (itemExist) {
                // count 1 - logic
                state.cartList.forEach((item) => {
                    if (item?.id === action.payload.id) {
                        item.count = 1;
                    }
                });
                return
            }
            state.cartList.push({
                ...action.payload,
                count: 1,
            });

        },
        increment: (state, action) => {
            const productID = action.payload;
            state.cartList.forEach((item) => {
                if (item?.id === productID) { // item?.id === productID && item.count++;
                    item.count++;
                }
            });
        },
        decrement: (state, action) => {
            const productID = action.payload;
            state.cartList.forEach((item) => {
                if (item?.id === productID) { // item?.id === productID && item.count--;
                    item.count--;
                }
            });
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchUser.pending, (state, action) => {
    //             console.log("Loading Sart");
    //         })
    //         .addCase(fetchUser.fulfilled, (state, action) => {
    //             console.log("Loading End");
    //             console.log("Success");
    //             state.userDetail.push(action.payload);
    //         })
    //         .addCase(fetchUser.rejected, (state, action) => {
    //             console.log("Loading End");
    //             console.log("Error");
    //         });
    // }
});

export const { increment, decrement, addToCart, updateUser } = cartSlice.actions;

export default cartSlice.reducer;
//------------------
 // a Promise has 3 states -->
 // pending
 // fullfilled
 // rejected
//--------------
 // https://jsonplaceholder.typicode.com/todos/1