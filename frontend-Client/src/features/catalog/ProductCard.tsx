import {Product} from "../../app/model/Product.ts";
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    CircularProgress,
    Typography
} from "@mui/material";
import {Link} from "react-router-dom";
import {useState} from "react";
import {useAppDispatch} from "../../app/store/Store.ts";
import agent from "../../app/api/agent.ts";
import {setBasket} from "../basket/BasketSlice.ts";
import {LoadingButton} from "@mui/lab";

interface Props {
    product : Product;
}

export default function ProductCard({product}: Props){
    const extractImageName = (item: Product): string | null => {
        if(item && item.pictureUrl){
            const parts = item.pictureUrl.split('/');
            if(parts.length > 0){
                return parts[parts.length - 1];
            }
        }
        return null;
    };
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-In', {
            style:'currency',
            currency: 'INR',
            minimumFractionDigits: 2
        }).format(price);
    };
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    function addItem() {
        setLoading(true);
        agent.Bassket.addItem(product, dispatch)
            .then(response =>{
                console.log('new basket: ',response.basket);
                dispatch(setBasket(response.basket));
            })
            .catch(error => console.log(error))
            .finally(()=>setLoading(false));
    }
    return (
        <Card>
            <CardHeader avatar={
                <Avatar sx={{backgroundColor: 'secondary.main'}}>
                    {product.name.charAt(0).toUpperCase()}
                </Avatar>
            }
            title={product.name}
            titleTypographyProps={{sx:{
                fontWeight: 'bold',
                color: 'primary.main',
                whiteSpace: 'normal', // Allow text to wrap
                overflow: 'hidden', // Prevent overflow
                textOverflow: 'ellipsis', // Add ellipsis if needed
                display: '-webkit-box',
                WebkitLineClamp: 2, // Limit text to 2 lines
                WebkitBoxOrient: 'vertical',
                lineHeight: '1.2em', // Adjust line height for better readability
                maxHeight: '2.4em'   // Set the max height for 2 lines
            }}}
            />
        <CardMedia
            sx={{ height: 140, backgroundSize: 'contain'}}
            image={"images/products/"+extractImageName(product)}
            title={product.name}
        />
        <CardContent sx={{ minHeight: '100px' }}>
            <Typography gutterBottom color='secondary' variant="h5">
                {formatPrice(product.price)}
            </Typography>
            <Typography variant="body2" color="textSecondary">
                {product.productBrand} / {product.productType}
            </Typography>
        </CardContent>
        <CardActions>
            <LoadingButton
            loading={loading}
            onClick={addItem}
            size="small"
            startIcon={loading ? <CircularProgress size={20} color='inherit'/> : null}

            >
                Add To Cart
            </LoadingButton>
            <Button component={Link} to={`/store/${product.id}`} size="small">View</Button>
        </CardActions>
        </Card>
    )
}