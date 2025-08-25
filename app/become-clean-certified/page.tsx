"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CheckCircle, Building2, Users, MapPin, Briefcase, Send, Check, ChevronsUpDown } from 'lucide-react';

const industries = [
  'Agriculture, forestry & fishing',
  'Construction',
  'Energy, Heating & Cooling',
  'Manufactured Goods',
  'Mining & Quarrying',
  'Waste Management & Recycling',
  'Water & Sewerage',
  'Accommodation & food service',
  'Administrative & support services',
  'Arts, entertainment & recreation',
  'Education',
  'Energy',
  'Financial & insurance activities',
  'Human health & social work',
  'Information, communication & technology',
  'Other services',
  'Professional & technical services',
  'Publishing - Print',
  'Real estate, design & building',
  'Rental & Repair',
  'Transportation & storage',
  'Retail',
  'Wholesale'
];

const companySizes = [
  { value: '0', label: 'Just me (0 employees)' },
  { value: '1-9', label: 'Small (1-9 employees)' },
  { value: '10-49', label: 'Medium (10-49 employees)' },
  { value: '50-249', label: 'Large (50-249 employees)' },
  { value: '250-999', label: 'Enterprise (250-999 employees)' },
  { value: '1000+', label: 'Corporation (1000+ employees)' }
];

const ownershipTypes = [
  { id: 'black', label: 'Black-owned business' },
  { id: 'employee', label: 'Employee-owned business' },
  { id: 'immigrant', label: 'Immigrant-owned business' },
  { id: 'indigenous', label: 'Indigenous-owned business' }
];

export default function BecomeCleanCertified() {
  const [formData, setFormData] = useState({
    // Contact Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Business Information
    businessName: '',
    businessDescription: '',
    website: '',
    
    // Location
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    
    // Business Details
    industry: '',
    companySize: '',
    ownership: [] as string[],
    
    // Additional Information
    additionalInfo: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [industryOpen, setIndustryOpen] = useState(false);

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOwnershipChange = (ownershipId:any, checked:any) => {
    setFormData(prev => ({
      ...prev,
      ownership: checked 
        ? [...prev.ownership, ownershipId]
        : prev.ownership.filter(id => id !== ownershipId)
    }));
  };

  const handleSelectChange = (name:any, value:any) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        businessName: '',
        businessDescription: '',
        website: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        industry: '',
        companySize: '',
        ownership: [],
        additionalInfo: ''
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Become Clean Certified</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our network of certified clean businesses and showcase your commitment to environmental responsibility and sustainable practices.
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
            <CardTitle className="text-2xl">Certification Application</CardTitle>
            <CardDescription className="text-green-100">
              Please fill out all required fields to begin your certification process.
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
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter your first name"
                      required
                      className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter your last name"
                      required
                      className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      required
                      className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
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
                  <h3 className="text-xl font-semibold text-gray-900">Business Information</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      placeholder="Enter your business name"
                      required
                      className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="businessDescription">Business Description *</Label>
                    <Textarea
                      id="businessDescription"
                      name="businessDescription"
                      value={formData.businessDescription}
                      onChange={handleInputChange}
                      placeholder="Briefly describe your business and services"
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
                </div>
              </div>

              <Separator />

              {/* Location Section */}
              <div>
                <div className="flex items-center mb-6">
                  <MapPin className="w-5 h-5 text-purple-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">Business Location</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter your business address"
                      required
                      className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Enter city"
                      required
                      className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province *</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="Enter state or province"
                      required
                      className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="Enter ZIP or postal code"
                      required
                      className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder="Enter country"
                      required
                      className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Business Details Section */}
              <div>
                <div className="flex items-center mb-6">
                  <Briefcase className="w-5 h-5 text-orange-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">Business Details</h3>
                </div>
                
                <div className="space-y-6">
                  {/* Industry Selection */}
                  <div className="space-y-2">
                    <Label>Industry *</Label>
                    <Popover open={industryOpen} onOpenChange={setIndustryOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={industryOpen}
                          className="w-full justify-between text-left"
                        >
                          {formData.industry ? formData.industry : "Select your industry..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search industries..." />
                          <CommandEmpty>No industry found.</CommandEmpty>
                          <CommandGroup className="max-h-64 overflow-auto">
                            {industries.map((industry) => (
                              <CommandItem
                                key={industry}
                                value={industry}
                                onSelect={() => {
                                  handleSelectChange('industry', industry);
                                  setIndustryOpen(false);
                                }}
                              >
                                <Check
                                  className={`mr-2 h-4 w-4 ${
                                    formData.industry === industry ? "opacity-100" : "opacity-0"
                                  }`}
                                />
                                {industry}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Company Size */}
                  <div className="space-y-2">
                    <Label>Company Size *</Label>
                    <Select value={formData.companySize} onValueChange={(value) => handleSelectChange('companySize', value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select company size" />
                      </SelectTrigger>
                      <SelectContent>
                        {companySizes.map((size) => (
                          <SelectItem key={size.value} value={size.value}>
                            {size.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Ownership Demographics */}
                  <div className="space-y-4">
                    <Label>Ownership Demographics (Select all that apply)</Label>
                    <div className="grid md:grid-cols-2 gap-4">
                      {ownershipTypes.map((type) => (
                        <div key={type.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={type.id}
                            checked={formData.ownership.includes(type.id)}
                            onCheckedChange={(checked) => handleOwnershipChange(type.id, checked)}
                          />
                          <Label htmlFor={type.id} className="text-sm font-normal cursor-pointer">
                            {type.label}
                          </Label>
                        </div>
                      ))}
                    </div>
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