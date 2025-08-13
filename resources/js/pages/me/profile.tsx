import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  X, 
  MapPin, 
  Globe, 
  Users, 
  Star,
  Building2,
  Mail,
  Phone
} from 'lucide-react';

export default function Profile() {
  const [profile, setProfile] = useState({
    headline: 'Senior Software Developer',
    summary: 'Experienced full-stack developer with 5+ years building scalable web applications. Passionate about clean code, user experience, and continuous learning.',
    location: 'San Francisco, CA',
    country: 'United States',
    city: 'San Francisco',
    skills: ['React', 'TypeScript', 'Node.js', 'Laravel', 'PostgreSQL', 'AWS'],
    languages: ['English', 'Spanish'],
    workPreferences: {
      remote: true,
      relocation: false,
      visa: false,
      salary: '120000-180000',
      currency: 'USD'
    },
    visibility: 'public',
    linkedinUrl: 'https://linkedin.com/in/johndoe',
    githubUrl: 'https://github.com/johndoe',
    portfolioUrl: 'https://johndoe.dev'
  });

  const [newSkill, setNewSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState('');

  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const addLanguage = () => {
    if (newLanguage.trim() && !profile.languages.includes(newLanguage.trim())) {
      setProfile(prev => ({
        ...prev,
        languages: [...prev.languages, newLanguage.trim()]
      }));
      setNewLanguage('');
    }
  };

  const removeLanguage = (languageToRemove: string) => {
    setProfile(prev => ({
      ...prev,
      languages: prev.languages.filter(language => language !== languageToRemove)
    }));
  };

  const handleSave = () => {
    // TODO: Save profile to API
    console.log('Saving profile:', profile);
  };

  return (
    <>
      <Head title="My Profile - Unlock Portal Job" />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                <p className="text-gray-600">Manage your professional profile and preferences</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="headline">Professional Headline</Label>
                      <Input
                        id="headline"
                        value={profile.headline}
                        onChange={(e) => setProfile(prev => ({ ...prev, headline: e.target.value }))}
                        placeholder="e.g., Senior Software Developer"
                      />
                    </div>
                    <div>
                      <Label htmlFor="visibility">Profile Visibility</Label>
                      <Select value={profile.visibility} onValueChange={(value) => setProfile(prev => ({ ...prev, visibility: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="link-only">Link Only</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="summary">Professional Summary</Label>
                    <Textarea
                      id="summary"
                      value={profile.summary}
                      onChange={(e) => setProfile(prev => ({ ...prev, summary: e.target.value }))}
                      placeholder="Tell employers about your experience, skills, and what you're looking for..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Location & Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Location & Work Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={profile.city}
                        onChange={(e) => setProfile(prev => ({ ...prev, city: e.target.value }))}
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={profile.country}
                        onChange={(e) => setProfile(prev => ({ ...prev, country: e.target.value }))}
                        placeholder="Country"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Full Location</Label>
                      <Input
                        id="location"
                        value={profile.location}
                        onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="City, State, Country"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="salary">Salary Range</Label>
                      <Input
                        id="salary"
                        value={profile.workPreferences.salary}
                        onChange={(e) => setProfile(prev => ({ 
                          ...prev, 
                          workPreferences: { ...prev.workPreferences, salary: e.target.value }
                        }))}
                        placeholder="e.g., 120000-180000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="currency">Currency</Label>
                      <Select 
                        value={profile.workPreferences.currency} 
                        onValueChange={(value) => setProfile(prev => ({ 
                          ...prev, 
                          workPreferences: { ...prev.workPreferences, currency: value }
                        }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                          <SelectItem value="GBP">GBP (£)</SelectItem>
                          <SelectItem value="CAD">CAD (C$)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Skills
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a skill"
                      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    />
                    <Button onClick={addSkill} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        <button
                          onClick={() => removeSkill(skill)}
                          className="ml-1 hover:text-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Languages */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Languages
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={newLanguage}
                      onChange={(e) => setNewLanguage(e.target.value)}
                      placeholder="Add a language"
                      onKeyPress={(e) => e.key === 'Enter' && addLanguage()}
                    />
                    <Button onClick={addLanguage} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {profile.languages.map((language, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        {language}
                        <button
                          onClick={() => removeLanguage(language)}
                          className="ml-1 hover:text-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Social Links
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="linkedin">LinkedIn URL</Label>
                      <Input
                        id="linkedin"
                        value={profile.linkedinUrl}
                        onChange={(e) => setProfile(prev => ({ ...prev, linkedinUrl: e.target.value }))}
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                    <div>
                      <Label htmlFor="github">GitHub URL</Label>
                      <Input
                        id="github"
                        value={profile.githubUrl}
                        onChange={(e) => setProfile(prev => ({ ...prev, githubUrl: e.target.value }))}
                        placeholder="https://github.com/username"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="portfolio">Portfolio URL</Label>
                    <Input
                      id="portfolio"
                      value={profile.portfolioUrl}
                      onChange={(e) => setProfile(prev => ({ ...prev, portfolioUrl: e.target.value }))}
                      placeholder="https://yourportfolio.com"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Profile Preview */}
              <Card>
                <CardHeader>
                  <CardTitle>Profile Preview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <Avatar className="h-20 w-20 mx-auto mb-3">
                      <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
                        JD
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg">{profile.headline}</h3>
                    <p className="text-gray-600 text-sm">{profile.location}</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm text-gray-700 mb-2">Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        {profile.skills.slice(0, 6).map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {profile.skills.length > 6 && (
                          <Badge variant="outline" className="text-xs">
                            +{profile.skills.length - 6} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm text-gray-700 mb-2">Languages</h4>
                      <div className="flex flex-wrap gap-1">
                        {profile.languages.map((language, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" asChild>
                    <Link href="/me/cv">
                      <Building2 className="h-4 w-4 mr-2" />
                      Build CV
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <Link href="/me/matches">
                      <Star className="h-4 w-4 mr-2" />
                      View Job Matches
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <Link href="/me/applications">
                      <Mail className="h-4 w-4 mr-2" />
                      My Applications
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <Button onClick={handleSave} size="lg">
              <Save className="h-4 w-4 mr-2" />
              Save Profile
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
