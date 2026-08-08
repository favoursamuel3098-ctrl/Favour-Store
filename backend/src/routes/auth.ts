import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import {
  hashPassword,
  comparePassword,
  signAccessToken,
  signRefreshToken,
} from "../utils/auth";
import { authenticate, AuthRequest } from "../middleware/auth";

const router = Router();

const registerSchema = z.object({
  fullName: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Za-z]/, "Password must contain a letter")
    .regex(/[0-9]/, "Password must contain a number"),
  phone: z.string().optional(),
  country: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// Register
router.post("/register", async (req, res) => {
  try {
    const data = registerSchema.parse(req.body);

    const existing = await prisma.user.findUnique({
      where: { email: data.email.toLowerCase() },
    });
    if (existing) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const passwordHash = await hashPassword(data.password);

    const user = await prisma.user.create({
      data: {
        fullName: data.fullName,
        email: data.email.toLowerCase(),
        passwordHash,
        phone: data.phone,
        country: data.country,
        role: "USER",
        isVerified: true, // skip email verification for now
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        phone: true,
      },
    });

    const accessToken = signAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    const refreshToken = signRefreshToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    res.status(201).json({
      message: "Account created successfully",
      user,
      accessToken,
      refreshToken,
    });
  } catch (err: any) {
    if (err.name === "ZodError") {
      return res.status(400).json({ error: err.errors[0].message });
    }
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const data = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email: data.email.toLowerCase() },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    if (user.isBanned) {
      return res.status(403).json({ error: "Account has been banned" });
    }

    const valid = await comparePassword(data.password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const accessToken = signAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    const refreshToken = signRefreshToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        phone: user.phone,
      },
      accessToken,
      refreshToken,
    });
  } catch (err: any) {
    if (err.name === "ZodError") {
      return res.status(400).json({ error: err.errors[0].message });
    }
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
});

// Get current user
router.get("/me", authenticate, async (req: AuthRequest, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        country: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

export default router;
