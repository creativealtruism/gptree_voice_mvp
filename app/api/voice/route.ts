import { generateText } from "ai";
import { gateway } from "@/lib/gateway";

export const maxDuration = 30;

// Graceful placeholder responses when AI is unavailable
const PLACEHOLDER_RESPONSES = [
  "the grove heard you. keep growing.",
  "your question became a little more forest.",
  "growth begins with attention.",
  "the roots remember your words.",
  "every voice adds to the canopy.",
  "the forest holds your thought gently.",
  "patience grows the tallest trees.",
  "your words are becoming leaves.",
];

function getPlaceholderResponse(): string {
  return PLACEHOLDER_RESPONSES[
    Math.floor(Math.random() * PLACEHOLDER_RESPONSES.length)
  ];
}

// System prompt for the tree companion
const SYSTEM_PROMPT = `You are a gentle, wise forest companion called "Talking to Trees." You speak in a calm, poetic, nature-inspired way. Keep responses brief (1-3 sentences max). You're warm, thoughtful, and occasionally reference trees, forests, growth, and nature. Never be robotic or corporate. You help people reflect, feel grounded, and connect with nature through conversation. Each conversation helps plant real trees.`;

export async function POST(req: Request) {
  try {
    const { message }: { message: string } = await req.json();

    if (!message || typeof message !== "string" || message.trim().length < 1) {
      return Response.json(
        { error: "Message is required", reply: getPlaceholderResponse() },
        { status: 400 }
      );
    }

    console.log("[v0] voice_api_request_started", { messageLength: message.length });

    try {
      const result = await generateText({
        model: gateway("openai/gpt-4o-mini"),
        system: SYSTEM_PROMPT,
        prompt: message.trim(),
        maxOutputTokens: 150,
      });

      const reply = result.text.trim() || getPlaceholderResponse();
      
      console.log("[v0] voice_api_response_success", { replyLength: reply.length });

      return Response.json({ reply });
    } catch (aiError) {
      // AI call failed - use placeholder gracefully
      console.warn("[v0] voice_api_ai_error, using placeholder:", aiError);
      
      return Response.json({ 
        reply: getPlaceholderResponse(),
        fallback: true 
      });
    }
  } catch (error) {
    console.error("[v0] voice_api_error:", error);
    
    return Response.json(
      { 
        error: "Failed to process request", 
        reply: getPlaceholderResponse(),
        fallback: true 
      },
      { status: 500 }
    );
  }
}
