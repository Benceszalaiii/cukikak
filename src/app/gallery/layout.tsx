import Nav from "@/components/layout/nav";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      {children}
    </>
  );
}
