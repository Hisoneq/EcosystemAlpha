import styles from './Loading.module.css';

interface LoadingProps {
  message?: string;
}

export const Loading = ({ message = 'Загрузка...' }: LoadingProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      <p className={styles.message}>{message}</p>
    </div>
  );
};


