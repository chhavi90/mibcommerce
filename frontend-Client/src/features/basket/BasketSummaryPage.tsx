import {useAppSelector} from "../../app/store/Store.ts";
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography} from "@mui/material";
import {formatPrice} from "../../app/utils/Utils.ts";

export default function BasketSummaryPage() {
    const {basket} = useAppSelector(state => state.basket);
    const subTotal = basket?.items.reduce((sum, item) => sum + (item.price*item.quantity), 0) ?? 0;
    const shipping = 200;

    return(
        <Box mt={4} p={2} bgcolor="background.default" borderRadius={8} boxShadow={3}>
            <Typography variant="h5" gutterBottom>
                Basket Summary
            </Typography>
            <TableContainer component={Paper} variant="outlined">
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Subtotal</TableCell>
                            <TableCell align="right">{formatPrice(subTotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Shipping</TableCell>
                            <TableCell align="right">{formatPrice(shipping)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>Total</strong></TableCell>
                            <TableCell align="right"><strong>{formatPrice(subTotal + shipping)}</strong></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}