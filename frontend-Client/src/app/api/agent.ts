import axios, { AxiosError, AxiosResponse } from "axios";
import {router} from "../routers/Routes.tsx";
import { toast } from "react-toastify";
import basketService from "./BasketService.ts";
import {Product} from "../model/Product.ts";
import {Dispatch} from "@reduxjs/toolkit";
import {Basket} from "../model/Basket.ts";




axios.defaults.baseURL ='http://localhost:8054/api/';


const idle = () => new Promise(resolve => setTimeout(resolve, 100));
const responseBody = (response: AxiosResponse) => response.data;


axios.interceptors.request.use(
   (config) => {
       const userString = localStorage.getItem('user');
       if (userString) {
           const user = JSON.parse(userString);
           if (user && user.token) {
               config.headers.Authorization = `Bearer ${user.token}`;
           }
       }
       return config;
   },
   (error) => {
       return Promise.reject(error);
   }
);




axios.interceptors.response.use(
   async response => {
       await idle();
       return response;
   },
   (error: AxiosError) => {
       const { status } = error.response as AxiosResponse;
       switch (status) {
           case 401:
               toast.error("Unauthorized - Please login again");
               localStorage.removeItem('user');
               router.navigate('/login');
               break;
           case 403:
               toast.error("Forbidden - You don't have permission");
               break;
           case 404:
               toast.error("Resource not found");
               router.navigate('/not-found');
               break;
           case 500:
               toast.error("Internal server error occurred");
               router.navigate('/server-error');
               break;
           case 503:
               toast.error("Service temporarily unavailable");
               break;
           default:
               toast.error("An error occurred");
               break;
       }
       return Promise.reject(error.message);
   }
);


const requests = {
   get: (url: string) => axios.get(url).then(responseBody),
   post: (url: string, body: object) => axios.post(url, body).then(responseBody),
   put: (url: string, body: object) =>axios.put(url, body).then(responseBody),
   delete: (url: string) =>axios.put(url).then(responseBody)
}


const Store = {
   apiUrl: 'products',
   list:(page: number, size: number, brandId?: number, typeId?: number, url?: string)=> {
       let requestUrl = url || `products?page=${page-1}&size=${size}`;
       if(brandId!==undefined){
           requestUrl += `&brandId=${brandId}`;
       }
       if(typeId!==undefined){
           requestUrl += `&typeId=${typeId}`;
       }
       return requests.get(requestUrl);
   },
   details:(id: number) => requests.get(`products/${id}`),
   types:() => requests.get(`products/types`).then(types => [{id: 0, name:'All'}, ...types]),
   brands:() => requests.get(`products/brands`).then(brands => [{id: 0, name:'All'}, ...brands]),
   search: (keyword: string) => requests.get(`products?keyword=${keyword}`)
}


const Bassket = {
   get: async() => {
       try{
           return await basketService.getBasket();
       }catch(error){
           console.error("Failed to get Basket: ", error);
           throw error;
       }
   },
    addItem: async (product: Product, dispatch: Dispatch) => {
           try {
               const result = await basketService.addItemToBasket(product, 1, dispatch);
               return result;
           } catch (error) {
               console.error("Failed to add new item to basket:", error);
               throw error;
           }
       },
   removeItem: async (itemId: number, dispatch: Dispatch)=>{
       try{
           await basketService.remove(itemId, dispatch);
       }catch(error){
           console.error("Failed to remove an item from basket:", error);
           throw error;
       }
   },
   incrementItemQuantity: async (itemId: number, quantity: number = 1, dispatch: Dispatch) => {
       try {
           await basketService.incrementItemQuantity(itemId, quantity, dispatch);
       } catch (error) {
           console.error("Failed to increment item quantity in basket:", error);
           throw error;
       }
   },
   decrementItemQuantity: async (itemId: number, quantity: number = 1, dispatch: Dispatch) => {
       try {
           await basketService.decrementItemQuantity(itemId, quantity, dispatch);
       } catch (error) {
           console.error("Failed to decrement item quantity in basket:", error);
           throw error;
       }
   },
   setBasket: async (basket: Basket, dispatch: Dispatch) => {
       try {
           await basketService.setBasket(basket, dispatch);
       } catch (error) {
           console.error("Failed to set basket:", error);
           throw error;
       }
   },
   deleteBasket: async(basketId: string) =>{
       try{
           await basketService.deleteBasket(basketId);
       } catch(error){
           console.log("Failed to delete the Basket");
           throw error;
       }
   }
}
const Account = {
   login: (values: any) => requests.post('auth/login', values),
   register: (values: any) => requests.post('auth/register', values),
   getCurrentUser: () => requests.get('auth/user')
};


const Orders ={
   list:() => requests.get('orders'),
   fetch:(id:number) => requests.get(`orders/${id}`),
   create:(values:any) => requests.post('orders', values)
}


const Health = {
   checkGateway: () => axios.get('http://localhost:8080/actuator/health').then(responseBody),
   checkEureka: () => axios.get('http://localhost:8761/actuator/health').then(responseBody),
   checkProduct: () => axios.get('http://localhost:8081/actuator/health').then(responseBody),
   checkBasket: () => axios.get('http://localhost:8082/actuator/health').then(responseBody),
   checkOrder: () => axios.get('http://localhost:8083/actuator/health').then(responseBody),
   checkAuth: () => axios.get('http://localhost:8084/actuator/health').then(responseBody)
};


const agent = {
   Store,
   Bassket,
   Account,
   Orders
}


export default agent;
