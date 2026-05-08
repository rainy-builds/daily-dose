export type InputState = "default" | "typing" | "hover" | "error" | "success";

export type TextPosition = "right" | "middle" | "top";

export type TextColour = "black" | "white" | "white+outline";

export type GenerateMode = "word" | "surprise";

export type InvalidInputReason = "gibberish" | "inappropriate";

export interface AffirmationCardProps {
  affirmation: string;
  imageFile: string;
  fallbackColor: string;
  textPosition: TextPosition;
  textColour: TextColour;
  backgroundPosition?: string;
  outlineColour?: string;
}

export interface GenerateRequest {
  words?: string;
  mode: GenerateMode;
  mock?: boolean;
}

export interface GenerateResponse {
  affirmation: string;
  imageTag: string;
  textPosition: TextPosition;
  textColour: TextColour;
}
