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
  FileText, 
  Building2, 
  MapPin, 
  Clock, 
  DollarSign,
  Star,
  ExternalLink,
  Calendar,
  MessageSquare,
  Eye
} from 'lucide-react';

interface Application {
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
  status: 'submitted' | 'reviewing' | 'shortlisted' | 'interviewing' | 'offer' | 'rejected' | 'withdrawn';
  applied_at: string;
  cover_letter?: string;
  notes?: string;
  last_updated?: string;
}

export default function Applications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  // Mock data for development
  const mockApplications: Application[] = [
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
      status: 'shortlisted',
      applied_at: '2024-01-16T09:00:00Z',
      cover_letter: 'I am excited to apply for the Senior React Developer position...',
      notes: 'Application reviewed by HR team. Moving to technical interview.',
      last_updated: '2024-01-18T14:30:00Z',
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
      status: 'interviewing',
      applied_at: '2024-01-15T14:30:00Z',
      cover_letter: 'I am interested in joining your dynamic team...',
      notes: 'First interview scheduled for next week.',
      last_updated: '2024-01-17T10:15:00Z',
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
      status: 'rejected',
      applied_at: '2024-01-14T11:20:00Z',
      cover_letter: 'I am passionate about creating user-centered designs...',
      notes: 'Position filled by another candidate.',
      last_updated: '2024-01-16T16:45:00Z',
    },
    {
      id: 4,
      job: {
        id: 4,
        title: 'Data Scientist',
        slug: 'data-scientist',
        company: {
          name: 'DataTech Solutions',
          logo_url: null,
          verified_at: '2024-01-12',
        },
        location_mode: 'remote',
        city: 'Austin',
        state: 'Texas',
        country: 'United States',
        employment_type: 'full-time',
        seniority: 'mid',
        salary_min: 100000,
        salary_max: 150000,
        currency: 'USD',
        tags: ['Python', 'Machine Learning', 'SQL', 'Statistics'],
        published_at: '2024-01-12T14:20:00Z',
      },
      status: 'submitted',
      applied_at: '2024-01-15T16:00:00Z',
      cover_letter: 'I am excited about the opportunity to work with data...',
      notes: 'Application received and under review.',
      last_updated: '2024-01-15T16:00:00Z',
    },
    {
      id: 5,
      job: {
        id: 5,
        title: 'Product Manager',
        slug: 'product-manager',
        company: {
          name: 'InnovateCorp',
          logo_url: null,
          verified_at: '2024-01-11',
        },
        location_mode: 'hybrid',
        city: 'Seattle',
        state: 'Washington',
        country: 'United States',
        employment_type: 'full-time',
        seniority: 'senior',
        salary_min: 130000,
        salary_max: 200000,
        currency: 'USD',
        tags: ['Product Management', 'Agile', 'User Research', 'Analytics'],
        published_at: '2024-01-11T11:45:00Z',
      },
      status: 'offer',
      applied_at: '2024-01-13T09:00:00Z',
      cover_letter: 'I am thrilled to apply for this Product Manager role...',
      notes: 'Offer extended! $150k base + equity. Respond by Friday.',
      last_updated: '2024-01-19T11:00:00Z',
    }
  ];

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setApplications(mockApplications);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredApplications = applications.filter(application => {
    const matchesSearch = application.job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         application.job.company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         application.job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = !statusFilter || statusFilter === 'all' || application.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.applied_at).getTime() - new Date(a.applied_at).getTime();
      case 'oldest':
        return new Date(a.applied_at).getTime() - new Date(b.applied_at).getTime();
      case 'status':
        return a.status.localeCompare(b.status);
      case 'company':
        return a.job.company.name.localeCompare(b.job.company.name);
      default:
        return 0;
    }
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'outline';
      case 'reviewing':
        return 'secondary';
      case 'shortlisted':
        return 'default';
      case 'interviewing':
        return 'default';
      case 'offer':
        return 'default';
      case 'rejected':
        return 'destructive';
      case 'withdrawn':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'text-blue-600';
      case 'reviewing':
        return 'text-yellow-600';
      case 'shortlisted':
        return 'text-green-600';
      case 'interviewing':
        return 'text-purple-600';
      case 'offer':
        return 'text-green-700';
      case 'rejected':
        return 'text-red-600';
      case 'withdrawn':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'Submitted';
      case 'reviewing':
        return 'Under Review';
      case 'shortlisted':
        return 'Shortlisted';
      case 'interviewing':
        return 'Interviewing';
      case 'offer':
        return 'Offer Received';
      case 'rejected':
        return 'Rejected';
      case 'withdrawn':
        return 'Withdrawn';
      default:
        return status;
    }
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

  const formatLocation = (job: Application['job']) => {
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

  const getApplicationStats = () => {
    const total = applications.length;
    const submitted = applications.filter(app => app.status === 'submitted').length;
    const reviewing = applications.filter(app => app.status === 'reviewing').length;
    const shortlisted = applications.filter(app => app.status === 'shortlisted').length;
    const interviewing = applications.filter(app => app.status === 'interviewing').length;
    const offer = applications.filter(app => app.status === 'offer').length;
    const rejected = applications.filter(app => app.status === 'rejected').length;

    return { total, submitted, reviewing, shortlisted, interviewing, offer, rejected };
  };

  const stats = getApplicationStats();

  return (
    <>
      <Head title="My Applications - Unlock Portal Job" />
      
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
                <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
                <p className="text-gray-600">Track your job applications and their status</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Application Stats */}
          <div className="grid grid-cols-2 md:grid-cols-7 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                <div className="text-sm text-gray-600">Total</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.submitted}</div>
                <div className="text-sm text-gray-600">Submitted</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">{stats.reviewing}</div>
                <div className="text-sm text-gray-600">Reviewing</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{stats.shortlisted}</div>
                <div className="text-sm text-gray-600">Shortlisted</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.interviewing}</div>
                <div className="text-sm text-gray-600">Interviewing</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-700">{stats.offer}</div>
                <div className="text-sm text-gray-600">Offers</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
                <div className="text-sm text-gray-600">Rejected</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search applications..."
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
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="reviewing">Reviewing</SelectItem>
                    <SelectItem value="shortlisted">Shortlisted</SelectItem>
                    <SelectItem value="interviewing">Interviewing</SelectItem>
                    <SelectItem value="offer">Offer</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="withdrawn">Withdrawn</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Recently Applied</SelectItem>
                    <SelectItem value="oldest">Oldest Applied</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
                    <SelectItem value="company">Company</SelectItem>
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
              {loading ? 'Loading...' : `${sortedApplications.length} applications`}
            </h2>
            {hasActiveFilters && (
              <p className="text-gray-600 mt-1">
                Showing filtered results
              </p>
            )}
          </div>

          {/* Applications List */}
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-white rounded-lg border p-6">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : sortedApplications.length > 0 ? (
            <div className="space-y-4">
              {sortedApplications.map((application) => (
                <Card key={application.id} className="hover:shadow-md transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        {/* Company Logo */}
                        <Avatar className="h-12 w-12 flex-shrink-0">
                          <AvatarImage src={application.job.company.logo_url} alt={application.job.company.name} />
                          <AvatarFallback className="bg-gray-100 text-gray-600">
                            <Building2 className="h-6 w-6" />
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          {/* Job Title and Status */}
                          <div className="flex items-start justify-between mb-2">
                            <Link 
                              href={`/jobs/${application.job.slug}`}
                              className="block group"
                            >
                              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                                {application.job.title}
                              </h3>
                            </Link>
                            
                            <div className="flex items-center gap-2 ml-4">
                              <Badge variant={getStatusVariant(application.status)} className="text-sm">
                                {getStatusLabel(application.status)}
                              </Badge>
                              {application.status === 'offer' && (
                                <Badge variant="default" className="text-xs bg-green-600">
                                  🎉
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          {/* Company Name */}
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-gray-600 font-medium">
                              {application.job.company.name}
                            </span>
                            {application.job.company.verified_at && (
                              <Badge variant="secondary" className="text-xs">
                                <Star className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          
                          {/* Job Details */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              {getLocationModeIcon(application.job.location_mode)}
                              <span className="flex items-center gap-1">
                                {getLocationModeLabel(application.job.location_mode)}
                                {application.job.city && (
                                  <>
                                    <span>•</span>
                                    <span>{formatLocation(application.job)}</span>
                                  </>
                                )}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="h-4 w-4" />
                              <span className="capitalize">{application.job.employment_type.replace('-', ' ')}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Building2 className="h-4 w-4" />
                              <span className="capitalize">{application.job.seniority}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <DollarSign className="h-4 w-4" />
                              <span>{formatSalary(application.job.salary_min, application.job.salary_max, application.job.currency)}</span>
                            </div>
                          </div>
                          
                          {/* Application Details */}
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Applied {formatDate(application.applied_at)}
                            </span>
                            {application.last_updated && application.last_updated !== application.applied_at && (
                              <span className="flex items-center gap-1">
                                <MessageSquare className="h-4 w-4" />
                                Updated {formatDate(application.last_updated)}
                              </span>
                            )}
                          </div>
                          
                          {/* Notes */}
                          {application.notes && (
                            <div className="p-3 bg-blue-50 rounded-lg">
                              <p className="text-sm text-blue-800">
                                <strong>Status Update:</strong> {application.notes}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex flex-col gap-2 ml-4">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/jobs/${application.job.slug}`}>
                              <Eye className="h-3 w-3 mr-1" />
                              View Job
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/applications/${application.id}`}>
                              <FileText className="h-3 w-3 mr-1" />
                              View App
                            </Link>
                          </Button>
                        </div>
                        
                        {application.status === 'offer' && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Respond to Offer
                          </Button>
                        )}
                        
                        {application.status === 'interviewing' && (
                          <Button size="sm" variant="outline">
                            Schedule Interview
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No applications found
                </h3>
                <p className="text-gray-600 mb-4">
                  {hasActiveFilters 
                    ? 'Try adjusting your filters or search terms'
                    : 'You haven\'t applied to any jobs yet. Start your job search today!'
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
