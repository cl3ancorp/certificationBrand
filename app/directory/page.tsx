"use client"
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import Image from 'next/image';

import CompanyCard from '../companies/CompanyCard'

interface Company {
    id: number
    created_at: string
    name: string
    description: string | null
    size: string | null
    industry: string | null
    operates_in: string[] | null
    img_url: string | null
}
  
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey)

export default function Directory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'a-z' | 'z-a' | 'newest' | 'oldest'>('a-z');

  const [companies, setCompanies] = useState<Company[]>([]);
  const [filtered, setFiltered] = useState<Company[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const itemsPerPage = 10

  const fetchCompanies = async () => {
    try {
      setLoading(true)

      const query = supabase
        .from('certified-companies')
        .select('*', { count: 'exact' })

      const { data, error } = await query

      if (error) throw error

      setCompanies(data || [])
    } catch (err: any) {
      console.error('Failed to fetch companies', err)
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCompanies();
    }, 300)
    return () => clearTimeout(timer);
  }, []);

  const matchesSearch = (
    company: {
      name?: string;
      description?: string;
      industry?: string;
      sector?: string;
      website?: string;
      operates_in?: string[];
    },
    query: string
  ) => {
    if (!query?.trim()) return true;
  
    const q = query.toLowerCase().trim();
  
    return (
      company?.name?.toLowerCase().includes(q) ||
      company?.description?.toLowerCase().includes(q) ||
      company?.industry?.toLowerCase().includes(q) ||
      company?.sector?.toLowerCase().includes(q) ||
      company?.website?.toLowerCase().includes(q) ||
      company?.operates_in?.some((country) =>
        country?.toLowerCase().includes(q)
      )
    );
  };

  // Filter and sort companies
  useEffect(() => {
    let result = companies;

    // Filter
    if (searchQuery.trim()) {
      result = result.filter((company) =>
        matchesSearch(company, searchQuery)
      );
    }

    // Sort
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'a-z':
          return a?.name?.localeCompare(b?.name);
        case 'z-a':
          return b?.name?.localeCompare(a?.name);
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        default:
          return 0;
      }
    });

    setFiltered(result);
    setTotalPages(Math.ceil(result?.length / itemsPerPage));
    setCurrentPage(1);
  }, [companies, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-[#16464C] py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Logo Badge */}
          <div className="flex justify-center mb-8">
            <Image
              src="/images/branding/Logotipo-Cl3an-03.png"
              alt="CL3AN Logo"
              width={140}
              height={100}
            />
          </div>
          {/* Title */}
          <h1 className="text-white text-center mb-8" style={{ fontSize: '32px', fontWeight: 600 }}>
            A Network of Sources worth Supporting
          </h1>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto">
            <Input
              placeholder="Search certified businesses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white h-10 text-center"
              style={{ fontSize: '15px' }}
            />
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-gray-600" style={{ fontSize: '14px' }}>
            {filtered.length} {filtered.length == 1 ? 'Source' : 'Sources'} of {companies.length}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600" style={{ fontSize: '14px' }}>Sort by</span>
            <Select value={sortBy} onValueChange={(value: 'a-z' | 'z-a' | 'newest' | 'oldest') =>
              setSortBy(value)}>
              <SelectTrigger className="w-40 h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a-z">A → Z</SelectItem>
                <SelectItem value="z-a">Z → A</SelectItem>
                <SelectItem value="newest">Newest to Oldest</SelectItem>
                <SelectItem value="oldest">Oldest to Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Company Cards */}
        {!loading && (
            <div className="flex flex-col gap-6">
                {filtered?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)?.map((company: Company) => (
                    <CompanyCard key={company.id} company={company} />
                ))}
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
                        ? 'bg-[#16464C] text-white border-[#16464C]'
                        : 'border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                      {pageNumber}
                    </button>
                  )
                })}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </nav>
            </div>
          )}

        {/* No Results */}
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500" style={{ fontSize: '16px' }}>
              No sources found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
