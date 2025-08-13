import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  Briefcase, 
  Building2, 
  Users, 
  FileText, 
  Plus,
  TrendingUp,
  MapPin,
  Clock,
  DollarSign,
  Star,
  Eye,
  Bookmark,
  MessageSquare,
  Settings,
  BarChart3
} from 'lucide-react';

export default function RecruiterDashboard() {
  // TODO: Get user and company data from props/auth
  const user = {
    name: 'Sarah Johnson',
    role: 'recruiter',
    email: 'sarah@techcorp.com'
  };

  const company = {
    id: 1,
    name: 'TechCorp Inc.',
    logo_url: null,
    verified_at: '2024-01-15',
    industry: 'Technology',
    size: 'Medium'
  };

  const [stats, setStats] = useState({
    activeJobs: 8,
    totalApplications: 156,
    newApplications: 12,
    interviewsScheduled: 8,
    offersSent: 3,
    hires: 2
  });

  const [recentApplications, setRecentApplications] = useState([
    {
      id: 1,
      candidate: {
        name: 'John Smith',
        avatar: null,
        location: 'San Francisco, CA'
      },
      job: 'Senior React Developer',
      applied_at: '2 hours ago',
      status: 'new',
      match_score: 95
    },
    {
      id: 2,
      candidate: {
        name: 'Emily Chen',
        avatar: null,
        location: 'New York, NY'
      },
      job: 'Frontend Developer',
      applied_at: '4 hours ago',
      status: 'reviewing',
      match_score: 87
    },
    {
      id: 3,
      candidate: {
        name: 'Michael Rodriguez',
        avatar: null,
        location: 'Austin, TX'
      },
      job: 'UI/UX Designer',
      applied_at: '6 hours ago',
      status: 'shortlisted',
      match_score: 92
    }
  ]);

  const [activeJobs, setActiveJobs] = useState([
    {
      id: 1,
      title: 'Senior React Developer',
      status: 'published',
      applications: 24,
      views: 156,
      created_at: '2024-01-10'
    },
    {
      id: 2,
      title: 'Frontend Developer',
      status: 'published',
      applications: 18,
      views: 98,
      created_at: '2024-01-12'
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      status: 'published',
      applications: 15,
      views: 87,
      created_at: '2024-01-14'
    }
  ]);

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
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getJobStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge variant="default">Published</Badge>;
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      case 'closed':
        return <Badge variant="secondary">Closed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <>
      <Head title="Recruiter Dashboard - Unlock Portal Job" />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={company.logo_url} alt={company.name} />
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    <Building2 className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Welcome back, {user.name}!
                  </h1>
                  <p className="text-gray-600">
                    Managing recruitment for {company.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary">
                  <Star className="h-3 w-3 mr-1" />
                  Verified Company
                </Badge>
                <Button asChild>
                  <Link href="/recruiter/jobs/create">
                    <Plus className="h-4 w-4 mr-2" />
                    Post New Job
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeJobs}</div>
                <p className="text-xs text-muted-foreground">
                  Currently published
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalApplications}</div>
                <p className="text-xs text-muted-foreground">
                  This month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Applications</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.newApplications}</div>
                <p className="text-xs text-muted-foreground">
                  Today
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Interviews</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.interviewsScheduled}</div>
                <p className="text-xs text-muted-foreground">
                  Scheduled
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Offers Sent</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.offersSent}</div>
                <p className="text-xs text-muted-foreground">
                  This month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Successful Hires</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.hires}</div>
                <p className="text-xs text-muted-foreground">
                  This month
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Recent Applications */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Applications</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/recruiter/applications">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentApplications.map((application) => (
                    <div key={application.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={application.candidate.avatar} alt={application.candidate.name} />
                          <AvatarFallback className="bg-gray-100 text-gray-600">
                            {application.candidate.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{application.candidate.name}</h4>
                          <p className="text-sm text-gray-600">{application.job}</p>
                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                            <MapPin className="h-3 w-3" />
                            <span>{application.candidate.location}</span>
                            <span>•</span>
                            <span>{application.applied_at}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-2">
                          {getStatusBadge(application.status)}
                          <Badge variant="outline">{application.match_score}% Match</Badge>
                        </div>
                        <Button size="sm" asChild>
                          <Link href={`/recruiter/applications/${application.id}`}>
                            Review
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Active Job Postings */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Active Job Postings</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/recruiter/jobs">Manage All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeJobs.map((job) => (
                    <div key={job.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{job.title}</h4>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            {job.applications} applications
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {job.views} views
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {job.created_at}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        {getJobStatusBadge(job.status)}
                        <div className="mt-2">
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/recruiter/jobs/${job.id}/edit`}>
                              Edit
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button className="w-full justify-start" asChild>
                  <Link href="/recruiter/jobs/create">
                    <Plus className="h-4 w-4 mr-2" />
                    Post New Job
                  </Link>
                </Button>
                
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/recruiter/applications">
                    <FileText className="h-4 w-4 mr-2" />
                    Review Applications
                  </Link>
                </Button>
                
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/recruiter/companies">
                    <Building2 className="h-4 w-4 mr-2" />
                    Company Settings
                  </Link>
                </Button>
                
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/recruiter/analytics">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
