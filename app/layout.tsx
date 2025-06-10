import * as React from 'react';
import './globals.css';

export const metadata = {
  title: '대한민국 법령 전문가 Q&A',
  description: '최신 현행 법령 기반 전문가용 Q&A 서비스',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  );
}
