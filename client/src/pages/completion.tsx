import { Check, HelpCircle } from "lucide-react";

export default function CompletionPage() {
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

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="text-3xl text-green-500 w-8 h-8" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Test Completed Successfully!
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto mb-6">
              Thank you for your participation in the HAPS Aviation Institute CPL Scholarship Entrance Test.
            </p>
            <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto mb-4">
              Successful candidates will be contacted by LYFT by HAPS Aviation within 2-3 business days to discuss enrollment in our exclusive 2-day complimentary fundamentals training program.
            </p>
            <p className="text-gray-600 mb-6">
              Please ensure your phone is accessible and monitor your email for forthcoming communications.
            </p>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center justify-center">
              <HelpCircle className="text-blue-500 mr-2 w-6 h-6" />
              Have Questions?
            </h3>
            <p className="text-gray-600 mb-4">We're here to help:</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-blue-500">📞</span>
                <span className="font-medium">+91 99452 44270</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-blue-500">📧</span>
                <span className="font-medium">marketing@hapsaviation.com</span>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <strong>Campus Address:</strong><br />
              #748, 4th Floor, Above A2B, Just Before Hoskote Toll,<br />
              Bidarahalli, Bangalore East – 560049
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}