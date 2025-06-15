// Quiz questions from test.txt file
export interface QuizQuestion {
  section: string;
  question: string;
  options: string[];
  correct: number;
  isOpenEnded?: boolean;
}

export const quizQuestions: QuizQuestion[] = [
  // CPL & Aviation Basics (Questions 1-19)
  {
    section: "CPL & Aviation Basics",
    question: "What is the full form of CPL in aviation?",
    options: ["Commercial Pilot License", "Civil Pilot License", "Certified Private License", "Commercial Passenger Line"],
    correct: 0
  },
  {
    section: "CPL & Aviation Basics",
    question: "What is the minimum age to apply for a CPL in India?",
    options: ["17", "18", "21", "25"],
    correct: 1
  },
  {
    section: "CPL & Aviation Basics",
    question: "How many total flying hours are required to be eligible for CPL in India?",
    options: ["100 hours", "150 hours", "200 hours", "250 hours"],
    correct: 2
  },
  {
    section: "CPL & Aviation Basics",
    question: "What are the mandatory subjects you must pass for a CPL?",
    options: ["Geography, Chemistry", "Physics, Maths", "Air Regulation, Navigation, Meteorology", "Biology, History"],
    correct: 2
  },
  {
    section: "CPL & Aviation Basics",
    question: "DGCA stands for:",
    options: ["Directorate General of Civil Aviation", "Delhi General Cargo Authority", "Department of Global Civil Aircraft", "Directorate of Government Charter Aircraft"],
    correct: 0
  },
  {
    section: "CPL & Aviation Basics",
    question: "What is a logbook used for in aviation?",
    options: ["To log aircraft speed", "To track passenger data", "To record flight hours and experience", "To save emergency contacts"],
    correct: 2
  },
  {
    section: "CPL & Aviation Basics",
    question: "Which document allows you to fly solo as a student pilot?",
    options: ["DGCA Letter", "Student Pilot License", "CPL", "Ground School Certificate"],
    correct: 1
  },
  {
    section: "CPL & Aviation Basics",
    question: "What is the purpose of a checkride?",
    options: ["To go on vacation", "To test an aircraft", "To evaluate a pilot's skill for licensing", "To collect weather data"],
    correct: 2
  },
  {
    section: "CPL & Aviation Basics",
    question: "What is the role of a Flight Instructor?",
    options: ["Ground duty officer", "Engine mechanic", "To train and supervise student pilots", "To approve airport designs"],
    correct: 2
  },
  {
    section: "CPL & Aviation Basics",
    question: "What is 'controlled airspace'?",
    options: ["An airspace with free movement", "Where ATC clearance is needed", "Military-only zone", "A temporary air corridor"],
    correct: 1
  },
  {
    section: "CPL & Aviation Basics",
    question: "What does a 'crosswind' mean during takeoff or landing?",
    options: ["Wind from directly behind", "Wind from the side", "Wind from above", "No wind"],
    correct: 1
  },
  {
    section: "CPL & Aviation Basics",
    question: "What is a NOTAM?",
    options: ["Flight time log", "Weather forecast", "Notice to Airmen about hazards or changes", "Passenger safety manual"],
    correct: 2
  },
  {
    section: "CPL & Aviation Basics",
    question: "How many types of licenses exist in Indian aviation for pilots?",
    options: ["1", "2", "3", "Unlimited"],
    correct: 2
  },
  {
    section: "CPL & Aviation Basics",
    question: "What is the visibility requirement to fly under VFR?",
    options: ["1 km", "3 km", "5 km", "8 km"],
    correct: 2
  },
  {
    section: "CPL & Aviation Basics",
    question: "What is the basic fuel requirement for VFR day flight?",
    options: ["Enough for 15 mins", "Enough for 30 mins", "Enough for 45 mins", "No requirement"],
    correct: 1
  },
  {
    section: "CPL & Aviation Basics",
    question: "Who controls Indian aviation licensing?",
    options: ["ICAO", "DGCA", "IATA", "Air India"],
    correct: 1
  },
  {
    section: "CPL & Aviation Basics",
    question: "What is the first step to becoming a commercial pilot?",
    options: ["Buy a uniform", "Get a medical certificate", "Apply to airlines", "Join cabin crew"],
    correct: 1
  },
  {
    section: "CPL & Aviation Basics",
    question: "Which instrument helps maintain level flight?",
    options: ["Speedometer", "Altimeter", "Attitude Indicator", "Compass"],
    correct: 2
  },
  {
    section: "CPL & Aviation Basics",
    question: "What does a red light from the control tower mean on ground?",
    options: ["Stop", "Clear to taxi", "Emergency", "Takeoff immediately"],
    correct: 0
  },
  // Behavior & Situational Awareness (Questions 20-25)
  {
    section: "Behavior & Situational Awareness",
    question: "When facing a goal that requires sustained effort over months, how do you keep yourself accountable?",
    options: ["I rely on external validation or deadlines to stay on track", "I create systems and routines that I review regularly", "I move on if I lose interest", "I tend to lose momentum unless pushed by others"],
    correct: 1
  },
  {
    section: "Behavior & Situational Awareness",
    question: "In a high-pressure cockpit scenario, what would you do first?",
    options: ["Blame external factors for the problem", "Wait for someone else to take the lead", "React immediately to resolve the situation", "Focus on breathing and checklist procedures while staying aware"],
    correct: 3
  },
  {
    section: "Behavior & Situational Awareness",
    question: "You receive feedback that challenges your approach. What's your reaction?",
    options: ["Reflect and re-evaluate your methods without defensiveness", "Take it personally and feel discouraged", "Ignore the feedback unless it comes from authority", "Justify your actions and resist change"],
    correct: 0
  },
  {
    section: "Behavior & Situational Awareness",
    question: "You're assigned a team project with members who aren't equally committed. What do you do?",
    options: ["Do most of the work to ensure completion", "Initiate open conversations and try to re-align goals", "Step back and let others handle it", "Complain and avoid confrontation"],
    correct: 1
  },
  {
    section: "Behavior & Situational Awareness",
    question: "A fellow student is struggling with concepts you understand well. How do you respond?",
    options: ["Hesitate to help out of fear it'll slow you down", "Feel superior and focus on your own success", "Offer help and share learning strategies", "Ignore it; it's their responsibility"],
    correct: 2
  },
  {
    section: "Behavior & Situational Awareness",
    question: "During flight simulation, an unexpected scenario is introduced. What's your immediate mindset?",
    options: ["Complain about unfairness", "Freeze and wait for instruction", "Panic slightly, but try to recover", "Assess calmly, fall back on training and prioritize safety"],
    correct: 3
  },
  // Motivation & Goal Alignment (Questions 26-29)
  {
    section: "Motivation & Goal Alignment",
    question: "Why do you believe aviation is the right career path for you?",
    options: ["I'm still figuring it out but this seemed exciting", "It's better than the other options I considered", "It aligns with my personal values, passion, and long-term vision", "It's a prestigious career that looks appealing"],
    correct: 2
  },
  {
    section: "Motivation & Goal Alignment",
    question: "When did you first feel drawn to the idea of flying, and why?",
    options: ["After a personal experience that sparked deep curiosity", "Because I saw others do it and thought it was cool", "When I started looking for career options", "I don't remember clearly"],
    correct: 0
  },
  {
    section: "Motivation & Goal Alignment",
    question: "What does success look like to you in 10 years — professionally and personally?",
    options: ["Doing something respectable in any field", "Growth, impact, and fulfillment in both career and personal development", "Still figuring it out", "Earning well and having a stable lifestyle"],
    correct: 1
  },
  {
    section: "Motivation & Goal Alignment",
    question: "If aviation training turns out to be more challenging than you expected, what's your mindset?",
    options: ["Push through and adapt — I'm here for the long haul", "Consider switching paths if it gets too hard", "Reconsider the field entirely", "Take long breaks until motivation returns"],
    correct: 0
  },
  // Question 30 - Open-ended
  {
    section: "Motivation & Goal Alignment",
    question: "What personal traits do you believe will help you thrive as a pilot?",
    options: [], // Empty for open-ended
    correct: -1, // No correct answer for open-ended
    isOpenEnded: true
  }
];