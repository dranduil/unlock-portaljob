import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft,
  Plus,
  X,
  Save,
  Eye,
  Calendar,
  MapPin,
  DollarSign,
  Users,
  Clock,
  Building2
} from 'lucide-react';

export default function CreateJob() {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    description: '',
    requirements: '',
    benefits: '',
    employment_type: '',
    seniority: '',
    location_mode: '',
    country: '',
    city: '',
    state: '',
    salary_min: '',
    salary_max: '',
    currency: 'USD',
    tags: [] as string[],
    category_ids: [] as number[],
    expires_at: '',
    is_remote_friendly: false,
    requires_relocation: false,
    visa_sponsorship: false
  });

  const [newTag, setNewTag] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const employmentTypes = [
    { value: 'full-time', label: 'Full Time' },
    { value: 'part-time', label: 'Part Time' },
    { value: 'contract', label: 'Contract' },
    { value: 'internship', label: 'Internship' },
    { value: 'freelance', label: 'Freelance' },
  ];

  const seniorityLevels = [
    { value: 'entry', label: 'Entry Level' },
    { value: 'junior', label: 'Junior' },
    { value: 'mid', label: 'Mid Level' },
    { value: 'senior', label: 'Senior' },
    { value: 'lead', label: 'Lead' },
    { value: 'executive', label: 'Executive' },
  ];

  const locationModes = [
    { value: 'onsite', label: 'On-site' },
    { value: 'hybrid', label: 'Hybrid' },
    { value: 'remote', label: 'Remote' },
  ];

  const currencies = [
    { value: 'USD', label: 'USD ($)' },
    { value: 'EUR', label: 'EUR (€)' },
    { value: 'GBP', label: 'GBP (£)' },
    { value: 'CAD', label: 'CAD (C$)' },
    { value: 'AUD', label: 'AUD (A$)' },
  ];

  const categories = [
    { id: 1, name: 'Software Development', icon: '💻' },
    { id: 2, name: 'Data Science', icon: '📊' },
    { id: 3, name: 'Design', icon: '🎨' },
    { id: 4, name: 'Marketing', icon: '📈' },
    { id: 5, name: 'Sales', icon: '💰' },
    { id: 6, name: 'Product Management', icon: '📋' },
  ];

  const handleAddTag = () => {
    if (newTag.trim() && !data.tags.includes(newTag.trim())) {
      setData('tags', [...data.tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setData('tags', data.tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/recruiter/jobs', {
      onSuccess: () => {
        // Redirect to jobs list or show success message
      },
    });
  };

  const handlePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <>
      <Head title="Create New Job - Unlock Portal Job" />
      
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
                  <h1 className="text-2xl font-bold text-gray-900">Create New Job</h1>
                  <p className="text-gray-600">Post a new job opening for your company</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={handlePreview}>
                  <Eye className="h-4 w-4 mr-2" />
                  {showPreview ? 'Hide Preview' : 'Preview'}
                </Button>
                <Button type="submit" form="job-form" disabled={processing}>
                  <Save className="h-4 w-4 mr-2" />
                  {processing ? 'Saving...' : 'Save as Draft'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Form */}
            <div className="lg:col-span-2">
              <form id="job-form" onSubmit={handleSubmit} className="space-y-6">
                
                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title">Job Title *</Label>
                      <Input
                        id="title"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        placeholder="e.g., Senior React Developer"
                        className="mt-1"
                      />
                      {errors.title && (
                        <p className="text-sm text-red-600 mt-1">{errors.title}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="employment_type">Employment Type *</Label>
                        <Select value={data.employment_type} onValueChange={(value) => setData('employment_type', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            {employmentTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.employment_type && (
                          <p className="text-sm text-red-600 mt-1">{errors.employment_type}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="seniority">Seniority Level *</Label>
                        <Select value={data.seniority} onValueChange={(value) => setData('seniority', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            {seniorityLevels.map((level) => (
                              <SelectItem key={level.value} value={level.value}>
                                {level.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.seniority && (
                          <p className="text-sm text-red-600 mt-1">{errors.seniority}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">Job Description *</Label>
                      <Textarea
                        id="description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        placeholder="Describe the role, responsibilities, and what you're looking for..."
                        className="mt-1 min-h-[120px]"
                      />
                      {errors.description && (
                        <p className="text-sm text-red-600 mt-1">{errors.description}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Location & Work Setup */}
                <Card>
                  <CardHeader>
                    <CardTitle>Location & Work Setup</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="location_mode">Work Location Mode *</Label>
                      <Select value={data.location_mode} onValueChange={(value) => setData('location_mode', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select location mode" />
                        </SelectTrigger>
                        <SelectContent>
                          {locationModes.map((mode) => (
                            <SelectItem key={mode.value} value={mode.value}>
                              {mode.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.location_mode && (
                        <p className="text-sm text-red-600 mt-1">{errors.location_mode}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={data.city}
                          onChange={(e) => setData('city', e.target.value)}
                          placeholder="e.g., San Francisco"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State/Province</Label>
                        <Input
                          id="state"
                          value={data.state}
                          onChange={(e) => setData('state', e.target.value)}
                          placeholder="e.g., California"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          value={data.country}
                          onChange={(e) => setData('country', e.target.value)}
                          placeholder="e.g., United States"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="is_remote_friendly"
                          checked={data.is_remote_friendly}
                          onCheckedChange={(checked) => setData('is_remote_friendly', checked as boolean)}
                        />
                        <Label htmlFor="is_remote_friendly">Remote work is possible</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="requires_relocation"
                          checked={data.requires_relocation}
                          onCheckedChange={(checked) => setData('requires_relocation', checked as boolean)}
                        />
                        <Label htmlFor="requires_relocation">Relocation assistance available</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="visa_sponsorship"
                          checked={data.visa_sponsorship}
                          onCheckedChange={(checked) => setData('visa_sponsorship', checked as boolean)}
                        />
                        <Label htmlFor="visa_sponsorship">Visa sponsorship available</Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Salary & Benefits */}
                <Card>
                  <CardHeader>
                    <CardTitle>Salary & Benefits</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="salary_min">Minimum Salary</Label>
                        <Input
                          id="salary_min"
                          type="number"
                          value={data.salary_min}
                          onChange={(e) => setData('salary_min', e.target.value)}
                          placeholder="e.g., 80000"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="salary_max">Maximum Salary</Label>
                        <Input
                          id="salary_max"
                          type="number"
                          value={data.salary_max}
                          onChange={(e) => setData('salary_max', e.target.value)}
                          placeholder="e.g., 120000"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="currency">Currency</Label>
                        <Select value={data.currency} onValueChange={(value) => setData('currency', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {currencies.map((currency) => (
                              <SelectItem key={currency.value} value={currency.value}>
                                {currency.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="benefits">Benefits & Perks</Label>
                      <Textarea
                        id="benefits"
                        value={data.benefits}
                        onChange={(e) => setData('benefits', e.target.value)}
                        placeholder="List the benefits and perks offered with this position..."
                        className="mt-1 min-h-[100px]"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Requirements & Skills */}
                <Card>
                  <CardHeader>
                    <CardTitle>Requirements & Skills</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="requirements">Requirements</Label>
                      <Textarea
                        id="requirements"
                        value={data.requirements}
                        onChange={(e) => setData('requirements', e.target.value)}
                        placeholder="List the required skills, experience, and qualifications..."
                        className="mt-1 min-h-[100px]"
                      />
                    </div>

                    <div>
                      <Label>Skills & Tags</Label>
                      <div className="mt-1 space-y-3">
                        <div className="flex gap-2">
                          <Input
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            placeholder="Add a skill or tag"
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                          />
                          <Button type="button" variant="outline" onClick={handleAddTag}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        {data.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {data.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                {tag}
                                <button
                                  type="button"
                                  onClick={() => handleRemoveTag(tag)}
                                  className="ml-1 hover:text-red-600"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label>Job Categories</Label>
                      <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-3">
                        {categories.map((category) => (
                          <div key={category.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`category-${category.id}`}
                              checked={data.category_ids.includes(category.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setData('category_ids', [...data.category_ids, category.id]);
                                } else {
                                  setData('category_ids', data.category_ids.filter(id => id !== category.id));
                                }
                              }}
                            />
                            <Label htmlFor={`category-${category.id}`} className="text-sm cursor-pointer">
                              {category.icon} {category.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Additional Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="expires_at">Job Expiry Date</Label>
                      <Input
                        id="expires_at"
                        type="date"
                        value={data.expires_at}
                        onChange={(e) => setData('expires_at', e.target.value)}
                        className="mt-1"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Leave empty if the job should not expire
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </form>
            </div>

            {/* Preview Sidebar */}
            {showPreview && (
              <div className="lg:col-span-1">
                <Card className="sticky top-8">
                  <CardHeader>
                    <CardTitle>Job Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg">{data.title || 'Job Title'}</h3>
                        <p className="text-gray-600">Company Name</p>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>{data.employment_type || 'Employment Type'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span>{data.seniority || 'Seniority Level'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span>{data.location_mode || 'Location Mode'}</span>
                        </div>
                        {data.salary_min && data.salary_max && (
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-gray-500" />
                            <span>{data.salary_min} - {data.salary_max} {data.currency}</span>
                          </div>
                        )}
                      </div>

                      {data.tags.length > 0 && (
                        <div>
                          <Label className="text-sm font-medium">Skills & Tags</Label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {data.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <Separator />

                      <div className="space-y-2">
                        <Button type="submit" form="job-form" className="w-full" disabled={processing}>
                          <Save className="h-4 w-4 mr-2" />
                          {processing ? 'Saving...' : 'Save as Draft'}
                        </Button>
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="/recruiter/dashboard">Cancel</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
