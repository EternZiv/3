import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#08080a] pt-16 flex items-center justify-center font-sans">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(259,115,22,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(259,115,22,0.012)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-60" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center select-none">
        <div className="text-[120px] md:text-[160px] font-extrabold text-emerald-500 leading-none tracking-tighter opacity-90 mb-2">
          404
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4 tracking-tight">
          Page Not Found
        </h2>
        <p className="text-base text-gray-400 mb-10 font-medium leading-relaxed">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-8 py-6 text-sm tracking-wider rounded-2xl transition-all hover:scale-[1.02]">
              <Home className="h-4 w-4 mr-2" />
              Go to Homepage
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white font-bold px-8 py-6 text-sm tracking-wider rounded-2xl"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
