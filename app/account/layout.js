import SideNavigation from "@/app/_components/SideNavigation";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col md:grid md:grid-cols-[16rem,1fr] h-full gap-8 md:gap-12">
      <SideNavigation />
      <div className="py-1 px-4 md:px-0">{children}</div>
    </div>
  );
}