import React from 'react';
import { FaGavel } from 'react-icons/fa';

const LawAnswer = ({ answer, loading }) => {
  return (
    <div style={{ width: '80%', marginTop: '20px', whiteSpace: 'pre-line' }}>
      <h2>
        <FaGavel style={{ marginRight: '10px' }} />
        법률 전문가 답변
      </h2>
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <p style={{ lineHeight: '1.8', fontSize: '1rem' }}>{answer}</p>
      )}
    </div>
  );
};

export default LawAnswer;
