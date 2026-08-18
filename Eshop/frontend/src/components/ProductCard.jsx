import React from 'react';
import { Link, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { FiStar, FiShoppingCart } from 'react-icons/fi';

const ProductCard = ({ id, name, price, description, images, ratings, shopName }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart({
      productId: id,
      name,
      price,
      image: images && images[0] ? images[0].url : null,
      shopName,
      qty: 1,
      stock: 10 // Assuming some stock
    }));
    alert(`${name} added to cart!`);
  };

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="card-premium flex flex-col h-full cursor-pointer group" onClick={handleCardClick}>
      <div className="relative pt-[100%] overflow-hidden rounded-t-2xl bg-gray-100">
        {images && images.length > 0 ? (
          <img 
            src={images[0].url} 
            alt={name} 
            className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
            <span className="text-primary-500 font-medium">No Image</span>
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-xs text-gray-500 mb-1">{shopName || 'Eshop Vendor'}</div>
        <h3 className="font-semibold text-gray-800 line-clamp-2 mb-2 group-hover:text-accent transition-colors">{name}</h3>
        
        <div className="flex items-center mb-3">
          <FiStar className="text-yellow-400 fill-current w-4 h-4" />
          <span className="text-sm font-medium ml-1 text-gray-600">{ratings || 0}</span>
        </div>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">${price}</span>
          <button 
            onClick={handleAddToCart}
            className="w-10 h-10 rounded-full bg-primary-50 text-accent flex items-center justify-center hover:bg-accent hover:text-white transition-colors"
            title="Add to Cart"
          >
            <FiShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
