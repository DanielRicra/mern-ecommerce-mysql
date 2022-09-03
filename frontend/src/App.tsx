import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  ColorSchemeProvider, MantineProvider, Paper,
} from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import './App.css';
import useAppTheme from './hooks/useAppTheme';
import HeaderSearch from './layouts/header/Header';
import Home from './pages/home/Home';
import NothingFoundBackground from './pages/404/NothingFoundBackground';
import Authentication from './pages/auth/Authentication';
import ProductDetails from './pages/product/ProductDetails';
import Cart from './pages/cart/Cart';
import Footer from './layouts/footer/Footer';
import footerLinks from './assets/footer-links.json';
import SearchResults from './pages/search/SearchResults';

function App() {
  const { colorScheme, toggleColorScheme } = useAppTheme();

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        theme={{ colorScheme, fontFamily: 'Mukta, sans-serif' }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Paper radius={0} style={{ minHeight: '100vh' }}>
          <HeaderSearch />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Authentication />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products/:productId" element={<ProductDetails />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="*" element={<NothingFoundBackground />} />
          </Routes>
          <Footer data={footerLinks.data} />
        </Paper>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
