import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import NextTopLoader from "nextjs-toploader";
import Providers from "@/providers/Providers";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Synapsis",
  description: "Synapsis Front End Developer Challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <AntdRegistry>
            <NextTopLoader showSpinner={false} />
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
              <Navbar />
              {children}
            </div>
          </AntdRegistry>
        </body>
      </html>
    </Providers>
  );
}
