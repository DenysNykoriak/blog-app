import type { Metadata } from "next";

import "@/styles/globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Blog App",
  description: "Created by Denys Nykoriak",
};

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body>
      <Header />
      <div className="flex h-screen flex-col pt-[80px]">{children}</div>
    </body>
  </html>
);

export default RootLayout;
