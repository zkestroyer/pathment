require('dotenv').config({ path: 'config/.env' });
const mongoose = require('mongoose');
const Product = require('./models/Product');
const Shop = require('./models/Shop');

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to MongoDB");

    // Clear existing dummy data if needed
    // await Product.deleteMany({});
    // await Shop.deleteMany({});

    // Create a dummy shop
    const shop = await Shop.create({
      name: "Premium Tech Store",
      email: "store@eshop.com",
      password: "password123",
      avatar: { public_id: "demo", url: "https://via.placeholder.com/150" },
      zipCode: 12345,
      role: "Seller",
      address: "123 Tech Lane, Silicon Valley",
      phoneNumber: 1234567890
    });

    // Create some dummy products
    const products = [
      {
        name: "Wireless Noise-Canceling Headphones",
        description: "Premium over-ear headphones with industry-leading noise cancellation and 30-hour battery life.",
        category: "Electronics",
        tags: "audio, wireless, headphones",
        originalPrice: 350,
        discountPrice: 299,
        stock: 50,
        shopId: shop._id,
        images: [{ public_id: "demo1", url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80" }]
      },
      {
        name: "Smart Watch Series 8",
        description: "Advanced health tracking, always-on Retina display, and water resistance up to 50 meters.",
        category: "Electronics",
        tags: "smartwatch, fitness, tech",
        originalPrice: 400,
        discountPrice: 350,
        stock: 120,
        shopId: shop._id,
        images: [{ public_id: "demo2", url: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80" }]
      },
      {
        name: "Mechanical Gaming Keyboard",
        description: "RGB backlit mechanical keyboard with tactile switches for the ultimate gaming experience.",
        category: "Gaming",
        tags: "keyboard, gaming, rgb",
        originalPrice: 150,
        discountPrice: 120,
        stock: 30,
        shopId: shop._id,
        images: [{ public_id: "demo3", url: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80" }]
      }
    ];

    await Product.insertMany(products);
    console.log("Database seeded successfully with a shop and 3 products!");
    
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
