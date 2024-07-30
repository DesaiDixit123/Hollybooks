// src/pages/SearchPage.js

import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const SearchPage = () => {
  const location = useLocation();
  const searchQuery = location.state?.query || ''; // Get search query from state
  const allProducts = useSelector((state) => state.ProductSliceProvider.allProducts);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = allProducts.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery, allProducts]);

  return (
    <div>
      <h1>Search Results</h1>
      {filteredProducts.length > 0 ? (
        <ul>
          {filteredProducts.map(product => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default SearchPage;
