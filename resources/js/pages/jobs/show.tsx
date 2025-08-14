import React, { useState, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Building2, 
  Star,
  Bookmark,
  Share2,
  ArrowLeft,
  ExternalLink,
  Calendar,
  Users,
  Globe,
  Mail
} from 'lucide-react';

interface Job {
  id: number;
  title: string;
  slug: string;
  description: string;
  requirements?: string;
  benefits?: string;
  company: {
    id: number;
    name: string;
    slug: string;
    logo_url?: string;
    verified_at?: string;
    website?: string;
    description?: string;
    industry?: string;
    size?: string;
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
  expires_at?: string;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
}

interface PageProps {
  job: Job;
  auth: {
    user?: {
      id: number;
      role: string;
    };
  };
}

export default function JobShow({ job, auth }: PageProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const isAuthenticated = !!auth.user;
  const isCandidate = auth.user?.role === 'candidate';

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

  const formatLocation = () => {
    const parts = [job.city, job.state, job.country].filter(Boolean);
    if (parts.length === 0) return 'Location not specified';
    
    return parts.join(', ');
  };

  const getLocationModeIcon = () => {
    switch (job.location_mode) {
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

  const getLocationModeLabel = () => {
    switch (job.location_mode) {
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
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleSaveJob = () => {
    if (!isAuthenticated) {
      // Redirect to login
      return;
    }
    setIsSaved(!isSaved);
    // TODO: Implement save job functionality
  };

  const handleApply = () => {
    if (!isAuthenticated) {
      // Redirect to login
      return;
    }
    if (!isCandidate) {
      // Show message that only candidates can apply
      return;
    }
    setShowApplyModal(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `Check out this job: ${job.title} at ${job.company.name}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // TODO: Show toast notification
    }
  };

  return (
    <>
      <Head title={`${job.title} at ${job.company.name} - Unlock Portal Job`}>
        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "JobPosting",
              "title": job.title,
              "description": job.description,
              "datePosted": job.published_at,
              "validThrough": job.expires_at || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
              "employmentType": job.employment_type,
              "hiringOrganization": {
                "@type": "Organization",
                "name": job.company.name,
                "url": job.company.website || `${window.location.origin}/companies/${job.company.slug}`,
                "logo": job.company.logo_url,
                "sameAs": job.company.verified_at ? `${window.location.origin}/companies/${job.company.slug}` : undefined
              },
              "jobLocation": {
                "@type": "Place",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": job.city,
                  "addressRegion": job.state,
                  "addressCountry": job.country
                },
                "jobLocationType": job.location_mode === 'remote' ? 'TELECOMMUTE' : 
                                 job.location_mode === 'hybrid' ? 'HYBRID' : 'ONSITE'
              },
              "applicantLocationRequirements": job.location_mode === 'remote' ? {
                "@type": "Country",
                "name": "Worldwide"
              } : undefined,
              "baseSalary": job.salary_min ? {
                "@type": "MonetaryAmount",
                "currency": job.currency,
                "value": {
                  "@type": "QuantitativeValue",
                  "minValue": job.salary_min,
                  "maxValue": job.salary_max || job.salary_min,
                  "unitText": "YEAR"
                }
              } : undefined,
              "qualifications": job.requirements,
              "experienceRequirements": job.seniority,
              "jobBenefits": job.benefits,
              "industry": job.company.industry,
              "url": `${window.location.origin}/jobs/${job.slug}`,
              "category": job.categories.map(cat => cat.name).join(', ')
            })
          }}
        />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/jobs">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Jobs
                </Link>
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={job.company.logo_url} alt={job.company.name} />
                  <AvatarFallback className="bg-gray-100 text-gray-600">
                    <Building2 className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-gray-600 font-medium">{job.company.name}</span>
                    {job.company.verified_at && (
                      <Badge variant="secondary" className="text-xs">
                        <Star className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Job Overview */}
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      {getLocationModeIcon()}
                      <span className="flex items-center gap-1">
                        {getLocationModeLabel()}
                        {job.city && (
                          <>
                            <span>•</span>
                            <span>{formatLocation()}</span>
                          </>
                        )}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span className="capitalize">{job.employment_type.replace('-', ' ')}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span className="capitalize">{job.seniority}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <DollarSign className="h-4 w-4" />
                      <span>{formatSalary(job.salary_min, job.salary_max, job.currency)}</span>
                    </div>
                  </div>
                  
                  {/* Tags */}
                  {job.tags && job.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {job.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  {/* Categories */}
                  {job.categories && job.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {job.categories.map((category) => (
                        <Badge key={category.id} variant="secondary">
                          {category.icon} {category.name}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  {/* Posted Date */}
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>Posted {formatDate(job.published_at)}</span>
                    {job.expires_at && (
                      <>
                        <span>•</span>
                        <span>Expires {formatDate(job.expires_at)}</span>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Job Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Job Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: job.description }} />
                  </div>
                </CardContent>
              </Card>

              {/* Requirements */}
              {job.requirements && (
                <Card>
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: job.requirements }} />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Benefits */}
              {job.benefits && (
                <Card>
                  <CardHeader>
                    <CardTitle>Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: job.benefits }} />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Action Buttons */}
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {isAuthenticated && isCandidate ? (
                      <Button className="w-full" size="lg" onClick={handleApply}>
                        Apply Now
                      </Button>
                    ) : (
                      <Button className="w-full" size="lg" asChild>
                        <Link href="/auth/login">
                          Sign in to Apply
                        </Link>
                      </Button>
                    )}
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={handleSaveJob}
                      >
                        <Bookmark className={`h-4 w-4 mr-2 ${isSaved ? 'fill-current' : ''}`} />
                        {isSaved ? 'Saved' : 'Save Job'}
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={handleShare}
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Company Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Company</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={job.company.logo_url} alt={job.company.name} />
                      <AvatarFallback className="bg-gray-100 text-gray-600">
                        <Building2 className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{job.company.name}</h3>
                      {job.company.industry && (
                        <p className="text-sm text-gray-600">{job.company.industry}</p>
                      )}
                      {job.company.size && (
                        <p className="text-sm text-gray-500">{job.company.size} company</p>
                      )}
                    </div>
                  </div>
                  
                  {job.company.description && (
                    <p className="text-sm text-gray-600">{job.company.description}</p>
                  )}
                  
                  <div className="space-y-2">
                    {job.company.website && (
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <a href={job.company.website} target="_blank" rel="noopener noreferrer">
                          <Globe className="h-4 w-4 mr-2" />
                          Visit Website
                        </a>
                      </Button>
                    )}
                    
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href={`/companies/${job.company.slug}`}>
                        <Building2 className="h-4 w-4 mr-2" />
                        View Company
                      </Link>
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href={`/companies/${job.company.slug}/jobs`}>
                        <Briefcase className="h-4 w-4 mr-2" />
                        All Jobs at {job.company.name}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Similar Jobs */}
              <Card>
                <CardHeader>
                  <CardTitle>Similar Jobs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-3 border rounded-lg hover:bg-gray-50">
                        <h4 className="font-medium text-sm">Frontend Developer</h4>
                        <p className="text-xs text-gray-600">TechCorp Inc.</p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                          <MapPin className="h-3 w-3" />
                          <span>Remote</span>
                          <span>•</span>
                          <span>$80k - $120k</span>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/jobs">View More Jobs</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
