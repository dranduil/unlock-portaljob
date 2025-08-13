import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { 
  BookOpen, 
  Folder, 
  LayoutGrid, 
  Briefcase, 
  Building2, 
  Users, 
  FileText, 
  Bookmark, 
  TrendingUp,
  Settings,
  BarChart3
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Browse Jobs',
        href: '/jobs',
        icon: Briefcase,
    },
    {
        title: 'Companies',
        href: '/companies',
        icon: Building2,
    },
    {
        title: 'My Profile',
        href: '/me/profile',
        icon: Users,
    },
    {
        title: 'My CV',
        href: '/me/cv',
        icon: FileText,
    },
    {
        title: 'Saved Jobs',
        href: '/me/saved-jobs',
        icon: Bookmark,
    },
    {
        title: 'Job Matches',
        href: '/me/matches',
        icon: TrendingUp,
    },
    {
        title: 'My Applications',
        href: '/me/applications',
        icon: FileText,
    },
];

const recruiterNavItems: NavItem[] = [
    {
        title: 'Recruiter Dashboard',
        href: '/recruiter/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Post a Job',
        href: '/recruiter/jobs/create',
        icon: Briefcase,
    },
    {
        title: 'Manage Jobs',
        href: '/recruiter/jobs',
        icon: Briefcase,
    },
    {
        title: 'Applications',
        href: '/recruiter/applications',
        icon: FileText,
    },
    {
        title: 'Company Settings',
        href: '/recruiter/company',
        icon: Settings,
    },
];

const adminNavItems: NavItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'User Management',
        href: '/admin/users',
        icon: Users,
    },
    {
        title: 'Company Management',
        href: '/admin/companies',
        icon: Building2,
    },
    {
        title: 'Job Moderation',
        href: '/admin/jobs',
        icon: Briefcase,
    },
    {
        title: 'Reports & Analytics',
        href: '/admin/reports',
        icon: BarChart3,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Help & Support',
        href: '/help',
        icon: BookOpen,
    },
    {
        title: 'Privacy Policy',
        href: '/privacy',
        icon: Folder,
    },
];

export function AppSidebar() {
    // TODO: Get user role from auth context
    const userRole = 'candidate'; // This should come from auth context
    
    const getNavItems = () => {
        switch (userRole) {
            case 'recruiter':
                return [...mainNavItems, ...recruiterNavItems];
            case 'admin':
                return [...mainNavItems, ...adminNavItems];
            default:
                return mainNavItems;
        }
    };

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={getNavItems()} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
