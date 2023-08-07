/* import * as http from "http";

const PORT = 4000;

const server = http.createServer((request, response) => {
  response.end("Hola, buenos días!");
});

server.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
}); */

import express from "express";

const app = express();

const PORT = 4000;

app.use(express.urlencoded({ extended: true }));

const productos = [
  {
    nombre: "lentejas",
    id: 1,
    categorías: "legumbres",
  },
  {
    nombre: "mani",
    id: 2,
    categorías: "snacks",
  },
  {
    nombre: "queso",
    id: 3,
    categorías: "lacteos",
  },
];

app.get("/", (req, res) => {
  res.send("Hola desde la pag de inicion de mi app");
});

app.get("/productos/:id", (req, res) => {
  const prod = productos.find((prod) => prod.id === parseInt(req.params.id));
  if (prod) res.send(prod);
  res.send("producto no encontrado");
});

app.get("/productos", (req, res) => {
  const { categoria } = req.query;
  const prods = productos.filter((prod) => prod.categoria === categoria);
  res.send(prods);
});

app.get("*", (req, res) => {
  res.send("Error 404");
});

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
