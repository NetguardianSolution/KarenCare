// src/uploadProducts.js
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { products } from "./data/products";

export async function uploadProducts() {
  try {
    const productsCollection = collection(db, "products");

    for (const product of products) {
      await addDoc(productsCollection, product);
      console.log(`✅ Added: ${product.name}`);
    }

    console.log("🎉 All products uploaded successfully!");
  } catch (error) {
    console.error("Error uploading products:", error);
  }
}
