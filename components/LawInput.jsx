'use client';

import { useState } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';

interface Props {
  onSubmit: (q: string) => void;
  loading: boolean;
}

export default function LawInput({ onSubmit, loading }: Props) {
  const [value, setValue] = useState('');

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (!value.trim()) return;
        onSubmit(value.trim());
        setValue('');
      }}
      style={{
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 4px 24px rgba(60,60,120,0.07)',
        padding: 28,
        marginTop: -60,
        width: '100%',
        maxWidth: 640,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
        <FaQuestionCircle color="#6366f1" size={22} />
        <span style={{ fontWeight: 600, fontSize: 20, color: '#3730a3' }}>
          법령 질문을 입력하세요
        </span>
      </div>
      <textarea
        placeholder="예시: 산업안전보건법상 유해위험방지계획서 제출 기준은?"
        value={value}
        onChange={e => setValue(e.target.value)}
        rows={4}
        style={{
          width: '100%',
          borderRadius: 10,
          border: '1.5px solid #c7d2fe',
          padding: 14,
          fontSize: 17,
          fontFamily: 'inherit',
          marginBottom: 10,
          background: '#f3f4f6',
          color: '#22223b',
          resize: 'vertical',
        }}
        required
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading || !value.trim()}
        style={{
          background: 'linear-gradient(90deg, #6366f1 0%, #2563eb 100%)',
          color: '#fff',
          fontWeight: 700,
          fontSize: 17,
          border: 'none',
          borderRadius: 8,
          padding: '12px 36px',
          cursor: loading ? 'not-allowed' : 'pointer',
          boxShadow: '0 2px 8px rgba(99,102,241,0.09)',
          transition: 'background 0.2s',
        }}
      >
        {loading ? '답변 생성 중...' : '질문하기'}
      </button>
      <div style={{ position: 'absolute', top: 12, right: 18 }}>
        <img src="/info.svg" alt="도움말" width={24} height={24} title="질문은 구체적으로 입력할수록 정확도가 높아집니다." />
      </div>
    </form>
  );
}
