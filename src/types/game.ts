export interface Game {
  id: number;
  name: string;
  price: number;
  image: string;
  genre: string;
  description: string;
  isNew?: boolean;
}

export interface CartItem extends Game {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface ApiParams {
  genre?: string;
  page?: number;
}

export interface ApiResponse<T> {
  games: T;
  availableFilters: string[];
  currentPage: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  status: number;
  name: string;
}
