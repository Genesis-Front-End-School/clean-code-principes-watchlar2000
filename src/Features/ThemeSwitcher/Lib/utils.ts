export const THEME_LOCAL_STORAGE_KEY = 'user-theme';

export const setTheme = (theme: string): void => {
  localStorage.setItem(THEME_LOCAL_STORAGE_KEY, theme);
  document.documentElement.className = theme;
};

export const getTheme = (): string | null => {
  return localStorage.getItem(THEME_LOCAL_STORAGE_KEY);
};
