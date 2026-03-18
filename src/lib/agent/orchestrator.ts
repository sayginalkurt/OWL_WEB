import OpenAI from "openai";
import { getSystemPrompt } from "./prompts";
import type { AgentMessage } from "./types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function runAgent(
  messages: AgentMessage[],
  locale: string = "en"
): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    return getFallbackResponse(messages, locale);
  }

  try {
    const systemPrompt = getSystemPrompt(locale);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.map((m) => ({
          role: m.role as "user" | "assistant" | "system",
          content: m.content,
        })),
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    return (
      completion.choices[0]?.message?.content ||
      "I'm sorry, I couldn't generate a response. Please try again."
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

  if (locale === "tr") {
    if (lastMessage.includes("fwbm"))
      return "FWBM (Saha Ağırlıklı Barometre Modeli), gerçek zamanlı tüketici ve pazar duyarlılığı istihbaratı sunan ürünümüzdür. Haftalık güncellenen gösterge panelleri, yapay zeka destekli analiz ve özel göstergeler içerir. Daha fazla bilgi almak ister misiniz?";
    if (lastMessage.includes("fuzzyowl"))
      return "FuzzyOwl, stratejik karar verme için Bulanık Bilişsel Haritalama platformumuzdur. Karmaşık sistemleri modelleyebilir, senaryo simülasyonları yapabilir ve sonuçları görselleştirebilirsiniz. Deneme yapmak ister misiniz?";
    return "Merhaba! OWL Intelligence asistanıyım. Ürünlerimiz (FWBM ve FuzzyOwl), çözümlerimiz veya metodolojimiz hakkında size nasıl yardımcı olabilirim?";
  }

  if (lastMessage.includes("fwbm"))
    return "FWBM (Field-Weighted Barometer Model) is our real-time consumer and market sentiment intelligence product. It provides weekly-updated dashboards, AI-powered analysis via our Monet assistant, and custom indicators. Would you like to learn more about specific modules, see a demo, or discuss pricing?";
  if (lastMessage.includes("fuzzyowl"))
    return "FuzzyOwl is our Fuzzy Cognitive Mapping platform for strategic decision-making. It helps you model complex systems, simulate scenarios, and visualize outcomes. You can try our interactive playground or request a guided demo. What would you like to know more about?";
  if (lastMessage.includes("pric"))
    return "Pricing depends on your specific needs and usage. I'd be happy to connect you with our team for a detailed discussion. Could you tell me about your organization and which product you're interested in?";
  if (lastMessage.includes("demo"))
    return "We offer both self-service demos and guided sessions. For FWBM, you can explore our public demo with sample data. For FuzzyOwl, our interactive playground lets you build a simple cognitive map. Would you like to try one of these, or schedule a guided demo with our team?";

  return "Thank you for your interest in OWL Intelligence! I can help you with information about our products (FWBM and FuzzyOwl), solutions for your sector, our methodology, or connect you with our team. What would you like to know?";
}
