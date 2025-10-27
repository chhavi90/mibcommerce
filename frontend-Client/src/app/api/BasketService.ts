// // import axios from "axios";
// // import {Basket, BasketItem, BasketTotals} from "../model/Basket.ts";
// // import {Product} from "../model/Product.ts";
// // import {Dispatch} from "@reduxjs/toolkit";
// // import { setBasket } from "../../features/basket/BasketSlice.ts";
// // import { createId } from '@paralleldrive/cuid2'
// //
// //
// // class BasketService {
// //     apiUrl = "http://localhost:8054/api/basket";
// //
// //     // async getBasketFromApi(){
// //     //     try{
// //     //         const response = await axios.get<Basket>(`${this.apiUrl}`);
// //     //         return response.data;
// //     //     }catch(error){
// //     //         throw new Error("Failed to retrieve the basket." + error)
// //     //     }
// //     // }
// //
// //     async getBasket(){
// //         try{
// //             const basket = localStorage.getItem('basket');
// //             if(basket){
// //                 return JSON.parse(basket) as Basket;
// //             }else {
// //                console.log("Basket not found in local storage");
// //             }
// //         } catch(error){
// //             throw new Error("Failed to retrieve the basket: " + error);
// //         }
// //     }
// //
// //     async addItemToBasket(item: Product, quantity = 1, dispatch: Dispatch){
// //         try{
// //             let basket = this.getCurrentBasket();
// //             if(!basket){
// //                 basket = await this.createBasket();
// //             }
// //             const itemToAdd = this.mapProductToBasket(item);
// //             basket.items = this.upsertItems(basket.items, itemToAdd, quantity);
// //             await this.setBasket(basket, dispatch);
// //             //calculate totals
// //             const totals = this.calculateTotals(basket);
// //             return {basket, totals};
// //         }catch(error){
// //             throw new Error("Failed to add and intem to Basket." + error)
// //         }
// //     }
// //
// //     async remove(itemId: number, dispatch: Dispatch){
// //         const basket = this.getCurrentBasket();
// //         if(basket){
// //             const itemIndex = basket.items.findIndex((p)=>p.id === itemId);
// //             if(itemIndex!==-1){
// //                 basket.items.splice(itemIndex, 1);
// //                 await this.setBasket(basket, dispatch);
// //             }
// //             //check if basket is empty after removing the item
// //             if(basket.items.length === 0){
// //                 //clear the basket from the local storage
// //                 localStorage.removeItem('basket_id');
// //                 localStorage.removeItem('basket');
// //             }
// //         }
// //     }
// //
// //     async incrementItemQuantity(itemId: number, quantity:number = 1, dispatch: Dispatch){
// //         const basket = this.getCurrentBasket();
// //         if(basket){
// //             const item = basket.items.find((p)=>p.id === itemId);
// //             if(item){
// //                 item.quantity += quantity;
// //                 if(item.quantity<1){
// //                     item.quantity = 1;
// //                 }
// //                 await this.setBasket(basket, dispatch);
// //             }
// //         }
// //     }
// //
// //     async decrementItemQuantity(itemId: number, quantity:number = 1, dispatch: Dispatch){
// //         const basket = this.getCurrentBasket();
// //         if(basket){
// //             const item = basket.items.find((p)=>p.id === itemId);
// //             if(item && item.quantity >1){
// //                 item.quantity -= quantity;
// //                 await this.setBasket(basket, dispatch);
// //             }
// //         }
// //     }
// //
// //     async deleteBasket(basketId: string):Promise<void>{
// //         try{
// //             await axios.delete(`${this.apiUrl}/${basketId}`);
// //         }catch(error){
// //             throw new Error("Failed to delete the basket." + error)
// //         }
// //     }
// //
// //     async setBasket(basket: Basket, dispatch: Dispatch){
// //         try{
// //             await axios.post<Basket>(this.apiUrl, basket);
// //             localStorage.setItem('basket', JSON.stringify(basket));
// //             dispatch(setBasket(basket));
// //         }catch(error){
// //             throw new Error("Failed to update basket." + error)
// //         }
// //     }
// //
// //     private getCurrentBasket() {
// //         const basket = localStorage.getItem('basket');
// //         return basket ? JSON.parse(basket) as Basket : null;
// //     }
// //
// //     private async createBasket(): Promise<Basket>{
// //         try{
// //             const newBasket: Basket = {
// //                 id: createId(),
// //                 items: []
// //             }
// //             localStorage.setItem('basket_id', newBasket.id);
// //             return newBasket;
// //         }catch(error){
// //             throw new Error("Failed to create Basket." + error);
// //         }
// //     }
// //     private mapProductToBasket(item: Product): BasketItem {
// //         return {
// //             id: item.id,
// //             name: item.name,
// //             price: item.price,
// //             description: item.description,
// //             quantity: 0,
// //             pictureUrl: item.pictureUrl,
// //             productBrand: item.productBrand,
// //             productType: item.productType
// //         };
// //     }
// //     private upsertItems(items: BasketItem[], itemToAdd: BasketItem, quantity: number): BasketItem[]{
// //         const existingItem = items.find(x=>x.id == itemToAdd.id);
// //         if(existingItem){
// //             existingItem.quantity += quantity;
// //         }else{
// //             itemToAdd.quantity = quantity;
// //             items.push(itemToAdd);
// //         }
// //         return items;
// //     }
// //     private calculateTotals(basket: Basket): BasketTotals{
// //         const shipping = 0;
// //         const subtotals = basket.items.reduce((acc, item)=>acc+(item.price*item.quantity), 0);
// //         const totals = shipping + subtotals;
// //         return { shipping, subtotals, totals};
// //     }
// // }
// // export default new BasketService();
//
// import axios from "axios";
// import {Basket, BasketItem, BasketTotals} from "../model/Basket.ts";
// import {Product} from "../model/Product.ts";
// import {Dispatch} from "@reduxjs/toolkit";
// import { setBasket } from "../../features/basket/BasketSlice.ts";
// import { createId } from '@paralleldrive/cuid2'
//
//
// class BasketService {
//     // ✅ REMOVED: No hardcoded URL needed - uses axios.defaults.baseURL from agent.ts
//
//     async getBasket(){
//         try{
//             const basket = localStorage.getItem('basket');
//             if(basket){
//                 return JSON.parse(basket) as Basket;
//             }else {
//                console.log("Basket not found in local storage");
//             }
//         } catch(error){
//             throw new Error("Failed to retrieve the basket: " + error);
//         }
//     }
//
//     async addItemToBasket(item: Product, quantity = 1, dispatch: Dispatch){
//         try{
//             let basket = this.getCurrentBasket();
//             if(!basket){
//                 basket = await this.createBasket();
//             }
//             const itemToAdd = this.mapProductToBasket(item);
//             basket.items = this.upsertItems(basket.items, itemToAdd, quantity);
//             await this.setBasket(basket, dispatch);
//             //calculate totals
//             const totals = this.calculateTotals(basket);
//             return {basket, totals};
//         }catch(error){
//             throw new Error("Failed to add an item to Basket." + error)
//         }
//     }
//
//     async remove(itemId: number, dispatch: Dispatch){
//         const basket = this.getCurrentBasket();
//         if(basket){
//             const itemIndex = basket.items.findIndex((p)=>p.id === itemId);
//             if(itemIndex!==-1){
//                 basket.items.splice(itemIndex, 1);
//                 await this.setBasket(basket, dispatch);
//             }
//             //check if basket is empty after removing the item
//             if(basket.items.length === 0){
//                 //clear the basket from the local storage
//                 localStorage.removeItem('basket_id');
//                 localStorage.removeItem('basket');
//                 dispatch(setBasket(null));
//             }
//         }
//     }
//
//     async incrementItemQuantity(itemId: number, quantity:number = 1, dispatch: Dispatch){
//         const basket = this.getCurrentBasket();
//         if(basket){
//             const item = basket.items.find((p)=>p.id === itemId);
//             if(item){
//                 item.quantity += quantity;
//                 if(item.quantity<1){
//                     item.quantity = 1;
//                 }
//                 await this.setBasket(basket, dispatch);
//             }
//         }
//     }
//
//     async decrementItemQuantity(itemId: number, quantity:number = 1, dispatch: Dispatch){
//         const basket = this.getCurrentBasket();
//         if(basket){
//             const item = basket.items.find((p)=>p.id === itemId);
//             if(item && item.quantity >1){
//                 item.quantity -= quantity;
//                 await this.setBasket(basket, dispatch);
//             }
//         }
//     }
//
//     async deleteBasket(basketId: string):Promise<void>{
//         try{
//             // ✅ FIXED: Use relative URL - axios will prepend baseURL from agent.ts
//             await axios.delete(`basket/${basketId}`);
//             localStorage.removeItem('basket_id');
//             localStorage.removeItem('basket');
//         }catch(error: any){
//             // ✅ FIXED: Better error handling
//             if (!error.response) {
//                 throw new Error(`Failed to delete basket. Network error: ${error.message || 'Cannot connect to server'}`);
//             }
//             throw new Error(`Failed to delete the basket. Status: ${error.response?.status}. ${error.message}`);
//         }
//     }
//
//     async setBasket(basket: Basket, dispatch: Dispatch){
//         try{
//             // ✅ FIXED: Use relative URL 'basket' instead of this.apiUrl
//             // This will use http://localhost:8054/api/ + 'basket'
//             const response = await axios.post<Basket>('basket', basket);
//             localStorage.setItem('basket', JSON.stringify(response.data));
//             dispatch(setBasket(response.data));
//         }catch(error: any){
//             // ✅ FIXED: Better error handling for network issues
//             if (!error.response) {
//                 console.error("Network error details:", error);
//                 throw new Error(`Failed to update basket. Network error: ${error.message || 'Cannot connect to API Gateway on port 8054. Please ensure all services are running.'}`);
//             }
//
//             // Handle HTTP errors
//             const { status } = error.response;
//             const errorMessage = error.response?.data?.message || error.message;
//             console.error(`HTTP Error ${status}:`, errorMessage);
//             throw new Error(`Failed to update basket. Status: ${status}. ${errorMessage}`);
//         }
//     }
//
//     private getCurrentBasket() {
//         const basket = localStorage.getItem('basket');
//         return basket ? JSON.parse(basket) as Basket : null;
//     }
//
//     private async createBasket(): Promise<Basket>{
//         try{
//             const newBasket: Basket = {
//                 id: createId(),
//                 items: []
//             }
//             localStorage.setItem('basket_id', newBasket.id);
//             return newBasket;
//         }catch(error){
//             throw new Error("Failed to create Basket." + error);
//         }
//     }
//
//     private mapProductToBasket(item: Product): BasketItem {
//         return {
//             id: item.id,
//             name: item.name,
//             price: item.price,
//             description: item.description,
//             quantity: 0,
//             pictureUrl: item.pictureUrl,
//             productBrand: item.productBrand,
//             productType: item.productType
//         };
//     }
//
//     private upsertItems(items: BasketItem[], itemToAdd: BasketItem, quantity: number): BasketItem[]{
//         const existingItem = items.find(x=>x.id == itemToAdd.id);
//         if(existingItem){
//             existingItem.quantity += quantity;
//         }else{
//             itemToAdd.quantity = quantity;
//             items.push(itemToAdd);
//         }
//         return items;
//     }
//
//     private calculateTotals(basket: Basket): BasketTotals{
//         const shipping = 0;
//         const subtotals = basket.items.reduce((acc, item)=>acc+(item.price*item.quantity), 0);
//         const totals = shipping + subtotals;
//         return { shipping, subtotals, totals};
//     }
// }
//
// export default new BasketService();

