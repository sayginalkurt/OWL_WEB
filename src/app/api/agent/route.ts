import { NextRequest, NextResponse } from "next/server";
import { runAgent } from "@/lib/agent/orchestrator";
import type { AgentMessage } from "@/lib/agent/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, locale = "en" } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array required" },
        { status: 400 }
      );
    }

    const agentMessages: AgentMessage[] = messages.map(
      (m: { role: string; content: string }) => ({
        role: m.role as AgentMessage["role"],
        content: m.content,
      })
    );

    const response = await runAgent(agentMessages, locale);

    return NextResponse.json({ message: response });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
