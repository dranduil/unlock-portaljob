import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { JobCard } from '@/components/jobs/job-card';
import { JobFilters } from '@/components/jobs/job-filters';
import { JobSearch } from '@/components/jobs/job-search';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Building2,
  Filter,
  Search,
  X
} from 'lucide-react';

interface Job {
  id: number;
  title: string;
  slug: string;
  company: {
    name: string;
    logo_url?: string;
    verified_at?: string;
  };
  location_mode: 'onsite' | 'hybrid' | 'remote';
  city?: string;
  state?: string;
  country?: string;
  employment_type: string;
  seniority: string;
  salary_min?: number;
  salary_max?: number;
  currency: string;
  tags: string[];
  published_at: string;
}

interface JobFilters {
  search?: string;
  location?: string;
  remote?: string;
  category?: string;
  type?: string;
  seniority?: string;
  minSalary?: number;
  maxSalary?: number;
  datePosted?: string;
}

export default function JobsIndex() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<JobFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    total: 0,
    perPage: 20,
    lastPage: 1
  });

  useEffect(() => {
    // Fetch from API whenever filters or page change
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters), pagination.currentPage]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const normalized: Record<string, string> = {};
      Object.entries(filters).forEach(([k, v]) => {
        if (v && v !== 'all') normalized[k] = String(v);
      });
      const params = new URLSearchParams({
        ...normalized,
        page: pagination.currentPage.toString()
      });
      const response = await fetch(`/api/v1/jobs?${params.toString()}`, {
        headers: {
          Accept: 'application/json'
        }
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP ${response.status} on /api/v1/jobs: ${text.slice(0, 200)}`);
      }
      const data = await response.json();
      setJobs(data.data);
      setPagination({
        currentPage: data.meta.page,
        total: data.meta.total,
        perPage: data.meta.per_page,
        lastPage: data.meta.last_page
      });
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: Partial<JobFilters>) => {
    let changed = false;
    setFilters(prev => {
      const next = { ...prev, ...newFilters };
      const prevStr = JSON.stringify(prev);
      const nextStr = JSON.stringify(next);
      if (prevStr !== nextStr) {
        changed = true;
        return next;
      }
      return prev;
    });
    if (changed) {
      setPagination(prev => ({ ...prev, currentPage: 1 }));
    }
  };

  const handleSearch = (searchTerm: string) => {
    handleFilterChange({ search: searchTerm });
  };

  const clearFilters = () => {
    setFilters({});
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const loadMore = () => {
    if (pagination.currentPage < pagination.lastPage) {
      setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }));
    }
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== undefined && value !== '');

  return (
    <>
      <Head title="Find Your Next Job" />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Find Your Next Job
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Discover opportunities that match your skills and aspirations
              </p>
              
              {/* Search Bar */}
              <JobSearch onSearch={handleSearch} />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Filters Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="sticky top-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Filter className="h-5 w-5" />
                      Filters
                    </CardTitle>
                    {hasActiveFilters && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Clear
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent>
                    <JobFilters
                      filters={filters}
                      onFilterChange={handleFilterChange}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Jobs List */}
            <div className="flex-1">
              {/* Results Summary */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-semibold text-gray-900">
                      {loading ? 'Loading...' : `${pagination.total} jobs found`}
                    </h2>
                    {hasActiveFilters && (
                      <Badge variant="secondary" className="ml-2">
                        Filtered
                      </Badge>
                    )}
                  </div>
                  
                  {/* Mobile Filter Toggle */}
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </div>
                
                {/* Active Filters Display */}
                {hasActiveFilters && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {Object.entries(filters).map(([key, value]) => {
                      if (value && value !== '') {
                        return (
                          <Badge
                            key={key}
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            {key}: {value}
                            <button
                              onClick={() => handleFilterChange({ [key]: undefined })}
                              className="ml-1 hover:text-red-600"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        );
                      }
                      return null;
                    })}
                  </div>
                )}
              </div>

              {/* Jobs Grid */}
              {loading ? (
                <div className="space-y-4">
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
              ) : jobs.length > 0 ? (
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                  
                  {/* Load More Button */}
                  {pagination.currentPage < pagination.lastPage && (
                    <div className="text-center pt-6">
                      <Button
                        onClick={loadMore}
                        variant="outline"
                        size="lg"
                        className="px-8"
                      >
                        Load More Jobs
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No jobs found
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Try adjusting your filters or search terms
                    </p>
                    <Button onClick={clearFilters} variant="outline">
                      Clear All Filters
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
