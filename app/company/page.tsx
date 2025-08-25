// app/company/page.tsx (App Router)
'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

// Company interface with UUID
interface Company {
    id: string  // UUID
    created_at: string
    name: string | null
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
                                href="/companies"
                                className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
                            >
                                ← Back to Companies
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // No company found
    if (!company) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Company Not Found</h2>
                        <p className="text-gray-600 mb-6">The company you&apos;re looking for doesn&apos;t exist.</p>
                        <Link
                            href="/companies"
                            className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
                        >
                            ← Back to Companies
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <nav className="mb-6">
                    <Link
                        href="/companies"
                        className="text-blue-600 hover:text-blue-800 underline"
                    >
                        ← Back to Companies
                    </Link>
                </nav>

                {/* Company Header */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-8">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                            <div className="flex-1">
                                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                    {company.name || 'Unnamed Company'}
                                </h1>

                                {/* Company badges */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {company.industry && (
                                        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                            {company.industry}
                                        </span>
                                    )}
                                    {company.size && (
                                        <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                            {company.size}
                                        </span>
                                    )}
                                    <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                                        B Corp Certified
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Company Description */}
                        {company.description && (
                            <div className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">About</h2>
                                <p className="text-gray-700 leading-relaxed text-lg">
                                    {company.description}
                                </p>
                            </div>
                        )}

                        {/* Company Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Industry */}
                            {company.industry && (
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-gray-900 mb-2">Industry</h3>
                                    <p className="text-gray-700">{company.industry}</p>
                                </div>
                            )}

                            {/* Company Size */}
                            {company.size && (
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-gray-900 mb-2">Company Size</h3>
                                    <p className="text-gray-700">{company.size}</p>
                                </div>
                            )}

                            {/* Certification Date */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-gray-900 mb-2">Added to Directory</h3>
                                <p className="text-gray-700">
                                    {new Date(company.created_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>

                        {/* Operates In */}
                        {company.operates_in && company.operates_in.length > 0 && (
                            <div className="mt-8">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Global Presence</h2>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-gray-900 mb-3">Operates In</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {company.operates_in.map((location: string, index: number) => (
                                            <span
                                                key={index}
                                                className="inline-block bg-white border border-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm shadow-sm"
                                            >
                                                {location}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Company ID (for debugging) */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <p className="text-sm text-gray-500">
                                Company ID: <code className="bg-gray-100 px-2 py-1 rounded text-xs">{company.id}</code>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Related Actions */}
                <div className="mt-8 text-center">
                    <Link
                        href="/companies"
                        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        Explore More B Corps
                    </Link>
                </div>
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