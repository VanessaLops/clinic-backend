import { Request, Response } from "express";

import {
  createUser,
  findUserByEmail,
  updateUserPassword,
  getAllUsers as fetchAllUsers
} from "../models/userModel";

var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
import { sendEmail } from "../services/emailService";
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

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await fetchAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return res.status(500).json({
      message: "Erro ao buscar usuários. Tente novamente mais tarde.",
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
export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await findUserByEmail(email);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const resetToken = jwt.sign({ userId: user.id }, secretKey, {
      expiresIn: "1h",
    });

    const resetUrl = `http://localhost:5173/reset-password?token=${resetToken}`;

    await sendEmail(
      email,
      "Redefinição de Senha",
      `Use o link a seguir para redefinir sua senha: ${resetUrl}`
    );

    res.json({ message: "E-mail de redefinição de senha enviado." });
  } catch (error) {
    console.error("Erro ao enviar e-mail de redefinição:", error);
    res
      .status(500)
      .json({ message: "Erro ao enviar e-mail de redefinição de senha." });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.userId;

    // Gerar novo hash de senha
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Atualizar a senha no banco de dados
    await updateUserPassword(userId, hashedPassword);

    res.json({ message: "Senha redefinida com sucesso." });
  } catch (error) {
    console.error("Erro ao redefinir a senha:", error);
    res.status(400).json({ message: "Token inválido ou expirado." });
  }
};

