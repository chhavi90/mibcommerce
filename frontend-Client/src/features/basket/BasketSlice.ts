import {createSlice} from "@reduxjs/toolkit";
import {Basket} from "../../app/model/Basket.ts";

interface BasketState {
    basket: Basket | null;
}

const initialState: BasketState = {
    basket: null
};

export const BasketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers:{
        setBasket: (state, action) => {
            console.log("setBasket state", state, "new basket state", action.payload);
            state.basket = action.payload;
        }
    }
})
export const {setBasket} = BasketSlice.actions;
export default BasketSlice.reducer;