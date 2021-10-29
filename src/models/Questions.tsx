export type Question = {
  question_id: number;
  description: string;
  category_id: number;
  difficult_id: number;
};

export type CreateQuestionData = {
  description: string;
  category_id: number;
  difficult_id: number;
};
