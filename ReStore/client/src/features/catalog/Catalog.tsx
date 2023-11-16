import {
  //   Avatar,
  Button,
  //   List,
  //   ListItem,
  //   ListItemAvatar,
  //   ListItemText,
} from "@mui/material";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

interface Props {
  products: Product[];
  addProduct: () => void;
}

const Catalog = ({ products, addProduct }: Props) => {
  return (
    <>
      <ProductList products={products} />
      <Button variant="contained" onClick={addProduct}>
        Add product
      </Button>
    </>
  );
};

export default Catalog;
