import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider,
} from 'react-native-paper';
import React, {createContext, useContext, useMemo, useState} from 'react';

// const authContext = createContext<InitialStateType | null>(null)
const themeContext = createContext('light');

const useThemeContext = () => {
  const context = useContext(themeContext);
  return context;
};

const defaultTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
  },
};
const darkTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
  },
};

function ProvideTheme({children}) {
  const [theme, setTheme] = useState('light');

  const themeContextValue = useMemo(
    () => ({
      toggleTheme: async () => {
        try {
          setTheme(theme === 'light' ? 'dark' : 'light');
        } catch (error) {
          console.log(error);
        }
      },
    }),
    [theme],
  );

  const themeValue = theme === 'light' ? defaultTheme : darkTheme;

  return (
    <Provider theme={themeValue}>
      <NavigationContainer theme={themeValue}>
        <themeContext.Provider value={{...themeContextValue, theme}}>
          {children}
        </themeContext.Provider>
      </NavigationContainer>
    </Provider>
  );
}

export {ProvideTheme, useThemeContext};
