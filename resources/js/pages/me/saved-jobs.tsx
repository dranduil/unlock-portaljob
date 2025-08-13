import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Bookmark, 
  Building2, 
  MapPin, 
  Clock, 
  DollarSign,
  Star,
  ExternalLink,
  Trash2
} from 'lucide-react';

interface SavedJob {
  id: number;
  job: {
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
  };
  saved_at: string;
  notes?: string;
}

export default function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  // Mock data for development
  const mockSavedJobs: SavedJob[] = [
    {
      id: 1,
      job: {
        id: 1,
        title: 'Senior React Developer',
        slug: 'senior-react-developer',
        company: {
          name: 'TechCorp Inc.',
          logo_url: null,
          verified_at: '2024-01-15',
        },
        location_mode: 'remote',
        city: 'San Francisco',
        state: 'California',
        country: 'United States',
        employment_type: 'full-time',
        seniority: 'senior',
        salary_min: 120000,
        salary_max: 180000,
        currency: 'USD',
        tags: ['React', 'TypeScript', 'Frontend', 'Remote'],
        published_at: '2024-01-15T10:00:00Z',
      },
      saved_at: '2024-01-16T09:00:00Z',
      notes: 'Great remote opportunity with competitive salary'
    },
    {
      id: 2,
      job: {
        id: 2,
        title: 'Full Stack Developer',
        slug: 'full-stack-developer',
        company: {
          name: 'StartupXYZ',
          logo_url: null,
          verified_at: null,
        },
        location_mode: 'hybrid',
        city: 'New York',
        state: 'New York',
        country: 'United States',
        employment_type: 'full-time',
        seniority: 'mid',
        salary_min: 80000,
        salary_max: 120000,
        currency: 'USD',
        tags: ['React', 'Node.js', 'MongoDB', 'AWS'],
        published_at: '2024-01-14T15:30:00Z',
      },
      saved_at: '2024-01-15T14:30:00Z',
      notes: 'Interesting startup with modern tech stack'
    },
    {
      id: 3,
      job: {
        id: 3,
        title: 'UI/UX Designer',
        slug: 'ui-ux-designer',
        company: {
          name: 'Design Studio Pro',
          logo_url: null,
          verified_at: '2024-01-10',
        },
        location_mode: 'onsite',
        city: 'Los Angeles',
        state: 'California',
        country: 'United States',
        employment_type: 'full-time',
        seniority: 'senior',
        salary_min: 90000,
        salary_max: 140000,
        currency: 'USD',
        tags: ['UI/UX', 'Figma', 'Design Systems', 'User Research'],
        published_at: '2024-01-13T09:15:00Z',
      },
      saved_at: '2024-01-14T11:20:00Z',
      notes: 'Creative role in design-focused company'
    }
  ];

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setSavedJobs(mockSavedJobs);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredJobs = savedJobs.filter(savedJob => {
    const matchesSearch = savedJob.job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         savedJob.job.company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         savedJob.job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = !statusFilter || statusFilter === 'all' || 
                         (statusFilter === 'active' && isJobActive(savedJob.job.published_at)) ||
                         (statusFilter === 'expired' && !isJobActive(savedJob.job.published_at));
    
    return matchesSearch && matchesStatus;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.saved_at).getTime() - new Date(a.saved_at).getTime();
      case 'oldest':
        return new Date(a.saved_at).getTime() - new Date(b.saved_at).getTime();
      case 'salary-high':
        return (b.job.salary_max || 0) - (a.job.salary_max || 0);
      case 'salary-low':
        return (a.job.salary_min || 0) - (b.job.salary_min || 0);
      default:
        return 0;
    }
  });

  const isJobActive = (publishedAt: string) => {
    const published = new Date(publishedAt);
    const now = new Date();
    const daysSincePublished = (now.getTime() - published.getTime()) / (1000 * 60 * 60 * 24);
    return daysSincePublished <= 30; // Consider jobs active for 30 days
  };

  const removeSavedJob = (id: number) => {
    setSavedJobs(prev => prev.filter(job => job.id !== id));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setSortBy('recent');
  };

  const hasActiveFilters = searchTerm || statusFilter || sortBy !== 'recent';

  const formatSalary = (min?: number, max?: number, currency: string) => {
    if (!min && !max) return 'Salary not specified';
    
    const formatAmount = (amount: number) => {
      if (amount >= 1000) {
        return `${(amount / 1000).toFixed(0)}k`;
      }
      return amount.toString();
    };
    
    if (min && max) {
      return `${formatAmount(min)} - ${formatAmount(max)} ${currency}`;
    } else if (min) {
      return `${formatAmount(min)}+ ${currency}`;
    } else if (max) {
      return `Up to ${formatAmount(max)} ${currency}`;
    }
    
    return 'Salary not specified';
  };

  const formatLocation = (job: SavedJob['job']) => {
    const parts = [job.city, job.state, job.country].filter(Boolean);
    if (parts.length === 0) return 'Location not specified';
    
    return parts.join(', ');
  };

  const getLocationModeIcon = (mode: string) => {
    switch (mode) {
      case 'remote':
        return <MapPin className="h-4 w-4 text-green-600" />;
      case 'hybrid':
        return <MapPin className="h-4 w-4 text-yellow-600" />;
      case 'onsite':
        return <MapPin className="h-4 w-4 text-blue-600" />;
      default:
        return <MapPin className="h-4 w-4 text-gray-600" />;
    }
  };

  const getLocationModeLabel = (mode: string) => {
    switch (mode) {
      case 'remote':
        return 'Remote';
      case 'hybrid':
        return 'Hybrid';
      case 'onsite':
        return 'On-site';
      default:
        return 'Unknown';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    if (diffDays <= 30) return `${Math.floor((diffDays - 1) / 7)} weeks ago`;
    if (diffDays <= 365) return `${Math.floor((diffDays - 1) / 30)} months ago`;
    return date.toLocaleDateString();
  };

  return (
    <>
      <Head title="Saved Jobs - Unlock Portal Job" />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Saved Jobs</h1>
                <p className="text-gray-600">Manage your bookmarked job opportunities</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filters and Search */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search saved jobs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Jobs</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Recently Saved</SelectItem>
                    <SelectItem value="oldest">Oldest Saved</SelectItem>
                    <SelectItem value="salary-high">Salary High to Low</SelectItem>
                    <SelectItem value="salary-low">Salary Low to High</SelectItem>
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
              {loading ? 'Loading...' : `${sortedJobs.length} saved jobs`}
            </h2>
            {hasActiveFilters && (
              <p className="text-gray-600 mt-1">
                Showing filtered results
              </p>
            )}
          </div>

          {/* Saved Jobs List */}
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-white rounded-lg border p-6">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : sortedJobs.length > 0 ? (
            <div className="space-y-4">
              {sortedJobs.map((savedJob) => (
                <Card key={savedJob.id} className="hover:shadow-md transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        {/* Company Logo */}
                        <Avatar className="h-12 w-12 flex-shrink-0">
                          <AvatarImage src={savedJob.job.company.logo_url} alt={savedJob.job.company.name} />
                          <AvatarFallback className="bg-gray-100 text-gray-600">
                            <Building2 className="h-6 w-6" />
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          {/* Job Title */}
                          <Link 
                            href={`/jobs/${savedJob.job.slug}`}
                            className="block group"
                          >
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                              {savedJob.job.title}
                            </h3>
                          </Link>
                          
                          {/* Company Name */}
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-gray-600 font-medium">
                              {savedJob.job.company.name}
                            </span>
                            {savedJob.job.company.verified_at && (
                              <Badge variant="secondary" className="text-xs">
                                <Star className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          
                          {/* Job Details */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              {getLocationModeIcon(savedJob.job.location_mode)}
                              <span className="flex items-center gap-1">
                                {getLocationModeLabel(savedJob.job.location_mode)}
                                {savedJob.job.city && (
                                  <>
                                    <span>•</span>
                                    <span>{formatLocation(savedJob.job)}</span>
                                  </>
                                )}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="h-4 w-4" />
                              <span className="capitalize">{savedJob.job.employment_type.replace('-', ' ')}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Building2 className="h-4 w-4" />
                              <span className="capitalize">{savedJob.job.seniority}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <DollarSign className="h-4 w-4" />
                              <span>{formatSalary(savedJob.job.salary_min, savedJob.job.salary_max, savedJob.job.currency)}</span>
                            </div>
                          </div>
                          
                          {/* Tags */}
                          {savedJob.job.tags && savedJob.job.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {savedJob.job.tags.slice(0, 5).map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {savedJob.job.tags.length > 5 && (
                                <Badge variant="outline" className="text-xs">
                                  +{savedJob.job.tags.length - 5} more
                                </Badge>
                              )}
                            </div>
                          )}
                          
                          {/* Notes */}
                          {savedJob.notes && (
                            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                              <p className="text-sm text-blue-800">
                                <strong>Notes:</strong> {savedJob.notes}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex flex-col gap-2 ml-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Bookmark className="h-4 w-4 text-blue-600" />
                          <span>Saved {formatDate(savedJob.saved_at)}</span>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/jobs/${savedJob.job.slug}`}>
                              <ExternalLink className="h-3 w-3 mr-1" />
                              View
                            </Link>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => removeSavedJob(savedJob.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Bookmark className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No saved jobs found
                </h3>
                <p className="text-gray-600 mb-4">
                  {hasActiveFilters 
                    ? 'Try adjusting your filters or search terms'
                    : 'Start saving jobs you\'re interested in to view them here later'
                  }
                </p>
                {hasActiveFilters ? (
                  <Button onClick={clearFilters} variant="outline">
                    Clear All Filters
                  </Button>
                ) : (
                  <Button asChild>
                    <Link href="/jobs">
                      Browse Jobs
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
