import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar/appsidebar";


const nunitoSans = localFont({
  src: "./fonts/Nunito-Medium.ttf",
  variable: "--font-nunito-sans",
  weight: "100 900",
});
const nunitoSerif = localFont({
  src: "./fonts/Nunito-Regular.ttf",
  variable: "--font-nunito-serif",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "FinForecastHub",
  description: "All of your financial predictions in one!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${nunitoSans.variable} ${nunitoSerif.variable} antialiased`}
      >
        <SidebarProvider>
          <AppSidebar />
            <SidebarTrigger />
            {children}
        </SidebarProvider>
      </body>
    </html>
  );
}
