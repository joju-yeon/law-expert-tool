import React, { useState } from 'react';
import { FaQuestionCircle, FaDownload, FaGlobe } from 'react-icons/fa';

const LawInput = ({ onSubmit, loading, onLanguageChange, onDownloadPDF, onRelatedQueryClick }) => {
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('ko');
  const relatedQueries = [
    '중대재해처벌법 제4조 요약해줘',
    '산업안전보건법에서 위험 기계 기준은?',
    '화학물질관리법 신고 기준 알려줘'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== '') {
      onSubmit(input.trim(), language);
    }
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    if (onLanguageChange) onLanguageChange(e.target.value);
  };

  return (
    <div style={{ width: '80%', marginTop: '30px' }}>
      <form onSubmit={handleSubmit}>
        <label style={{ fontWeight: 'bold' }}>
          <FaQuestionCircle style={{ marginRight: '8px' }} /> 법령 질문 입력
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
        <div style={{ marginTop: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <select
            value={language}
            onChange={handleLanguageChange}
            style={{ padding: '8px', fontSize: '14px', borderRadius: '4px' }}
          >
            <option value="ko">한국어</option>
            <option value="en">English</option>
            <option value="zh">中文</option>
          </select>

          <button
            type="button"
            onClick={onDownloadPDF}
            style={{
              padding: '8px 12px',
              backgroundColor: '#666',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <FaDownload style={{ marginRight: '5px' }} /> PDF 저장
          </button>

          <button
            type="submit"
            style={{
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
        </div>
      </form>

      <div style={{ marginTop: '20px' }}>
        <strong>📌 유사 질의 추천:</strong>
        <ul>
          {relatedQueries.map((q, idx) => (
            <li
              key={idx}
              onClick={() => onRelatedQueryClick && onRelatedQueryClick(q)}
              style={{ cursor: 'pointer', textDecoration: 'underline', marginTop: '6px', color: '#0070f3' }}
            >
              {q}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LawInput;
