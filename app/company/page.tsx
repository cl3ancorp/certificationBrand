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
                    <div className="animate-pulse space-y-4">
                        <div className="h-6 sm:h-8 bg-gray-300 rounded w-1/3"></div>
                        <div className="h-10 sm:h-12 bg-gray-300 rounded w-full sm:w-3/4"></div>
                        <div className="h-4 bg-gray-300 rounded w-full"></div>
                        <div className="h-4 bg-gray-300 rounded w-full"></div>
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
                            <h2 className="text-lg sm:text-xl font-semibold mb-2">Error</h2>
                            <p>{error}</p>
                        </div>
                        <div className="mt-6">
                            <Link
                                href="/directory"
                                className="inline-block bg-[#16464C] text-white px-6 py-2 rounded hover:bg-[#16464C] transition-colors"
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
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="text-center">
                    <h1 className="text-xl font-semibold text-gray-900 mb-4">
                        Company not found
                    </h1>
                    <Link href="/directory">
                        <Button className="bg-[#16464C] hover:bg-[#234948]">
                            ← Back to Directory
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }
    // background-accent
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className=" border-b border">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 lg:pt-12 pb-12 lg:pb-24 relative">
                    {/* HERO IMAGE */}
                    <div className="relative h-56 sm:h-72 lg:h-[420px] rounded-2xl lg:rounded-3xl overflow-hidden">
                        {company?.img_url && (
                            <img
                                src={company.img_url}
                                alt={company.name ?? ''}
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>

                    {/* TBA: LOGO */}
                    <div className="mt-6 flex justify-center lg:absolute lg:right-8 lg:bottom-0 lg:translate-y-1/2">
                        <div className="bg-white rounded-2xl shadow-xl w-32 h-32 sm:w-40 sm:h-40 lg:w-64 lg:h-64 flex items-center justify-center">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-40 lg:h-40 rounded-full bg-gray-100 flex items-center justify-center">
                                {company?.img_url && (
                                    <img
                                        src={company.img_url}
                                        alt={company.name ?? ''}
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Back link */}
            <div className="border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <Link
                        href="/directory"
                        className="text-sm text-gray-600 hover:text-gray-900"
                    >
                        ← Back to Directory
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                {/* Sidebar */}
                <aside className="lg:col-span-3">
                    <div className="bg-[#fafafa] border border-gray-200 rounded-xl p-4 sm:p-6 space-y-4 sm:space-y-6">
                        {[
                            {
                                label: 'Headquarters',
                                value: company?.headquarters
                            },
                            {
                                label: 'Certified Since',
                                value: company?.created_at
                                    ? new Date(company.created_at).getFullYear()
                                    : null
                            },
                            {
                                label: 'Industry',
                                value: company?.industry
                            },
                            {
                                label: 'Sector',
                                value: company?.sector?.join(', ')
                            },
                            {
                                label: 'Company Size',
                                value: company?.size
                            },
                            {
                                label: 'Operates In',
                                value: company?.operates_in?.join(', ')
                            },
                            {
                                label: 'Website',
                                value: company?.website
                            }
                        ]
                            .filter(item => item.value)
                            .map(item => (
                                <div key={item.label}>
                                    <dt className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                                        {item.label}
                                    </dt>
                                    <dd className="text-sm text-gray-900">
                                        {item.value}
                                    </dd>
                                </div>
                            ))}
                    </div>
                </aside>

                {/* Main Narrative */}
                <section className="lg:col-span-9">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 mb-4 lg:mb-6">
                        About {company?.name}
                    </h2>

                    <div className="prose prose-gray max-w-none">
                        <p>{company?.description}</p>
                    </div>

                    {company?.website && (
                        <div className="mt-8 lg:mt-10">
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