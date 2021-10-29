export type Answer = {
  answer_id: number;
  description: string;
  question_id: number;
};

export type CreateAnswerData = {
  description: string;
  question_id: number;
};
