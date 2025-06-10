'use client';

import { FaGavel } from 'react-icons/fa';

interface Props {
  answer: string;
  loading: boolean;
}

export default function LawAnswer({ answer, loading }: Props) {
  return (
    <section
      style={{
        width: '100%',
        maxWidth: 700,
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 2px 16px rgba(99,102,241,0.07)',
        padding: 32,
        marginTop: 38,
        minHeight: 120,
        fontSize: 18,
        color: '#22223b',
        position: 'relative',
      }}
    >
      <div style={{ position: 'absolute', top: 18, right: 18, opacity: 0.18 }}>
        <FaGavel size={38} color="#6366f1" />
      </div>
      {loading ? (
        <div style={{ color: '#6366f1', fontWeight: 600, fontSize: 20 }}>
          답변 생성 중입니다...
        </div>
      ) : (
        <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
          {answer || (
            <span style={{ color: '#a1a1aa' }}>
              답변이 여기에 표시됩니다.
            </span>
          )}
        </div>
      )}
    </section>
  );
}
