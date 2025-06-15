import { z } from "zod";

// MongoDB Schema for leads collection
export const registrationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Please enter a valid email address"),
  cityOfResidence: z.string().min(2, "City must be at least 2 characters"),
  education: z.enum(["10th", "12th", "diploma", "graduation", "postgraduation", "other"], {
    required_error: "Please select your educational qualification"
  }),
  quizCompleted: z.boolean().default(false),
  registeredAt: z.date().default(() => new Date()),
  completedAt: z.date().optional(),
  percentage: z.number().optional(),
  quizmark: z.number().optional()
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
  quizCompleted: true,
  registeredAt: true,
  completedAt: true,
  percentage: true,
  quizmark: true
});

export type InsertRegistration = z.infer<typeof insertRegistrationSchema>;
