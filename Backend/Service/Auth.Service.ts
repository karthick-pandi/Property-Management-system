import { AppDataSource } from "../config/data-source";
import { User } from "../Entity/User";
const  hashPassword = require("../Utils/Hash");
const userRepo = AppDataSource.getRepository(User);

export const registerUser = async (data: any) => {
  const { name, lastName, email, password } = data;

  // Check existing user
  const existingUser = await userRepo.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  const user = userRepo.create({
    name,
    lastName,
    email,
    password: hashedPassword,
  });

  return await userRepo.save(user);
};