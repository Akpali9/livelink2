export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  total_earned: number;
  pending: number;
  paid_out: number;
}

export interface StatusCounts {
  requested: number;
  pending: number;
  completed: number;
}

export interface IncomingRequest {
  id: string;
  business: string;
  name: string;
  type: string;
  streams: number;
  price: number;
  days_left: number;
  logo: string;
}

export interface LiveCampaign {
  id: string;
  business: string;
  name: string;
  logo: string;
  session_earnings: string;
  stream_time: string;
  progress: number;
  remaining_mins: number;
}

export interface Application {
  id: string;
  business: string;
  logo: string;
  type: string;
  amount?: number;
  status: string;
  applied_at: string;
}

export interface UpcomingCampaign {
  id: string;
  business: string;
  logo: string;
  start_date: string;
  package: string;
}
