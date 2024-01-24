/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showListing:false,
};

const listingSlice=createSlice({
    name:"listing",
    initialState,
    reducers:{
        showlisting:(state)=>{
            state.showListing=true;
        },
        hidelisting:(state)=>{
            state.showListing=false;
        },
    },
});

export const {showlisting,hidelisting}=listingSlice.actions;
export default listingSlice.reducer;