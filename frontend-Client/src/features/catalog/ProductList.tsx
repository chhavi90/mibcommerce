import {Product} from "../../app/model/Product.ts";
import {Grid} from "@mui/material";
import ProductCard from "./ProductCard.tsx";

interface Props {
    products: Product[];
}

export default function ProductList({products}: Props){
    return(
        <Grid container={true} spacing={2}>
            {products.map((product)=> (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                    <ProductCard product={product}/>
                </Grid>
                )
            )}
        </Grid>
    );
}