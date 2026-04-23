export default function ProductSkeleton({ count = 8 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-6">
          <div className="relative aspect-[10/12] rounded-[2.5rem] overflow-hidden bg-gray-100 dark:bg-dark-800 border-4 border-white dark:border-dark-700 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_2s_infinite] -translate-x-full" />
          </div>
          <div className="space-y-3 px-2">
            <div className="h-3 w-20 bg-gray-100 dark:bg-dark-800 rounded-full animate-pulse" />
            <div className="h-6 w-full bg-gray-200 dark:bg-dark-700 rounded-xl animate-pulse" />
            <div className="flex justify-between items-end pt-2">
               <div className="h-8 w-24 bg-gray-100 dark:bg-dark-800 rounded-xl animate-pulse" />
               <div className="h-4 w-16 bg-gray-100 dark:bg-dark-800 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
