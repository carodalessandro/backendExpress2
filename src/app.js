import express from "express";

import { ProductManager } from "./main";

const app = express();

const PORT = 4000;

const productos = new ProductManager("./src/productos.txt");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hola desde la pag de inicion de mi app");
});

app.get("/productos/:id", async (req, res) => {
  const prod = await productos.find(
    (prod) => prod.id === parseInt(req.params.id)
  );
  if (prod) res.send(prod);
  res.send("producto no encontrado");
});

app.get("/productos", async (req, res) => {
  const { limit } = req.query;
  const prods = await productos.getProductById(parseInt(req.params.id));
  prods ? res.send(prods.slice(0, limit)) : res.send(prods);
  res.send(prods);
});

app.get("*", (req, res) => {
  res.send("Error 404");
});

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
