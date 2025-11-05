import { Link } from 'react-router-dom';
import { useProductForm } from '../../hooks/useProductForm';
import styles from './CreateProduct.module.css';

export const CreateProduct = () => {
  const { form, onSubmit, handleCancel } = useProductForm();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = form;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link to="/products" className={styles.backBtn}>
          ← Назад к списку
        </Link>
        <h1 className={styles.title}>Создать новый продукт</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>
            Название продукта <span className={styles.required}>*</span>
          </label>
          <input
            id="title"
            type="text"
            className={`${styles.input} ${errors.title ? styles.error : ''}`}
            {...register('title', {
              required: 'Название обязательно',
              minLength: {
                value: 3,
                message: 'Название должно содержать минимум 3 символа',
              },
              maxLength: {
                value: 100,
                message: 'Название не должно превышать 100 символов',
              },
            })}
          />
          {errors.title && (
            <span className={styles.errorMessage}>{errors.title.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>
            Описание <span className={styles.required}>*</span>
          </label>
          <textarea
            id="description"
            rows={4}
            className={`${styles.textarea} ${errors.description ? styles.error : ''}`}
            {...register('description', {
              required: 'Описание обязательно',
              minLength: {
                value: 10,
                message: 'Описание должно содержать минимум 10 символов',
              },
              maxLength: {
                value: 500,
                message: 'Описание не должно превышать 500 символов',
              },
            })}
          />
          {errors.description && (
            <span className={styles.errorMessage}>{errors.description.message}</span>
          )}
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="price" className={styles.label}>
              Цена ($) <span className={styles.required}>*</span>
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              min="0"
              className={`${styles.input} ${errors.price ? styles.error : ''}`}
              {...register('price', {
                required: 'Цена обязательна',
                min: {
                  value: 0.01,
                  message: 'Цена должна быть больше 0',
                },
                max: {
                  value: 999999,
                  message: 'Цена слишком большая',
                },
              })}
            />
            {errors.price && (
              <span className={styles.errorMessage}>{errors.price.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="stock" className={styles.label}>
              Количество <span className={styles.required}>*</span>
            </label>
            <input
              id="stock"
              type="number"
              min="0"
              className={`${styles.input} ${errors.stock ? styles.error : ''}`}
              {...register('stock', {
                required: 'Количество обязательно',
                min: {
                  value: 0,
                  message: 'Количество не может быть отрицательным',
                },
              })}
            />
            {errors.stock && (
              <span className={styles.errorMessage}>{errors.stock.message}</span>
            )}
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="category" className={styles.label}>
              Категория <span className={styles.required}>*</span>
            </label>
            <input
              id="category"
              type="text"
              className={`${styles.input} ${errors.category ? styles.error : ''}`}
              {...register('category', {
                required: 'Категория обязательна',
                minLength: {
                  value: 2,
                  message: 'Категория должна содержать минимум 2 символа',
                },
              })}
            />
            {errors.category && (
              <span className={styles.errorMessage}>{errors.category.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="brand" className={styles.label}>
              Бренд <span className={styles.required}>*</span>
            </label>
            <input
              id="brand"
              type="text"
              className={`${styles.input} ${errors.brand ? styles.error : ''}`}
              {...register('brand', {
                required: 'Бренд обязателен',
                minLength: {
                  value: 2,
                  message: 'Бренд должен содержать минимум 2 символа',
                },
              })}
            />
            {errors.brand && (
              <span className={styles.errorMessage}>{errors.brand.message}</span>
            )}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="thumbnail" className={styles.label}>
            URL изображения <span className={styles.required}>*</span>
          </label>
          <input
            id="thumbnail"
            type="url"
            placeholder="https://example.com/image.jpg"
            className={`${styles.input} ${errors.thumbnail ? styles.error : ''}`}
            {...register('thumbnail', {
              required: 'URL изображения обязателен',
              pattern: {
                value: /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i,
                message: 'Введите корректный URL изображения',
              },
            })}
          />
          {errors.thumbnail && (
            <span className={styles.errorMessage}>{errors.thumbnail.message}</span>
          )}
          <small className={styles.hint}>
            Укажите прямую ссылку на изображение (jpg, png, webp, gif)
          </small>
        </div>

        <div className={styles.formActions}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={handleCancel}
          >
            Отмена
          </button>
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Создание...' : 'Создать продукт'}
          </button>
        </div>
      </form>
    </div>
  );
};
