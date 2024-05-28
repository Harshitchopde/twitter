import type { AppProps } from 'next/app'
import "./globals.css";
import React from 'react';
import { Provider } from '@/providers/provider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Quicksand } from 'next/font/google';
const quicksand = Quicksand({subsets:["latin"]});
import { Toaster } from 'react-hot-toast';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient()
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <html lang="en">
      <Provider>
        <GoogleOAuthProvider clientId="your-client-id-here">
          <QueryClientProvider client={queryClient}>
            <body className={quicksand.className}>
              <Component {...pageProps} />
              <Toaster />
              <ReactQueryDevtools />
            </body>
          </QueryClientProvider>
        </GoogleOAuthProvider>
      </Provider>
    </html>
  );
}