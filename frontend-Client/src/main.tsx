import { createRoot } from 'react-dom/client'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './app/layout/index.css'

import {RouterProvider} from "react-router-dom";
import {router} from "./app/routers/Routes.tsx";
import { Provider } from 'react-redux';
import {Store} from "./app/store/Store.ts";

createRoot(document.getElementById('root')!).render(
  <Provider store={Store}>
    <RouterProvider router={router}/>
  </Provider>,
)
