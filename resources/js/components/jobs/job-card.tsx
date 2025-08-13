import React from 'react';
import { Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Building2, 
  Star,
  Bookmark,
  ExternalLink
} from 'lucide-react';

interface JobCardProps {
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
}

export function JobCard({ job }: JobCardProps) {
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

  const handleSaveJob = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Implement save job functionality
    console.log('Save job:', job.id);
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            {/* Company Logo */}
            <Avatar className="h-12 w-12 flex-shrink-0">
              <AvatarImage src={job.company.logo_url} alt={job.company.name} />
              <AvatarFallback className="bg-gray-100 text-gray-600">
                <Building2 className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              {/* Job Title */}
              <Link 
                href={`/jobs/${job.slug}`}
                className="block group"
              >
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {job.title}
                </h3>
              </Link>
              
              {/* Company Name */}
              <div className="flex items-center gap-2 mt-1">
                <span className="text-gray-600 font-medium">
                  {job.company.name}
                </span>
                {job.company.verified_at && (
                  <Badge variant="secondary" className="text-xs">
                    <Star className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          {/* Save Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSaveJob}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {/* Job Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Location */}
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
          
          {/* Employment Type */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span className="capitalize">{job.employment_type.replace('-', ' ')}</span>
          </div>
          
          {/* Seniority */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Building2 className="h-4 w-4" />
            <span className="capitalize">{job.seniority}</span>
          </div>
          
          {/* Salary */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <DollarSign className="h-4 w-4" />
            <span>{formatSalary(job.salary_min, job.salary_max, job.currency)}</span>
          </div>
        </div>
        
        {/* Tags */}
        {job.tags && job.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {job.tags.slice(0, 5).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {job.tags.length > 5 && (
              <Badge variant="outline" className="text-xs">
                +{job.tags.length - 5} more
              </Badge>
            )}
          </div>
        )}
        
        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t">
          <span className="text-sm text-gray-500">
            Posted {formatDate(job.published_at)}
          </span>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/jobs/${job.slug}`}>
                View Details
                <ExternalLink className="h-3 w-3 ml-1" />
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href={`/jobs/${job.slug}/apply`}>
                Apply Now
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
