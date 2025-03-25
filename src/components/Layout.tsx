
import { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 py-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;
