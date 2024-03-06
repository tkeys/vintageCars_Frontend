import { Box, Button, Paper, Typography } from "@mui/material";

export default function CheckoutPage() {
  return (
    <Paper
      variant="outlined"
      sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
    >
      <Typography component="h1" variant="h4" align="center">
        Checkout
      </Typography>

      <>
        <>
          <Typography variant="h5" gutterBottom>
            Thank you for your order.
          </Typography>
          <Typography variant="subtitle1">
            Your order number is #2001539. We have emailed your order
            confirmation, and will send you an update when your order has
            shipped.
          </Typography>
        </>
      </>
    </Paper>
  );
}
