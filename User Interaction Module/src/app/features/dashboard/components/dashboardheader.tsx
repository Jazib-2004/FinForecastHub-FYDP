export default function Dashboardheader() {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex items-end justify-between w-full">
      <h1 className="text-l text-[#030229] font-semibold">Dashboard</h1>
      <p className=" text-l text-[#030229]">{today}</p>
    </div>
  );
}
