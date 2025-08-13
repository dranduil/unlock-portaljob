# Unlock Portal Job - International Job Portal

A reliable, international job portal that matches candidates and roles with dignity and clarity—simple to use, easy to manage, and future-proof.

## 🚀 Features

### Core Outcomes (MVP)
- **Job Browsing**: Fast filters and pagination for job discovery
- **CV Management**: ATS-friendly CV creation with trackable share links
- **Candidate Profiles**: Comprehensive profiles with matching preferences
- **HR/Recruiter Onboarding**: Company association and job posting tools
- **Applications Inbox**: HR tools with filters and bulk actions
- **Multi-tenant Posting**: Multiple HRs can post under the same company

### User Roles & Permissions
- **Guest**: View jobs, filters, read companies, start registration
- **Candidate**: Profile management, CV builder, saved jobs, applications
- **Recruiter/HR**: Manage company profiles, create/edit jobs, review applicants
- **Company Owner/Admin**: Approve HR members, set company details
- **Platform Admin**: Global moderation, categories, abuse control

## 🛠️ Tech Stack

### Backend
- **Laravel 12** - PHP framework
- **PHP 8.2+** - Modern PHP features
- **MySQL** - Database (configurable)
- **Eloquent ORM** - Database abstraction
- **Laravel Sanctum** - API authentication
- **Laravel Horizon** - Queue management

### Frontend
- **React 19** - Modern React with hooks
- **Inertia.js** - Seamless Laravel + React integration
- **TypeScript** - Type safety
- **TailwindCSS 4** - Utility-first CSS
- **Shadcn/ui** - Beautiful component library
- **Lucide React** - Icon library
- **Vite** - Fast build tool

### Development Tools
- **Composer** - PHP dependency management
- **npm/yarn** - Node.js package management
- **ESLint + Prettier** - Code quality
- **PHP Artisan** - Laravel CLI tools

## 📁 Project Structure

```
unlock-portaljob/
├── app/
│   ├── Http/Controllers/Api/V1/    # API controllers
│   ├── Models/                     # Eloquent models
│   └── Providers/                  # Service providers
├── database/
│   ├── migrations/                 # Database migrations
│   ├── seeders/                    # Data seeders
│   └── factories/                  # Model factories
├── resources/
│   └── js/
│       ├── components/             # Reusable React components
│       ├── pages/                  # Page components
│       ├── layouts/                # Layout components
│       └── types/                  # TypeScript type definitions
├── routes/
│   ├── api.php                     # API routes
│   └── web.php                     # Web routes
└── storage/                        # File storage
```

## 🗄️ Database Schema

### Core Tables
- **users** - User accounts with roles (candidate, recruiter, admin)
- **profiles** - Candidate profiles with skills and preferences
- **companies** - Company information and verification
- **company_members** - Company membership and roles
- **job_postings** - Job listings with detailed information
- **applications** - Job applications and status tracking
- **cv_documents** - CV files and sharing
- **cv_sections** - CV content sections
- **categories** - Job categories and organization
- **job_matches** - AI-powered job matching results

### Key Features
- **JSON columns** for flexible data storage (skills, locations, settings)
- **Proper indexing** for performance
- **Foreign key constraints** for data integrity
- **Timestamps** for audit trails

## 🔌 API Endpoints

### Public Routes
- `GET /api/v1/jobs` - Job listings with filters
- `GET /api/v1/jobs/{slug}` - Individual job details
- `GET /api/v1/companies/{slug}` - Company information
- `GET /api/v1/categories` - Job categories

### Protected Routes
- **Profile & CV**: `/me/profile`, `/me/cv`
- **Applications**: `/jobs/{id}/apply`, `/me/applications`
- **Recruiter**: `/companies`, `/companies/{id}/jobs`
- **Admin**: `/admin/*` endpoints

## 🎨 Frontend Components

### Job Portal Components
- **JobCard** - Individual job display
- **JobSearch** - Search functionality with debouncing
- **JobFilters** - Advanced filtering options
- **JobDetail** - Comprehensive job view

### Dashboard Components
- **CandidateDashboard** - Personal job search dashboard
- **RecruiterDashboard** - HR recruitment dashboard
- **AdminDashboard** - Platform administration

### Shared Components
- **AppLayout** - Main application layout
- **Navigation** - Role-based navigation
- **UI Components** - Shadcn/ui components

## 🚀 Getting Started

### Prerequisites
- PHP 8.2+
- Composer
- Node.js 18+
- MySQL 8.0+
- Laravel 12

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd unlock-portaljob
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install Node.js dependencies**
   ```bash
   npm install
   ```

4. **Environment setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Database setup**
   ```bash
   php artisan migrate
   php artisan db:seed
   ```

6. **Build frontend**
   ```bash
   npm run build
   ```

7. **Start development server**
   ```bash
   php artisan serve
   npm run dev
   ```

### Database Configuration

Update your `.env` file with database credentials:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=unlock_portaljob
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

## 🔧 Development

### Running Tests
```bash
php artisan test
```

### Code Quality
```bash
# PHP
./vendor/bin/phpstan analyse
./vendor/bin/phpcs

# JavaScript/TypeScript
npm run lint
npm run type-check
```

### Database Migrations
```bash
php artisan make:migration create_new_table
php artisan migrate
php artisan migrate:rollback
```

## 📊 Job Matching Algorithm

### V1 Heuristic Scoring
- **Location Fit**: 0-25 points
- **Skills Overlap**: 0-40 points
- **Seniority Fit**: 0-15 points
- **Salary Overlap**: 0-10 points
- **Language Requirements**: 0-10 points

### Future ML Integration
- Feature flags for ML embedding upgrades
- A/B testing framework
- Performance monitoring and optimization

## 🔒 Security Features

- **Role-based access control** at repository level
- **Signed URLs** for CV downloads
- **Rate limiting** on API endpoints
- **Audit logging** for all actions
- **Data encryption** for sensitive information

## 🌍 Internationalization

- **English first** approach
- **Locale structure** for future languages
- **ISO codes** for countries, cities, currencies
- **Timezone handling** for global operations

## 📈 Performance & Scalability

- **Target**: <250ms p95 response time
- **Caching**: Redis for job listings and user data
- **Queues**: Laravel Horizon for background jobs
- **Search**: Meilisearch/Algolia integration
- **CDN**: Asset delivery optimization

## 🚀 Deployment

### Production Checklist
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Frontend assets built
- [ ] Queue workers configured
- [ ] Monitoring and logging setup
- [ ] SSL certificates installed
- [ ] Backup strategy implemented

### Recommended Hosting
- **VPS**: DigitalOcean, Linode, Vultr
- **Cloud**: AWS, Google Cloud, Azure
- **PaaS**: Laravel Forge, Heroku, Platform.sh

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Standards
- Follow PSR-12 for PHP
- Use TypeScript for frontend
- Write meaningful commit messages
- Include tests for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [Wiki/README]
- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
- **Email**: [support@example.com]

## 🗺️ Roadmap

### Phase 1 (Current)
- [x] Basic job portal functionality
- [x] User authentication and roles
- [x] Job posting and application system
- [x] Basic matching algorithm

### Phase 2 (Next)
- [ ] Advanced job matching with ML
- [ ] Video interviewing integration
- [ ] Mobile app development
- [ ] Advanced analytics dashboard

### Phase 3 (Future)
- [ ] AI-powered candidate recommendations
- [ ] Blockchain-based credential verification
- [ ] Multi-language support
- [ ] Enterprise features

---

**Built with ❤️ using Laravel and React**
