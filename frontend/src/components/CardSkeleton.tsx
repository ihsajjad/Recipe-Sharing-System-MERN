const CardSkeleton = () => {
  return (
    <div className="border border-[var(--secondary-color)] p-4 bg-[var(--secondary-bg)] rounded space-y-3 shadow-lg shadow-slate-300 max-w-[400px]">
      <h3 className="skeleton h-6"></h3>
      <div className="skeleton h-44 w-full rounded" />
      <div className="flex flex-col skeleton h-16"></div>

      <button className="skeleton h-8 px-3 py-1 font-semibold rounded w-full"></button>
    </div>
  );
};

export default CardSkeleton;
