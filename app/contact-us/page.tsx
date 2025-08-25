
'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

export default function Page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isSubmitting, setIsSubmitting] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {`We'd love to hear from you. Send us a message and we'll respond as soon as possible.`}
          </p>
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Send us a Message</CardTitle>
                <CardDescription>
                {`Fill out the form below and we'll get back to you as soon as possible.`}  
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us more about your inquiry..."
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>
                  
                  <Button 
                    onClick={handleSubmit} 
                    className="w-full bg-cyan-700 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
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
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Details Card */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Contact Information</CardTitle>
                <CardDescription>
                  Reach out to us through any of these channels.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                    <p className="text-gray-600 text-sm">
                      123 Clean Corp Street<br />
                      Suite 100<br />
                      City, State 12345
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-600 text-sm">+1 (555) 123-4567</p>
                    <p className="text-gray-600 text-sm">+1 (555) 987-6543</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start space-x-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Mail className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600 text-sm">contact@cleancorp.com</p>
                    <p className="text-gray-600 text-sm">support@cleancorp.com</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start space-x-3">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                    <p className="text-gray-600 text-sm">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>

        {/* FAQ Section */}
        <Card className="mt-12 shadow-lg border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-gray-900">Frequently Asked Questions</CardTitle>
            <CardDescription>
              Quick answers to common questions before you reach out.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">How quickly do you respond?</h4>
                  <p className="text-gray-600 text-sm">We typically respond to all inquiries within 24 hours during business days.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">What services do you offer?</h4>
                  <p className="text-gray-600 text-sm">We provide comprehensive cleaning certification and corporate cleaning services.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Do you offer emergency support?</h4>
                  <p className="text-gray-600 text-sm">Yes, we provide 24/7 emergency support for urgent cleaning situations.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">How can I get a quote?</h4>
                  <p className="text-gray-600 text-sm">Simply fill out the contact form above or call us directly for a personalized quote.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}