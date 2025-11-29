import { useState, useMemo } from "react";
import { 
  Search, ArrowLeft, Calendar, Clock, ArrowRight,
  AlertCircle, CheckCircle, MapPin, Shield, User, Scale, Info
} from "lucide-react";

const BLOG_DATA = [
  {
    id: "thailand-guide",
    title: "Thailand Cannabis Regulations 2025",
    subtitle: "A comprehensive legal framework for travelers and residents.",
    date: "November 15, 2024",
    readTime: "8 min read",
    author: "Sarah Jenkins, Esq.",
    category: "Legal Guide",
    introTitle: "Overview",
    introText: "Thailand's regulatory environment continues to evolve. The Cannabis Act has implemented new restrictions favoring medical applications over recreational use. This guide provides travelers with essential compliance information.",
    warningTitle: "Important Legal Notice",
    warningText: "Public consumption carries penalties up to 25,000 THB. Consumption is permitted only in designated areas or private residences.",
    sections: [
      {
        title: "Legal Status",
        icon: Shield,
        content: "Cannabis was delisted as a controlled substance in 2022, enabling legal sales and consumption. Current regulations require strict licensing for dispensaries and impose restrictions on recreational marketing.",
        status: "Regulated - Medical Preferred"
      },
      {
        title: "Age & Documentation Requirements",
        icon: User,
        content: "Purchasers must be 20 years or older and provide valid identification. Sales are prohibited to pregnant women and nursing mothers. Most establishments request passport verification.",
      },
      {
        title: "Possession Limits",
        icon: Scale,
        content: "Personal possession of flower is currently unrestricted. Processed products including edibles and extracts are limited to 0.2% THC content by weight.",
      },
      {
        title: "Consumption Guidelines",
        icon: MapPin,
        content: "Public spaces including streets, beaches, parks, and hotel balconies are prohibited. Designated smoking lounges and private residences are the legal consumption venues.",
      }
    ]
  },
  {
    id: "california-guide",
    title: "California Cannabis Legal Framework",
    subtitle: "Essential regulations and best practices for tourists and residents.",
    date: "October 22, 2024",
    readTime: "10 min read",
    author: "Elena Fisher",
    category: "Destinations",
    introTitle: "California's Regulatory Landscape",
    introText: "California operates the world's largest legal cannabis market. Understanding purchase limits, taxation, and transportation rules is essential for compliant consumption.",
    warningTitle: "Federal Jurisdiction Warning",
    warningText: "Possession within National Parks and on federal land remains illegal with substantial penalties. This includes Yosemite, Joshua Tree, and all federal protected areas.",
    sections: [
      {
        title: "Regional Consumption Venues",
        icon: MapPin,
        content: "Los Angeles and West Hollywood host numerous licensed consumption lounges. These facilities meet strict health and safety standards, offering garden environments and social spaces.",
        status: "Consumption Lounges Licensed"
      },
      {
        title: "Purchase Regulations",
        icon: Scale,
        content: "Adults 21 and older may purchase up to 1 ounce of flower or 8 grams of concentrate per day. Sales tax averages 30%. Most retailers accept debit and credit cards; cash is also widely accepted.",
      },
      {
        title: "Transportation Requirements",
        icon: Shield,
        content: "Consumption while operating or riding as a passenger is prohibited. All products must remain sealed in the vehicle trunk during transport. Opening packages during transit violates state law.",
      },
      {
        title: "Impaired Driving Standards",
        icon: AlertCircle,
        content: "DUI laws apply to cannabis consumption. Retain purchase receipts and maintain compliance with sealed packaging requirements throughout transportation.",
      }
    ]
  },
  {
    id: "europe-overview",
    title: "European Cannabis Legal Status",
    subtitle: "Comprehensive regulatory overview across major European destinations.",
    date: "September 10, 2024",
    readTime: "12 min read",
    author: "Hans Gruber",
    category: "Legal Update",
    introTitle: "European Regulatory Environment",
    introText: "Cannabis laws vary significantly across Europe. This guide outlines current regulations in major travel destinations and explains key compliance requirements.",
    warningTitle: "Regional Compliance Notice",
    warningText: "Laws differ substantially between countries and regions. Always verify current regulations for your specific destination before travel.",
    sections: [
      {
        title: "Legal Framework Overview",
        icon: Shield,
        content: "European nations employ diverse regulatory approaches ranging from decriminalization to full legalization. Some countries permit personal possession while others maintain complete prohibition.",
      },
      {
        title: "Possession Limits by Region",
        icon: Scale,
        content: "Permitted amounts range from 25-30 grams depending on jurisdiction. Research your specific destination's current regulations prior to travel.",
      },
      {
        title: "Public Consumption Restrictions",
        icon: MapPin,
        content: "Most European regions prohibit public smoking. Buffer zones around schools and youth facilities are typically enforced. Private accommodations are the recommended consumption venue.",
      },
      {
        title: "Cross-Border Transportation",
        icon: AlertCircle,
        content: "International transportation of cannabis is prohibited. Do not cross national borders with cannabis products regardless of legality in origin or destination countries.",
      }
    ]
  }
];