import axios from "axios";
import {Basket, BasketItem, BasketTotals} from "../model/Basket.ts";
import {Product} from "../model/Product.ts";
import {Dispatch} from "@reduxjs/toolkit";
import { setBasket } from "../../features/basket/BasketSlice.ts";
import { createId } from '@paralleldrive/cuid2'


class BasketService {
    apiUrl = "http://localhost:8054/api/basket";

    // async getBasketFromApi(){
    //     try{
    //         const response = await axios.get<Basket>(`${this.apiUrl}`);
    //         return response.data;
    //     }catch(error){
    //         throw new Error("Failed to retrieve the basket." + error)
    //     }
    // }

    async getBasket(){
        try{
            const basket = localStorage.getItem('basket');
            if(basket){
                return JSON.parse(basket) as Basket;
            }else {
               console.log("Basket not found in local storage");
            }
        } catch(error){
            throw new Error("Failed to retrieve the basket: " + error);
        }
    }

    async addItemToBasket(item: Product, quantity = 1, dispatch: Dispatch){
        try{
            let basket = this.getCurrentBasket();
            if(!basket){
                basket = await this.createBasket();
            }
            const itemToAdd = this.mapProductToBasket(item);
            basket.items = this.upsertItems(basket.items, itemToAdd, quantity);
            await this.setBasket(basket, dispatch);
            //calculate totals
            const totals = this.calculateTotals(basket);
            return {basket, totals};
        }catch(error){
            throw new Error("Failed to add and item to Basket." + error)
        }
    }

