import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { WhyChooseMediStore } from "@/components/modules/home/why-choose-medistore";
import { userService } from "@/services/user.service";
import { ReactNode } from "react";

export default async function CommonLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { data } = await userService.getSession();
  // const user = data?.user ?? null;

  const user = data?.user;
  // console.log("User Data: ", data);
  return (
    <div>
      <Navbar user={user} />
      <div>{children}</div>
      <WhyChooseMediStore />
      <Footer />
    </div>
  );
}
