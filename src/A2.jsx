import React, { useState } from 'react';
import axios from 'axios';

const A2 = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
    } catch (err) {
      setError('Failed to load products.');
    } finally {
      setLoading(false);
    }
  };

  const clearProducts = () => {
    setProducts([]);
    setError('');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Product Store</h2>

      <button onClick={fetchProducts}>Load Products</button>{' '}
      <button onClick={clearProducts}>Clear Products</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && products.length === 0 && <p>No products to show.</p>}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '15px',
          marginTop: '20px',
        }}
      >
        {products.map((item) => (
          <div
            key={item.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px',
              textAlign: 'center',
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{ height: '100px', objectFit: 'contain' }}
            />
            <h4 style={{ fontSize: '14px' }}>{item.title}</h4>
            <p><b>${item.price}</b></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default A2;
