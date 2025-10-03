import { LoadingButton } from "@mui/lab";
import {Avatar, Box, Checkbox, Container, CssBaseline, FormControlLabel, Grid, Link, TextField, Typography} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {useLocation, useNavigate} from "react-router-dom";
import {Store, useAppDispatch} from "../../app/store/Store.ts";
import {FieldValues, useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {signInUser} from "./AccountSlice.ts";

export default function SignIn() {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const {register, handleSubmit, formState:{isSubmitting, errors, isValid}} = useForm({
        mode: "onTouched"
    })
    async function submitForm(data: FieldValues) {
        try{
            await dispatch(signInUser(data));
            const {user} = Store.getState().account;
            if(user){
                //navigate user to store
                navigate(location.state?.from || '/store');
            }else{
                toast.error('Sign in failed, please try again');
            }
        }catch (err){
            console.log('Error Signing In',err);
            toast.error('Signing failed, please try again');
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        autoFocus
                        {...register('username',{required:"username is required"})}
                        error={!!errors.username}
                        helperText={errors?.username?.message as string}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        {...register('password',{required:"password is required"})}
                        error={!!errors.password}
                        helperText={errors?.password?.message as string}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <LoadingButton loading={isSubmitting}
                                   disabled={!isValid}
                                   type="submit"
                                   fullWidth
                                   variant="contained"
                                   sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </LoadingButton>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href='/register' variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}