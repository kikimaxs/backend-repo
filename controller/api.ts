import { Request, Response, NextFunction } from "express";
import { getUserById, updateUser } from "../repository/userCollection";
import { User } from "../entities/user";

export const fetchUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = (req as any).user.uid;
    const user = await getUserById(userId);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = (req as any).user.uid;
    const userData: Partial<User> = req.body;

    if (!userData) {
      res.status(400).json({ error: "No data provided for update" });
      return;
    }

    const updatedUser = await updateUser(userId, userData);
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};
