export default function ProductSkeleton({ count = 8 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card overflow-hidden animate-pulse">
          <div className="shimmer-bg aspect-[4/3] w-full" />
          <div className="p-4 space-y-3">
            <div className="shimmer-bg h-3 w-20 rounded-full" />
            <div className="shimmer-bg h-4 w-full rounded-full" />
            <div className="shimmer-bg h-4 w-3/4 rounded-full" />
            <div className="shimmer-bg h-3 w-24 rounded-full" />
            <div className="shimmer-bg h-5 w-16 rounded-full" />
          </div>
        </div>
      ))}
    </>
  );
}
