import { Message } from "@/app/types";
import { OpenAIStream } from "@/app/utils";

// export const config = { runtime : "edge" }; // Use this instead of `export const config`
// export const runtime = "edge"; // Use this instead of `export const config`

export const POST = async (req: Request): Promise<Response> => {
  try {
    const { messages } = (await req.json()) as {
      messages: Message[];
    };

    const charLimit = 12000;
    let charCount = 0;
    let messagesToSend = [];

    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      if (charCount + message.content.length > charLimit) {
        break;
      }
      charCount += message.content.length;
      messagesToSend.push(message);
    }

    const stream = await OpenAIStream(messagesToSend);

    return new Response(stream);
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
}

// export default POST;

// import { NextRequest, NextResponse } from 'next/server';

// // export const dynamic = "force-dynamic";
// export async function POST(request: NextRequest) {
//   const res = await request.json();
  
//   return new NextResponse(res, { status: 200 });
// }