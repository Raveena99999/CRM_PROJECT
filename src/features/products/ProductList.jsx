import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from './productSlice';
import "../../style/ProductList.css"
function ProductList() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAdd = () => {
    if (!title || !price) return;
    dispatch(addProduct({ title, price: Number(price) }));
    setTitle('');
    setPrice('');
  };

  const handleEdit = (product) => {
    setTitle(product.title);
    setPrice(product.price);
    setEditId(product.id);
  };

  const handleUpdate = () => {
    if (!editId) return;
    dispatch(updateProduct({ id: editId, updatedProduct: { title, price: Number(price) } }));
    setTitle('');
    setPrice('');
    setEditId(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  if (loading) return <p className="loading-text">Loading...</p>;

  return (
    <div className="product-container">
      <h2 className="product-title">Products</h2>

      <input
        className="product-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Product Title"
      />
      <input
        className="product-input"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
      />
      <button
        className="product-button"
        onClick={editId ? handleUpdate : handleAdd}
      >
        {editId ? 'Update' : 'Add'} Product
      </button>

      <ul className="product-list">
        {items.map((p) => (
          <li className="product-item" key={p.id}>
            <span>{p.title} - ${p.price}</span>
            <div className="product-actions">
              <button onClick={() => handleEdit(p)}>Edit</button>
              <button onClick={() => handleDelete(p.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;

