import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Script from "next/script";
import CookieBanner from "@/components/CookieBanner";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  const [isRouteChanging, setIsRouteChanging] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = () => setIsRouteChanging(true);
    const handleRouteChangeComplete = () => setIsRouteChanging(false);

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeComplete);
    };
  }, [router]);

  return (
    <SessionProvider session={session}>
      {/* Analytics Boilerplate */}
      <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      
      {isRouteChanging && (
        <div className="fixed top-0 left-0 z-[9999] h-1 w-full bg-[#111]">
          <div className="h-full bg-[#D4AF37] animate-[loading-bar_1.5s_ease-in-out_infinite]" />
        </div>
      )}
      <Component {...pageProps} />
      <CookieBanner />
    </SessionProvider>
  );
}
