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
import  "dotenv/config"
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    
       <div className={quicksand.className}>
      <Provider>
        <GoogleOAuthProvider clientId="902232405002-kavrcv9scaobhtgufveegorqpviepq92.apps.googleusercontent.com">
          <QueryClientProvider client={queryClient}>
           
              <Component {...pageProps} />
              <Toaster />
              <ReactQueryDevtools />
           
          </QueryClientProvider>
        </GoogleOAuthProvider>
      </Provider>
      </div>

  );
}