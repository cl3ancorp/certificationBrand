"use client"
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import Link from 'next/link';

interface Beacon {
    id: string;
    name: string;
    company: string;
    certified_company_id: string;
    created_at: string;
    title: string;
    description: string;
    img_url: string;
    website: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey)

export default function Beacons() {
    const [beaconsList, setBeacons] = useState<Beacon[]>([]);
    const [loading, setLoading] = useState<boolean>(true)
    const [isSending, setIsSending] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
    });

    useEffect(() => {
        const fetchBeacons = async () => {
            setLoading(true);
            try {
                const query = supabase
                    .from('beacons')
                    .select('*', { count: 'exact' })

                const { data, error } = await query

                if (error) throw error
                setBeacons(data);
            } catch (err: any) {
                console.error('Failed to fetch beacons', err)
            }
            setLoading(false);
        };
        fetchBeacons();
    }, []);

    const handleSubmit = async () => {
        const requiredFields = ['name', 'email', 'phone', 'subject'];

        // Check if all required fields are filled
        const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]?.trim());

        if (missingFields.length > 0) {
            alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
            return;
        }

        setIsSending(true);

        try {
            const response = await fetch('/api/email-recommend-beacon', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ formData }),
            });

            const result = await response.json();

            if (result.success) {
                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: ''
                });

                alert('Thank you for your recommendation! We will review it shortly.');
            } else {
                console.error('Failed to send email:', result.error);
                alert('Failed to submit recommendation. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit recommendation. Please try again.');
        } finally {
            setIsSending(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="bg-[#16464C] text-white py-20">
                <div className="max-w-7xl mx-auto px-8 text-center">
                    <h1 className="mb-6" style={{ fontSize: '48px', fontWeight: 700, letterSpacing: '0.02em' }}>
                        B3ACONS by CL3AN
          </h1>
                    <p className="max-w-3xl mx-auto" style={{ fontSize: '18px', lineHeight: '1.6' }}>
                        Beacons are individuals who embody clean ideals through their actions,
                        contributions and legacy. They are symbols that showcase what CL3AN stands for.
          </p>
                </div>
            </div>

            {/* Beacons Grid */}
            <div className="max-w-7xl mx-auto px-8 py-16">
                {/* Loading State */}
                {loading && (
                    <div className="text-center py-12">
                        <p className="text-gray-500" style={{ fontSize: '16px' }}>
                            Fetching all our B3ACONS...
                </p>
                    </div>
                )}
                <div className="grid md:grid-cols-3 gap-8">
                    {!loading && beaconsList.map((beacon) => (
                        <Link
                            href={beacon.website || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={beacon.id}
                            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            {/* BEACON CARD */}
                            <div className="relative h-64 bg-gray-200">
                                <img
                                    src={beacon.img_url}
                                    alt={beacon.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-gray-900 mb-1" style={{ fontSize: '20px', fontWeight: 700 }}>
                                    {beacon.name}
                                </h3>
                                <div className="text-gray-600 mb-3" style={{ fontSize: '14px', fontWeight: 500 }}>
                                    {beacon.title} · {beacon.company}
                                </div>
                                <p className="text-gray-700" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                                    {beacon.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Recommendation Form Section */}
            <div className="bg-white py-16">
                <div className="max-w-3xl mx-auto px-8">
                    <h2 className="text-gray-900 text-center mb-2" style={{ fontSize: '32px', fontWeight: 700 }}>
                        Missing a someone? Recommend a Beacon!
                    </h2>

                    <form onSubmit={handleSubmit} className="mt-12 space-y-6">
                        <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-gray-700 mb-2" style={{ fontSize: '14px', fontWeight: 600 }}>
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d5f5d] focus:border-transparent"
                                    placeholder="Name"
                                    style={{ fontSize: '14px' }}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-gray-700 mb-2" style={{ fontSize: '14px', fontWeight: 600 }}>
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d5f5d] focus:border-transparent"
                                    placeholder="Email"
                                    style={{ fontSize: '14px' }}
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-gray-700 mb-2" style={{ fontSize: '14px', fontWeight: 600 }}>
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d5f5d] focus:border-transparent"
                                    placeholder="Phone"
                                    style={{ fontSize: '14px' }}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-gray-700 mb-2" style={{ fontSize: '14px', fontWeight: 600 }}>
                                Subject
                            </label>
                            <textarea
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d5f5d] focus:border-transparent resize-none"
                                placeholder="Tell us about the person you'd like to recommend..."
                                style={{ fontSize: '14px' }}
                            />
                        </div>

                        <div className="text-center">
                            <Button
                                type="submit"
                                onClick={handleSubmit}
                                className="bg-[#16464C] hover:bg-[#2d5f5d] text-white px-8 py-3 rounded-md"
                                style={{ fontSize: '14px', fontWeight: 600 }}
                                disabled={isSending}
                            >
                                {isSending ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
