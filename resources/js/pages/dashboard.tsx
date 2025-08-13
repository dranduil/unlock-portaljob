import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Briefcase, 
  Building2, 
  Users, 
  FileText, 
  Bookmark, 
  TrendingUp,
  MapPin,
  Clock,
  DollarSign,
  Star
} from 'lucide-react';
import { Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    // TODO: Get user data from props/auth
    const user = {
        name: 'John Doe',
        role: 'candidate', // candidate, recruiter, admin
        email: 'john@example.com'
    };

    const isCandidate = user.role === 'candidate';
    const isRecruiter = user.role === 'recruiter';
    const isAdmin = user.role === 'admin';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard - Unlock Portal Job" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 overflow-x-auto">
                
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Welcome back, {user.name}!
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Here's what's happening with your job search today
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Badge variant={isCandidate ? "default" : isRecruiter ? "secondary" : "destructive"}>
                            {isCandidate ? 'Candidate' : isRecruiter ? 'Recruiter' : 'Admin'}
                        </Badge>
                        <Button asChild>
                            <Link href="/jobs">
                                <Briefcase className="h-4 w-4 mr-2" />
                                Browse Jobs
                            </Link>
                        </Button>
                        {isRecruiter && (
                            <Button variant="outline" asChild>
                                <Link href="/recruiter/jobs/create">
                                    <Briefcase className="h-4 w-4 mr-2" />
                                    Post a Job
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">2,847</div>
                            <p className="text-xs text-muted-foreground">
                                +180 from last month
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Companies</CardTitle>
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">156</div>
                            <p className="text-xs text-muted-foreground">
                                +12 new this week
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Applications</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">24</div>
                            <p className="text-xs text-muted-foreground">
                                +4 this week
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Saved Jobs</CardTitle>
                            <Bookmark className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12</div>
                            <p className="text-xs text-muted-foreground">
                                +2 recently
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Role-based Content */}
                {isCandidate && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Recent Job Matches */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5" />
                                    Recent Job Matches
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                                        <div className="flex-1">
                                            <h4 className="font-medium">Senior React Developer</h4>
                                            <p className="text-sm text-gray-600">TechCorp Inc.</p>
                                            <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="h-3 w-3" />
                                                    Remote
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    Full-time
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <DollarSign className="h-3 w-3" />
                                                    $120k
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <Badge variant="secondary" className="mb-2">95% Match</Badge>
                                            <Button size="sm" asChild>
                                                <Link href="/jobs/senior-react-developer">View Job</Link>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                <Button variant="outline" className="w-full" asChild>
                                    <Link href="/me/matches">View All Matches</Link>
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button className="w-full justify-start" asChild>
                                    <Link href="/me/profile">
                                        <Users className="h-4 w-4 mr-2" />
                                        Update Profile
                                    </Link>
                                </Button>
                                <Button className="w-full justify-start" variant="outline" asChild>
                                    <Link href="/me/cv">
                                        <FileText className="h-4 w-4 mr-2" />
                                        Build CV
                                    </Link>
                                </Button>
                                <Button className="w-full justify-start" variant="outline" asChild>
                                    <Link href="/me/saved-jobs">
                                        <Bookmark className="h-4 w-4 mr-2" />
                                        Saved Jobs
                                    </Link>
                                </Button>
                                <Button className="w-full justify-start" variant="outline" asChild>
                                    <Link href="/me/applications">
                                        <FileText className="h-4 w-4 mr-2" />
                                        My Applications
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {isRecruiter && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Company Overview */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Building2 className="h-5 w-5" />
                                    Company Overview
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                    <div>
                                        <h4 className="font-medium">Active Job Postings</h4>
                                        <p className="text-sm text-gray-600">Currently published</p>
                                    </div>
                                    <Badge variant="default">8</Badge>
                                </div>
                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                    <div>
                                        <h4 className="font-medium">Total Applications</h4>
                                        <p className="text-sm text-gray-600">This month</p>
                                    </div>
                                    <Badge variant="secondary">156</Badge>
                                </div>
                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                    <div>
                                        <h4 className="font-medium">New Applications</h4>
                                        <p className="text-sm text-gray-600">Today</p>
                                    </div>
                                    <Badge variant="destructive">12</Badge>
                                </div>
                                <Button className="w-full" asChild>
                                    <Link href="/recruiter/jobs">Manage Jobs</Link>
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Recent Applications */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Applications</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                                        <div>
                                            <h4 className="font-medium">John Smith</h4>
                                            <p className="text-sm text-gray-600">Senior React Developer</p>
                                            <p className="text-xs text-gray-500">Applied 2 hours ago</p>
                                        </div>
                                        <div className="text-right">
                                            <Badge variant="outline" className="mb-2">New</Badge>
                                            <Button size="sm" asChild>
                                                <Link href="/recruiter/applications/1">Review</Link>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                <Button variant="outline" className="w-full" asChild>
                                    <Link href="/recruiter/applications">View All Applications</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {isAdmin && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Platform Stats */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Platform Statistics</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                    <div>
                                        <h4 className="font-medium">Total Users</h4>
                                        <p className="text-sm text-gray-600">Registered users</p>
                                    </div>
                                    <Badge variant="default">2,847</Badge>
                                </div>
                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                    <div>
                                        <h4 className="font-medium">Total Companies</h4>
                                        <p className="text-sm text-gray-600">Verified companies</p>
                                    </div>
                                    <Badge variant="secondary">156</Badge>
                                </div>
                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                    <div>
                                        <h4 className="font-medium">Pending Approvals</h4>
                                        <p className="text-sm text-gray-600">Require review</p>
                                    </div>
                                    <Badge variant="destructive">23</Badge>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Admin Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Admin Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button className="w-full justify-start" asChild>
                                    <Link href="/admin/companies">
                                        <Building2 className="h-4 w-4 mr-2" />
                                        Manage Companies
                                    </Link>
                                </Button>
                                <Button className="w-full justify-start" variant="outline" asChild>
                                    <Link href="/admin/jobs">
                                        <Briefcase className="h-4 w-4 mr-2" />
                                        Moderate Jobs
                                    </Link>
                                </Button>
                                <Button className="w-full justify-start" variant="outline" asChild>
                                    <Link href="/admin/users">
                                        <Users className="h-4 w-4 mr-2" />
                                        User Management
                                    </Link>
                                </Button>
                                <Button className="w-full justify-start" variant="outline" asChild>
                                    <Link href="/admin/reports">
                                        <FileText className="h-4 w-4 mr-2" />
                                        Reports & Analytics
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Recent Activity */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center gap-3 p-3 border rounded-lg">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <div className="flex-1">
                                        <p className="text-sm">
                                            {i === 1 && "New job posted: Senior React Developer at TechCorp"}
                                            {i === 2 && "Application submitted for Frontend Developer position"}
                                            {i === 3 && "Profile updated with new skills"}
                                            {i === 4 && "Job match found: 95% compatibility"}
                                            {i === 5 && "Company verification completed"}
                                        </p>
                                        <p className="text-xs text-gray-500">2 hours ago</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
