import {Button, Fade, Menu, MenuItem} from "@mui/material";
import {logOut} from "../../features/account/AccountSlice.ts";
import {useAppDispatch, useAppSelector} from "../store/Store.ts";
import {useState} from "react";

export default function SignedInMenu() {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.account);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }
    return (
        <>
            <Button
                onClick={handleClick}
                color='inherit'
                sx={{typography:'h6'}}
            >
                Hi, {user?.username}
            </Button>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose} TransitionComponent={Fade}>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem href='/orders' >My Orders</MenuItem>
                <MenuItem onClick={()=>dispatch(logOut())}>Logout</MenuItem>
            </Menu>
        </>
    );
}