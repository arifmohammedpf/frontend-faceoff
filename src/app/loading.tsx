
export default function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[50vh] bg-gray-100">
      <div className="animate-spin rounded-full border-4 border-t-transparent border-gray-400 mb-2" />
      <p className="text-gray-600">Loading, please wait...</p>
    </div>
  );
}