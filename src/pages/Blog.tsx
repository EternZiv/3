import { motion } from "motion/react";
import { Calendar, Clock, ArrowRight, Search } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Technology", "Industry News", "Tips & Guides", "Case Studies"];

  const blogPosts = [
    {
      id: 1,
      title: "The Future of Residential Energy Storage in Pakistan",
      excerpt: "Explore how energy storage systems are transforming homes across Pakistan and reducing electricity costs.",
      category: "Industry News",
      date: "March 15, 2026",
      readTime: "5 min read",
      featured: true
    },
    {
      id: 2,
      title: "How to Maximize Battery Life in Your Energy System",
      excerpt: "Essential tips and best practices to ensure your battery storage system lasts for years to come.",
      category: "Tips & Guides",
      date: "March 12, 2026",
      readTime: "4 min read",
      featured: false
    },
    {
      id: 3,
      title: "Understanding Solar Integration with Battery Storage",
      excerpt: "A comprehensive guide to combining solar panels with battery storage for maximum efficiency.",
      category: "Technology",
      date: "March 10, 2026",
      readTime: "7 min read",
      featured: false
    },
    {
      id: 4,
      title: "Commercial Energy Storage: ROI Analysis",
      excerpt: "Detailed breakdown of return on investment for businesses implementing energy storage solutions.",
      category: "Case Studies",
      date: "March 8, 2026",
      readTime: "6 min read",
      featured: false
    },
    {
      id: 5,
      title: "Power Backup Solutions for Load Shedding",
      excerpt: "How energy storage systems provide reliable backup during frequent power outages in Pakistan.",
      category: "Tips & Guides",
      date: "March 5, 2026",
      readTime: "3 min read",
      featured: false
    },
    {
      id: 6,
      title: "Latest Innovations in Lithium Battery Technology",
      excerpt: "Discover the cutting-edge advancements making lithium batteries safer and more efficient.",
      category: "Technology",
      date: "March 1, 2026",
      readTime: "8 min read",
      featured: false
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gray-50/50 pt-16 font-sans">
      {/* Hero Section: Premium Dark Tech Grid */}
      <section className="relative h-[550px] md:h-[650px] bg-black text-white overflow-hidden flex items-center border-b border-gray-900 select-none">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/85 via-gray-950/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent z-10" />

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px] z-10 opacity-60 pointer-events-none" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full mb-6 backdrop-blur-md text-xs font-bold uppercase tracking-wider"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Insights & Engineering Guides
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-extrabold mb-6 text-white text-[40px] sm:text-[52px] md:text-[68px] leading-[1.12] tracking-tight font-sans max-w-3xl mx-auto"
          >
            Power2Go Engineering Blog
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-400 font-semibold max-w-2xl mx-auto"
          >
            Technical insights, industry updates, and engineering guides on energy storage technology.
          </motion.p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 focus:border-emerald-500 px-4 rounded-xl focus:outline-none transition-colors text-sm"
              />
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-emerald-600 hover:bg-emerald-700 text-white font-bold" : "border-gray-200 text-gray-600 hover:bg-gray-50"}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && selectedCategory === "All" && !searchTerm && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-white border border-gray-200/50 rounded-3xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 text-left">
                  <div className="h-64 lg:h-auto bg-gray-50 flex items-center justify-center border-r border-gray-100">
                    <div className="text-6xl select-none">🔋</div>
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <Badge className="w-fit mb-4 bg-emerald-600 text-white font-bold">Featured</Badge>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 font-sans tracking-tight leading-tight">
                      {featuredPost.title}
                    </h2>
                    <p className="text-gray-500 mb-6 text-sm sm:text-base leading-relaxed font-semibold">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-400 font-semibold mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{featuredPost.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                    <Link to={`/blog`} className="w-fit">
                      <Button className="w-fit bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold">
                        Read Article
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden h-full hover:shadow-lg transition-all duration-300 group cursor-pointer bg-white border border-gray-200/50 rounded-3xl text-left">
                  <div className="h-48 bg-gray-50 flex items-center justify-center border-b border-gray-100">
                    <div className="text-5xl select-none">⚡</div>
                  </div>
                  <div className="p-6 flex flex-col h-[calc(100%-192px)] justify-between">
                    <div>
                      <Badge className="mb-3 bg-emerald-50 text-emerald-700 font-bold">
                        {post.category}
                      </Badge>
                      <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors font-sans tracking-tight leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 leading-normal font-semibold mb-4">
                        {post.excerpt}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-4 text-xs text-gray-400 font-semibold mb-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <Button variant="ghost" className="p-0 h-auto text-emerald-600 hover:text-emerald-700 font-bold text-xs">
                        Read Article
                        <ArrowRight className="ml-1 h-3.5 w-3.5 shrink-0" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#08080a] rounded-3xl p-10 md:p-12 text-center text-white relative overflow-hidden select-none border border-gray-900"
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.012)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-60" />
            
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 font-sans tracking-tight">
              Stay Updated with Power2Go
            </h2>
            <p className="text-sm sm:text-base text-gray-400 mb-8 max-w-2xl mx-auto font-semibold leading-relaxed">
              Get the latest insights on battery engineering and clean-energy trends sent directly to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter corporate email"
                required
                className="flex-1 bg-gray-900 border border-gray-800 focus:border-emerald-500/80 px-4 py-2.5 rounded-2xl text-xs text-white placeholder-gray-600 focus:outline-none transition-colors"
              />
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-5.5 rounded-2xl text-xs tracking-wider" type="submit">
                Subscribe
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
