import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertRegistrationSchema, quizSubmissionSchema } from "@shared/schema";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";

// Security middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Connect to MongoDB
  await storage.connect();

  // Security middleware
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        fontSrc: ["'self'", "https://cdnjs.cloudflare.com"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  }));
  
  app.use(cors({
    origin: process.env.NODE_ENV === 'development' ? true : false,
    credentials: true
  }));
  
  app.use('/api', limiter);

  // Registration endpoint
  app.post('/api/register', async (req, res) => {
    try {
      const validatedData = insertRegistrationSchema.parse(req.body);
      
      // Check if email already exists
      const existing = await storage.getRegistrationByEmail(validatedData.email);
      if (existing) {
        return res.status(400).json({ 
          message: "Registration with this email already exists" 
        });
      }

      const registration = await storage.createRegistration(validatedData);
      
      res.status(201).json({ 
        message: "Registration successful",
        email: registration.email 
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Quiz submission endpoint
  app.post('/api/quiz/submit', async (req, res) => {
    try {
      const validatedData = quizSubmissionSchema.parse(req.body);
      
      const registration = await storage.getRegistrationByEmail(validatedData.email);
      if (!registration) {
        return res.status(404).json({ 
          message: "Registration not found" 
        });
      }

      if (registration.quizCompleted) {
        return res.status(400).json({ 
          message: "Quiz already completed for this email" 
        });
      }

      const updatedRegistration = await storage.updateQuizCompletion(
        validatedData.email, 
        validatedData
      );

      if (!updatedRegistration) {
        return res.status(500).json({ 
          message: "Failed to update quiz completion" 
        });
      }

      res.json({ 
        message: "Quiz submitted successfully",
        percentage: updatedRegistration.percentage,
        score: updatedRegistration.quizmark
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Check registration status
  app.get('/api/registration/:email', async (req, res) => {
    try {
      const { email } = req.params;
      const registration = await storage.getRegistrationByEmail(email);
      
      if (!registration) {
        return res.status(404).json({ message: "Registration not found" });
      }

      res.json({
        email: registration.email,
        fullName: registration.fullName,
        quizCompleted: registration.quizCompleted,
        percentage: registration.percentage,
        score: registration.quizmark
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
