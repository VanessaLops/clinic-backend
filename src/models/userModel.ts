import { PrismaClient } from "@prisma/client";
var bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

export const createUser = async (email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: { email, password: hashedPassword },
  });
};

export const findUserByEmail = (email: string) => {
  console.log(email);
  return prisma.user.findUnique({ where: { email } });
};
