import { configureStore } from "@reduxjs/toolkit";
import {BasketSlice} from "../../features/basket/BasketSlice.ts";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AccountSlice} from "../../features/account/AccountSlice.ts";

export const Store = configureStore({
    reducer: {
        basket: BasketSlice.reducer,
        account: AccountSlice.reducer
    }
})

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
//