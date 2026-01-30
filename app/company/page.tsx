'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '../../components/ui/button';
import { createClient } from '@supabase/supabase-js'

// Company interface with UUID
interface Company {
    id: string  // UUID
    created_at: string
    name: string | null
    img_url: string | null
    logo: string | null
    website: string | null
    description: string | null
    size: string | null
    industry: string | null
    operates_in: string[] | null
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey)

function CompanyDetail() {
    const searchParams = useSearchParams()
    const id = searchParams.get('id')  // Getting id from query params: ?id=uuid

    const [company, setCompany] = useState<Company | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        // Check if id is available
        if (!id) {
            setError('No company ID provided')
            setLoading(false)
            return
        }

        const fetchCompany = async () => {
            try {
                setLoading(true)
                setError(null)

                const { data, error } = await supabase
                    .from('certified-companies')
                    .select('*')
                    .eq('id', id)
                    .single()

                if (error) {
                    if (error.code === 'PGRST116') {
                        setError('Company not found')
                    } else {
                        throw error
                    }
                    return
                }

                setCompany(data)
            } catch (err: any) {
                console.error('Error fetching company:', err)
                setError('Failed to load company data')
            } finally {
                setLoading(false)
            }
        }

        fetchCompany()
    }, [id])

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
                        <div className="h-12 bg-gray-300 rounded w-3/4 mb-6"></div>
                        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    </div>
                </div>
            </div>
        )
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center">
                        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg inline-block">
                            <h2 className="text-xl font-semibold mb-2">Error</h2>
                            <p>{error}</p>
                        </div>
                        <div className="mt-6">
                            <Link
                                href="/directory"
                                className="inline-block bg-[#2d5f5d] text-white px-6 py-2 rounded hover:bg-[#16464C] transition-colors"
                            >
                              ← Back to Directory
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!company) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                    <h1 className="text-gray-900 mb-4" style={{ fontSize: '24px', fontWeight: 600 }}>
                        Company not found
                    </h1>
                    <Link href="/directory">
                        <Button className="bg-[#2d5f5d] hover:bg-[#234948]">
                            ← Back to Directory
                        </Button>
                        </Link>
                    </div>
                </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-[#f7f7f5] border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-8 pt-12 pb-24 relative">
                    {/* HERO IMAGE */}
                    <div className="relative h-[420px] rounded-3xl overflow-hidden">
                        {company?.img_url && (
                            <img
                                src={company?.img_url}
                                alt={company?.name ?? ''}
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>

                    {/* FLOATING LOGO CARD */}
                    <div className="absolute right-8 bottom-0 translate-y-1/2">
                        <div className="bg-white rounded-2xl shadow-xl w-64 h-64 flex items-center justify-center">
                            {/* Replace with <Image /> if you have a logo URL */}
                            <div className="w-40 h-40 rounded-full bg-gray-100 flex items-center justify-center">
                                {company?.logo && (
                                    <img
                                        src={company?.logo}
                                        alt={company?.name ?? ''}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                                </div>
                            </div>
                                </div>
                            </div>
                        </div>

            {/* Back link */}
            <div className="border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-8 py-4">
                    <Link
                        href="/directory"
                        className="text-sm text-gray-600 hover:text-gray-900"
                    >
                        ← Back to Directory
                    </Link>
                            </div>
                            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-12 gap-12">

                {/* Sidebar / Fact Panel */}
                <aside className="col-span-3">
                    <div className="bg-[#fafafa] border border-gray-200 rounded-xl p-6 space-y-6">
                        <div>
                            <dt className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                                Headquarters
                            </dt>
                            <dd className="text-sm text-gray-900">
                                {company?.operates_in?.[0]}
                            </dd>
                                </div>

                        <div>
                            <dt className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                                Certified Since
                            </dt>
                            <dd className="text-sm text-gray-900">
                                {new Date(company.created_at).getFullYear()}
                            </dd>
                                </div>

                        <div>
                            <dt className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                                Industry
                            </dt>
                            <dd className="text-sm text-gray-900">
                                {company?.industry}
                            </dd>
                            </div>

                        <div>
                            <dt className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                                Company Size
                            </dt>
                            <dd className="text-sm text-gray-900">
                                {company?.size}
                            </dd>
                        </div>

                            </div>
                </aside>

                {/* Main Narrative */}
                <section className="col-span-9">
                    <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                        About {company?.name}
                    </h2>

                    <div className="prose prose-gray max-w-none">
                        <p>{company?.description}</p>
                </div>

                    {company?.website && (
                        <div className="mt-10">
                            <a
                                href={company.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-sm font-semibold text-gray-900 border-b border-gray-900 hover:opacity-70"
                    >
                                Visit company website →
                            </a>
                </div>
                    )}
                </section>
            </div>
        </div>
    )
}

export default function Page() {
    return (
        <Suspense fallback={<span>Loading ...</span>}>
            <CompanyDetail />
        </Suspense>
    )
}