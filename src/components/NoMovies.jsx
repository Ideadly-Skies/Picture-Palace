import { motion } from 'framer-motion';

export default function NoMovies({ message = "No movies found" }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center h-96 bg-black text-center space-y-6"
    >
      {/* Glowing Spinner */}
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 border-4 border-red-600 rounded-full opacity-50 blur-md"></div>
      </div>

      {/* Coming Soon Text */}
      <h2 className="text-2xl font-semibold text-white opacity-90 tracking-wide">
        Coming Soon
      </h2>
      <p className="text-white/60 text-sm max-w-md mx-auto px-4">
        {message || "More movies will appear here soon. Check back later!"}
      </p>

    </motion.div>
  );
}
