import React from 'react';
import { FaGavel } from 'react-icons/fa';

const LawAnswer = ({ answer, loading }) => {
  return (
    <div style={{ width: '80%', marginTop: '20px' }}>
      <h2>
        <FaGavel style={{ marginRight: '10px' }} />
        법률 전문가 답변
      </h2>
      {loading ? <p>로딩 중...</p> : <pre>{answer}</pre>}
    </div>
  );
};

export default LawAnswer;
