import {Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import Header from "./Header.tsx";
import {useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useAppDispatch} from "../store/Store.ts";
import {getBasketFromLocalStorage} from "../utils/Utils.ts";
import {setBasket} from "../../features/basket/BasketSlice.ts";
import {fetchCurrentUser} from "../../features/account/AccountSlice.ts";
import agent from "../api/agent.ts";
import Spinner from "./Spinner.tsx";

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const paletteType = darkMode ? "dark" : "light";
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const basket = getBasketFromLocalStorage();
        dispatch(fetchCurrentUser());
        if(basket){
            agent.Bassket.get()
                .then(basket=>dispatch(setBasket(basket)))
                .catch(error=> console.log(error))
                .finally(()=>setLoading(false));
        }else{
            setLoading(false)
        }
    }, [dispatch])

    const theme = createTheme({
        palette:{
            mode:paletteType,
        }
    });
    function handleThemeChange() {
        setDarkMode(!darkMode);
    }
    if(loading)return <Spinner message="getting Basket..."/>
    return(
        <ThemeProvider theme={theme}>
            <ToastContainer position='top-center' hideProgressBar theme='colored'/>
            <CssBaseline />
            <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
            <Container sx={{mt:10}}>
                <Outlet/>
            </Container>
        </ThemeProvider>
    )
}

export default App
