export interface tourDetails {
  destination: string;
  image: string;
  description: string;
  duration: number;
  price: number;
}

export interface getTours {
  event_id: string;
  destination: string;
  description: string;
  duration: number;
  price: number;
  start_date: Date;
  image: string;
}
