
// eslint-disable-next-line @next/next/no-document-import-in-page
import { Html, Main, NextScript } from 'next/document';
import Head from 'next/head';
import Image from 'next/image';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Facebook Pixel base code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !(function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src='https://connect.facebook.net/en_US/fbevents.js';
              s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)})(window, document,'script');
              fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <Image
          alt='logo'
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
