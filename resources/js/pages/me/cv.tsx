import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Plus, 
  X, 
  Save, 
  Download, 
  Share2, 
  Eye,
  FileText,
  GraduationCap,
  Briefcase,
  Star,
  Globe,
  Calendar,
  MapPin
} from 'lucide-react';

interface CvSection {
  id: string;
  type: 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'languages';
  title: string;
  content: any;
  order: number;
  isVisible: boolean;
}

export default function Cv() {
  const [cvSections, setCvSections] = useState<CvSection[]>([
    {
      id: '1',
      type: 'summary',
      title: 'Professional Summary',
      content: {
        text: 'Experienced full-stack developer with 5+ years building scalable web applications. Passionate about clean code, user experience, and continuous learning.'
      },
      order: 1,
      isVisible: true
    },
    {
      id: '2',
      type: 'experience',
      title: 'Work Experience',
      content: {
        items: [
          {
            title: 'Senior Software Developer',
            company: 'TechCorp Inc.',
            location: 'San Francisco, CA',
            startDate: '2022-01',
            endDate: 'Present',
            description: 'Led development of enterprise web applications using React, Node.js, and PostgreSQL.',
            achievements: [
              'Improved application performance by 40% through code optimization',
              'Mentored 3 junior developers and conducted code reviews',
              'Implemented CI/CD pipeline reducing deployment time by 60%'
            ]
          },
          {
            title: 'Full Stack Developer',
            company: 'StartupXYZ',
            location: 'New York, NY',
            startDate: '2020-03',
            endDate: '2021-12',
            description: 'Built and maintained multiple web applications for startup clients.',
            achievements: [
              'Developed 5 client projects from concept to deployment',
              'Collaborated with design team to implement responsive UI/UX',
              'Reduced bug reports by 30% through improved testing practices'
            ]
          }
        ]
      },
      order: 2,
      isVisible: true
    },
    {
      id: '3',
      type: 'education',
      title: 'Education',
      content: {
        items: [
          {
            degree: 'Bachelor of Science in Computer Science',
            institution: 'University of Technology',
            location: 'San Francisco, CA',
            startDate: '2016-09',
            endDate: '2020-05',
            gpa: '3.8/4.0',
            relevantCourses: ['Data Structures', 'Algorithms', 'Web Development', 'Database Systems']
          }
        ]
      },
      order: 3,
      isVisible: true
    },
    {
      id: '4',
      type: 'skills',
      title: 'Technical Skills',
      content: {
        categories: [
          {
            name: 'Frontend',
            skills: ['React', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS']
          },
          {
            name: 'Backend',
            skills: ['Node.js', 'Laravel', 'Python', 'Express.js']
          },
          {
            name: 'Database',
            skills: ['PostgreSQL', 'MongoDB', 'Redis', 'SQL']
          },
          {
            name: 'DevOps',
            skills: ['Docker', 'AWS', 'Git', 'CI/CD', 'Linux']
          }
        ]
      },
      order: 4,
      isVisible: true
    },
    {
      id: '5',
      type: 'projects',
      title: 'Projects',
      content: {
        items: [
          {
            name: 'E-commerce Platform',
            description: 'Full-stack e-commerce application with payment integration and admin dashboard.',
            technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
            url: 'https://github.com/johndoe/ecommerce',
            highlights: ['User authentication', 'Payment processing', 'Admin panel', 'Responsive design']
          },
          {
            name: 'Task Management App',
            description: 'Collaborative task management tool with real-time updates and team features.',
            technologies: ['React', 'Socket.io', 'MongoDB', 'Express'],
            url: 'https://github.com/johndoe/taskapp',
            highlights: ['Real-time collaboration', 'Team management', 'File sharing', 'Mobile responsive']
          }
        ]
      },
      order: 5,
      isVisible: true
    }
  ]);

  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [cvName, setCvName] = useState('My Professional CV');

  const addSection = (type: CvSection['type']) => {
    const newSection: CvSection = {
      id: Date.now().toString(),
      type,
      title: getDefaultTitle(type),
      content: getDefaultContent(type),
      order: cvSections.length + 1,
      isVisible: true
    };
    setCvSections(prev => [...prev, newSection]);
  };

  const getDefaultTitle = (type: CvSection['type']): string => {
    switch (type) {
      case 'summary': return 'Professional Summary';
      case 'experience': return 'Work Experience';
      case 'education': return 'Education';
      case 'skills': return 'Technical Skills';
      case 'projects': return 'Projects';
      case 'certifications': return 'Certifications';
      case 'languages': return 'Languages';
      default: return 'New Section';
    }
  };

  const getDefaultContent = (type: CvSection['type']): any => {
    switch (type) {
      case 'summary':
        return { text: 'Enter your professional summary here...' };
      case 'experience':
        return { items: [] };
      case 'education':
        return { items: [] };
      case 'skills':
        return { categories: [] };
      case 'projects':
        return { items: [] };
      case 'certifications':
        return { items: [] };
      case 'languages':
        return { items: [] };
      default:
        return {};
    }
  };

  const removeSection = (id: string) => {
    setCvSections(prev => prev.filter(section => section.id !== id));
  };

  const toggleSectionVisibility = (id: string) => {
    setCvSections(prev => prev.map(section => 
      section.id === id ? { ...section, isVisible: !section.isVisible } : section
    ));
  };

  const moveSection = (id: string, direction: 'up' | 'down') => {
    setCvSections(prev => {
      const currentIndex = prev.findIndex(section => section.id === id);
      if (currentIndex === -1) return prev;
      
      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      
      const newSections = [...prev];
      [newSections[currentIndex], newSections[newIndex]] = [newSections[newIndex], newSections[currentIndex]];
      
      return newSections.map((section, index) => ({ ...section, order: index + 1 }));
    });
  };

  const handleSave = () => {
    // TODO: Save CV to API
    console.log('Saving CV:', { cvName, selectedTemplate, cvSections });
  };

  const handleDownload = () => {
    // TODO: Generate and download PDF
    console.log('Downloading CV as PDF...');
  };

  const handleShare = () => {
    // TODO: Generate share link
    console.log('Generating share link...');
  };

  return (
    <>
      <Head title="CV Builder - Unlock Portal Job" />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Dashboard
                  </Link>
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">CV Builder</h1>
                  <p className="text-gray-600">Create and customize your professional CV</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button variant="outline" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save CV
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar - CV Settings */}
            <div className="space-y-6">
              {/* CV Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>CV Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="cvName">CV Name</Label>
                    <Input
                      id="cvName"
                      value={cvName}
                      onChange={(e) => setCvName(e.target.value)}
                      placeholder="My Professional CV"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="template">Template</Label>
                    <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="modern">Modern</SelectItem>
                        <SelectItem value="classic">Classic</SelectItem>
                        <SelectItem value="compact">Compact</SelectItem>
                        <SelectItem value="creative">Creative</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Add Sections */}
              <Card>
                <CardHeader>
                  <CardTitle>Add Sections</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    { type: 'summary', label: 'Professional Summary', icon: FileText },
                    { type: 'experience', label: 'Work Experience', icon: Briefcase },
                    { type: 'education', label: 'Education', icon: GraduationCap },
                    { type: 'skills', label: 'Technical Skills', icon: Star },
                    { type: 'projects', label: 'Projects', icon: FileText },
                    { type: 'certifications', label: 'Certifications', icon: Star },
                    { type: 'languages', label: 'Languages', icon: Globe }
                  ].map(({ type, label, icon: Icon }) => (
                    <Button
                      key={type}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => addSection(type as CvSection['type'])}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {label}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {/* Section Management */}
              <Card>
                <CardHeader>
                  <CardTitle>Section Order</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {cvSections.map((section) => (
                    <div key={section.id} className="flex items-center gap-2 p-2 border rounded">
                      <div className="flex-1 text-sm">{section.title}</div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveSection(section.id, 'up')}
                          disabled={section.order === 1}
                          className="h-6 w-6 p-0"
                        >
                          ↑
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveSection(section.id, 'down')}
                          disabled={section.order === cvSections.length}
                          className="h-6 w-6 p-0"
                        >
                          ↓
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleSectionVisibility(section.id)}
                          className="h-6 w-6 p-0"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSection(section.id)}
                          className="h-6 w-6 p-0 text-red-600"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Main Content - CV Preview */}
            <div className="lg:col-span-3">
              <Card className="min-h-[800px]">
                <CardHeader className="text-center border-b">
                  <h2 className="text-2xl font-bold">{cvName}</h2>
                  <p className="text-gray-600">Template: {selectedTemplate}</p>
                </CardHeader>
                <CardContent className="p-8">
                  {cvSections
                    .filter(section => section.isVisible)
                    .sort((a, b) => a.order - b.order)
                    .map((section) => (
                      <div key={section.id} className="mb-8 last:mb-0">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
                          {section.title}
                        </h3>
                        
                        {section.type === 'summary' && (
                          <p className="text-gray-700 leading-relaxed">
                            {section.content.text}
                          </p>
                        )}
                        
                        {section.type === 'experience' && (
                          <div className="space-y-4">
                            {section.content.items.map((item: any, index: number) => (
                              <div key={index} className="border-l-4 border-blue-500 pl-4">
                                <div className="flex items-start justify-between mb-2">
                                  <h4 className="font-semibold text-gray-800">{item.title}</h4>
                                  <span className="text-sm text-gray-500">
                                    {item.startDate} - {item.endDate}
                                  </span>
                                </div>
                                <p className="font-medium text-gray-700 mb-1">{item.company}</p>
                                <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {item.location}
                                </p>
                                <p className="text-gray-700 mb-2">{item.description}</p>
                                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                  {item.achievements.map((achievement: string, i: number) => (
                                    <li key={i}>{achievement}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {section.type === 'education' && (
                          <div className="space-y-4">
                            {section.content.items.map((item: any, index: number) => (
                              <div key={index} className="border-l-4 border-green-500 pl-4">
                                <div className="flex items-start justify-between mb-2">
                                  <h4 className="font-semibold text-gray-800">{item.degree}</h4>
                                  <span className="text-sm text-gray-500">
                                    {item.startDate} - {item.endDate}
                                  </span>
                                </div>
                                <p className="font-medium text-gray-700 mb-1">{item.institution}</p>
                                <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {item.location}
                                </p>
                                <p className="text-sm text-gray-600 mb-2">GPA: {item.gpa}</p>
                                <div className="text-sm text-gray-600">
                                  <p className="font-medium mb-1">Relevant Courses:</p>
                                  <div className="flex flex-wrap gap-1">
                                    {item.relevantCourses.map((course: string, i: number) => (
                                      <Badge key={i} variant="outline" className="text-xs">
                                        {course}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {section.type === 'skills' && (
                          <div className="space-y-4">
                            {section.content.categories.map((category: any, index: number) => (
                              <div key={index}>
                                <h4 className="font-medium text-gray-800 mb-2">{category.name}</h4>
                                <div className="flex flex-wrap gap-2">
                                  {category.skills.map((skill: string, i: number) => (
                                    <Badge key={i} variant="secondary">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {section.type === 'projects' && (
                          <div className="space-y-4">
                            {section.content.items.map((item: any, index: number) => (
                              <div key={index} className="border-l-4 border-purple-500 pl-4">
                                <div className="flex items-start justify-between mb-2">
                                  <h4 className="font-semibold text-gray-800">{item.name}</h4>
                                  {item.url && (
                                    <a 
                                      href={item.url} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:underline text-sm"
                                    >
                                      View Project →
                                    </a>
                                  )}
                                </div>
                                <p className="text-gray-700 mb-2">{item.description}</p>
                                <div className="flex flex-wrap gap-1 mb-2">
                                  {item.technologies.map((tech: string, i: number) => (
                                    <Badge key={i} variant="outline" className="text-xs">
                                      {tech}
                                    </Badge>
                                  ))}
                                </div>
                                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                  {item.highlights.map((highlight: string, i: number) => (
                                    <li key={i}>{highlight}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
