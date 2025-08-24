import { Info } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center px-4 min-h-[calc(dvh-80px)] bg-gray-50 dark:bg-gray-900">
      <div className="text-center max-w-md mx-auto p-8 rounded-2xl shadow-lg bg-white/80 dark:bg-gray-800/60 backdrop-blur-md border border-gray-200 dark:border-gray-700">
        {/* Icon wrapper */}
        <div className="w-16 h-16 mx-auto mb-6 bg-red-100 dark:bg-red-900/40 rounded-full flex items-center justify-center shadow-md">
          <Info className="w-8 h-8 text-red-600 dark:text-red-400" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Place not found
        </h1>

        {/* Message */}
        <p className="text-gray-600 dark:text-gray-400 text-base mb-8">
          The place you are looking for does not exist or has been removed.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white rounded-xl 
              bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700
              shadow-md hover:shadow-lg border border-amber-400/50 dark:border-amber-500/50
              transition-all duration-200"
          >
            Go Home
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-xl 
              border border-teal-400 hover:border-teal-300 dark:border-teal-400 dark:hover:border-teal-300
              text-gray-800 hover:text-teal-600 dark:text-gray-100 dark:hover:text-teal-200
              bg-white/70 hover:bg-white/90 dark:bg-gray-700/50 dark:hover:bg-gray-700/70
              shadow-sm hover:shadow-md transition-all duration-200"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
