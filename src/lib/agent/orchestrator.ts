import OpenAI from "openai";
import { getSystemPrompt } from "./prompts";
import type { AgentMessage } from "./types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function runAgent(
  messages: AgentMessage[],
  locale: string = "tr"
): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    return getFallbackResponse(messages, locale);
  }

  try {
    const systemPrompt = getSystemPrompt(locale);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.map((m) => ({
          role: m.role as "user" | "assistant" | "system",
          content: m.content,
        })),
      ],
      max_tokens: 1000,
      temperature: 0.5, // Lower temperature for more consistent professional tone
    });

    return (
      completion.choices[0]?.message?.content ||
      (locale === "tr" 
        ? "Üzgünüm, şu an yanıt oluşturamıyorum. Lütfen tekrar deneyin."
        : "I'm sorry, I couldn't generate a response. Please try again.")
    );
  } catch (error) {
    console.error("Agent error:", error);
    return getFallbackResponse(messages, locale);
  }
}

function getFallbackResponse(
  messages: AgentMessage[],
  locale: string
): string {
  const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || "";

  if (locale === "tr" || lastMessage.match(/[ığüşöçı]/)) {
    if (lastMessage.includes("fwbm"))
      return "FWBM, hanehalkı finansal stresini ve beklentilerini sürekli ölçen karar destek platformumuzdur. Detaylı bilgi veya demo için yardımcı olabilirim.";
    if (lastMessage.includes("fuzzyowl"))
      return "FuzzyOWL, kararların arkasındaki neden-sonuç ilişkilerini ve senaryo simülasyonlarını görünür kılan ürünümüzdür. Nasıl yardımcı olabilirim?";
    if (lastMessage.includes("fiyat") || lastMessage.includes("ücret"))
      return "Fiyatlandırma bilgisi ihtiyacınızın kapsamına göre değişiklik göstermektedir. Sizi doğru ekibe yönlendirmem için kurumunuzu ve ilgi alanınızı paylaşabilir misiniz?";
    
    return "Merhaba, OWL Intelligence asistanıyım. Size OWL Intelligence, FWBM veya FuzzyOWL hakkında nasıl yardımcı olabilirim?";
  }

  // English fallback
  if (lastMessage.includes("fwbm"))
    return "FWBM is our decision support platform that continuously measures household financial stress and expectations. I can help with more details or a demo.";
  if (lastMessage.includes("fuzzyowl"))
    return "FuzzyOWL is our product that makes the cause-effect relationships behind decisions and scenario simulations visible. How can I help you?";
  if (lastMessage.includes("pric") || lastMessage.includes("cost"))
    return "Pricing varies based on your needs. Could you share your organization and area of interest so I can direct you to the right team?";

  return "Hello, I am the OWL Intelligence assistant. How can I help you with OWL Intelligence, FWBM, or FuzzyOWL?";
}

