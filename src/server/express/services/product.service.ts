import { db } from "../config/firebase"; // Import Firestore instance
import { Product } from "../../../models/Product";

// Reference to Firestore collection
const productsCollection = db.collection("products");

export class ProductService {
  // Create Product
  static async createProduct(product: Omit<Product, "uid">): Promise<Product> {
    const newProduct = {
      ...product,
      stock: product.stock ?? 0, // Ensure stock is always set
    };

    const docRef = await productsCollection.add(newProduct);
    console.log("Document written with ID: ", docRef.id);
    return { uid: docRef.id, ...newProduct };
  }

  // Get All Products with Pagination and Filtering
  static async getAllProductsPaginated(
    limit: number,
    cursor?: string,
    category?: string,
    minPrice?: number,
    maxPrice?: number
  ) {
    let query = productsCollection.orderBy("stock", "desc").limit(limit);

    if (category) {
      query = query.where("category", "==", category);
    }
    if (minPrice !== undefined && maxPrice !== undefined) {
      query = query.where("price", ">=", minPrice).where("price", "<=", maxPrice);
    }
    if (cursor) {
      const cursorDoc = await productsCollection.doc(cursor).get();
      if (cursorDoc.exists) {
        query = query.startAfter(cursorDoc);
      }
    }

    const snapshot = await query.get();
    const products: Product[] = snapshot.docs.map(
      (doc) => ({ uid: doc.id, ...doc.data() }) as Product
    );

    const nextCursor = snapshot.docs.length ? snapshot.docs[snapshot.docs.length - 1].id : null;
    return { products, nextCursor };
  }

  // Get Product by ID
  static async getProductById(uid: string): Promise<Product | null> {
    const productDoc = await productsCollection.doc(uid).get();
    return productDoc.exists ? ({ uid: productDoc.id, ...productDoc.data() } as Product) : null;
  }

  // Update Product
  static async updateProduct(uid: string, updates: Partial<Product>): Promise<Product | null> {
    const docRef = productsCollection.doc(uid);
    const productDoc = await docRef.get();

    if (!productDoc.exists) return null;

    const updatedData = {
      ...productDoc.data(),
      ...updates,
    };

    await docRef.update(updatedData);
    return { uid, ...updatedData } as Product;
  }

  // Delete Product
  static async deleteProduct(uid: string): Promise<boolean> {
    await productsCollection.doc(uid).delete();
    return true;
  }

  // Seed Products
  static async seedProducts(products: Omit<Product, "uid">[]) {
    const batch = db.batch();

    // create random stock number between 10 to 50
    const randomStock = Math.floor(Math.random() * (50 - 10 + 1)) + 10;

    products.forEach((product) => {
      const docRef = productsCollection.doc();
      batch.set(docRef, { ...product, stock: randomStock ?? 0 });
    });

    await batch.commit();
    return true;
  }

  static async getProductsByIds(productIds: string[]) {
    try {
      // console.log("Fetching products by IDs:", productIds);
      if (!productIds || productIds.length === 0) {
        console.log("No product IDs provided. Returning empty array.");
        return [];
      }

      const productRefs = await db.collection("products").where("__name__", "in", productIds).get();
      // console.log("Fetched products:", productRefs.docs);

      const products = productRefs.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data(),
      }));
      // console.log("Products:", products);
      return products;
    } catch (error) {
      console.error("Failed to fetch products by IDs:", error);
      throw new Error("Failed to fetch products by IDs");
    }
  }
}
