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

    discount_type: z
      .number()
      .refine((val) => [1, 2].includes(val), {
        message: "Invalid discount type",
      }),

    discount_value: z
      .number()
      .positive("Discount value must be greater than 0"),

    start_date: z
      .string()
      .min(1, "Start date is required")
      .refine(
        (date) => {
          const parsed = new Date(date);
          return !isNaN(parsed.getTime());
        },
        { message: "Invalid start date format" }
      ),

    end_date: z
      .string()
      .min(1, "End date is required")
      .refine(
        (date) => {
          const parsed = new Date(date);
          return !isNaN(parsed.getTime());
        },
        { message: "Invalid end date format" }
      ),

    max_usage: z
      .number()
      .int("Max usage must be an integer")
      .min(1, "Max usage must be at least 1"),

    product_ids: z.array(z.number()).optional().default([]),

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
      const start = new Date(data.start_date);
      const end = new Date(data.end_date);
      return end > start;
    },
    {
      message: "End date must be later than start date",
      path: ["end_date"],
    }
  )

  // Percentage discount cannot exceed 100%
  .refine(
    (data) => {
      if (data.discount_type === 1) {
        return data.discount_value <= 100;
      }
      return true;
    },
    {
      message: "Percentage discount cannot exceed 100%",
      path: ["discount_value"],
    }
  )

  // Fixed amount discount must be reasonable
  .refine(
    (data) => {
      if (data.discount_type === 2) {
        return data.discount_value <= 100_000_000; // 100 million VND
      }
      return true;
    },
    {
      message: "Fixed discount value must not exceed 100,000,000 VND",
      path: ["discount_value"],
    }
  );

// Type export
export type PromotionFormData = z.infer<typeof promotionSchema>;
