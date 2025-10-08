'use client'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import CompanyCard from './CompanyCard'

// Define TypeScript interface based on your schema
interface Company {
  id: number
  created_at: string
  name: string | null
  description: string | null
  size: string | null
  industry: string | null
  operates_in: string[] | null
  img_url: string | null
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey)

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Filter states
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedIndustry, setSelectedIndustry] = useState<string>('')
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedLocation, setSelectedLocation] = useState<string>('')

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const itemsPerPage = 10

  // Fetch companies with filters
  const fetchCompanies = async () => {
    try {
      setLoading(true)

      let query = supabase
        .from('certified-companies')
        .select('*', { count: 'exact' })

      // Apply filters
      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%, description.ilike.%${searchTerm}%`)
      }

      if (selectedIndustry) {
        query = query.eq('industry', selectedIndustry)
      }

      if (selectedSize) {
        query = query.eq('size', selectedSize)
      }

      if (selectedLocation) {
        query = query.contains('operates_in', [selectedLocation])
      }

      // Pagination
      const from = (currentPage - 1) * itemsPerPage
      const to = from + itemsPerPage - 1

      query = query
        .range(from, to)
        .order('name', { ascending: true })

      const { data, error, count } = await query

      if (error) throw error

      setCompanies(data || [])
      setTotalCount(count || 0)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Fetch unique filter options
  const [industries, setIndustries] = useState<string[]>([])
  const [sizes, setSizes] = useState<string[]>([])
  const [locations, setLocations] = useState<string[]>([])

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        // Get unique industries
        const { data: industryData } = await supabase
          .from('certified-companies')
          .select('industry')
          .not('industry', 'is', null)

        const uniqueIndustries = [...new Set(industryData?.map((item: any) => item.industry).filter(Boolean))]
        setIndustries(uniqueIndustries)

        // Get unique sizes
        const { data: sizeData } = await supabase
          .from('certified-companies')
          .select('size')
          .not('size', 'is', null)

        const uniqueSizes = [...new Set(sizeData?.map((item: any) => item.size).filter(Boolean))]
        setSizes(uniqueSizes)

        // Get unique locations from operates_in array
        const { data: locationData } = await supabase
          .from('certified-companies')
          .select('operates_in')
          .not('operates_in', 'is', null)

        const allLocations = locationData?.flatMap((item: any) => item.operates_in || []) || []
        const uniqueLocations = [...new Set(allLocations.filter(Boolean))]
        setLocations(uniqueLocations)
      } catch (err) {
        console.error('Error fetching filter options:', err)
      }
    }

    fetchFilterOptions()
  }, [])

  // Debounced search effect
  useEffect(() => {
    setCurrentPage(1) // Reset to first page on filter change
    const timer = setTimeout(() => {
      fetchCompanies();
    }, 300)
    return () => clearTimeout(timer);
  }, [searchTerm, selectedIndustry, selectedSize, selectedLocation])

  // Effect for currentPage changes
  useEffect(() => {
    fetchCompanies();
  }, [currentPage])

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('')
    setSelectedIndustry('')
    setSelectedSize('')
    setSelectedLocation('')
    // setCurrentPage(1)
  }

  // Pagination controls
  const totalPages = Math.ceil(totalCount / itemsPerPage)

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error loading companies: {error}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="bg-gray-100 px-4 py-8">
        <div className='container mx-auto'>

          {/* <h1 className="text-3xl font-bold mb-8 text-center">Find a CL3AN near you!</h1> */}

          {/* Logo and tagline */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <Image
              src="/images/branding/Logotipo-Cl3an-03.png"
              alt="CL3AN Logo"
              width={140}
              height={100}
            />
            <div>
              <p className="text-4xl text-brand-primary font-semibold tracking-tight">A Network of Sources</p>
              <p className="text-4xl text-brand-primary font-semibold tracking-tight ml-3">Worth Supporting</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium mb-2">Search</label>
                <input
                  type="text"
                  placeholder="Company name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Industry */}
              <div>
                <label className="block text-sm font-medium mb-2">Industry</label>
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Industries</option>
                  {industries.map((industry: string) => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>

              {/* Company Size */}
              <div>
                <label className="block text-sm font-medium mb-2">Company Size</label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Sizes</option>
                  {sizes.map((size: string) => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>

              {/* Location (from operates_in) */}
              <div>
                <label className="block text-sm font-medium mb-2">Operates In</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Locations</option>
                  {locations.map((location: string) => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Clear All Filters
              </button>
              <span className="text-sm text-gray-600">
                showing {companies.length} out of {totalCount} companies 
              </span>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Loading companies...</p>
            </div>
          )}

          {/* Companies List */}
          {!loading && (
            <div className="flex flex-col gap-6">
              {companies.map((company: Company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && companies.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No companies found matching your criteria.</p>
              <button
                onClick={clearFilters}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <nav className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNumber = Math.max(1, currentPage - 2) + i
                  if (pageNumber > totalPages) return null

                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`px-3 py-2 border rounded ${currentPage === pageNumber
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                      {pageNumber}
                    </button>
                  )
                })}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  // onClick={() => setCurrentPage(2)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
      <div className="mt-12 text-s mx-auto container font-bold text-gray-600">
        *The information provided on this website is for your information only, and does not constitute investment, legal, tax, or accounting advice. Nothing contained on this website constitutes a recommendation or endorsement to buy or sell any securities or other financial instruments of Certified B Corps nor is it intended to inform investment decisions.
      </div>
    </>
  )
}