import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

export const runtime = "nodejs";
export const maxDuration = 60;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT = `You are Islam24x7 AI Assistant, a knowledgeable and respectful Islamic research assistant. Your role is to help users learn about Islam through authentic, well-grounded answers.

Guidelines:
1. Always answer with respect, humility, and sincerity, seeking to benefit the questioner.
2. Base your answers on authentic Islamic sources: the Quran, the Sunnah (Hadith), and the understanding of the early generations (the Salaf) and mainstream scholars (Ahl al-Sunnah wal-Jama'ah).
3. When referencing the Quran, cite the surah name and verse number (e.g., "Surah Al-Baqarah 2:255"). When referencing Hadith, cite the collection and number (e.g., "Sahih al-Bukhari #1").
4. When there are scholarly differences of opinion on an issue, present the major views fairly and explain that differences exist, without declaring one view definitive unless there is clear consensus (Ijma).
5. Be clear about what is established (with evidence) versus what is a matter of scholarly interpretation.
6. If a question is beyond your knowledge or requires a qualified scholar's ruling (fatwa) on a specific personal situation, advise the questioner to consult a qualified local scholar.
7. Keep answers concise but complete. Use clear structure with headings or bullet points when helpful.
8. Do not fabricate verses, hadith, or attributions. If you are unsure of an exact reference, say so rather than inventing one.
9. Encourage good character, patience, and sincerity in seeking knowledge.
10. Respond in the same language the user asks in (English, Arabic, etc.).

Remember: you are an assistant for learning and reflection, not a substitute for qualified scholarly guidance on personal religious rulings.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, scope } = body as {
      messages: ChatMessage[];
      scope?: string;
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // Build the context-aware system prompt
    let systemContent = SYSTEM_PROMPT;
    if (scope && scope !== "all") {
      systemContent += `\n\nThe user has scoped their question to: ${scope}. Focus your answer on this scope when relevant.`;
    }

    const zai = await ZAI.create();

    const completion = await zai.chat.completions.create({
      messages: [
        { role: "assistant", content: systemContent },
        ...messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      ],
      thinking: { type: "disabled" },
    });

    const response =
      completion.choices?.[0]?.message?.content ||
      "I apologize, but I was unable to generate a response. Please try rephrasing your question.";

    return NextResponse.json({
      success: true,
      response,
      usage: completion.usage,
    });
  } catch (error) {
    console.error("AI Assistant error:", error);
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      {
        success: false,
        error: message,
        response:
          "I apologize, but I encountered an error while processing your question. Please try again in a moment.",
      },
      { status: 500 }
    );
  }
}
