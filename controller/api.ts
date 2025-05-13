import { Request, Response } from "express";
import { getUserById, updateUser } from "../repository/userCollection";
import { User } from "../entities/user";

export const fetchUserData = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.uid;
    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUserData = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.uid;
    const userData: Partial<User> = req.body;

    if (!userData) {
      return res.status(400).json({ error: "No data provided for update" });
    }

    const updatedUser = await updateUser(userId, userData);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

