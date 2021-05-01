const DB = {
  fruits: [
    {
      product: 'cherries',
      url:
        'https://images.unsplash.com/photo-1528821128474-27f963b062bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3150&q=80',
      price: 5.0,
      discount: 10,
      description: '500g (30-40pieces)',
    },
    {
      product: 'strawberries',
      url:
        'https://image.freepik.com/free-photo/red-fresh-strawberries-with-green-leaves_114579-10506.jpg',
      price: 5.5,
      discount: 0,
      description: '500g (20-30pieces)',
    },
    {
      product: 'lychee',
      url:
        'https://images.unsplash.com/photo-1591110548358-85667ecfe7d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80',
      price: 7.5,
      discount: 25,
      description: '300g (10-15pieces)',
    },
    {
      product: 'pineapple',
      url:
        'https://image.freepik.com/free-photo/raw-fresh-texture-vitamin-fruit_1172-220.jpg',
      price: 5.5,
      discount: 0,
      description: '1 unit (500 - 650g)',
    },
    {
      product: 'kiwi',
      url:
        'https://image.freepik.com/free-photo/ripe-whole-kiwi-with-leaves-white-wall_253984-954.jpg',
      price: 8.5,
      discount: 5,
      description: '1 unit (60 - 80g)',
    },
    {
      product: 'apricots',
      url:
        'https://image.freepik.com/free-photo/fresh-yellow-apricots-isolated-white_114579-10486.jpg',
      price: 5.5,
      discount: 0,
      description: '500g (6-7 pieces)',
    },
    {
      product: 'orange',
      url:
        'https://images.unsplash.com/photo-1577371968233-c75daf22cf8e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3451&q=80',
      price: 2.5,
      discount: 10,
      description: '1kg (5-7 pieces)',
    },
    {
      product: 'banana',
      url:
        'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3200&q=80',
      price: 2.0,
      discount: 0,
      description: '1kg (6-8 pieces)',
    },
    {
      product: 'grapes',
      url:
        'https://images.unsplash.com/photo-1615485925836-8ddb4b7f4433?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80',
      price: 4.0,
      discount: 0,
      description: '1kg (4-6 pieces)',
    },
    {
      product: 'papaya',
      url:
        'https://image.freepik.com/free-photo/half-food-background-fresh-orange_1203-5919.jpg',
      price: 2.0,
      discount: 0,
      description: '500g (2-3 pieces)',
    },
    {
      product: 'lemon',
      url:
        'https://images.unsplash.com/photo-1582287086947-1fd0fdac5cc9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80',
      price: 2.5,
      discount: 8,
      description: '500g (6-8 pieces)',
    },
    {
      product: 'blueberries',
      url:
        'https://images.unsplash.com/photo-1606757389667-45c2024f9fa4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80',
      price: 7.5,
      discount: 0,
      description: '250g',
    },
    {
      product: 'melon',
      url:
        'https://images.unsplash.com/photo-1615485290690-285a539321e6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80',
      price: 1.5,
      discount: 0,
      description: '2.5kg (1 piece)',
    },
  ],
  vegetables: [
    {
      product: 'cucumber',
      url:
        'https://images.unsplash.com/photo-1587411768638-ec71f8e33b78?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80',
      price: 4.5,
      discount: 5,
      description: '1kg (5-7 pieces)',
    },
    {
      product: 'tomato',
      url:
        'https://images.unsplash.com/flagged/photo-1579410137851-2f510f2d150f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
      price: 3.5,
      discount: 0,
      description: '1kg (7-9 pieces)',
    },
    {
      product: 'zucchini',
      url:
        'https://images.unsplash.com/photo-1583118208563-1654aa5caa31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3200&q=80',
      price: 2.5,
      discount: 0,
      description: '300g (1 piece)',
    },
    {
      product: 'red hot chilli pepper',
      url:
        'https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80',
      price: 5.0,
      discount: 12,
      description: '250g (4-4 pieces)',
    },
    {
      product: 'onion',
      url:
        'https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80',
      price: 2.0,
      discount: 0,
      description: '1kg (8-10 pieces)',
    },
    {
      product: 'garlic',
      url:
        'https://images.unsplash.com/photo-1587049693270-c7560da11218?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80',
      price: 6.0,
      discount: 10,
      description: '150g (3 pieces)',
    },
    {
      product: 'green peas',
      url:
        'https://images.unsplash.com/photo-1587049585169-c526077ca3cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80',
      price: 8.0,
      discount: 0,
      description: '350g',
    },
    {
      product: 'cherry tomato',
      url:
        'https://images.unsplash.com/photo-1587411768515-eeac0647deed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80',
      price: 2.5,
      discount: 0,
      description: '250g',
    },
    {
      product: 'radish',
      url:
        'https://images.unsplash.com/photo-1587578855249-b6dbc62006d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80',
      price: 3.5,
      discount: 5,
      description: '250g',
    },
    {
      product: 'cabbage',
      url:
        'https://images.unsplash.com/photo-1583116935756-f66cd999cdbe?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
      price: 2.0,
      discount: 0,
      description: '1kg',
    },
  ],
};

export default DB;
