import {Basket} from "../model/Basket.ts";
import {Product} from "../model/Product.ts";

export function getBasketFromLocalStorage(): Basket | null{
    const storedBasket = localStorage.getItem("basket");
    if (storedBasket) {
        try{
            const parsedBasket: Basket = JSON.parse(storedBasket);
            return parsedBasket;
        }catch (err){
            console.log('Error Parsing basket: ', err);
            return null;
        }
    }
    return null;
}

// Define the extractImageName function
export const extractImageName = (item: Product): string | null => {
    if (item && item.pictureUrl) {
        const parts = item.pictureUrl.split('/');
        if (parts.length > 0) {
            return parts[parts.length - 1];
        }
    }
    return null;
};

export const formatPrice = (price: number): string =>{
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2
    }).format(price);
};