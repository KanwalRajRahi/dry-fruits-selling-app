import React from 'react';

function SubNavbar({ selectedCategory, setSelectedCategory }) {
  // List of categories for dry fruits
  const categories = [
    'all',
    'nuts',
    'dried-fruits',
    'seeds',
    'dry-fruits-mix',
    'roasted-nuts',
    'organic',
    'gift-boxes',
    'imported',
  ];

  return (
    <div className="bg-amber-100 py-2">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-1 rounded text-sm font-medium transition-colors duration-200 ${
              selectedCategory === category 
                ? 'bg-amber-600 text-white'
                : 'bg-amber-200 text-amber-800 hover:bg-amber-300'
            }`}
            aria-label={`Select ${category} category`}
          >
            {category === 'all' ? 'All Products' : category.replace('-', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SubNavbar; 