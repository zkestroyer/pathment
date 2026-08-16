import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { FiStar, FiShoppingCart, FiMinus, FiPlus } from 'react-icons/fi';
import Loader from '../components/Loader';
import API from '../api/axios'; // Normally would use this to fetch by id

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // In a real app, you would fetch the specific product
    // For now, let's simulate fetching or fetch all and find
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Fallback to fetch all and find, since there might not be a direct endpoint
        const { data } = await API.get('/product/get-all-products');
        const found = data.products?.find(p => p._id === id);
        
        if (found) {
          setProduct(found);
        } else {
          // Placeholder data if not found or backend fails
          setProduct({
            _id: id,
            name: "Placeholder Product " + id,
            description: "This is a detailed description of the product. It has many great features and you will love it.",
            originalPrice: 100,
            discountPrice: 80,
            stock: 10,
            ratings: 4.5,
            shop: { name: "Example Vendor" },
            images: []
          });
        }
      } catch (error) {
        console.error('Error fetching product', error);
        // Fallback
        setProduct({
          _id: id,
          name: "Placeholder Product " + id,
          description: "This is a detailed description of the product. It has many great features and you will love it.",
          originalPrice: 100,
          discountPrice: 80,
          stock: 10,
          ratings: 4.5,
          shop: { name: "Example Vendor" },
          images: []
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  const increaseQuantity = () => {
    if (product.stock > quantity) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({
      productId: product._id,
      name: product.name,
      price: product.discountPrice || product.originalPrice,
      image: product.images && product.images[0] ? product.images[0].url : null,
      shopName: product.shop?.name,
      qty: quantity,
      stock: product.stock
    }));
    // Optional: show a toast here
  };

  if (loading) return <div className="py-20"><Loader /></div>;
  if (!product) return <div className="text-center py-20">Product not found</div>;

  const price = product.discountPrice || product.originalPrice;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-glass overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10">
          
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden relative">
              {product.images && product.images.length > 0 ? (
                <img 
                  src={product.images[0].url} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
                  <span className="text-primary-500 font-medium">No Image</span>
                </div>
              )}
            </div>
            {/* Thumbs would go here */}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-2 text-sm text-accent font-medium">{product.shop?.name || 'Unknown Vendor'}</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center">
                <FiStar className="text-yellow-400 fill-current w-5 h-5" />
                <span className="ml-1 text-gray-600">{product.ratings || 0} Ratings</span>
              </div>
              <span className="text-gray-300">|</span>
              <span className={`${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            
            <div className="text-3xl font-bold text-gray-900 mb-6">
              ${price}
              {product.discountPrice && product.originalPrice && (
                <span className="text-lg text-gray-400 line-through ml-3">${product.originalPrice}</span>
              )}
            </div>
            
            <p className="text-gray-600 mb-8 leading-relaxed">
              {product.description}
            </p>
            
            <div className="mt-auto pt-6 border-t border-gray-100">
              <div className="flex items-center space-x-6">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button onClick={decreaseQuantity} className="p-3 hover:bg-gray-50 text-gray-600 transition-colors rounded-l-lg">
                    <FiMinus />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button onClick={increaseQuantity} className="p-3 hover:bg-gray-50 text-gray-600 transition-colors rounded-r-lg">
                    <FiPlus />
                  </button>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 btn-primary flex items-center justify-center space-x-2 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiShoppingCart />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
