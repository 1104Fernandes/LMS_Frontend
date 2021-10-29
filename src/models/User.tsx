export type User = {
  nickname: string;
  password: string;
};

export type CreateUserData = {
  nickname: string;
  password: string;
  e_mail: string;
  age: number;
  gender_id: number;
  profession_id: number;
  job_id: number;
};

export type LoginUser = {
  nickname: string;
  user_id: number;
  access_token: string;
  user_rights_id: string;
};

export type LoginOptions = {
  nickname: string;
  password: string;
};

export type SelfAssesment = {
  category_id: number;
  self_assesment_value: number;
};
