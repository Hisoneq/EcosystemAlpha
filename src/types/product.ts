export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images: string[];
  category: string;
  brand?: string;
  rating?: number;
  stock?: number;
  isCustom?: boolean;
}

export interface ProductsState {
  products: Product[];
  likedProducts: number[];
  loading: boolean;
  error: string | null;
  filterFavorites: boolean;
  currentPage: number;
  itemsPerPage: number;
  initialized: boolean;
}

