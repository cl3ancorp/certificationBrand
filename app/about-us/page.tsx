import Link from 'next/link';




export default function Page() {
    return (
        <div className="min-h-screen bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Mission Section */}
            <section className="mb-16">
              <div className="grid md:grid-cols-2 gap-30 items-center">
                <div>
                  <h1 className="text-[#16464C] mb-4" style={{ fontSize: '55px', fontWeight: 700, lineHeight: 1}}>
                    Guided by Ideals,
                  </h1>
                  <h1 className="text-[#16464C] mb-16" style={{ fontSize: '55px', fontWeight: 700, lineHeight: 1 }}>
                    built for change.
                  </h1>
                  <p className="text-[#16464C] mb-4" style={{ fontSize: '25px', fontWeight: 400, lineHeight: 2 }}>
                    CLEAN connects conscious consumers with
                  </p>
                  <p className="text-[#16464C] mb-4" style={{ fontSize: '25px', fontWeight: 400, lineHeight: 2 }}>
                    CERTIFIED sources, we can trust-guided by shared
                  </p>
                  <p className="text-[#16464C]" style={{ fontSize: '25px', fontWeight: 400, lineHeight: 2 }}>
                    IDEALS for a better world.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                  <div className="space-y-6">
                    <Link href="/directory">
                      <div className="text-[#16464C] mb-2" style={{ fontSize: '48px', fontWeight: 700 }}>500+</div>
                      <div className="text-[#16464C]" style={{ fontSize: '16px' }}>Certified Sources</div>
                    </Link>
                    <Link href="#">
                      <div className="text-[#16464C] mb-2" style={{ fontSize: '48px', fontWeight: 700 }}>25</div>
                      <div className="text-[#16464C]" style={{ fontSize: '16px' }}>Certified Causes</div>
                    </Link>
                    <Link href="/beacons">
                      <div className="text-[#16464C] mb-2" style={{ fontSize: '48px', fontWeight: 700 }}>10k+</div>
                      <div className="text-[#16464C]" style={{ fontSize: '16px' }}>Beacons</div>
                    </Link>
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