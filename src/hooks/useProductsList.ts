import { useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { 
  fetchProducts, 
  setFilterFavorites,
  setCurrentPage 
} from '../store/productsSlice';
import { useDebounce } from './useDebounce';

export const useProductsList = () => {
  const dispatch = useAppDispatch();
  const { 
    products, 
    likedProducts,
    loading, 
    error, 
    filterFavorites,
    currentPage,
    itemsPerPage,
    initialized
  } = useAppSelector(state => state.products);

  const fetchInitiated = useRef(false);

  const [searchQuery, setSearchQuery] = useState('');
  
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    if (!fetchInitiated.current && !initialized && !loading) {
      fetchInitiated.current = true;
      dispatch(fetchProducts());
    }
  }, [initialized, loading, dispatch]);

  const filteredProducts = useMemo(() => {
    let result = [...products];


    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase();
      result = result.filter(
        product =>
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category?.toLowerCase().includes(query)
      );
    }

    if (filterFavorites) {
      result = result.filter(product => likedProducts.includes(product.id));
    }

    return result;
  }, [products, debouncedSearchQuery, filterFavorites, likedProducts]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);

    if (currentPage !== 1) {
      dispatch(setCurrentPage(1));
    }
  };

  const handleFilterToggle = (value: boolean) => {
    dispatch(setFilterFavorites(value));
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetry = () => {
    fetchInitiated.current = false;
    dispatch(fetchProducts());
  };

  return {
    products,
    likedProducts,
    loading,
    error,
    searchQuery, 
    filterFavorites,
    currentPage,
    paginatedProducts,
    filteredProducts,
    totalPages,
    startIndex,
    endIndex,
    isSearching: searchQuery !== debouncedSearchQuery, 
    handleSearchChange,
    handleFilterToggle,
    handlePageChange,
    handleRetry,
  };
};
