import { Request, Response } from "express";
import { ProductService } from "../services/product.service";

export async function getAllProducts(req: Request, res: Response) {
  try {
    const limit = parseInt(req.query.limit as string) || 10; // Default limit: 10
    const cursor = req.query.cursor as string | undefined;
    const category = req.query.category as string | undefined;
    const minPrice = req.query.minPrice ? parseFloat(req.query.minPrice as string) : undefined;
    const maxPrice = req.query.maxPrice ? parseFloat(req.query.maxPrice as string) : undefined;

    const { products, nextCursor } = await ProductService.getAllProductsPaginated(
      limit,
      cursor,
      category,
      minPrice,
      maxPrice
    );
    res.json({ products, nextCursor });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const product = await ProductService.getProductById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found." });
    }
    res.json(product);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    const product = await ProductService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const updatedProduct = await ProductService.updateProduct(req.params.id, req.body);
    if (!updatedProduct) {
      res.status(404).json({ message: "Product not found." });
    }
    res.json(updatedProduct);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const success = await ProductService.deleteProduct(req.params.id);
    if (!success) {
      res.status(404).json({ message: "Product not found." });
    }
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function seedProducts(req: Request, res: Response) {
  try {
    const { products } = req.body;
    if (!Array.isArray(products) || products.length === 0) {
      res.status(400).json({ message: "Invalid products data." });
    }

    let seedData = await ProductService.seedProducts(products);
    res.status(201).json({ products: seedData, message: "Products seeded successfully!" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function getProductsByIds(req: Request, res: Response): Promise<any> {
  try {
    const { productIds } = req.body; // Expecting an array of product IDs

    if (!Array.isArray(productIds) || productIds.length === 0) {
      return res.status(400).json({ message: "Invalid product IDs" });
    }

    const products = await ProductService.getProductsByIds(productIds);
    return res.json({ products });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}