    async remove(itemId: number, dispatch: Dispatch){
        const basket = this.getCurrentBasket();
        if(basket){
            const itemIndex = basket.items.findIndex((p)=>p.id === itemId);
            if(itemIndex!==-1){
                basket.items.splice(itemIndex, 1);
                await this.setBasket(basket, dispatch);
            }
            //check if basket is empty after removing the item
            if(basket.items.length === 0){
                //clear the basket from the local storage
                localStorage.removeItem('basket_id');
                localStorage.removeItem('basket');
            }
        }
    }

    async incrementItemQuantity(itemId: number, quantity:number = 1, dispatch: Dispatch){
        const basket = this.getCurrentBasket();
        if(basket){
            const item = basket.items.find((p)=>p.id === itemId);
            if(item){
                item.quantity += quantity;
                if(item.quantity<1){
                    item.quantity = 1;
                }
                await this.setBasket(basket, dispatch);
            }
        }
    }

    async decrementItemQuantity(itemId: number, quantity:number = 1, dispatch: Dispatch){
        const basket = this.getCurrentBasket();
        if(basket){
            const item = basket.items.find((p)=>p.id === itemId);
            if(item && item.quantity >1){
                item.quantity -= quantity;
                await this.setBasket(basket, dispatch);
            }
        }
    }

