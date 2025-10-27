import {
   Avatar,
   Box,
   Button,
   Container,
   CssBaseline,
   Grid,
   Link,
   TextField,
   Typography,
   Alert
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/Store.ts";
import { useForm } from "react-hook-form";
import { registerUser, clearRegistrationSuccess } from "./AccountSlice.ts";
import { LoadingButton } from "@mui/lab";
import { useEffect } from "react";


export default function Register() {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const { registrationSuccess, error } = useAppSelector(state => state.account);


   const {
       register,
       handleSubmit,
       formState: { errors, isSubmitting, isValid },
       watch
   } = useForm({
       mode: "onTouched"
   });


   const password = watch("password");


   useEffect(() => {
       if (registrationSuccess) {
           setTimeout(() => {
               dispatch(clearRegistrationSuccess());
               navigate('/login');
           }, 2000);
       }
   }, [registrationSuccess, navigate, dispatch]);


   const onSubmit = async (data: any) => {
       try {
           await dispatch(registerUser(data)).unwrap();
       } catch (err) {
           console.error('Registration error:', err);
       }
   };


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
                   Register
               </Typography>


               {registrationSuccess && (
                   <Alert severity="success" sx={{ mt: 2, width: '100%' }}>
                       Registration successful! Redirecting to login...
                   </Alert>
               )}


               {error && (
                   <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
                       {error}
                   </Alert>
               )}


               <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                   <Grid container spacing={2}>
                       <Grid item xs={12} sm={6}>
                           <TextField
                               autoComplete="given-name"
                               fullWidth
                               id="firstName"
                               label="First Name"
                               autoFocus
                               {...register("firstName")}
                           />
                       </Grid>
                       <Grid item xs={12} sm={6}>
                           <TextField
                               fullWidth
                               id="lastName"
                               label="Last Name"
                               autoComplete="family-name"
                               {...register("lastName")}
                           />
                       </Grid>
                       <Grid item xs={12}>
                           <TextField
                               required
                               fullWidth
                               id="username"
                               label="Username"
                               autoComplete="username"
                               {...register("username", {
                                   required: "Username is required",
                                   minLength: {
                                       value: 3,
                                       message: "Username must be at least 3 characters"
                                   },
                                   maxLength: {
                                       value: 20,
                                       message: "Username must not exceed 20 characters"
                                   }
                               })}
                               error={!!errors.username}
                               helperText={errors.username?.message as string}
                           />
                       </Grid>
                       <Grid item xs={12}>
                           <TextField
                               required
                               fullWidth
                               id="email"
                               label="Email Address"
                               autoComplete="email"
                               {...register("email", {
                                   required: "Email is required",
                                   pattern: {
                                       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                       message: "Invalid email address"
                                   }
                               })}
                               error={!!errors.email}
                               helperText={errors.email?.message as string}
                           />
                       </Grid>
                       <Grid item xs={12}>
                           <TextField
                               fullWidth
                               id="phoneNumber"
                               label="Phone Number"
                               autoComplete="tel"
                               {...register("phoneNumber")}
                           />
                       </Grid>
                       <Grid item xs={12}>
                           <TextField
                               required
                               fullWidth
                               label="Password"
                               type="password"
                               id="password"
                               autoComplete="new-password"
                               {...register("password", {
                                   required: "Password is required",
                                   minLength: {
                                       value: 6,
                                       message: "Password must be at least 6 characters"
                                   },
                                   maxLength: {
                                       value: 40,
                                       message: "Password must not exceed 40 characters"
                                   }
                               })}
                               error={!!errors.password}
                               helperText={errors.password?.message as string}
                           />
                       </Grid>
                       <Grid item xs={12}>
                           <TextField
                               required
                               fullWidth
                               label="Confirm Password"
                               type="password"
                               id="confirmPassword"
                               autoComplete="new-password"
                               {...register("confirmPassword", {
                                   required: "Please confirm your password",
                                   validate: (value) =>
                                       value === password || "Passwords do not match"
                               })}
                               error={!!errors.confirmPassword}
                               helperText={errors.confirmPassword?.message as string}
                           />
                       </Grid>
                   </Grid>


                   <LoadingButton
                       type="submit"
                       fullWidth
                       variant="contained"
                       sx={{ mt: 3, mb: 2 }}
                       loading={isSubmitting}
                       disabled={!isValid || isSubmitting}
                   >
                       Register
                   </LoadingButton>


                   <Grid container justifyContent="flex-end">
                       <Grid item>
                           <Link href="/login" variant="body2">
                               Already have an account? Sign in
                           </Link>
                       </Grid>
                   </Grid>
               </Box>
           </Box>
       </Container>
   );
}
