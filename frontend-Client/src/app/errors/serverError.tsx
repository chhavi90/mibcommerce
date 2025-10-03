import {useNavigate} from "react-router-dom";
import {Box, Button, Typography} from "@mui/material";
import { motion } from "framer-motion";

export default function ServerError() {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/');
    }
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#f0f0f0",
                textAlign: "center",
                p: 3,
            }}
        >
            {/* Animate the "500" with a subtle shake effect */}
            <motion.div
                animate={{ rotate: [0, -5, 5, -5, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
            >
                <Typography
                    variant="h1"
                    sx={{ fontSize: { xs: "6rem", md: "9rem" }, color: "#e53935", fontWeight: "bold" }}
                >
                    500
                </Typography>
            </motion.div>

            {/* Error message */}
            <Typography variant="h4" sx={{ mt: 2 }}>
                Uh-oh! Something went wrong.
            </Typography>

            {/* Additional explanation */}
            <Typography variant="body1" sx={{ mt: 1, color: "#757575", maxWidth: "600px" }}>
                We’re experiencing some technical difficulties. Please try again later or return to the homepage.
            </Typography>

            {/* Decorative image or icon */}
            <motion.img
                src="/images/server-error.png"
                alt="Server Error"
                style={{ marginTop: "20px", width: "250px", height: "auto" }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
            />

            {/* Button with subtle hover animation */}
            <motion.div whileHover={{ scale: 1.1 }}>
                <Button
                    variant="contained"
                    color="error"
                    sx={{
                        mt: 4,
                        px: 4,
                        py: 2,
                        bgcolor: "#e53935",
                        "&:hover": {
                            bgcolor: "#d32f2f",
                        },
                    }}
                    onClick={handleNavigate} // Trigger the navigation when clicked
                >
                    Back to Home
                </Button>
            </motion.div>

            <Typography variant="caption" sx={{ mt: 4, color: "#9e9e9e" }}>
                &copy; {new Date().getFullYear()} MibCommerce. All rights reserved.
            </Typography>
        </Box>
    );
}