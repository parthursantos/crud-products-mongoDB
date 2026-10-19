import mongoose from "mongoose";

const productsSchema = new mongoose.Schema(
  {
    nome: String,
    categoria: String,
    preco: Number,
    quantidade: Number,
    disponivel: Boolean
  },
  { collection: "products" },
);

export default mongoose.model("Products", productsSchema);
