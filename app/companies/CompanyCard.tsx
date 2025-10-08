import Link from 'next/link';
import Image from 'next/image';

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

interface CompanyCardProps {
  company: Company;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Link
      href={`/company?id=${company.id}`}
      className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer group"
    >
      <div className="flex gap-6">
        {/* Logo on the left */}
        <div className="flex-shrink-0">
          {company.img_url ? (
            <Image
              src={company.img_url}
              alt={company.name || 'Company logo'}
              width={120}
              height={120}
              className="rounded-lg object-cover"
            />
          ) : (
            <div className="w-[120px] h-[120px] bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 text-sm">No logo</span>
            </div>
          )}
        </div>

        {/* Company information on the right */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column: Name, Created date, Country */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
              {company.name || 'Unnamed Company'}
            </h3>

            <div className="text-sm text-gray-600">
              <div className="mb-2">
                <span className="font-medium">Since:</span>{' '}
                <span>{formatDate(company.created_at)}</span>
              </div>

              {company.operates_in && company.operates_in.length > 0 && (
                <div>
                  <span className="font-medium">Country:</span>{' '}
                  <span>{company.operates_in[0]}</span>
                  {company.operates_in.length > 1 && (
                    <span className="text-xs ml-1">+{company.operates_in.length - 1} more</span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right column: Description */}
          <div>
            <h3 className='text-xl mb-2 font-semibold'>Description</h3>
            <p className="text-gray-600 text-sm line-clamp-4">
              {company.description || 'No description available'}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
