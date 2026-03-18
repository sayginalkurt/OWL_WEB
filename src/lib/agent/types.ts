export interface AgentMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface AgentSession {
  id: string;
  locale: string;
  qualification?: {
    sector?: string;
    role?: string;
    geography?: string;
    problem?: string;
    urgency?: string;
  };
  recommendedProduct?: string;
}

export interface KnowledgeChunk {
  id: string;
  source_type: string;
  title: string;
  content: string;
  metadata: Record<string, unknown>;
  similarity: number;
}
