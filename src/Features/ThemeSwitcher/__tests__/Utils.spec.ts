import { afterEach, describe, expect, it } from 'vitest';
import { getTheme, setTheme } from '../Lib';
import { THEME_LOCAL_STORAGE_KEY } from '../Lib/utils';

describe('Utils', () => {
  afterEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
  });

  it('setTheme sets the theme in local storage', () => {
    const theme = 'dark';
    setTheme(theme);
    expect(localStorage.getItem(THEME_LOCAL_STORAGE_KEY)).toBe(theme);
  });

  it('setTheme sets the theme as the document class', () => {
    const theme = 'dark';
    setTheme(theme);
    expect(document.documentElement.className).toBe(theme);
  });

  it('getTheme returns the theme from local storage', () => {
    const theme = 'dark';
    localStorage.setItem(THEME_LOCAL_STORAGE_KEY, theme);
    expect(getTheme()).toBe(theme);
  });

  it('getTheme returns null theme when local storage is empty', () => {
    expect(getTheme()).toBeNull();
  });
});
