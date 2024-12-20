import { Header } from "@/pages/shared/header";
import { ReactNode } from "react";
import { Footer } from "../shared/footer";

type MainPageLayout = {
  children: ReactNode;
};

const MainPageLayout = ({ children }: MainPageLayout) => {
  return (
    <>
      <Header></Header>
      <main>{children}</main>
      <Footer></Footer>
    </>
  );
};

export { MainPageLayout };
