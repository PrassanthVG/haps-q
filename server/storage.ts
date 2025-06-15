import { MongoClient, Db, Collection, ObjectId } from 'mongodb';
import { Registration, QuizSubmission } from '@shared/schema';
import dotenv from 'dotenv';

// Ensure environment variables are loaded
dotenv.config();

// MongoDB-specific registration type with proper ObjectId
export interface MongoRegistration extends Omit<Registration, '_id'> {
  _id?: ObjectId;
}

export interface IStorage {
  createRegistration(registration: Omit<Registration, '_id' | 'quizCompleted' | 'registeredAt'>): Promise<Registration>;
  updateQuizCompletion(email: string, submission: QuizSubmission): Promise<Registration | null>;
  getRegistrationByEmail(email: string): Promise<Registration | null>;
}

export class MongoStorage implements IStorage {
  private client: MongoClient;
  private db: Db;
  private registrations: Collection<MongoRegistration>;

  constructor() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI environment variable is required');
    }
    
    this.client = new MongoClient(uri);
    this.db = this.client.db('leads');
    this.registrations = this.db.collection<MongoRegistration>('registrations');
  }

  async connect() {
    try {
      await this.client.connect();
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      throw error;
    }
  }

  async createRegistration(registrationData: Omit<Registration, '_id' | 'quizCompleted' | 'registeredAt'>): Promise<Registration> {
    const mongoRegistration: MongoRegistration = {
      ...registrationData,
      quizCompleted: false,
      registeredAt: new Date()
    };

    const result = await this.registrations.insertOne(mongoRegistration);
    return { ...mongoRegistration, _id: result.insertedId.toString() };
  }

  async updateQuizCompletion(email: string, submission: QuizSubmission): Promise<Registration | null> {
    // Calculate score
    const quizData = await import('../client/src/lib/quiz-data');
    let correct = 0;
    submission.answers.forEach((answer, index) => {
      if (answer !== null && answer === quizData.quizQuestions[index].correct) {
        correct++;
      }
    });
    
    const percentage = Math.round((correct / submission.answers.length) * 100);
    const quizmark = correct;

    const result = await this.registrations.findOneAndUpdate(
      { email },
      { 
        $set: { 
          quizCompleted: true,
          completedAt: new Date(),
          percentage,
          quizmark
        }
      },
      { returnDocument: 'after' }
    );

    if (result && result._id) {
      return { ...result, _id: result._id.toString() };
    }
    return null;
  }

  async getRegistrationByEmail(email: string): Promise<Registration | null> {
    const result = await this.registrations.findOne({ email });
    if (result && result._id) {
      return { ...result, _id: result._id.toString() };
    }
    return null;
  }
}

export const storage = new MongoStorage();
