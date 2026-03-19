export function PackagesSkeleton({ count = 6, mobileCount }: { count?: number; mobileCount?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`animate-pulse overflow-hidden rounded-2xl bg-surface-muted aspect-[3/4]${mobileCount !== undefined && i >= mobileCount ? " hidden sm:block" : ""}`}
        />
      ))}
    </div>
  );
}
