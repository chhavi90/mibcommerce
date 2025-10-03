import {useNavigate} from "react-router-dom";
import {Box, Button, Typography} from "@mui/material";
import { motion } from "framer-motion";

export default function NotFound() {
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
            {/* Animate the "404" with a subtle bounce effect */}
            <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
            >
                <Typography
                    variant="h1"
                    sx={{ fontSize: { xs: "6rem", md: "9rem" }, color: "#3f51b5", fontWeight: "bold" }}
                >
                    404
                </Typography>
            </motion.div>

            {/* Friendly message */}
            <Typography variant="h4" sx={{ mt: 2 }}>
                Oops! Page Not Found
            </Typography>

            {/* Additional explanation */}
            <Typography variant="body1" sx={{ mt: 1, color: "#757575", maxWidth: "600px" }}>
                We can't seem to find the page you're looking for. It might have been removed, or the link
                is broken.
            </Typography>

            {/* Decorative image or icon */}
            <motion.img
                src="/images/page-not-found.png"
                alt="Not Found"
                style={{ marginTop: "20px", width: "250px", height: "auto" }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
            />

            {/* Button with subtle hover animation */}
            <motion.div whileHover={{ scale: 1.1 }}>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        mt: 4,
                        px: 4,
                        py: 2,
                        bgcolor: "#3f51b5",
                        "&:hover": {
                            bgcolor: "#303f9f",
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