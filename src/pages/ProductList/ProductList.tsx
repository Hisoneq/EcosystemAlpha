import { Link } from 'react-router-dom';
import { useProductsList } from '../../hooks/useProductsList';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { FilterTabs } from '../../components/FilterTabs/FilterTabs';
import { Pagination } from '../../components/Pagination/Pagination';
import { Loading } from '../../components/Loading/Loading';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import styles from './ProductList.module.css';

export const ProductList = () => {
  const {
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
    isSearching,
    handleSearchChange,
    handleFilterToggle,
    handlePageChange,
    handleRetry,
  } = useProductsList();

  if (loading && products.length === 0) {
    return <Loading message="Загрузка продуктов..." />;
  }

  if (error) {
    return (
      <ErrorMessage 
        message={`Ошибка: ${error}`}
        onRetry={handleRetry}
      />
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Список продуктов</h1>
        <Link to="/create-product" className={styles.createBtn}>
          + Создать продукт
        </Link>
      </header>

      <div className={styles.filters}>
        <div className={styles.searchWrapper}>
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Поиск по названию, описанию или категории..."
          />
          {isSearching && (
            <span className={styles.searchingIndicator}>Поиск...</span>
          )}
        </div>
        <FilterTabs
          showFavorites={filterFavorites}
          onToggle={handleFilterToggle}
          totalCount={products.length}
          favoritesCount={likedProducts.length}
        />
      </div>

      {paginatedProducts.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyMessage}>
            {filterFavorites 
              ? 'Нет продуктов в избранном' 
              : searchQuery 
              ? 'Ничего не найдено'
              : 'Нет продуктов'}
          </p>
        </div>
      ) : (
        <>
          <div className={styles.grid}>
            {paginatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />

          <div className={styles.resultsInfo}>
            Показано {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} из {filteredProducts.length}
          </div>
        </>
      )}
    </div>
  );
};
