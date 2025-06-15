import { useContext, useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { AppContext } from "@/App";
import { quizQuestions } from "@/lib/quiz-data";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import QuizTimer from "@/components/quiz-timer";
import QuizProgress from "@/components/quiz-progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

export default function QuizPage() {
  const [, setLocation] = useLocation();
  const { userData, quizAnswers, setQuizAnswers } = useContext(AppContext);
  const { toast } = useToast();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Redirect if no user data
  useEffect(() => {
    if (!userData) {
      setLocation('/personal-details');
    }
  }, [userData, setLocation]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isTimerRunning) {
        setTimeSpent(prev => prev + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const quizSubmissionMutation = useMutation({
    mutationFn: async (data: { email: string; answers: (number | null)[]; timeSpent: number }) => {
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

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitQuiz();
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
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

  const handleTimeUp = () => {
    submitQuiz();
  };

  const answeredCount = quizAnswers.filter(answer => answer !== null).length;
  const question = quizQuestions[currentQuestion];

  if (!userData) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="fade-in">
        {/* Quiz Header */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-lg font-semibold text-gray-800">CPL Scholarship Entrance Test</h1>
              <p className="text-sm text-gray-600">You have 30 minutes to complete this test</p>
              <p className="text-sm text-gray-600">Make sure you have a stable internet connection</p>
            </div>
            <div className="flex items-center space-x-4">
              <QuizTimer 
                initialTime={30 * 60} 
                onTimeUp={handleTimeUp} 
                isRunning={isTimerRunning}
              />
              <div className="text-sm text-gray-600">
                Question {currentQuestion + 1} of 30
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <QuizProgress 
          current={currentQuestion + 1}
          total={quizQuestions.length}
          answered={answeredCount}
        />

        {/* Quiz Content */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          {/* Section Badge */}
          <div className="inline-block bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
            {question.section}
          </div>

          {/* Question Container */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {question.question}
            </h3>
            <div className="space-y-3">
              {question.options.map((option, index) => {
                const isSelected = quizAnswers[currentQuestion] === index;
                return (
                  <div
                    key={index}
                    className={`option ${isSelected ? 'selected' : ''}`}
                    onClick={() => selectAnswer(index)}
                  >
                    <div className="option-radio"></div>
                    <div className="option-text">
                      <span className="option-letter">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </div>
                  </div>
                );
              })}
            </div>
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
              disabled={quizSubmissionMutation.isPending}
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
