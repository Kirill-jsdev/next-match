"use server";

import { prisma } from "../lib/prisma";
import { registerSchema, RegisterSchema } from "../lib/schemas/registerSchema";
import bcrypt from "bcryptjs";

export async function registerUser(data: RegisterSchema) {
  const validated = registerSchema.safeParse(data); //ZOD validation

  if (!validated.success) {
    //we could do like this, but this error is a server side and will not be delivered to the browser
    //throw new Error(validated.error.errors[0].message)

    return { error: validated.error.errors };
  }

  const { name, email, password } = validated.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await prisma.user.findUnique({ where: { email: email } });

  if (existingUser) return { error: "User already exists" };

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash: hashedPassword,
    },
  });

  return user;
}
