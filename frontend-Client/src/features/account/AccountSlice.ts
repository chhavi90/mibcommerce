import {User} from "../../app/model/User.ts";
import {createAsyncThunk, createSlice, isAnyOf} from "@reduxjs/toolkit";
import {FieldValues} from "react-hook-form";
import agent from "../../app/api/agent.ts";
import {router} from "../../app/routers/Routes.tsx";
import {toast} from "react-toastify";

interface AccountState {
    user: User | null;
    error: string | null;
    isLoggedIn: boolean;
}

const initialState: AccountState = {
    user: null,
    error: null,
    isLoggedIn: false
}

export const AccountSlice = createSlice({
    name:'account',
    initialState,
    reducers:{
        logOut: (state) => {
            localStorage.removeItem('user');
            state.user = null;
            state.error = null;
            state.isLoggedIn = false;
            router.navigate('/');
            toast.info("logged out!");
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers:(builder) =>{
        builder.addMatcher(isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled), (state, action)=>{
            state.user = action.payload;
            state.error = null;
            if(state.isLoggedIn){
                toast.success('Signed in successfully');
            }
            localStorage.setItem('user', JSON.stringify(action.payload));
            state.isLoggedIn = true;
        });
        builder.addMatcher(isAnyOf(signInUser.rejected, fetchCurrentUser.rejected, logoutUser.fulfilled), (state, action)=>{
            state.error = action.payload as string | null;
            if(action.type === 'auth/login/rejected'){
                toast.error('Sign in failed, please try again!');
            }
        });
    },
});

export const signInUser = createAsyncThunk<User, FieldValues>(
    'auth/login',
    async (data, thunkAPI) =>{
        try{
            const user = await agent.Account.login(data);
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        }catch (err:unknown){
                return thunkAPI.rejectWithValue({err: err.message || 'sign in failed'})
        }
    }
);

export const fetchCurrentUser = createAsyncThunk<User | null>(
    'auth/fetchCurrentUser',
    async (_, thunkAPI) =>{
        try{
            //retrieve user data from localStorage
            const userString = localStorage.getItem('user');
            if(userString){
                return JSON.parse(userString) as User;
            }
            return null;

        }catch (err:any){
            return thunkAPI.rejectWithValue({err: err.response?.data || 'Failed to fetch user'});
        }
    }
);

export const logoutUser = createAsyncThunk<void>(
    'auth/logout',
    async (_, thunkAPI) =>{
        try{
            //remove user from storage
            localStorage.removeItem('user');
        }catch (err:unknown){
            return thunkAPI.rejectWithValue({err: err.response.data});
        }
    }
);

export const {logOut, clearError} = AccountSlice.actions;