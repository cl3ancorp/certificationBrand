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
        // setFormData({
        //   name: '',
        //   email: '',
        //   phone: '',
        //   entityName: '',
        //   description: '',
        //   website: '',
        //   location: '',
        //   additionalInfo: ''
        // });

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
             <Image height={150} width={150} alt={logoAlt} src={logoSrc}/>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Become Clean Certified</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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

        {/* Main Form */}
        <Card className="shadow-xl border-0 py-0">
          <CardHeader className="bg-green-700 py-6 text-white rounded-t-lg">
            <CardTitle className="text-2xl">Fill out Required Fields*</CardTitle>
            <CardDescription className="text-green-100">
              And a team member will contact you soon.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-8">
            <div className="space-y-8">
              
              {/* Contact Information Section */}
              <div>
                <div className="flex items-center mb-6">
                  <Users className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">Contact Information</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
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

                <div className="space-y-6">
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

              {/* Additional Information */}
              <div>
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

              {/* Submit Button */}
              <div className="pt-6">
                <Button 
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-4 rounded-lg transition-all duration-200 transform hover:scale-105"
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
          </CardContent>
        </Card>

      </div>
    </div>
  );
}