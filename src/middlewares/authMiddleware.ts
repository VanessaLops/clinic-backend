import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secretKey = "sss";

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(403).json({ message: "Token não fornecido" });

  try {
    const decoded = jwt.verify(token, secretKey) as { userId: number };
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};
