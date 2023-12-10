export interface signUpJsonTypes {
  name: string;
  email: string;
  password: string;
  wrongPassword: string;
  imagePath: string;
  confirmPassword: string;
}

export interface signInJsonTypes {
  email: string;
  password: string;
  wrongPassword: string;
}
