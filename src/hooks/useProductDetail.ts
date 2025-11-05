import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { toggleLike, deleteProduct } from '../store/productsSlice';
import { fetchProductById } from '../services/api';
import type { Product } from '../types/product';

export const useProductDetail = (id: string | undefined) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const productsFromStore = useAppSelector(state => state.products.products);
  const likedProducts = useAppSelector(state => state.products.likedProducts);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const productFromStore = productsFromStore.find(p => p.id === parseInt(id));
        
        if (productFromStore) {
          setProduct(productFromStore);
        } else {
          const fetchedProduct = await fetchProductById(parseInt(id));
          setProduct(fetchedProduct);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Не удалось загрузить продукт');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, productsFromStore]);

  const isLiked = product ? likedProducts.includes(product.id) : false;
  
  const images = product?.images && product.images.length > 0 
    ? product.images 
    : product ? [product.thumbnail] : [];

  const handleLike = () => {
    if (product) {
      dispatch(toggleLike(product.id));
    }
  };

  const handleDelete = () => {
    if (product && confirm('Удалить этот продукт?')) {
      dispatch(deleteProduct(product.id));
      navigate('/products');
    }
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
  };

  const handleImageSelect = (index: number) => {
    setCurrentImageIndex(index);
  };

  return {
    product,
    loading,
    error,
    isLiked,
    images,
    currentImageIndex,
    handleLike,
    handleDelete,
    handlePrevImage,
    handleNextImage,
    handleImageSelect,
  };
};

