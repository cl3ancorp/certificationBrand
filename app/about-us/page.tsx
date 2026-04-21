"use client"

import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey)

export default function Page() {

  const [figuresCount, setFiguresCount] = useState<number>(0);
  const [companyCount, setCompanyCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getFiguresCount = async () => {
      setLoading(true);
      try {
        const query = supabase
          .from('figures')
          .select('*', { count: 'exact' })

        const { data, error } = await query

        if (error) throw error
        setFiguresCount(data?.length || 0);
      } catch (err: any) {
        console.error('Failed to fetch figures', err)
      }
      setLoading(false);
    };

    const getCompanyCount = async () => {
      try {
        setLoading(true)

        const query = supabase
          .from('certified-companies')
          .select('*', { count: 'exact' })

        const { data, error } = await query

        if (error) throw error

        setCompanyCount(data?.length || 0)
      } catch (err: any) {
        console.error('Failed to fetch companies', err)
      } finally {
        setLoading(false)
      }
    };

    getFiguresCount();
    getCompanyCount();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission Section */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row gap-12">

            {/* LEFT: TEXT */}
            <div className="md:w-3/4">
              <h1 className="text-[#16464C] mb-4 text-[55px] font-bold leading-tight">
                Guided by Ideals,
      </h1>
              <h1 className="text-[#16464C] mb-12 text-[55px] font-bold leading-tight">
                built for change.
      </h1>

              <div className="space-y-6 text-[#16464C] text-[22px] leading-relaxed">
                <p>
                  CL3AN is a nonprofit certification that connects consumers to sources aligned with the ideals of a better world.
                </p>
                <p>
                  A source bearing the CL3AN certification is one you can trust — safe to support, and guided by values that prioritize people, integrity, and long-term impact.
                </p>
                <p>
                  We carefully research, vet, and verify every source we recognize. Our focus is simple: to ensure they operate free from harmful practices, short-term greed, and influences that do not serve the greater good.
                </p>
                <p>
                  CL3AN exists to make conscious consumption effortless.
                </p>
                <div className="flex gap-3">
                  <p>
                    Find our badge and consume with peace-of-mind.</p>
                  <img
                    src="/images/branding/Logotipo-Cl3an-03.png"
                    alt="CL3AN"
                    className="h-10 object-contain"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT: STATS */}
            <div className="md:w-1/4 flex md:items-center">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 sticky top-24 w-full">
                <div className="space-y-8">

                  <Link href="/directory" className="block">
                    <div className="text-[#16464C] text-4xl font-bold">{companyCount}+</div>
                    <div className="text-gray-600 text-sm">Certified Sources</div>
                  </Link>

                  <Link href="#" className="block">
                    <div className="text-[#16464C] text-4xl font-bold">25</div>
                    <div className="text-gray-600 text-sm">Certified Causes</div>
                  </Link>

                  <Link href="/figures" className="block">
                    <div className="text-[#16464C] text-4xl font-bold">{figuresCount}+</div>
                    <div className="text-gray-600 text-sm">Figures</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Why It Matters */}
      <div className="bg-[#16464C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-16">
            <h2 className="text-white mb-8 text-center" style={{ fontSize: '36px', fontWeight: 600 }}>
              Why Clean Certification Matters
                </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                <div className="w-16 h-16 bg-[#16464C] rounded-full flex items-center justify-center mb-4">
                  <span className="text-white text-2xl">🌱</span>
                </div>
                <h3 className="text-[#16464C] mb-3" style={{ fontSize: '20px', fontWeight: 600 }}>
                  Environmental Impact
                    </h3>
                <p className="text-[#16464C]" style={{ fontSize: '15px', lineHeight: 1.6 }}>
                  Clean businesses reduce pollution, minimize waste, and protect natural resources for future generations.
                    </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                <div className="w-16 h-16 bg-[#16464C] rounded-full flex items-center justify-center mb-4">
                  <span className="text-white text-2xl">❤️</span>
                </div>
                <h3 className="text-[#16464C] mb-3" style={{ fontSize: '20px', fontWeight: 600 }}>
                  Health & Safety
                    </h3>
                <p className="text-[#16464C]" style={{ fontSize: '15px', lineHeight: 1.6 }}>
                  High cleanliness standards protect the health and wellbeing of customers, employees, and communities.
                    </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                <div className="w-16 h-16 bg-[#16464C] rounded-full flex items-center justify-center mb-4">
                  <span className="text-white text-2xl">🤝</span>
                </div>
                <h3 className="text-[#16464C] mb-3" style={{ fontSize: '20px', fontWeight: 600 }}>
                  Consumer Trust
                    </h3>
                <p className="text-[#16464C]" style={{ fontSize: '15px', lineHeight: 1.6 }}>
                  Certification builds confidence and helps consumers make informed decisions about where to spend their money.
                    </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}