import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';

const ThemeContext = createContext({
  theme: 'system',
  setTheme: (theme: 'light' | 'dark' | 'system') => {},
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (theme === 'system') {
      const colorScheme = Appearance.getColorScheme();
      setResolvedTheme(colorScheme === 'dark' ? 'dark' : 'light');
      const listener = Appearance.addChangeListener(({ colorScheme }) => {
        setResolvedTheme(colorScheme === 'dark' ? 'dark' : 'light');
      });
      return () => listener.remove();
    } else {
      setResolvedTheme(theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme: resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext); 