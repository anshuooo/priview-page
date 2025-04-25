import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=20')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setFiltered(data.products);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setFiltered(products.filter(product =>
      product.title.toLowerCase().includes(term)
    ));
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">🛒 Product Store</h1>
      <input
        type="text"
        placeholder="Search products..."
        className="w-full p-2 mb-6 border rounded"
        onChange={handleSearch}
      />
      {loading ? (
        <p className="text-center">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map(product => (
            <Link
              to={`/products/${product.id}`}
              key={product.id}
              className="border rounded p-4 hover:shadow-lg transition"
            >
              <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover rounded" />
              <h2 className="mt-2 font-semibold text-lg">{product.title}</h2>
              <p className="text-green-600 font-bold">${product.price}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
