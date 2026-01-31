"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Building2, Users, Send } from 'lucide-react';
import Image from 'next/image';

const logoSrc = "/images/branding/Logotipo-Cl3an-03.png";
const logoAlt = "cl3an logo"

export default function BecomeCleanCertified() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    entityName: '',
    description: '',
    website: '',
    location: '',
    additionalInfo: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleSubmit = async () => {
    const requiredFields = ['name', 'email', 'phone', 'entityName', 'description'];

    // Check if all required fields are filled
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]?.trim());

    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/email-become-certified', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData }),
      });

      const result = await response.json();

      if (result.success) {
        setShowSuccess(true);

        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          entityName: '',
          description: '',
          website: '',
          location: '',
          additionalInfo: ''
        });

        // Hide success message after 5 seconds
        setTimeout(() => setShowSuccess(false), 5000);
        alert("Sucessfully sent email")
      } else {
        console.error('Failed to send email:', result.error);
        alert('Failed to submit application. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-[#16464C] text-center py-20">
        <div className="flex justify-center mb-4">
          <Image height={150} width={150} alt={logoAlt} src={logoSrc} />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Become CL3AN Certified</h1>
        <p className="text-lg text-white max-w-2xl mx-auto">
          Join our network of certified sources
          </p>
      </div>

      {/* Success Alert */}
      {showSuccess && (
        <Alert className="mb-8 border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Application submitted successfully! We&apos;ll review your application and get back to you within 3-5 business days.
            </AlertDescription>
        </Alert>
      )}

      {/* Form Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="space-y-16">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-700 mb-12">
              A couple steps away from becoming certified! Fill out required fields and a team member will contact you soon!
            </h1>
          </div>

          {/* Contact Information Section */}
          <div>
            <div className="flex items-center mb-6">
              <Users className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-xl font-semibold text-gray-900">Contact Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Business Information Section */}
          <div>
            <div className="flex items-center mb-6">
              <Building2 className="w-5 h-5 text-green-600 mr-2" />
              <h3 className="text-xl font-semibold text-gray-900">Source Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <Label htmlFor="entityName">Entity Name *</Label>
                <Input
                  id="entityName"
                  name="entityName"
                  value={formData.entityName}
                  onChange={handleInputChange}
                  placeholder="Enter your entity name"
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://www.yourbusiness.com"
                  className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter your business location"
                  className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* More Information Section */}
          <div>
            <div>
              <div className="flex items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Tell us more about what you stand for!</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Briefly describe your business"
                    required
                    rows={4}
                    className="transition-all duration-200 focus:ring-2 focus:ring-green-500 resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">Additional Information</Label>
                  <Textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    placeholder="Share any additional information about your business, sustainability practices, or certification goals..."
                    rows={4}
                    className="transition-all duration-200 focus:ring-2 focus:ring-green-500 resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <Button
              onClick={handleSubmit}
              className="w-full px-10 py-4 rounded-md bg-[#16464C] text-white font-medium hover:bg-gray-800 py-4 rounded-lg transition-all duration-200 transform hover:scale-105"
              disabled={isSubmitting}
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing Application...
                </>
              ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                      Submit Certification Application
                  </>
                )}
            </Button>

            <p className="text-sm text-gray-500 text-center mt-4">
              By submitting this application, you agree to our terms of service and certification requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}