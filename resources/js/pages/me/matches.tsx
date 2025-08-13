import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  TrendingUp, 
  Building2, 
  MapPin, 
  Clock, 
  DollarSign,
  Star,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  Eye
} from 'lucide-react';

interface JobMatch {
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
  score: number;
  explanation: {
    locationFit: number;
    skillsOverlap: number;
    seniorityFit: number;
    salaryOverlap: number;
    languageFit: number;
    matchedSkills: string[];
    unmatchedSkills: string[];
    notes: string[];
  };
  isRelevant: boolean;
  viewedAt?: string;
  feedback?: 'positive' | 'negative' | null;
}

export default function JobMatches() {
  const [matches, setMatches] = useState<JobMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [scoreFilter, setScoreFilter] = useState('');
  const [sortBy, setSortBy] = useState('score');

  // Mock data for development
  const mockMatches: JobMatch[] = [
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
      score: 95,
      explanation: {
        locationFit: 25,
        skillsOverlap: 38,
        seniorityFit: 15,
        salaryOverlap: 10,
        languageFit: 7,
        matchedSkills: ['React', 'TypeScript', 'Frontend Development'],
        unmatchedSkills: ['GraphQL', 'Next.js'],
        notes: ['Perfect location match (remote)', 'Strong skills alignment', 'Salary within your range']
      },
      isRelevant: true,
      viewedAt: null,
      feedback: null
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
      score: 87,
      explanation: {
        locationFit: 20,
        skillsOverlap: 35,
        seniorityFit: 12,
        salaryOverlap: 8,
        languageFit: 12,
        matchedSkills: ['React', 'Node.js', 'Full-stack Development'],
        unmatchedSkills: ['MongoDB', 'AWS'],
        notes: ['Good location match', 'Strong technical skills', 'Salary slightly below your range']
      },
      isRelevant: true,
      viewedAt: null,
      feedback: null
    },
    {
      id: 3,
      job: {
        id: 3,
        title: 'Frontend Engineer',
        slug: 'frontend-engineer',
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
        seniority: 'mid',
        salary_min: 90000,
        salary_max: 130000,
        currency: 'USD',
        tags: ['React', 'Vue.js', 'CSS3', 'UI/UX'],
        published_at: '2024-01-13T09:15:00Z',
      },
      score: 78,
      explanation: {
        locationFit: 15,
        skillsOverlap: 32,
        seniorityFit: 12,
        salaryOverlap: 9,
        languageFit: 10,
        matchedSkills: ['React', 'Frontend Development'],
        unmatchedSkills: ['Vue.js', 'UI/UX Design'],
        notes: ['On-site location (not remote)', 'Good frontend skills match', 'Salary within range']
      },
      isRelevant: true,
      viewedAt: null,
      feedback: null
    },
    {
      id: 4,
      job: {
        id: 4,
        title: 'DevOps Engineer',
        slug: 'devops-engineer',
        company: {
          name: 'CloudOps Inc.',
          logo_url: null,
          verified_at: '2024-01-10',
        },
        location_mode: 'remote',
        city: 'Denver',
        state: 'Colorado',
        country: 'United States',
        employment_type: 'full-time',
        seniority: 'mid',
        salary_min: 110000,
        salary_max: 160000,
        currency: 'USD',
        tags: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
        published_at: '2024-01-12T14:20:00Z',
      },
      score: 65,
      explanation: {
        locationFit: 25,
        skillsOverlap: 20,
        seniorityFit: 12,
        salaryOverlap: 10,
        languageFit: 8,
        matchedSkills: ['AWS', 'CI/CD'],
        unmatchedSkills: ['Docker', 'Kubernetes', 'DevOps'],
        notes: ['Great remote location', 'Limited skills overlap', 'Good salary range']
      },
      isRelevant: false,
      viewedAt: null,
      feedback: null
    }
  ];

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setMatches(mockMatches);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredMatches = matches.filter(match => {
    const matchesSearch = match.job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         match.job.company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         match.job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesScore = !scoreFilter || scoreFilter === 'all' || 
                        (scoreFilter === 'high' && match.score >= 80) ||
                        (scoreFilter === 'medium' && match.score >= 60 && match.score < 80) ||
                        (scoreFilter === 'low' && match.score < 60);
    
    return matchesSearch && matchesScore;
  });

  const sortedMatches = [...filteredMatches].sort((a, b) => {
    switch (sortBy) {
      case 'score':
        return b.score - a.score;
      case 'recent':
        return new Date(b.job.published_at).getTime() - new Date(a.job.published_at).getTime();
      case 'salary-high':
        return (b.job.salary_max || 0) - (a.job.salary_max || 0);
      case 'salary-low':
        return (a.job.salary_min || 0) - (b.job.salary_min || 0);
      default:
        return 0;
    }
  });

  const markAsViewed = (id: number) => {
    setMatches(prev => prev.map(match => 
      match.id === id ? { ...match, viewedAt: new Date().toISOString() } : match
    ));
  };

  const provideFeedback = (id: number, feedback: 'positive' | 'negative') => {
    setMatches(prev => prev.map(match => 
      match.id === id ? { ...match, feedback } : match
    ));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setScoreFilter('');
    setSortBy('score');
  };

  const hasActiveFilters = searchTerm || scoreFilter || sortBy !== 'score';

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

  const formatLocation = (job: JobMatch['job']) => {
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

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreVariant = (score: number) => {
    if (score >= 90) return 'default';
    if (score >= 80) return 'secondary';
    if (score >= 70) return 'outline';
    if (score >= 60) return 'outline';
    return 'outline';
  };

  return (
    <>
      <Head title="Job Matches - Unlock Portal Job" />
      
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
                <h1 className="text-2xl font-bold text-gray-900">Job Matches</h1>
                <p className="text-gray-600">Discover opportunities that match your profile</p>
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
                    placeholder="Search job matches..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={scoreFilter} onValueChange={setScoreFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Match Score" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Scores</SelectItem>
                    <SelectItem value="high">High (80+)</SelectItem>
                    <SelectItem value="medium">Medium (60-79)</SelectItem>
                    <SelectItem value="low">Low (<60)</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="score">Match Score</SelectItem>
                    <SelectItem value="recent">Recently Posted</SelectItem>
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
              {loading ? 'Loading...' : `${sortedMatches.length} job matches found`}
            </h2>
            {hasActiveFilters && (
              <p className="text-gray-600 mt-1">
                Showing filtered results
              </p>
            )}
          </div>

          {/* Job Matches List */}
          {loading ? (
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-white rounded-lg border p-6">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : sortedMatches.length > 0 ? (
            <div className="space-y-4">
              {sortedMatches.map((match) => (
                <Card key={match.id} className="hover:shadow-md transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        {/* Company Logo */}
                        <Avatar className="h-12 w-12 flex-shrink-0">
                          <AvatarImage src={match.job.company.logo_url} alt={match.job.company.name} />
                          <AvatarFallback className="bg-gray-100 text-gray-600">
                            <Building2 className="h-6 w-6" />
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          {/* Job Title and Match Score */}
                          <div className="flex items-start justify-between mb-2">
                            <Link 
                              href={`/jobs/${match.job.slug}`}
                              className="block group"
                            >
                              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                                {match.job.title}
                              </h3>
                            </Link>
                            
                            <div className="flex items-center gap-2 ml-4">
                              <Badge variant={getScoreVariant(match.score)} className="text-sm">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                {match.score}% Match
                              </Badge>
                              {!match.viewedAt && (
                                <Badge variant="outline" className="text-xs">
                                  New
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          {/* Company Name */}
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-gray-600 font-medium">
                              {match.job.company.name}
                            </span>
                            {match.job.company.verified_at && (
                              <Badge variant="secondary" className="text-xs">
                                <Star className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          
                          {/* Job Details */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              {getLocationModeIcon(match.job.location_mode)}
                              <span className="flex items-center gap-1">
                                {getLocationModeLabel(match.job.location_mode)}
                                {match.job.city && (
                                  <>
                                    <span>•</span>
                                    <span>{formatLocation(match.job)}</span>
                                  </>
                                )}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="h-4 w-4" />
                              <span className="capitalize">{match.job.employment_type.replace('-', ' ')}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Building2 className="h-4 w-4" />
                              <span className="capitalize">{match.job.seniority}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <DollarSign className="h-4 w-4" />
                              <span>{formatSalary(match.job.salary_min, match.job.salary_max, match.job.currency)}</span>
                            </div>
                          </div>
                          
                          {/* Match Breakdown */}
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Match Breakdown</h4>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-xs">
                                <span>Location Fit</span>
                                <span className="text-gray-600">{match.explanation.locationFit}/25</span>
                              </div>
                              <Progress value={match.explanation.locationFit} className="h-2" />
                              
                              <div className="flex items-center justify-between text-xs">
                                <span>Skills Overlap</span>
                                <span className="text-gray-600">{match.explanation.skillsOverlap}/40</span>
                              </div>
                              <Progress value={match.explanation.skillsOverlap} className="h-2" />
                              
                              <div className="flex items-center justify-between text-xs">
                                <span>Seniority Fit</span>
                                <span className="text-gray-600">{match.explanation.seniorityFit}/15</span>
                              </div>
                              <Progress value={match.explanation.seniorityFit} className="h-2" />
                            </div>
                          </div>
                          
                          {/* Matched Skills */}
                          {match.explanation.matchedSkills.length > 0 && (
                            <div className="mb-3">
                              <p className="text-xs text-gray-600 mb-1">Matched Skills:</p>
                              <div className="flex flex-wrap gap-1">
                                {match.explanation.matchedSkills.map((skill, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {/* Match Notes */}
                          {match.explanation.notes.length > 0 && (
                            <div className="p-3 bg-blue-50 rounded-lg">
                              <ul className="text-sm text-blue-800 space-y-1">
                                {match.explanation.notes.map((note, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <span className="text-blue-600 mt-1">•</span>
                                    <span>{note}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex flex-col gap-2 ml-4">
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => markAsViewed(match.id)}
                            className={match.viewedAt ? 'bg-green-50 text-green-700 border-green-200' : ''}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            {match.viewedAt ? 'Viewed' : 'Mark Viewed'}
                          </Button>
                        </div>
                        
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => provideFeedback(match.id, 'positive')}
                            className={`h-8 w-8 p-0 ${match.feedback === 'positive' ? 'text-green-600 bg-green-50' : 'text-gray-400 hover:text-green-600'}`}
                          >
                            <ThumbsUp className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => provideFeedback(match.id, 'negative')}
                            className={`h-8 w-8 p-0 ${match.feedback === 'negative' ? 'text-red-600 bg-red-50' : 'text-gray-400 hover:text-red-600'}`}
                          >
                            <ThumbsDown className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/jobs/${match.job.slug}`}>
                              <ExternalLink className="h-3 w-3 mr-1" />
                              View Job
                            </Link>
                          </Button>
                          <Button size="sm" asChild>
                            <Link href={`/jobs/${match.job.slug}/apply`}>
                              Apply Now
                            </Link>
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
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No job matches found
                </h3>
                <p className="text-gray-600 mb-4">
                  {hasActiveFilters 
                    ? 'Try adjusting your filters or search terms'
                    : 'We\'re working on finding the perfect matches for you. Check back soon!'
                  }
                </p>
                {hasActiveFilters ? (
                  <Button onClick={clearFilters} variant="outline">
                    Clear All Filters
                  </Button>
                ) : (
                  <Button asChild>
                    <Link href="/jobs">
                      Browse All Jobs
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
