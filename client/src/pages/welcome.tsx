import { useLocation } from "wouter";
import { Plane, Rocket, ClipboardList, GraduationCap, HelpCircle } from "lucide-react";

export default function WelcomePage() {
  const [, setLocation] = useLocation();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="fade-in">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Plane className="text-4xl text-blue-500 mr-3 w-10 h-10" />
              <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
                Welcome to the LYFT by HAPS Aviation Institute CPL Fundamentals Class Entrance Test!
              </h1>
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-blue-500 mb-4">
              Soar into the Skies with HAPS Aviation
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
              At HAPS, we believe that anyone with the passion to fly, can fly. With our experienced faculty and industry-aligned training, we are here to help you take your first confident step into the world of aviation.
            </p>
          </div>

          {/* Take First Step Section */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Rocket className="text-blue-500 mr-2 w-6 h-6" />
              Take the First Step
            </h3>
            <p className="text-gray-700 leading-relaxed">
              By completing this Entrance & Eligibility Assessment, you become eligible for a complimentary Fundamentals of Aviation training session. This test allows us to gauge your current understanding, mindset, and enthusiasm for aviation — and opens the door to scholarship opportunities.
            </p>
          </div>

          {/* Test Overview */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <ClipboardList className="mr-2 w-6 h-6" />
                Test Overview
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="font-medium w-20">Format:</span>
                  <span>30 Questions</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-20">Duration:</span>
                  <span>30 Minutes</span>
                </div>
                <div className="flex items-start">
                  <span className="font-medium w-20">Content:</span>
                  <span>A curated mix of aviation fundamentals, real-life scenarios, and motivational insights</span>
                </div>
                <div className="flex items-start">
                  <span className="font-medium w-20">Flexibility:</span>
                  <span>The test is open-book. We value effort and sincerity over perfection.</span>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-blue-500 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-blue-500 mb-4 flex items-center">
                <GraduationCap className="mr-2 w-6 h-6" />
                What's Next?
              </h3>
              <p className="text-gray-700 mb-4">
                Successful candidates will receive a ₹50,000 scholarship on DGCA Ground Classes and a direct pathway to join the CPL Program at Lyft by HAPS Aviation Institute.
              </p>
              <p className="text-gray-600 text-sm">
                This selection process is designed not just to evaluate aptitude, but to identify aspiring aviators who are committed to pursuing a flying career. It also offers you a first-hand experience of our training quality before full enrollment.
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <HelpCircle className="text-blue-500 mr-2 w-6 h-6" />
              Have Questions?
            </h3>
            <p className="text-gray-600 mb-4">We're here to help:</p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <i className="fas fa-phone text-blue-500"></i>
                <span className="font-medium">+91 99452 44270</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-envelope text-blue-500"></i>
                <span className="font-medium">marketing@hapsaviation.com</span>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <strong>Campus Address:</strong><br />
              #748, 4th Floor, Above A2B, Just Before Hoskote Toll,<br />
              Bidarahalli, Bangalore East – 560049
            </div>
          </div>

          <div className="text-center">
            <button 
              onClick={() => setLocation('/personal-details')}
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <i className="fas fa-arrow-right mr-2"></i>
              Start Entrance Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
