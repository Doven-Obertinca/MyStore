import { useEffect, useState } from "react";
import { Product } from "./product";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const addProduct = () => {
    setProducts((prevState) => [
      ...prevState,
      {
        id: prevState.length + 101,
        name: "product" + (prevState.length + 1),
        price: prevState.length * 100 + 100,
        brand: "some brand",
        description: "some description",
        pictureUrl: "http://picsum.photos/200",
      },
    ]);
  };
  return (
    <>
      <div>
        <h1>Re-Store</h1>
        <ul>
          {products.map((product) => {
            return (
              <li key={product.id}>
                {product.name} - {product.price}
              </li>
            );
          })}
        </ul>
        <button onClick={addProduct}>Add product</button>
      </div>
    </>
  );
}

export default App;
