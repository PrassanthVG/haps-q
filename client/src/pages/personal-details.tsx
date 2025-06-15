import { useContext, useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertRegistrationSchema, type InsertRegistration } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { AppContext } from "@/App";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, User } from "lucide-react";

export default function PersonalDetailsPage() {
  const [, setLocation] = useLocation();
  const { setUserData } = useContext(AppContext);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<InsertRegistration>({
    resolver: zodResolver(insertRegistrationSchema)
  });

  const certification = watch("certification");

  const registrationMutation = useMutation({
    mutationFn: async (data: InsertRegistration) => {
      return apiRequest('POST', '/api/register', data);
    },
    onSuccess: async (response) => {
      const result = await response.json();
      setUserData(result);
      toast({
        title: "Registration Successful",
        description: "You can now proceed to the test.",
      });
      setLocation('/quiz');
    },
    onError: (error: Error) => {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: InsertRegistration) => {
    registrationMutation.mutate(data);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="fade-in">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Welcome to the LYFT by HAPS Aviation Institute CPL Fundamentals Class Entrance Test!
            </h1>
            <p className="text-red-600 text-sm">* Indicates required question</p>
          </div>

          {/* Personal Details Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-blue-500 mb-4 flex items-center">
              <User className="text-blue-500 mr-2 w-6 h-6" />
              Personal Details
            </h2>
            <p className="text-gray-600 mb-6">
              Please fill in your details to proceed to the test. This information will be used to contact qualified candidates.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Full Name */}
              <div>
                <Label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  {...register("fullName")}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <Label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  {...register("phoneNumber")}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* City of Residence */}
              <div>
                <Label htmlFor="cityOfResidence" className="block text-sm font-medium text-gray-700 mb-2">
                  City of Residence <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="cityOfResidence"
                  {...register("cityOfResidence")}
                  placeholder="Enter your city"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                {errors.cityOfResidence && (
                  <p className="text-red-500 text-sm mt-1">{errors.cityOfResidence.message}</p>
                )}
              </div>

              {/* Educational Qualification */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Educational Qualification <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={(value) => setValue("education", value as any)}>
                  <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                    <SelectValue placeholder="Select your qualification" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10th">10th Standard</SelectItem>
                    <SelectItem value="12th">12th Standard</SelectItem>
                    <SelectItem value="diploma">Diploma</SelectItem>
                    <SelectItem value="graduation">Graduation</SelectItem>
                    <SelectItem value="postgraduation">Post Graduation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.education && (
                  <p className="text-red-500 text-sm mt-1">{errors.education.message}</p>
                )}
              </div>

              {/* Certification Checkbox */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="certification"
                    checked={certification}
                    onCheckedChange={(checked) => setValue("certification", !!checked)}
                    className="mt-1"
                  />
                  <Label htmlFor="certification" className="text-sm text-gray-700">
                    I hereby certify that, to the best of my knowledge, the provided information is true and accurate. <span className="text-red-500">*</span>
                  </Label>
                </div>
                <div className="mt-2 ml-7 text-sm text-gray-600">
                  I agree
                </div>
                {errors.certification && (
                  <p className="text-red-500 text-sm mt-1 ml-7">{errors.certification.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setLocation('/')}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button 
                  type="submit" 
                  disabled={registrationMutation.isPending}
                  className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  {registrationMutation.isPending ? 'Processing...' : 'Proceed to Test'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
