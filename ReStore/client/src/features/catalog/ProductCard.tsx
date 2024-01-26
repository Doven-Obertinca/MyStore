import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
import { useState } from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleAddItem = (productId: number) => {
    console.log("Function called. Product ID:", productId); // Add this line
    setLoading(true);
    agent.Basket.addItem(productId)
      .then(() => console.log("API call succeeded. Product ID:", productId))
      .catch((error) => console.log("API call failed. Error:", error))
      .finally(() => {
        console.log("Finally block. Product ID:", productId);
        setLoading(false);
      });
  };

  // const handleAddItem = async (productId: number) => {
  //   // Await the promise to get the actual URL
  //   const apiUrl = await agent.Basket.addItem(productId);

  //   // Log the constructed API call URL
  //   console.log(`API Call URL: ${apiUrl}`);

  //   // Set loading to true before making the API call
  //   setLoading(true);

  //   // Make the API call
  //   agent.Basket.addItem(productId)
  //     .catch((error) => console.log(error))
  //     .finally(() => setLoading(false));
  // };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: { fontWeight: "bold", color: "primary.main" },
        }}
      />
      <CardMedia
        sx={{
          height: 140,
          backgroundSize: "contain",
          bgcolor: "#2da8a8",
        }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color="text.secondary" variant="h5">
          €{(product.price / 100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          loading={loading}
          onClick={() => handleAddItem(product.id)}
          size="small">
          Add to cart
        </LoadingButton>
        <Button size="small" component={Link} to={`/catalog/${product.id}`}>
          View
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
