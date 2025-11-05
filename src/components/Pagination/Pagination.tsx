import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    return Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
      if (
        page === 1 ||
        page === totalPages ||
        (page >= currentPage - 1 && page <= currentPage + 1)
      ) {
        return (
          <button
            key={page}
            className={`${styles.pageNumber} ${page === currentPage ? styles.active : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        );
      } else if (page === currentPage - 2 || page === currentPage + 2) {
        return <span key={page} className={styles.dots}>...</span>;
      }
      return null;
    });
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.navBtn}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ← Назад
      </button>
      
      <div className={styles.numbers}>
        {renderPageNumbers()}
      </div>

      <button
        className={styles.navBtn}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Вперед →
      </button>
    </div>
  );
};


