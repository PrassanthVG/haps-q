import { useContext, useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { AppContext } from "@/App";
import { quizQuestions } from "@/lib/quiz-data";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, Check, Clock } from "lucide-react";

export default function QuizPage() {
  const [, setLocation] = useLocation();
  const { userData, quizAnswers, setQuizAnswers } = useContext(AppContext);
  const { toast } = useToast();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [openEndedAnswer, setOpenEndedAnswer] = useState("");

  // Redirect if no user data
  useEffect(() => {
    if (!userData) {
      setLocation('/personal-details');
    }
  }, [userData, setLocation]);

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (isTimerRunning) {
        setTimeSpent(prev => prev + 1);
        setTimeRemaining(prev => {
          if (prev <= 1) {
            submitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const quizSubmissionMutation = useMutation({
    mutationFn: async (data: { email: string; answers: (number | string | null)[]; timeSpent: number }) => {
      return apiRequest('POST', '/api/quiz/submit', data);
    },
    onSuccess: () => {
      toast({
        title: "Quiz Submitted Successfully",
        description: "Your responses have been recorded.",
      });
      setLocation('/completion');
    },
    onError: (error: Error) => {
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const selectAnswer = (answerIndex: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setQuizAnswers(newAnswers);
  };

  const handleOpenEndedAnswer = (value: string) => {
    setOpenEndedAnswer(value);
    const newAnswers = [...quizAnswers];
    newAnswers[currentQuestion] = value;
    setQuizAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      // Load open-ended answer if moving to question 30
      if (currentQuestion + 1 === 29 && quizAnswers[29]) {
        setOpenEndedAnswer(quizAnswers[29] as string || "");
      }
    } else {
      submitQuiz();
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      // Load open-ended answer if moving back to question 30
      if (currentQuestion - 1 === 29 && quizAnswers[29]) {
        setOpenEndedAnswer(quizAnswers[29] as string || "");
      }
    }
  };

  const submitQuiz = () => {
    setIsTimerRunning(false);
    if (userData?.email) {
      quizSubmissionMutation.mutate({
        email: userData.email,
        answers: quizAnswers,
        timeSpent
      });
    }
  };

  const answeredCount = quizAnswers.filter(answer => answer !== null && answer !== undefined && answer !== "").length;
  const question = quizQuestions[currentQuestion];

  // Format timer display
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!userData) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="text-4xl mr-3">✈️</div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">HAPS Aviation Institute</h1>
          </div>
          <p className="text-lg text-gray-600">CPL Scholarship Entrance Test</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>Question {currentQuestion + 1} of 30</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${((currentQuestion + 1) / 30) * 100}%` }}
            />
          </div>
        </div>

        {/* Quiz Content */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          {/* Quiz Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center text-red-600 font-semibold mb-2 sm:mb-0">
              <Clock className="w-5 h-5 mr-2" />
              <span>Time Remaining: {formatTime(timeRemaining)}</span>
            </div>
            <div className="text-center text-gray-600">
              Question {currentQuestion + 1} of 30
            </div>
          </div>

          {/* Section Badge */}
          <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
            {question.section}
          </div>

          {/* Question Container */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              {currentQuestion + 1}. {question.question}
            </h3>

            {question.isOpenEnded ? (
              // Open-ended question (Question 30)
              <div className="space-y-4">
                <Textarea
                  value={openEndedAnswer}
                  onChange={(e) => handleOpenEndedAnswer(e.target.value)}
                  placeholder="Please share your thoughts in detail (minimum 100 characters)..."
                  className="min-h-[200px] w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  maxLength={2000}
                />
                <div className="text-sm text-gray-500 text-right">
                  {openEndedAnswer.length}/2000 characters
                </div>
                {openEndedAnswer.length < 100 && (
                  <p className="text-sm text-orange-600">
                    Please provide at least 100 characters for a meaningful response.
                  </p>
                )}
              </div>
            ) : (
              // Multiple choice questions
              <div className="space-y-3">
                {question.options.map((option, index) => {
                  const isSelected = quizAnswers[currentQuestion] === index;
                  return (
                    <div
                      key={index}
                      className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
                        isSelected 
                          ? 'bg-blue-100 border-blue-500' 
                          : 'bg-white border-gray-300 hover:bg-blue-50 hover:border-blue-500'
                      }`}
                      onClick={() => selectAnswer(index)}
                    >
                      <div className={`w-5 h-5 border-2 rounded-full mr-3 relative flex-shrink-0 ${
                        isSelected ? 'border-blue-500' : 'border-gray-300'
                      }`}>
                        {isSelected && (
                          <div className="w-2.5 h-2.5 bg-blue-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        )}
                      </div>
                      <div className="flex-1 text-base">
                        <span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>
                        {option}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={previousQuestion}
              disabled={currentQuestion === 0}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <div className="text-sm text-gray-600 text-center">
              {answeredCount} of 30 questions answered
            </div>
            
            <Button
              onClick={nextQuestion}
              disabled={
                quizSubmissionMutation.isPending || 
                (question.isOpenEnded && openEndedAnswer.length < 100)
              }
              className={`font-semibold py-3 px-6 rounded-xl transition-all ${
                currentQuestion === quizQuestions.length - 1
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-blue-500 hover:bg-blue-700 text-white'
              }`}
            >
              {currentQuestion === quizQuestions.length - 1 ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  {quizSubmissionMutation.isPending ? 'Submitting...' : 'Submit Quiz'}
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}