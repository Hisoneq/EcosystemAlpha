import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { addProduct } from '../store/productsSlice';
import type { Product } from '../types/product';

interface ProductFormData {
  title: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  thumbnail: string;
  stock: number;
}

export const useProductForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const form = useForm<ProductFormData>();

  const onSubmit = async (data: ProductFormData) => {
    const newProduct: Product = {
      id: Date.now(),
      title: data.title,
      description: data.description,
      price: Number(data.price),
      category: data.category,
      brand: data.brand,
      thumbnail: data.thumbnail || 'https://via.placeholder.com/300x300?text=No+Image',
      images: [data.thumbnail || 'https://via.placeholder.com/300x300?text=No+Image'],
      stock: Number(data.stock),
      rating: 0,
      isCustom: true,
    };

    dispatch(addProduct(newProduct));
    form.reset();
    
    setTimeout(() => {
      navigate('/products');
    }, 100);
  };

  const handleCancel = () => {
    navigate('/products');
  };

  return {
    form,
    onSubmit,
    handleCancel,
  };
};


