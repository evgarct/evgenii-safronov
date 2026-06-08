export const caseStudyStatuses = ["shipped", "experiment", "next"] as const;

export type CaseStudyStatus = (typeof caseStudyStatuses)[number];

export type CaseStudyMetric = {
  label: string;
  value: string;
  note: string;
};

export type CaseStudyStep = {
  label: string;
  description: string;
  status?: CaseStudyStatus;
};

export type CaseStudyEvidence = {
  title: string;
  source: string;
  anonymization: string;
  message: string;
  format: string;
};

export type CaseStudyTool = {
  name: string;
  purpose: string;
  contextCost: "Low" | "Medium" | "High";
  useWhen: string;
};
