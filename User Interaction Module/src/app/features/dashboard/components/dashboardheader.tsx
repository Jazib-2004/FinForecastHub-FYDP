export default function Dashboardheader() {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between w-full px-4 py-2 sm:px-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
        Analytics Dashboard
      </h1>
      <p className="text-sm sm:text-base text-gray-500 font-medium">
        {today}
      </p>
    </div>
  );
}