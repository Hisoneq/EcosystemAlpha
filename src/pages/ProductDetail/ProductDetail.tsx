import { useParams, Link } from 'react-router-dom';
import { useProductDetail } from '../../hooks/useProductDetail';
import { Loading } from '../../components/Loading/Loading';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import styles from './ProductDetail.module.css';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  const {
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
  } = useProductDetail(id);

  if (loading) {
    return <Loading message="Загрузка продукта..." />;
  }

  if (error || !product) {
    return <ErrorMessage message={error || 'Продукт не найден'} />;
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link to="/products" className={styles.backBtn}>
          ← Вернуться к списку
        </Link>
        <div className={styles.actions}>
          <button
            className={`${styles.likeBtn} ${isLiked ? styles.liked : ''}`}
            onClick={handleLike}
          >
            {isLiked ? '❤️ В избранном' : '🤍 Добавить в избранное'}
          </button>
          <button className={styles.deleteBtn} onClick={handleDelete}>
            🗑️ Удалить
          </button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.imagesSection}>
          <div className={styles.mainImageContainer}>
            <img 
              src={images[currentImageIndex]} 
              alt={product.title}
              className={styles.mainImage}
            />
            {images.length > 1 && (
              <>
                <button className={`${styles.imageNav} ${styles.prev}`} onClick={handlePrevImage}>
                  ‹
                </button>
                <button className={`${styles.imageNav} ${styles.next}`} onClick={handleNextImage}>
                  ›
                </button>
                <div className={styles.indicators}>
                  {images.map((_, index) => (
                    <span
                      key={index}
                      className={`${styles.indicator} ${index === currentImageIndex ? styles.active : ''}`}
                      onClick={() => handleImageSelect(index)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          {images.length > 1 && (
            <div className={styles.thumbnailGallery}>
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.title} ${index + 1}`}
                  className={`${styles.thumbnail} ${index === currentImageIndex ? styles.activeThumbnail : ''}`}
                  onClick={() => handleImageSelect(index)}
                />
              ))}
            </div>
          )}
        </div>

        <div className={styles.infoSection}>
          <h1 className={styles.title}>{product.title}</h1>
          
          <div className={styles.meta}>
            {product.brand && (
              <span className={styles.metaItem}>
                <strong>Бренд:</strong> {product.brand}
              </span>
            )}
            {product.category && (
              <span className={styles.metaItem}>
                <strong>Категория:</strong> {product.category}
              </span>
            )}
            {product.rating && (
              <span className={styles.metaItem}>
                <strong>Рейтинг:</strong> ⭐ {product.rating.toFixed(1)}/5
              </span>
            )}
            {product.stock !== undefined && (
              <span className={styles.metaItem}>
                <strong>В наличии:</strong> {product.stock} шт.
              </span>
            )}
          </div>

          <div className={styles.priceSection}>
            <span className={styles.priceLabel}>Цена:</span>
            <span className={styles.priceValue}>${product.price}</span>
          </div>

          <div className={styles.descriptionSection}>
            <h2>Описание</h2>
            <p className={styles.description}>{product.description}</p>
          </div>

          {product.isCustom && (
            <div className={styles.customBadge}>
              ✨ Создано пользователем
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