const BlogIndex = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = useMemo(() => 
    BLOG_DATA.filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase())
    ), 
  [searchTerm]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Cannabis Law & Travel</h1>
          <p className="text-lg text-slate-600">Expert legal guides and regulatory information</p>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search guides..."
            className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => onSelect(post)}
              className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
            >
              {/* Top Border */}
              <div className="h-1 bg-gradient-to-r from-blue-600 to-slate-400" />

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded text-xs font-semibold uppercase tracking-wider">
                    {post.category}
                  </span>
                  <span className="text-xs text-slate-500">{post.date}</span>
                </div>

                <h2 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors leading-tight">
                  {post.title}
                </h2>

                <p className="text-slate-600 text-sm mb-6 line-clamp-2 leading-relaxed">
                  {post.subtitle}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="text-xs text-slate-500">{post.readTime}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

const BlogPostDetail = ({ post, onBack }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </button>

          <div className="mb-6">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold uppercase tracking-wider inline-block">
              {post.category}
            </span>
          </div>

          <h1 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
            {post.subtitle}
          </p>
        </div>
      </div>

      {/* Meta */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-b border-slate-200">
        <div className="flex items-center gap-8 text-sm text-slate-600">
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {post.date}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {post.readTime}
          </span>
          <span>By <span className="font-semibold text-slate-900">{post.author}</span></span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Intro Card */}
        <div className="mb-16 bg-blue-50 border border-blue-200 rounded-lg p-8">
          <div className="flex items-start gap-4 mb-6">
            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">{post.introTitle}</h2>
              <p className="text-slate-700 leading-relaxed text-base">
                {post.introText}
              </p>
            </div>
          </div>

          {/* Warning Box */}
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded p-4 flex gap-4">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-amber-900 text-sm uppercase tracking-wide mb-1">
                {post.warningTitle}
              </div>
              <p className="text-sm text-amber-800 leading-relaxed">
                {post.warningText}
              </p>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-12 pb-20">
          {post.sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <section key={section.title}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900">
                    {section.title}
                  </h3>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-8">
                  <p className="text-slate-700 leading-relaxed text-base mb-6">
                    {section.content}
                  </p>

                  {section.status && (
                    <div className="inline-block">
                      <span className="px-4 py-2 bg-green-100 text-green-700 rounded text-sm font-semibold flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        {section.status}
                      </span>
                    </div>
                  )}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-50 border-t border-slate-200 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-600">
          <p>This guide is for informational purposes only and does not constitute legal advice.</p>
        </div>
      </div>
    </div>
  );
};

const Blog = () => {
  const [activePost, setActivePost] = useState(null);

  return (
    <>
      {activePost ? (
        <BlogPostDetail post={activePost} onBack={() => setActivePost(null)} />
      ) : (
        <BlogIndex onSelect={setActivePost} />
      )}
    </>
  );
};

export default Blog;
