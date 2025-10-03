import { Typography, Grid, Button, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const categories = ['Electronics', 'Fashion', 'Home & Kitchen', 'Books'];
const featuredProducts = [
    { id: 1, name: 'Smartphone', image: '/images/phone.jpg' },
    { id: 2, name: 'Laptop', image: '/images/laptop.jpg' },
    { id: 3, name: 'Headphones', image: '/images/headphones.jpg' },
];

export default function HomePage() {
    return (
        <div>
            <Grid container direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Typography variant='h2' align="center" gutterBottom>
                        Welcome to MibCommerce
                    </Typography>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Typography variant='h5' align="center" paragraph>
                        Discover the best products and enjoy exclusive offers.
                    </Typography>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <Button
                        component={Link}
                        to="/store"
                        variant="contained"
                        color="primary"
                        size="large"
                    >
                        Explore Products
                    </Button>
                </motion.div>
            </Grid>

            <Paper style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant='h4' align="center" gutterBottom>
                    Shop by Category
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    {categories.map((category, index) => (
                        <Grid item xs={3} key={index}>
                            <Paper style={{ padding: '10px', textAlign: 'center' }}>
                                <Typography variant='h6'>{category}</Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Paper>

            <Paper style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant='h4' align="center" gutterBottom>
                    Featured Products
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    {featuredProducts.map((product) => (
                        <Grid item xs={3} key={product.id}>
                            <Paper>
                                <img src={product.image} alt={product.name} style={{ width: '100%' }} />
                                <Typography variant='h6' align="center">{product.name}</Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </div>
    );
}
