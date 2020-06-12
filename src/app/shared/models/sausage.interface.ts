export interface Sausage {
  productId: number;
  temperature: string;
  date: string;
  time: Time;
}

export interface Time {
  hour1: string;
  weightInitial: number;
  hour2: string;
  weightMedium: number;
  hour3: string;
  weightFinal: number;
}
