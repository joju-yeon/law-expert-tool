'use client';

import { useState } from 'react';
import LawHeader from '../components/LawHeader';
import LawInput from '../components/LawInput';
import LawAnswer from '../components/LawAnswer';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async (q) => {
    setLoading(true);
    setAnswer('');
    setQuestion(q);
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: q }),
    });
    const data = await res.json();
    setAnswer(data.answer);
    setLoading(false);
  };

  return (
    <main>
      <LawHeader />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 0 }}>
        <LawInput onSubmit={handleAsk} loading={loading} />
        <LawAnswer answer={answer} loading={loading} />
      </div>
    </main>
  );
}
