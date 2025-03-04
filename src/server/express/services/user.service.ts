import { User } from "@/models/User";
import { auth, db } from "../config/firebase";
// import User from "../../../models/User";
import { UserRoles } from "../types/enum";

const usersCollection = db.collection("users");

export const createUser = async ({
  uid,
  ...userData
}: {
  uid?: string;
  email: string;
  name: string;
}) => {
  let docId = uid || db.collection("users").doc().id;
  const userRef = usersCollection.doc(docId); // Explicitly setting the doc ID
  await userRef.set(userData);
  return (await userRef.get()).data();
};

export const getUserByEmail = async (email: string) => {
  const querySnapshot = await usersCollection.where("email", "==", email).get();
  if (querySnapshot.empty) return null;
  return querySnapshot.docs[0].data();
};

export const getUserById = async (id: string) => {
  const doc = await usersCollection.doc(id).get();
  if (!doc.exists) return null;
  return { uid: doc.id, ...doc.data() };
};

export const updateUser = async (id: string, updatedData: Partial<User>) => {
  await usersCollection.doc(id).update(updatedData);
  // if (updatedData.role) {
  //   await auth.getUserByEmail(updatedData.email!);
  // }
  await auth.updateUser(id, updatedData);
  return { id, ...updatedData };
};

export const checkUserRole = async (id: string, role: UserRoles[]) => {
  const doc = await usersCollection.doc(id).get();
  if (!doc.exists) return false;
  return role.includes(doc.data()?.role || UserRoles.USER);
};

export const deleteUser = async (id: string) => {
  await usersCollection.doc(id).delete();
  // remove from cart and orders as well
  await db.collection("cart").doc(id).delete();
  await db.collection("orders").doc(id).delete();
  return { message: "User deleted successfully" };
};

export const getUsers = async () => {
  // console.log("Getting all users...");
  const snapshot = await usersCollection.get();
  // console.log(`Found ${snapshot.size} users.`);
  const users = snapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() }));
  // console.log("Returning users:");
  // console.log(users);
  return users;
};
