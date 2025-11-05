import { useNavigate } from 'react-router-dom';
import type { Product } from '../../types/product';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleLike, deleteProduct } from '../../store/productsSlice';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const likedProducts = useAppSelector(state => state.products.likedProducts);
  const isLiked = likedProducts.includes(product.id);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleLike(product.id));
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Удалить этот продукт?')) {
      dispatch(deleteProduct(product.id));
    }
  };

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <div className={styles.imageContainer}>
        <img 
          src={product.thumbnail} 
          alt={product.title}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{truncateText(product.title, 50)}</h3>
        <p className={styles.description}>
          {truncateText(product.description, 80)}
        </p>
        <div className={styles.info}>
          <span className={styles.price}>${product.price}</span>
          {product.category && (
            <span className={styles.category}>{product.category}</span>
          )}
        </div>
      </div>
      <div className={styles.actions}>
        <button
          className={`${styles.likeBtn} ${isLiked ? styles.liked : ''}`}
          onClick={handleLike}
          title={isLiked ? 'Убрать из избранного' : 'Добавить в избранное'}
        >
          {isLiked ? '❤️' : '🤍'}
        </button>
        <button
          className={styles.deleteBtn}
          onClick={handleDelete}
          title="Удалить продукт"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};


