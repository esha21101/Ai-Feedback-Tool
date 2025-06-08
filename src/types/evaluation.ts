// src/types/evaluation.ts

export interface ScoreData {
  greeting: number;
  collectionUrgency: number;
  rebuttalCustomerHandling: number;
  callEtiquette: number;
  callDisclaimer: number;
  correctDisposition: number;
  callClosing: number;
  fatalIdentification: number;
  fatalTapeDiscloser: number;
  fatalToneLanguage: number;
}

// src/types/evaluation.ts
export interface FeedbackResponse {
  transcription: string;
  scores: Record<string, number>;
}


