'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Send, CheckCircle } from 'lucide-react';

import { Alert, AlertDescription } from '../../components/ui/alert';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';

export default function Page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    source: '',
    subject: '',
    message: ''
  });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isSubmitting, setIsSubmitting] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const requiredFields = ['name', 'email', 'subject', 'message'];

    // Check if all required fields are filled
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]?.trim());

    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/email-contact-us', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData }),
      });

      const result = await response.json();

      if (result.success) {
        setShowSuccess(true);
        setFormData({ name: '', email: '', source: '', subject: '', message: '' });

        // Hide success message after 5 seconds
        setTimeout(() => setShowSuccess(false), 5000);
        alert("Successfully sent message");
      } else {
        console.error('Failed to send email:', result.error);
        alert('Failed to submit message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-[#16464C] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="mb-4" style={{ fontSize: '48px', fontWeight: 600 }}>
            Get in Touch
            </h1>
          <p className="max-w-2xl mx-auto" style={{ fontSize: '18px', opacity: 0.9 }}>
          Questions or want to learn more about CL3AN? We&apos;re here to help.
            </p>
        </div>
      </div>

      {/* Success Alert */}
      {showSuccess && (
        <Alert className="mb-8 border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            {`Thank you for your message! We'll get back to you within 24 hours.`}
          </AlertDescription>
        </Alert>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-[#16464C] mb-6" style={{ fontSize: '32px', fontWeight: 600 }}>
              Send Us a Message
            </h2>
            <form className="space-y-6">
              <div>
                <Label className="block text-gray-700 mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
                  Name
                </Label>
                <Input
                  className="bg-white transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData?.name}
                  onChange={handleInputChange}
                  required
                  />
              </div>

              <div>
                <Label className="block text-gray-700 mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
                  Email
                </Label>
                <Input
                  className="bg-white transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData?.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label className="block text-gray-700 mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
                  Company (Optional)
                </Label>
                <Input
                  className="bg-white transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  id="source"
                  name="source"
                  type="text"
                  placeholder="Your Company Name"
                  value={formData?.source}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label className="block text-gray-700 mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
                  Subject
                </Label>
                <Input
                  className="bg-white transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="What's this about?"
                  value={formData?.subject}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label className="block text-gray-700 mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us more about your inquiry..."
                  value={formData?.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="bg-white transition-all duration-200 focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              <Button
                  onClick={handleSubmit}
                  className="w-full bg-[#16464C] hover:bg-[#234948] font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </>
                  ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-[#16464C] mb-6" style={{ fontSize: '32px', fontWeight: 600 }}>
              Other Ways to Reach Us
            </h2>

            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#16464C] rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">📧</span>
                  </div>
                  <div>
                    <h3 className="text-gray-900 mb-1" style={{ fontSize: '18px', fontWeight: 600 }}>
                      Email
                    </h3>
                    <p className="text-gray-600" style={{ fontSize: '15px' }}>
                      cl3ancorp@gmail.com
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#16464C] rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">💬</span>
                  </div>
                  <div>
                    <h3 className="text-gray-900 mb-1" style={{ fontSize: '18px', fontWeight: 600 }}>
                      Social Media
                    </h3>
                    <p className="text-gray-600" style={{ fontSize: '15px' }}>
                      Follow us on Twitter, LinkedIn, and Instagram for updates and clean business tips.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Getting Started Section */}
            <div className="mt-12 bg-[#16464C] text-white p-8 rounded-lg">
              <h3 className="mb-4" style={{ fontSize: '24px', fontWeight: 600 }}>
                Ready to Get Started?
              </h3>
              <p className="mb-6" style={{ fontSize: '15px', opacity: 0.9 }}>
                If you&apos;re interested in becoming CL3AN certified, start your application today.
              </p>
              <Link href={"/become-clean-certified"}>
                <Button variant="secondary" className="bg-white text-[#16464C] hover:bg-gray-100" style={{ fontSize: '16px' }} >
                  Begin Application
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}