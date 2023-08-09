import { promises as fs } from "fs";

export class ProductManager {
  constructor() {
    this.path = "./src/productos.txt";
  }

  addProduct = async (product) => {
    const products = JSON.parse(await fs.readFile(this.path, "utf-8"));

    if (products.find((producto) => producto.id === product.id)) {
      console.log("Producto ya agregado");
      return;
    }

    if (
      product.title === undefined ||
      product.description === undefined ||
      product.price === undefined ||
      product.thumbnail === undefined ||
      product.code === undefined ||
      product.stock === undefined
    ) {
      console.log("Complete todos los campos");
      return;
    } else {
      products.push(product);
    }
    await fs.writeFile(this.path, JSON.stringify(products));
  };

  getProducts = async () => {
    const products = JSON.parse(await fs.readFile(this.path, "utf-8"));
    return products;
  };

  getProductById = async (id) => {
    const products = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const prod = products.find((producto) => producto.id === id);
    if (prod) {
      return prod;
    } else {
      console.log("Not found");
    }
  };

  updateProduct = async (
    id,
    { title, description, price, thumbnail, code, stock }
  ) => {
    const products = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const index = products.findIndex((prod) => prod.id === id);

    if (index !== -1) {
      products[index].title = title;
      products[index].description = description;
      products[index].price = price;
      products[index].thumbnail = thumbnail;
      products[index].code = code;
      products[index].stock = stock;

      await fs.writeFile(this.path, JSON.stringify(products));
    } else {
      console.log("Producto no encontrado");
    }
  };

  deleteProduct = async (id) => {
    const products = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const prods = products.filter((prod) => prod.id != id);
    await fs.writeFile(this.path, JSON.stringify(prods));
  };
}

class Product {
  static incrementId = 0;

  constructor(title, description, price, thumbnail, code, stock) {
    Product.incrementId++;

    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    this.id = Product.incrementId;
  }
}

const product1 = new Product(
  "producto1",
  "alfajor chocolate con dulce de leche",
  500,
  "imagen no disponible",
  267,
  31
);

const product2 = new Product(
  "producto2",
  "turron con mani",
  100,
  "imagen no disponible",
  311,
  150
);

const product3 = new Product(
  "producto3",
  "chicles sabor menta",
  200,
  "imagen no disponible",
  301,
  10
);

const productManager = new ProductManager();

productManager.getProducts();

//productManager.addProduct(product1);
//productManager.addProduct(product2);
//productManager.addProduct(product3);

//productManager.getProductById(1);
//productManager.getProductById(7);

/* productManager.updateProduct(1, {
  title: "producto1",
  description: "alfajor chocolate con dulce de leche",
  price: 500,
  thumbnail: "imagen no disponible",
  code: 267,
  stock: 31,
}); */

/* productManager.updateProduct(2, {
  title: "producto2",
  description: "turron con mani",
  price: 100,
  thumbnail: "imagen no disponible",
  code: 311,
  stock: 150,
}); */

//productManager.deleteProduct(1);
