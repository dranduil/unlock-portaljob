import { Head, Link, usePage } from '@inertiajs/react';
import { Briefcase, Users, Building2, ShieldCheck, Rocket, Globe2, Search, FileText, Star } from 'lucide-react';

export default function Welcome() {
  const { auth, canRegister } = usePage().props as any;

  return (
    <>
      <Head title="Unlock Portal Job – International Job Portal">
        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Unlock Portal Job",
              "description": "International job portal with transparent listings, ATS-friendly CVs, and global opportunities",
              "url": window.location.origin,
              "potentialAction": {
                "@type": "SearchAction",
                "target": `${window.location.origin}/jobs?search={search_term_string}`,
                "query-input": "required name=search_term_string"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Unlock Portal Job",
                "url": window.location.origin,
                "logo": {
                  "@type": "ImageObject",
                  "url": `${window.location.origin}/logo.svg`,
                  "width": 512,
                  "height": 512
                }
              },
              "offers": {
                "@type": "Offer",
                "description": "Free job search and CV building services",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "1250"
              }
            })
          }}
        />
        
        {/* FAQ Schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How do I create an ATS-friendly CV?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our CV builder automatically formats your CV to pass through Applicant Tracking Systems with proper keywords and structure."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Are the salary ranges accurate?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, all salary information is verified and provided directly by employers to ensure transparency."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I apply to jobs internationally?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely! We offer job opportunities from companies worldwide, including remote positions."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is the platform free to use?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, job search and CV building services are completely free for job seekers."
                  }
                }
              ]
            })
          }}
        />
      </Head>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
                Find Your Dream Job
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Browse thousands of international opportunities with clear salary ranges, 
                location details, and company insights. Build ATS-friendly CVs and apply with confidence.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/jobs"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                <Search className="w-5 h-5 mr-2" />
                Browse Jobs
              </Link>
              {canRegister && (
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white hover:bg-gray-50 border-2 border-blue-600 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Join as Candidate
                </Link>
              )}
              <Link
                href={auth?.user ? '/recruiter/jobs/create' : '/register'}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white hover:bg-gray-50 border-2 border-blue-600 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                <Briefcase className="w-5 h-5 mr-2" />
                Post a Job
              </Link>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <span>ATS-Friendly CVs</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-blue-500" />
                <span>Global Opportunities</span>
              </div>
              <div className="flex items-center gap-2">
                <Rocket className="w-4 h-4 text-purple-500" />
                <span>Fast Application</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose Unlock Portal Job?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We're building the most transparent and respectful job platform for both candidates and recruiters.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Transparent Job Listings
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                See salary ranges, location details, and company information upfront. No hidden surprises.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                ATS-Optimized CV Builder
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Create professional CVs that pass through Applicant Tracking Systems with our smart builder.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building2 className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Company Insights
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Research companies, read reviews, and understand company culture before applying.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600 dark:bg-blue-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">10K+</div>
              <div className="text-blue-100">Active Jobs</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">500+</div>
              <div className="text-blue-100">Companies</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">50+</div>
              <div className="text-blue-100">Countries</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">95%</div>
              <div className="text-blue-100">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of professionals who have found their dream jobs through our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/jobs"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Star className="w-5 h-5 mr-2" />
              Explore Jobs Now
            </Link>
            {canRegister && (
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white hover:bg-gray-50 border-2 border-blue-600 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Create Free Account
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

// Landing page should not use the global sidebar layout
;(Welcome as any).layout = (page: React.ReactNode) => page;
