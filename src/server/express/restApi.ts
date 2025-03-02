// import packageJSON from "../../../package.json";
import express, { Application } from "express";
import cors from "cors";
import { db } from "./config/firebase";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import cartRoutes from "./routes/cart.routes";
import orderRoutes from "./routes/order.routes";
import checkoutRoutes from "./routes/checkout.routes";

const app: Application = express();

app.use(express.json({ limit: "20mb" }));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);
app.use("/order", orderRoutes);
app.use("/checkout", checkoutRoutes);

// Serve a successful response. For use with wait-on
app.get("/api/v1/health", (req, res) => {
  let result = db
    .collection("test")
    .add({
      test: "test",
    })
    .then((docRef) => docRef);
  res.send({ status: "ok", result });
});
// app.use(express.static("./.local/vite/dist"));

export default app;
