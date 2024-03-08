import {TheHeader} from "@/components/TheHeader";
import {TheFooter} from "@/components/TheFooter";
import { NextAuthProvider } from "./providers";

import Provider from "../client/provider";

import "./globals.css";

export  default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className='min-h-screen flex items-center justify-between flex-col'>
        <NextAuthProvider>
          <Provider>
            <TheHeader/>
              <main>{children}</main>
            <TheFooter/>
          </Provider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
