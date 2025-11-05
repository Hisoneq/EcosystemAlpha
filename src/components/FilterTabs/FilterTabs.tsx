import styles from './FilterTabs.module.css';

interface FilterTabsProps {
  showFavorites: boolean;
  onToggle: (showFavorites: boolean) => void;
  totalCount: number;
  favoritesCount: number;
}

export const FilterTabs = ({ showFavorites, onToggle, totalCount, favoritesCount }: FilterTabsProps) => {
  return (
    <div className={styles.container}>
      <button
        className={`${styles.tab} ${!showFavorites ? styles.active : ''}`}
        onClick={() => onToggle(false)}
      >
        Все ({totalCount})
      </button>
      <button
        className={`${styles.tab} ${showFavorites ? styles.active : ''}`}
        onClick={() => onToggle(true)}
      >
        ❤️ Избранное ({favoritesCount})
      </button>
    </div>
  );
};


