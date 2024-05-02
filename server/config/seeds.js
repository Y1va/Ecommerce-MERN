const db = require('./connection');
const { User, Product, Category } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('Category', 'categories');
  await cleanDB('Product', 'products');
  await cleanDB('User', 'users');

  const categories = await Category.insertMany([
    { name: 'Electronics' },
    { name: 'Books' },
    { name: 'Clothing' },
    { name: 'Furniture' },
    { name: 'Kitchen and dining'}
  ])

  console.log('categories seeded');

  const products = await Product.insertMany([
    {
      name: 'Wireless Earbuds',
      description: 'Sleek and convenient, these earbuds offer high-quality sound without the hassle of wires.',
      image: 
    }
  ])






})