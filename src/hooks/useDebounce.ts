import { useState, useEffect } from 'react';

/**
 * Хук для отложенного обновления значения (debounce)
 * Полезен для оптимизации поиска и других операций, которые не должны выполняться на каждое изменение
 * 
 * @param value - Значение для debounce
 * @param delay - Задержка в миллисекундах (по умолчанию 500ms)
 * @returns Отложенное значение
 * 
 * @example
 * const searchQuery = 'test';
 * const debouncedSearch = useDebounce(searchQuery, 300);
 * 
 * useEffect(() => {
 *   // API запрос выполнится только через 300ms после прекращения ввода
 *   fetchResults(debouncedSearch);
 * }, [debouncedSearch]);
 */
export const useDebounce = <T,>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Устанавливаем таймер для обновления debounced значения
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Очищаем таймер при изменении value или размонтировании
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

