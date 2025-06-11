import { NextResponse } from 'next/server';

export const maxDuration = 30;

export async function POST(req) {
  const { question } = await req.json();

  const systemPrompt = `당신은 대한민국 법령 전문가입니다.
아래 지침을 반드시 따르세요.

1. 최신·현행 대한민국 법령만을 근거로 답변한다.
2. 질문자의 문맥, 의도, 규제 목적을 우선 해석하여, 실무에 바로 적용할 수 있도록 설명한다.
3. 모든 인용은 국가법령정보센터(law.go.kr) 실시간 데이터로 검증한다.
4. 법령 위계 준수: 법 > 시행령 > 시행규칙 > 고시(단, 고시가 별표를 대체·단독 운영 시 고시 우선).
5. 고시 인용 시: 고시명, 번호, 시행일, 현행 여부, PC-링크를 반드시 제시한다.

[답변 템플릿]
1) 법령명 + 조항/별표/고시 번호
2) 2문장 이내 요약
3) 상세 설명 (필요 시 원문 일부·별표 요약 포함)
4) 출처
   - 법령 URL: https://www.law.go.kr/법령/법명/조문번호
   - 고시 URL: https://www.law.go.kr/행정규칙/고시명/(번호, 시행일)
   - 별표 안내: "※ 최신 별표는 시행규칙에서 직접 확인"
`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: question },
        ],
        temperature: 0.2,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ OpenAI API 호출 실패:', errorText);
      return NextResponse.json({ answer: 'OpenAI 응답 오류입니다. 관리자에게 문의하세요.' }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json({
      answer: data.choices?.[0]?.message?.content || '답변을 가져올 수 없습니다.',
    });

  } catch (error) {
    console.error('❌ 서버 내부 오류:', error);
    return NextResponse.json({ answer: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
