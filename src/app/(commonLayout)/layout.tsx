import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { WhyChooseMediStore } from "@/components/modules/home/why-choose-medistore";
import { ReactNode } from "react";

export default function CommonLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
      <WhyChooseMediStore />
      <Footer />
    </div>
  );
}
