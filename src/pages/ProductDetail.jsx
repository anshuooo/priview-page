import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => setProduct(data))
      .catch(() => setNotFound(true));
  }, [id]);

  if (notFound) {
    return (
      <div className="text-center p-10">
        <h1 className="text-2xl font-bold text-red-500">404 - Product Not Found</h1>
        <Link to="/" className="text-blue-600 underline">Go back to Home</Link>
      </div>
    );
  }

  if (!product) {
    return <div className="text-center p-10">Loading product details...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <img src={product.images[0]} alt={product.title} className="w-full h-64 object-cover rounded mb-4" />
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <p className="text-gray-700 mt-2">{product.description}</p>
      <div className="mt-4 flex justify-between">
        <p className="text-xl font-bold text-green-600">${product.price}</p>
        <p className="text-yellow-500 font-semibold">⭐ {product.rating}</p>
      </div>
      <Link to="/" className="block mt-6 text-blue-600 underline">← Back to Products</Link>
    </div>
  );
}
