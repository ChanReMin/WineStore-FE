import { z } from "zod";

// Login schema
export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),

  password: z
    .string()
    .min(8, "Password must contain at least 8 characters")
    .max(100, "Password must not exceed 100 characters"),

  role: z.enum(["customer", "seller", "admin"]).default("customer"),
});

// Register schema
export const registerSchema = z
  .object({
    email: z.string().min(1, "Email is required").email("Invalid email format"),

    password: z
      .string()
      .min(8, "Password must contain at least 8 characters")
      .max(100, "Password must not exceed 100 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),

    confirmPassword: z.string().min(1, "Please confirm your password"),

    firstName: z
      .string()
      .max(50, "First name must not exceed 50 characters")
      .optional()
      .or(z.literal("")),

    lastName: z
      .string()
      .max(50, "Last name must not exceed 50 characters")
      .optional()
      .or(z.literal("")),

    phoneNumber: z
      .string()
      .regex(/^[0-9]{10,11}$/, "Phone number must contain 10–11 digits")
      .optional()
      .or(z.literal("")),

    dateOfBirth: z
      .string()
      .refine(
        (date) => {
          if (!date) return true; // Optional field
          const birthDate = new Date(date);
          const today = new Date();
          const age = today.getFullYear() - birthDate.getFullYear();
          return age >= 18 && age <= 120;
        },
        { message: "You must be at least 18 years old" }
      )
      .optional()
      .or(z.literal("")),

    gender: z
      .string()
      .refine((val) => ["0", "1", "2"].includes(val), {
        message: "Invalid gender value",
      })
      .optional()
      .or(z.literal("0")),

    role: z.enum(["customer", "seller", "admin"]).default("customer"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Type exports
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
