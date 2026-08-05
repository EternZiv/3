import { Battery, Home, Building2, Factory } from "lucide-react";
import { Card } from "./ui/card";
import { motion } from "motion/react";

const categories = [
  {
    icon: Home,
    title: "Residential",
    description: "Complete home energy storage systems for energy independence",
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: Building2,
    title: "Commercial",
    description: "Scalable energy storage for businesses and offices",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Factory,
    title: "Industrial",
    description: "High-capacity solutions for industrial operations",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: Battery,
    title: "Portable",
    description: "Flexible battery modules for custom configurations",
    color: "bg-orange-100 text-orange-600",
  },
];

export function ProductCategories() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Energy Storage Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our comprehensive range of battery storage systems designed to meet your specific energy needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className="p-6 hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-emerald-200 h-full"
                >
                  <motion.div
                    className={`w-14 h-14 rounded-xl ${category.color} flex items-center justify-center mb-2`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon className="h-7 w-7" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {category.title}
                  </h3>
                  <p className="text-gray-600">
                    {category.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}