    async deleteBasket(basketId: string):Promise<void>{
        try{
            await axios.delete(`${this.apiUrl}/${basketId}`);
        }catch(error){
            throw new Error("Failed to delete the basket." + error)
        }
    }

    async setBasket(basket: Basket, dispatch: Dispatch){
        try{
            await axios.post<Basket>(this.apiUrl, basket);
            localStorage.setItem('basket', JSON.stringify(basket));
            dispatch(setBasket(basket));
        }catch(error){
            throw new Error("Failed to update basket." + error)
        }
    }

    private getCurrentBasket() {
        const basket = localStorage.getItem('basket');
        return basket ? JSON.parse(basket) as Basket : null;
    }

    private async createBasket(): Promise<Basket>{
        try{
            const newBasket: Basket = {
                id: createId(),
                items: []
            }
            localStorage.setItem('basket_id', newBasket.id);
            return newBasket;
        }catch(error){
            throw new Error("Failed to create Basket." + error);
        }
    }
    private mapProductToBasket(item: Product): BasketItem {
        return {
            id: item.id,
            name: item.name,
            price: item.price,
            description: item.description,
            quantity: 0,
            pictureUrl: item.pictureUrl,
            productBrand: item.productBrand,
            productType: item.productType
        };
    }
    private upsertItems(items: BasketItem[], itemToAdd: BasketItem, quantity: number): BasketItem[]{
        const existingItem = items.find(x=>x.id == itemToAdd.id);
        if(existingItem){
            existingItem.quantity += quantity;
        }else{
            itemToAdd.quantity = quantity;
            items.push(itemToAdd);
        }
        return items;
    }
    private calculateTotals(basket: Basket): BasketTotals{
        const shipping = 0;
        const subtotals = basket.items.reduce((acc, item)=>acc+(item.price*item.quantity), 0);
        const totals = shipping + subtotals;
        return { shipping, subtotals, totals};
    }
}
export default new BasketService();