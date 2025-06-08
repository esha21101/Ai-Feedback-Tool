import { NextRequest, NextResponse } from "next/server";
import { Buffer } from "buffer";

const ASSEMBLYAI_API_KEY = "e305b4ac2d1b4b20901a27cb4fbdd365";

const UPLOAD_URL = "https://api.assemblyai.com/v2/upload";
const TRANSCRIPT_URL = "https://api.assemblyai.com/v2/transcript";

async function uploadFile(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const response = await fetch(UPLOAD_URL, {
    method: "POST",
    headers: {
      authorization: ASSEMBLYAI_API_KEY,
      "content-type": "application/octet-stream",
    },
    body: buffer,
  });

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.statusText}`);
  }
  const data = await response.json();
  return data.upload_url;
}

async function requestTranscription(uploadUrl: string): Promise<string> {
  const response = await fetch(TRANSCRIPT_URL, {
    method: "POST",
    headers: {
      authorization: ASSEMBLYAI_API_KEY,
      "content-type": "application/json",
    },
    body: JSON.stringify({ audio_url: uploadUrl }),
  });

  if (!response.ok) {
    throw new Error(`Transcription request failed: ${response.statusText}`);
  }
  const data = await response.json();
  return data.id;
}

async function pollTranscription(id: string): Promise<string> {
  while (true) {
    const response = await fetch(`${TRANSCRIPT_URL}/${id}`, {
      headers: { authorization: ASSEMBLYAI_API_KEY },
    });

    if (!response.ok) {
      throw new Error(`Failed to get transcription status: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.status === "completed") {
      return data.text;
    }
    if (data.status === "error") {
      throw new Error(`Transcription error: ${data.error}`);
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("audio") as File;

    if (!file) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 });
    }

    const uploadUrl = await uploadFile(file);
    const transcriptId = await requestTranscription(uploadUrl);
    const transcriptionText = await pollTranscription(transcriptId);

    // Dummy scores for demonstration
    const dummyScores = {
      clarity: 0.85,
      pace: 0.75,
      tone: 0.9,
    };

    return NextResponse.json({
      transcription: transcriptionText,
      scores: dummyScores,
    });
  } catch (error: unknown) {
    let message = "Unknown error";

    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
