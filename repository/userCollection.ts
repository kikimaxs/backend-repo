import { db } from "../config/firebaseConfig";
import { User } from "../entities/user";

const usersCollection = db.collection("USERS");

export const getUserById = async (userId: string): Promise<User | null> => {
  try {
    const userDoc = await usersCollection.doc(userId).get();
    if (!userDoc.exists) {
      return null;
    }
    return { id: userDoc.id, ...userDoc.data() } as User;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const updateUser = async (
  userId: string,
  userData: Partial<User>
): Promise<User> => {
  try {
    await usersCollection.doc(userId).update({
      ...userData,
      updatedAt: new Date(),
    });
    const updatedUser = await getUserById(userId);
    return updatedUser as User;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
