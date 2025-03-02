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

const allowedOrigins = ["https://zimozi-b21dc.web.app", "http://localhost:9000"]; // Add more if needed

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // Required for cookies/session-based auth
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://zimozi-b21dc.web.app");
  res.header("Access-Control-Allow-Origin", "http://localhost:9000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(204);
});

app.use(express.json({ limit: "20mb" }));
// app.use(cors());
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
