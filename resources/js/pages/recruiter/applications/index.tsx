import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft,
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  Eye,
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  FileText,
  MoreHorizontal
} from 'lucide-react';

interface Application {
  id: number;
  candidate: {
    id: number;
    name: string;
    avatar?: string;
    email: string;
    location: string;
    headline?: string;
  };
  job: {
    id: number;
    title: string;
    company: string;
  };
  status: 'new' | 'reviewing' | 'shortlisted' | 'interviewing' | 'offer' | 'rejected';
  applied_at: string;
  match_score: number;
  has_cover_letter: boolean;
  has_cv: boolean;
  source: string;
  notes?: string;
}

export default function ApplicationsIndex() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplications, setSelectedApplications] = useState<number[]>([]);
  const [filters, setFilters] = useState({
    status: '',
    job: '',
    search: '',
    dateRange: '',
    matchScore: ''
  });

  // Mock data - replace with API call
  useEffect(() => {
    setApplications([
      {
        id: 1,
        candidate: {
          id: 1,
          name: 'John Smith',
          avatar: null,
          email: 'john.smith@email.com',
          location: 'San Francisco, CA',
          headline: 'Senior React Developer'
        },
        job: {
          id: 1,
          title: 'Senior React Developer',
          company: 'TechCorp Inc.'
        },
        status: 'new',
        applied_at: '2024-01-15T10:30:00Z',
        match_score: 95,
        has_cover_letter: true,
        has_cv: true,
        source: 'Job Board',
        notes: 'Strong technical background, good communication skills'
      },
      {
        id: 2,
        candidate: {
          id: 2,
          name: 'Emily Chen',
          avatar: null,
          email: 'emily.chen@email.com',
          location: 'New York, NY',
          headline: 'Frontend Developer'
        },
        job: {
          id: 2,
          title: 'Frontend Developer',
          company: 'TechCorp Inc.'
        },
        status: 'reviewing',
        applied_at: '2024-01-14T15:45:00Z',
        match_score: 87,
        has_cover_letter: false,
        has_cv: true,
        source: 'Referral',
        notes: 'Good portfolio, needs to improve technical skills'
      },
      {
        id: 3,
        candidate: {
          id: 3,
          name: 'Michael Rodriguez',
          avatar: null,
          email: 'michael.rodriguez@email.com',
          location: 'Austin, TX',
          headline: 'UI/UX Designer'
        },
        job: {
          id: 3,
          title: 'UI/UX Designer',
          company: 'TechCorp Inc.'
        },
        status: 'shortlisted',
        applied_at: '2024-01-13T09:15:00Z',
        match_score: 92,
        has_cover_letter: true,
        has_cv: true,
        source: 'Job Board',
        notes: 'Excellent design portfolio, great cultural fit'
      }
    ]);
    setLoading(false);
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge variant="destructive">New</Badge>;
      case 'reviewing':
        return <Badge variant="secondary">Reviewing</Badge>;
      case 'shortlisted':
        return <Badge variant="default">Shortlisted</Badge>;
      case 'interviewing':
        return <Badge variant="outline">Interviewing</Badge>;
      case 'offer':
        return <Badge variant="secondary">Offer</Badge>;
      case 'rejected':
        return <Badge variant="outline">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'text-red-600';
      case 'reviewing':
        return 'text-yellow-600';
      case 'shortlisted':
        return 'text-blue-600';
      case 'interviewing':
        return 'text-purple-600';
      case 'offer':
        return 'text-green-600';
      case 'rejected':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
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
    return date.toLocaleDateString();
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedApplications(applications.map(app => app.id));
    } else {
      setSelectedApplications([]);
    }
  };

  const handleSelectApplication = (applicationId: number, checked: boolean) => {
    if (checked) {
      setSelectedApplications([...selectedApplications, applicationId]);
    } else {
      setSelectedApplications(selectedApplications.filter(id => id !== applicationId));
    }
  };

  const handleBulkAction = (action: string) => {
    // TODO: Implement bulk actions
    console.log(`Bulk action: ${action} for applications:`, selectedApplications);
  };

  const filteredApplications = applications.filter(app => {
    if (filters.status && app.status !== filters.status) return false;
    if (filters.job && app.job.title.toLowerCase().includes(filters.job.toLowerCase())) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      if (!app.candidate.name.toLowerCase().includes(searchLower) &&
          !app.candidate.headline?.toLowerCase().includes(searchLower) &&
          !app.job.title.toLowerCase().includes(searchLower)) {
        return false;
      }
    }
    if (filters.matchScore && app.match_score < parseInt(filters.matchScore)) return false;
    return true;
  });

  return (
    <>
      <Head title="Applications Inbox - Unlock Portal Job" />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/recruiter/dashboard">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Dashboard
                  </Link>
                </Button>
                <Separator orientation="vertical" className="h-6" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Applications Inbox</h1>
                  <p className="text-gray-600">Review and manage job applications</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary">
                  {filteredApplications.length} applications
                </Badge>
                {selectedApplications.length > 0 && (
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export Selected
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Filters and Search */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search candidates..."
                      value={filters.search}
                      onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Status</label>
                  <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All statuses</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="reviewing">Reviewing</SelectItem>
                      <SelectItem value="shortlisted">Shortlisted</SelectItem>
                      <SelectItem value="interviewing">Interviewing</SelectItem>
                      <SelectItem value="offer">Offer</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Job</label>
                  <Select value={filters.job} onValueChange={(value) => setFilters({ ...filters, job: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="All jobs" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All jobs</SelectItem>
                      <SelectItem value="senior-react">Senior React Developer</SelectItem>
                      <SelectItem value="frontend">Frontend Developer</SelectItem>
                      <SelectItem value="ui-ux">UI/UX Designer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Match Score</label>
                  <Select value={filters.matchScore} onValueChange={(value) => setFilters({ ...filters, matchScore: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any score" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any score</SelectItem>
                      <SelectItem value="90">90%+</SelectItem>
                      <SelectItem value="80">80%+</SelectItem>
                      <SelectItem value="70">70%+</SelectItem>
                      <SelectItem value="60">60%+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Date Range</label>
                  <Select value={filters.dateRange} onValueChange={(value) => setFilters({ ...filters, dateRange: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This week</SelectItem>
                      <SelectItem value="month">This month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bulk Actions */}
          {selectedApplications.length > 0 && (
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">
                      {selectedApplications.length} application(s) selected
                    </span>
                    <Button variant="outline" size="sm" onClick={() => setSelectedApplications([])}>
                      Clear Selection
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleBulkAction('shortlist')}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Shortlist
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleBulkAction('reject')}>
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleBulkAction('export')}>
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Applications List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Applications</span>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedApplications.length === applications.length && applications.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                  <span className="text-sm text-gray-500">Select All</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <div className="p-6 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading applications...</p>
                </div>
              ) : filteredApplications.length === 0 ? (
                <div className="p-6 text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
                  <p className="text-gray-600">Try adjusting your filters or search terms</p>
                </div>
              ) : (
                <div className="divide-y">
                  {filteredApplications.map((application) => (
                    <div key={application.id} className="p-6 hover:bg-gray-50">
                      <div className="flex items-start gap-4">
                        {/* Selection Checkbox */}
                        <div className="pt-1">
                          <Checkbox
                            checked={selectedApplications.includes(application.id)}
                            onCheckedChange={(checked) => handleSelectApplication(application.id, checked as boolean)}
                          />
                        </div>
                        
                        {/* Candidate Avatar */}
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={application.candidate.avatar} alt={application.candidate.name} />
                          <AvatarFallback className="bg-gray-100 text-gray-600">
                            {application.candidate.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        {/* Application Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {application.candidate.name}
                              </h3>
                              {application.candidate.headline && (
                                <p className="text-gray-600">{application.candidate.headline}</p>
                              )}
                              <p className="text-sm text-gray-500">{application.job.title} at {application.job.company}</p>
                            </div>
                            
                            <div className="flex items-center gap-2 ml-4">
                              {getStatusBadge(application.status)}
                              <Badge variant="outline">{application.match_score}% Match</Badge>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Mail className="h-4 w-4" />
                              {application.candidate.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {application.candidate.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {formatDate(application.applied_at)}
                            </span>
                            <span className="flex items-center gap-1">
                              <FileText className="h-4 w-4" />
                              {application.source}
                            </span>
                          </div>
                          
                          {/* Application Attachments */}
                          <div className="flex items-center gap-4 mt-3">
                            {application.has_cv && (
                              <Badge variant="secondary" className="text-xs">
                                <FileText className="h-3 w-3 mr-1" />
                                CV Available
                              </Badge>
                            )}
                            {application.has_cover_letter && (
                              <Badge variant="secondary" className="text-xs">
                                <Mail className="h-3 w-3 mr-1" />
                                Cover Letter
                              </Badge>
                            )}
                          </div>
                          
                          {/* Notes */}
                          {application.notes && (
                            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                              <p className="text-sm text-gray-700">
                                <strong>Notes:</strong> {application.notes}
                              </p>
                            </div>
                          )}
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex flex-col gap-2 ml-4">
                          <Button size="sm" asChild>
                            <Link href={`/recruiter/applications/${application.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              Review
                            </Link>
                          </Button>
                          
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Contact
                          </Button>
                          
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
