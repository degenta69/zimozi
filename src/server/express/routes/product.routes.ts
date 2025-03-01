import express from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { UserRoles } from "../types/enum";
import { validateProduct } from "../middlewares/product.validate.middleware";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  seedProducts,
  getProductsByIds,
} from "../controllers/ProductControllers";

const router = express.Router();

// Public Routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/by-ids", getProductsByIds);

// Admin-only Routes
router.post("/", authenticate, authorize([UserRoles.ADMIN]), validateProduct, createProduct);
router.put("/:id", authenticate, authorize([UserRoles.ADMIN]), validateProduct, updateProduct);
router.delete("/:id", authenticate, authorize([UserRoles.ADMIN]), deleteProduct);
router.post("/seed", seedProducts); // New seeding endpoint

export default router;
