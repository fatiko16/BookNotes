import { type AppType } from "next/app";

import { api } from "y/utils/api";

import "y/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { NavigationBar } from "y/components/NavigationBar";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider>
      <main className="flex min-h-screen flex-col  bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <NavigationBar />
        <Component {...pageProps} />
      </main>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
