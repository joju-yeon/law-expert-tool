import React, { useState } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';

const LawInput = ({ onSubmit, loading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== '') {
      onSubmit(input.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '80%', marginTop: '30px' }}>
      <label style={{ fontWeight: 'bold' }}>
        <FaQuestionCircle style={{ marginRight: '8px' }} />
        법령 질문 입력
      </label>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="예: 중대재해처벌법 제4조 요약해줘"
        style={{
          width: '100%',
          padding: '10px',
          marginTop: '10px',
          fontSize: '16px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
        disabled={loading}
      />
      <button
        type="submit"
        style={{
          marginTop: '15px',
          padding: '10px 20px',
          backgroundColor: '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
        disabled={loading}
      >
        {loading ? '분석 중...' : '질문하기'}
      </button>
    </form>
  );
};

export default LawInput;
