export default function Dashboardheader() {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between w-full px-4 py-2 sm:px-6">
      <h1 className="text-xl sm:text-2xl text-[#030229] font-semibold">
        Dashboard
      </h1>
      <p className="text-lg sm:text-xl text-[#030229]">{today}</p>
    </div>
  );
}
