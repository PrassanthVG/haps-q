import { z } from "zod";

// Base registration schema (browser-compatible)
export const baseRegistrationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Please enter a valid email address"),
  cityOfResidence: z.string().min(2, "City must be at least 2 characters"),
  education: z.enum(["10th", "12th", "diploma", "graduation", "postgraduation", "other"], {
    required_error: "Please select your educational qualification"
  }),
  certification: z.boolean().refine(val => val === true, {
    message: "You must agree to the certification"
  }),
  quizCompleted: z.boolean().default(false),
  registeredAt: z.date().default(() => new Date()),
  completedAt: z.date().optional(),
  percentage: z.number().optional(),
  quizmark: z.number().optional()
});

// MongoDB-compatible schema (server-only)
export const registrationSchema = baseRegistrationSchema.extend({
  _id: z.any().optional() // Use 'any' to avoid MongoDB ObjectId import
});

export const quizSubmissionSchema = z.object({
  email: z.string().email(),
  answers: z.array(z.number().nullable()).length(30),
  timeSpent: z.number() // in seconds
});

export type Registration = z.infer<typeof registrationSchema>;
export type QuizSubmission = z.infer<typeof quizSubmissionSchema>;

// Insert schemas for API validation
export const insertRegistrationSchema = registrationSchema.omit({
  _id: true,
  quizCompleted: true,
  registeredAt: true,
  completedAt: true,
  percentage: true,
  quizmark: true
});

export type InsertRegistration = z.infer<typeof insertRegistrationSchema>;
