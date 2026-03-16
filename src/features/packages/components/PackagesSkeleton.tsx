export function PackagesSkeleton() {
  return (
    <div>
      {/* Desktop */}
      <div className="hidden md:flex justify-center pt-2">
        <div className="w-full max-w-sm">
          <div className="animate-pulse overflow-hidden rounded-3xl bg-surface-muted" style={{ height: "36rem" }} />
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden pt-2">
        <div className="mx-auto max-w-xs animate-pulse overflow-hidden rounded-3xl bg-surface-muted" style={{ height: "55vh" }} />
      </div>
    </div>
  );
}
