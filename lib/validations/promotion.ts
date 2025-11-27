import { z } from "zod";

// Promotion form schema
export const promotionSchema = z
  .object({
    code: z
      .string()
      .min(1, "Promotion code is required")
      .max(50, "Code must not exceed 50 characters")
      .regex(
        /^[A-Z0-9_-]+$/,
        "Code may only contain uppercase letters, numbers, underscores, and hyphens"
      ),

    name: z
      .string()
      .min(1, "Promotion name is required")
      .max(200, "Name must not exceed 200 characters"),

    description: z
      .string()
      .max(1000, "Description must not exceed 1000 characters")
      .optional()
      .or(z.literal("")),

    discounttype: z.number().refine((val) => [1, 2].includes(val), {
      message: "Invalid discount type",
    }),

    discountvalue: z.number().positive("Discount value must be greater than 0"),

    startdate: z
      .string()
      .min(1, "Start date is required")
      .refine(
        (date) => {
          const parsed = new Date(date);
          return !isNaN(parsed.getTime());
        },
        { message: "Invalid start date format" }
      ),

    enddate: z
      .string()
      .min(1, "End date is required")
      .refine(
        (date) => {
          const parsed = new Date(date);
          return !isNaN(parsed.getTime());
        },
        { message: "Invalid end date format" }
      ),

    maxusage: z
      .number()
      .int("Max usage must be an integer")
      .min(1, "Max usage must be at least 1"),

    productIds: z.array(z.number()).optional().default([]),

    status: z
      .number()
      .refine((val) => [0, 1].includes(val), {
        message: "Invalid status value",
      })
      .optional()
      .default(1),
  })

  // End date must be after start date
  .refine(
    (data) => {
      const start = new Date(data.startdate);
      const end = new Date(data.enddate);
      return end > start;
    },
    {
      message: "End date must be later than start date",
      path: ["enddate"],
    }
  )

  // Percentage discount cannot exceed 100%
  .refine(
    (data) => {
      if (data.discounttype === 1) {
        return data.discountvalue <= 100;
      }
      return true;
    },
    {
      message: "Percentage discount cannot exceed 100%",
      path: ["discountvalue"],
    }
  )

  // Fixed amount discount must be reasonable
  .refine(
    (data) => {
      if (data.discounttype === 2) {
        return data.discountvalue <= 100_000_000; // 100 million VND
      }
      return true;
    },
    {
      message: "Fixed discount value must not exceed 100,000,000 VND",
      path: ["discountvalue"],
    }
  );

// Type export
export type PromotionFormData = z.infer<typeof promotionSchema>;
