import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([
    { name: "product1", price: 100.0, id: 1 },
    { name: "product2", price: 200.0 },
  ]);

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
        name: "product" + (prevState.length + 1),
        price: prevState.length * 100 + 100,
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
