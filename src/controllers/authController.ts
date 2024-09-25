import { Request, Response } from "express";
import { createUser, findUserByEmail } from "../models/userModel";
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const secretKey = "sdsid";
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email já cadastrado" });
    }

    const user = await createUser(email, password);
    return res.status(201).json({ message: "Usuário criado", userId: user.id });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    return res.status(500).json({
      message: "Erro ao registrar usuário. Tente novamente mais tarde.",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "E-mail e senha são obrigatórios." });
    }

    const user = await findUserByEmail(email);
    if (!user)
      return res.status(404).json({ message: "Usuário não encontrado" });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      console.log(`Senha incorreta para o usuário: ${email}`);
      return res.status(401).json({ message: "Senha incorreta" });
    }

    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    console.error("Erro ao processar login:", error);
    return res
      .status(500)
      .json({ message: "Erro ao realizar login. Tente novamente mais tarde." });
  }
};
