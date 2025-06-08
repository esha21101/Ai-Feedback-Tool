export interface ApiResponse {
  transcription?: string;
  error?: string;
}

export async function analyzeCall(audioFile: File): Promise<{ transcription: string }> {
  const formData = new FormData();
  formData.append("audio", audioFile);

  const response = await fetch("/api/analyze-call", {
    method: "POST",
    body: formData,
  });

  const data: ApiResponse = await response.json();

  if (!response.ok || data.error) {
    throw new Error(data.error || "Failed to analyze audio");
  }

  if (!data.transcription) {
    throw new Error("No transcription returned from API");
  }

  return { transcription: data.transcription };
}
