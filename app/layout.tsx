import {TheHeader} from "@/components/TheHeader";
import {TheFooter} from "@/components/TheFooter";
import { NextAuthProvider } from "./providers";

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
          <TheHeader/>
            <main>{children}</main>
          <TheFooter/>
        </NextAuthProvider>
      </body>
    </html>
  );
}
