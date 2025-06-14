// ✅ route.js 확장 버전: 번역 + 유사 질문 + PDF 포함
import { NextResponse } from 'next/server';
import { parseStringPromise } from 'xml2js';
import { jsPDF } from 'jspdf';

export const maxDuration = 30;

export async function POST(req) {
  const { question } = await req.json();

  const lawApiKey = process.env.PUBLIC_LAW_API_KEY;
  let lawInfoText = '※ 공공 API에서 관련 법령을 찾을 수 없습니다.';
  let lawName = '';
  let lawId = '';
  let fullLawText = '';

  try {
    const searchUrl = `https://apis.data.go.kr/1170000/law/lawSearchList.do?serviceKey=${encodeURIComponent(lawApiKey)}&target=law&query=${encodeURIComponent(question)}&numOfRows=1&pageNo=1`;
    const lawResponse = await fetch(searchUrl);
    const xml = await lawResponse.text();
    const parsed = await parseStringPromise(xml, { explicitArray: false });

    const law = parsed?.LawSearch?.law;
    if (law) {
      lawName = law.법령명한글 || '알 수 없음';
      lawId = law.법령ID || '';
      const 시행일자 = law.시행일자 || '';
      const 상세링크 = `https://www.law.go.kr/법령/${encodeURIComponent(lawName)}`;
      lawInfoText = `💡 실시간 검색된 법령 정보:\n- 법령명: ${lawName}\n- 시행일자: ${시행일자}\n- 링크: ${상세링크}`;
    }

    if (lawId) {
      const detailUrl = `https://apis.data.go.kr/1170000/law/lawService.do?serviceKey=${encodeURIComponent(lawApiKey)}&OC=test&target=law&type=XML&ID=${lawId}`;
      const detailResponse = await fetch(detailUrl);
      const detailXml = await detailResponse.text();
      const detailParsed = await parseStringPromise(detailXml, { explicitArray: false });

      const articles = detailParsed?.Law?.조문 || [];
      if (Array.isArray(articles)) {
        fullLawText = articles.map(a => `● ${a.조문번호}조: ${a.조문내용?.replace(/\n/g, ' ').trim()}`).join('\n');
      } else if (articles?.조문내용) {
        fullLawText = `● ${articles.조문번호}조: ${articles.조문내용.replace(/\n/g, ' ').trim()}`;
      }
    } else {
      fullLawText = `※ 직접 일치하는 법령은 찾을 수 없었습니다.\n그러나 다음 키워드를 참고하여 유사한 법령 조항을 추론해주세요: ${question}`;
    }
  } catch (err) {
    console.error('📛 공공 API 오류:', err);
  }

  const systemPrompt = `
당신은 대한민국 산업안전보건 및 환경 관련 법령 해석 전문가입니다.
다음 질문에 대해 아래 법령 정보와 조문을 참고하여 전문가 수준의 실무 중심 설명을 제공하세요.

[실시간 법령 정보]
${lawInfoText}

[법령 조문 또는 유사 추론 텍스트]
${fullLawText}

[답변 형식]
1) 관련 법령명 + 조항  
2) 요약 (2문장)  
3) 상세 설명 (조문 일부 포함 가능)  
4) 출처 (law.go.kr 링크 포함)
5) 영어 번역
6) 중국어 번역
7) 유사 질의 추천 (최소 2개)

※ 정확한 조문이 없는 경우, 질문을 해석하여 유사한 조항을 근거로 설명하세요. 반드시 실무 적용 가능한 방식으로 설명하며, 고시·별표도 활용 가능합니다.
※ 모호한 표현, 책임 회피 금지.
  `;

  try {
    const gptResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `질문: ${question}` },
        ],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });

    if (!gptResponse.ok) {
      const errorText = await gptResponse.text();
      console.error('❌ GPT API 오류:', errorText);
      return NextResponse.json({ answer: 'GPT 응답 오류가 발생했습니다.' }, { status: 500 });
    }

    const gptData = await gptResponse.json();
    const rawAnswer = gptData.choices?.[0]?.message?.content || 'GPT 응답을 가져올 수 없습니다.';
    const formattedAnswer = rawAnswer.replace(/([.?!])\s+/g, '$1\n');

    return NextResponse.json({ answer: formattedAnswer });
  } catch (error) {
    console.error('❌ 서버 내부 오류:', error);
    return NextResponse.json({ answer: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
