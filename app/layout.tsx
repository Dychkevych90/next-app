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
      <body className='min-h-screen flex items-center justify-between flex-col '>
        <NextAuthProvider>
          <Provider>
            <main className='w-full min-h-screen justify-center'>{children}</main>
          </Provider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
