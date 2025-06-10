'use client';

import Image from 'next/image';

export default function LawHeader() {
  return (
    <header
      style={{
        width: '100%',
        height: 220,
        background: 'linear-gradient(90deg, #2563eb 0%, #6366f1 100%)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 6px 24px rgba(60,60,120,0.07)',
      }}
    >
      <Image
        src="/bg.png"
        alt="법령 배경"
        fill
        style={{ objectFit: 'cover', opacity: 0.25, zIndex: 1 }}
        priority
      />
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: 18 }}>
        <Image src="/law-icon.svg" alt="법률 아이콘" width={60} height={60} />
        <div>
          <h1 style={{ color: '#fff', fontFamily: 'Montserrat', fontWeight: 700, fontSize: 34, margin: 0, letterSpacing: -1 }}>
            대한민국 법령 전문가 Q&A
          </h1>
          <p style={{ color: '#e0e7ff', fontSize: 18, margin: '6px 0 0 0', fontWeight: 400 }}>
            최신 현행 법령에 기반한 신뢰도 높은 해설
          </p>
        </div>
      </div>
    </header>
  );
}
