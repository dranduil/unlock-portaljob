import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Building2, 
  MapPin, 
  Users, 
  Globe, 
  Star, 
  Search,
  Filter,
  ExternalLink
} from 'lucide-react';

interface Company {
  id: number;
  name: string;
  slug: string;
  description: string;
  website?: string;
  logo_url?: string;
  verified_at?: string;
  industry: string;
  size: string;
  locations: string[];
  job_count: number;
}

export default function CompaniesIndex() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [sizeFilter, setSizeFilter] = useState('');

  // Mock data for development
  const mockCompanies: Company[] = [
    {
      id: 1,
      name: 'TechCorp Inc.',
      slug: 'techcorp',
      description: 'Leading technology company specializing in innovative software solutions for enterprise clients.',
      website: 'https://techcorp.com',
      logo_url: null,
      verified_at: '2024-01-15',
      industry: 'Technology',
      size: 'Medium',
      locations: ['San Francisco, CA', 'New York, NY', 'Remote'],
      job_count: 12,
    },
    {
      id: 2,
      name: 'StartupXYZ',
      slug: 'startupxyz',
      description: 'Fast-growing startup focused on revolutionizing the way people work and collaborate.',
      website: 'https://startupxyz.com',
      logo_url: null,
      verified_at: null,
      industry: 'Technology',
      size: 'Small',
      locations: ['New York, NY', 'Remote'],
      job_count: 8,
    },
    {
      id: 3,
      name: 'Design Studio Pro',
      slug: 'design-studio-pro',
      description: 'Creative design agency helping brands tell their stories through beautiful visual experiences.',
      website: 'https://designstudiopro.com',
      logo_url: null,
      verified_at: '2024-01-10',
      industry: 'Design',
      size: 'Small',
      locations: ['Los Angeles, CA', 'Remote'],
      job_count: 5,
    },
    {
      id: 4,
      name: 'DataTech Solutions',
      slug: 'datatech-solutions',
      description: 'Data-driven company providing analytics and insights to help businesses make better decisions.',
      website: 'https://datatechsolutions.com',
      logo_url: null,
      verified_at: '2024-01-12',
      industry: 'Data & Analytics',
      size: 'Medium',
      locations: ['Austin, TX', 'Remote'],
      job_count: 9,
    },
    {
      id: 5,
      name: 'InnovateCorp',
      slug: 'innovatecorp',
      description: 'Innovation hub focused on developing cutting-edge products and services for the future.',
      website: 'https://innovatecorp.com',
      logo_url: null,
      verified_at: '2024-01-11',
      industry: 'Technology',
      size: 'Large',
      locations: ['Seattle, WA', 'San Francisco, CA', 'Remote'],
      job_count: 15,
    },
    {
      id: 6,
      name: 'CloudOps Inc.',
      slug: 'cloudops-inc',
      description: 'Cloud infrastructure and DevOps specialists helping companies scale their operations.',
      website: 'https://cloudops.com',
      logo_url: null,
      verified_at: '2024-01-10',
      industry: 'Technology',
      size: 'Medium',
      locations: ['Denver, CO', 'Remote'],
      job_count: 7,
    },
  ];

  const industries = [
    'All Industries',
    'Technology',
    'Design',
    'Data & Analytics',
    'Marketing',
    'Sales',
    'Finance',
    'Healthcare',
    'Education',
    'Manufacturing',
  ];

  const companySizes = [
    'All Sizes',
    'Small (1-50)',
    'Medium (51-200)',
    'Large (201-1000)',
    'Enterprise (1000+)',
  ];

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setCompanies(mockCompanies);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.industry.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesIndustry = !industryFilter || industryFilter === 'All Industries' || company.industry === industryFilter;
    const matchesSize = !sizeFilter || sizeFilter === 'All Sizes' || company.size === sizeFilter.replace(/\(.*\)/, '').trim();
    
    return matchesSearch && matchesIndustry && matchesSize;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setIndustryFilter('');
    setSizeFilter('');
  };

  const hasActiveFilters = searchTerm || industryFilter || sizeFilter;

  return (
    <>
      <Head title="Companies - Unlock Portal Job">
        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": "Companies Directory",
              "description": "Discover great companies that align with your career goals and values",
              "numberOfItems": companies.length,
              "itemListElement": companies.map((company, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "Organization",
                  "name": company.name,
                  "description": company.description,
                  "url": company.website || `${window.location.origin}/companies/${company.slug}`,
                  "logo": company.logo_url,
                  "industry": company.industry,
                  "numberOfEmployees": company.size,
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": company.locations[0]?.split(',')[0] || "Multiple Locations"
                  },
                  "sameAs": company.verified_at ? `${window.location.origin}/companies/${company.slug}` : undefined
                }
              }))
            })
          }}
        />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Discover Great Companies
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Find companies that align with your career goals and values
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search companies by name, industry, or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-3 text-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filters */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={industryFilter} onValueChange={setIndustryFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sizeFilter} onValueChange={setSizeFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Company Size" />
                  </SelectTrigger>
                  <SelectContent>
                    {companySizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {hasActiveFilters && (
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              )}
            </div>
          </div>

          {/* Results Summary */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              {loading ? 'Loading...' : `${filteredCompanies.length} companies found`}
            </h2>
            {hasActiveFilters && (
              <p className="text-gray-600 mt-1">
                Showing filtered results
              </p>
            )}
          </div>

          {/* Companies Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-white rounded-lg border p-6">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredCompanies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCompanies.map((company) => (
                <Card key={company.id} className="hover:shadow-md transition-shadow duration-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-12 w-12 flex-shrink-0">
                        <AvatarImage src={company.logo_url} alt={company.name} />
                        <AvatarFallback className="bg-gray-100 text-gray-600">
                          <Building2 className="h-6 w-6" />
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <Link 
                          href={`/companies/${company.slug}`}
                          className="block group"
                        >
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                            {company.name}
                          </h3>
                        </Link>
                        
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {company.industry}
                          </Badge>
                          {company.verified_at && (
                            <Badge variant="secondary" className="text-xs">
                              <Star className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {company.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>{company.size}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{company.locations.join(', ')}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Building2 className="h-4 w-4" />
                        <span>{company.job_count} open positions</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <Link href={`/companies/${company.slug}`}>
                          View Company
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </Link>
                      </Button>
                      <Button size="sm" className="flex-1" asChild>
                        <Link href={`/companies/${company.slug}/jobs`}>
                          View Jobs
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No companies found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search terms or filters
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
