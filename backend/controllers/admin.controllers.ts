import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
dotenv.config();

import Admin from "../models/admin";

const secretKey = process.env.JWT_SECRET_KEY;

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res
        .status(400)
        .json({ status: false, message: "All fields are required" });
    }

    const emailExists = await Admin.findOne({ email: email });

    if (emailExists) {
      return res.status(409).json({
        success: false,
        error: "Admin with that email already exists.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = await Admin.create({
      email: email,
      password: hashedPassword,
    });

    if (!secretKey) {
      throw new Error("JWT secret key is not defined.");
    }

    const token = jwt.sign({ id: newAdmin._id }, secretKey, {
      expiresIn: "1d",
    });

    return res.status(201).json({
      success: true,
      message: "Admin created successfully.",
      token: token,
    });
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400).json({
        status: false,
        error: "Email and password are required",
      });
    }

    const adminExists = await Admin.findOne({ email: email });

    if (!adminExists) {
      res.status(401).json({
        success: false,
        error: "No admin with the provided email found.",
      });
    } else {
      const passwordMatch = await bcrypt.compare(
        password,
        adminExists.password
      );

      if (passwordMatch) {
        if (!secretKey) {
          throw new Error("JWT secret key is not defined.");
        }

        const token = jwt.sign({ id: adminExists._id }, secretKey, {
          expiresIn: "1d",
        });

        res.status(200).json({
          success: true,
          message: "Admin logged in successfully",
          token: token,
        });
      } else {
        res.status(401).json({ success: false, error: "Invalid password" });
      }
    }
  } catch (error: any) {
    console.error("Error logging in admin:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};