'use client';

import { useState } from 'react';
import LawHeader from '../components/LawHeader';
import LawInput from '../components/LawInput';
import LawAnswer from '../components/LawAnswer';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('ko');

  const handleAsk = async (q) => {
    setLoading(true);
    setAnswer('');
    setQuestion(q);
    const res = await fetch('/api/chat/route', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: q, language }),
    });
    const data = await res.json();
    setAnswer(data.answer);
    setLoading(false);
  };

  const handleDownloadPDF = () => {
    const blob = new Blob([answer], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `법령_분석_결과.pdf`;
    link.click();
  };

  return (
    <main>
      <LawHeader />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 0 }}>
        <LawInput
          onSubmit={handleAsk}
          loading={loading}
          onLanguageChange={setLanguage}
          onDownloadPDF={handleDownloadPDF}
          onRelatedQueryClick={(q) => handleAsk(q)}
        />
        <LawAnswer answer={answer} loading={loading} />
      </div>
    </main>
  );
}
