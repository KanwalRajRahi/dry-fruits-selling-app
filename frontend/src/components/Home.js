import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const categories = [
    {
      name: 'Nuts',
      image: '/images/categories/nuts.jpg',
      description: 'Premium quality almonds, cashews, walnuts, and more'
    },
    {
      name: 'Dried Fruits',
      image: '/images/categories/dried-fruits.jpg',
      description: 'Natural dried fruits like raisins, dates, and apricots'
    },
    {
      name: 'Seeds',
      image: '/images/categories/seeds.jpg',
      description: 'Healthy seeds including pumpkin, sunflower, and chia'
    },
    {
      name: 'Gift Boxes',
      image: '/images/categories/gift-boxes.jpg',
      description: 'Curated gift boxes for special occasions'
    }
  ];

  const benefits = [
    {
      title: '100% Natural',
      description: 'All our products are naturally dried without any artificial preservatives',
      icon: '🌿'
    },
    {
      title: 'Premium Quality',
      description: 'We source only the finest quality dry fruits from trusted farmers',
      icon: '⭐'
    },
    {
      title: 'Fast Delivery',
      description: 'Quick and reliable delivery across India',
      icon: '🚚'
    },
    {
      title: 'Secure Packaging',
      description: 'Products are carefully packed to maintain freshness',
      icon: '📦'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-green-50 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">
                Premium Quality Dry Fruits & Nuts
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Discover our handpicked selection of premium dry fruits and nuts. 
                Natural, organic, and delivered fresh to your doorstep.
              </p>
              <div className="flex space-x-4">
                <Link
                  to="/products"
                  className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition duration-300"
                >
                  Shop Now
                </Link>
                <Link
                  to="/gift-boxes"
                  className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-full hover:bg-green-50 transition duration-300"
                >
                  Gift Boxes
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="/images/hero-dry-fruits.jpg"
                alt="Premium Dry Fruits"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
            Why Choose Bharat Dry Fruits?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 rounded-lg bg-green-50">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
            Explore Our Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/products?category=${category.name.toLowerCase()}`}
                className="group"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-lg transition duration-300 transform group-hover:-translate-y-2">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-green-800 mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Featured products will be dynamically loaded here */}
            <div className="text-center">
              <p className="text-gray-600">Loading featured products...</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-green-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-8">Subscribe to our newsletter for exclusive offers and updates</p>
          <form className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-3 rounded-l-full focus:outline-none text-gray-800"
              />
              <button
                type="submit"
                className="bg-green-600 px-6 py-3 rounded-r-full hover:bg-green-700 transition duration-300"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home; 