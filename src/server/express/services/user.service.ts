import { db } from "../config/firebase";
// import User from "../../../models/User";
import { UserRoles } from "../types/enum";

const usersCollection = db.collection("users");

export const createUser = async (userData: { email: string; name: string }) => {
  const docRef = await usersCollection.add({ ...userData, role: UserRoles.USER });
  return { id: docRef.id, ...userData };
};

export const getUserById = async (id: string) => {
  const doc = await usersCollection.doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
};

export const updateUser = async (id: string, updatedData: any) => {
  await usersCollection.doc(id).update(updatedData);
  return { id, ...updatedData };
};

export const deleteUser = async (id: string) => {
  await usersCollection.doc(id).delete();
  // remove from cart and orders as well
  await db.collection("cart").doc(id).delete();
  await db.collection("orders").doc(id).delete();
  return { message: "User deleted successfully" };
};

export const getUsers = async () => {
  console.log("Getting all users...");
  const snapshot = await usersCollection.get();
  console.log(`Found ${snapshot.size} users.`);
  const users = snapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() }));
  console.log("Returning users:");
  console.log(users);
  return users;
};
