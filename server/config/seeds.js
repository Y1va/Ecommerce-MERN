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
    { name: 'Kitchen and dining' }
  ]);

  console.log('categories seeded');

  const products = await Product.insertMany([
    {
      name: 'Wireless Earbuds',
      description:
        'Sleek and convenient, these earbuds offer high-quality sound without the hassle of wires.',
      image: 'wirelessearbuds.jpg',
      category: categories[0]._id,
      price: 59.99,
      qauntity: 500
    },
    {
      name: 'Smartwatch',
      description:
        'From fitness tracking to receiving notifications, smartwatches offer a range of functionalities for tech-savvy consumers.',
      image: 'smartwatch.png',
      category: categories[0]._id,
      price: 249.99,
      qauntity: 250
    },
    {
      name: 'Action Camera',
      description:
        'Ideal for capturing adventures, action cameras are compact, durable, and capable of recording high-quality footage in various conditions.',
      image: 'actioncamera.png',
      category: categories[0]._id,
      price: 174.99,
      qauntity: 250
    },
    {
      name: 'Bluetooth Speaker',
      description:
        'Perfect for outdoor gatherings or indoor use, these speakers provide high-quality sound with the convenience of wireless connectivity.',
      image: 'btspeaker.jpg',
      category: categories[0]._id,
      price: 149.99,
      qauntity: 250
    },
    {
      name: 'Wireless Charging Pad',
      description:
        'Compatible with a variety of devices, these charging pads offer a clutter-free solution for keeping devices powered up.',
      image: 'chargingpad.jpg',
      category: categories[0]._id,
      price: 34.99,
      qauntity: 500
    },
    {
      name: 'Drone',
      description:
        'Whether for photography, videography, or recreational flying, drones offer users a unique perspective and endless creative possibilities.',
      image: 'drone.jpg',
      category: categories[0]._id,
      price: 599.99,
      qauntity: 50
    },
    {
      name: 'Electric Scooter',
      description:
        'Ideal for urban commuting or recreational use, electric scooters are portable, eco-friendly, and convenient for short-distance travel.',
      image: 'escooter.jpg',
      category: categories[0]._id,
      price: 349.99,
      qauntity: 100
    },
    {
      name: 'Gaming Headset',
      description:
        'Designed for immersive gaming experiences, these headsets offer superior audio quality and comfort for extended gaming sessions.',
      image: 'headset.jpg',
      category: categories[0]._id,
      price: 149.99,
      qauntity: 100
    },
    {
      name: 'Power Bank',
      description:
        'Keep devices charged on the go with portable power banks, available in various capacities and designs.',
      image: 'powerbank.png',
      category: categories[0]._id,
      price: 49.99,
      qauntity: 100
    },
    {
      name: 'Robot Vacuum Cleaner',
      description:
        'Make cleaning easier with robot vacuum cleaners that intelligently navigate and clean floors, saving users time and effort.',
      image: 'robotcleaner.jpg',
      category: categories[0]._id,
      price: 249.99,
      qauntity: 100
    },
    {
      name: 'Wireless Security Camera',
      description:
        'Offering flexibility in installation and monitoring, wireless security cameras provide peace of mind with remote access and motion detection features.',
      image: 'securitycamera.jpg',
      category: categories[0]._id,
      price: 149.99,
      qauntity: 100
    },
    {
      name: 'Virtual Reality Headset',
      description:
        'Dive into immersive virtual worlds with VR headsets, perfect for gaming, entertainment, and even educational experiences.',
      image: 'VRheadset.png',
      category: categories[0]._id,
      price: 999.99,
      qauntity: 100
    },
    {
      name: 'The Alchemist" by Paulo Coelho',
      description:
        "A timeless tale of self-discovery and following one's dreams.",
      image: 'alchemist.jpg',
      category: categories[1]._id,
      price: 19.99,
      qauntity: 500
    },
    {
      name: 'Becoming" by Michelle Obama',
      description:
        'The memoir of the former First Lady of the United States, sharing her journey from childhood to the White House.',
      image: 'Becoming.jpg',
      category: categories[1]._id,
      price: 19.99,
      qauntity: 500
    },
    {
      name: 'Sapiens: A Brief History of Humankind',
      description:
        'A thought-provoking exploration of the history of Homo sapiens and the forces that have shaped our species.',
      image: 'sapiens.jpg',
      category: categories[1]._id,
      price: 19.99,
      qauntity: 500
    },
    {
      name: 'The Great Gatsby by F. Scott Fitzgerald',
      description:
        'The Great Gatsby" follows the enigmatic Jay Gatsby and his pursuit of the American Dream.',
      image: 'gatsby.jpg',
      category: categories[1]._id,
      price: 19.99,
      qauntity: 500
    },
    {
      name: 'To Kill a Mockingbird" by Harper Lee',
      description:
        'To Kill a Mockingbird explores themes of racial injustice, moral growth, and compassion in the Deep South during the 1930s.',
      image: 'mockingbird.jpg',
      category: categories[1]._id,
      price: 19.99,
      qauntity: 500
    },
    {
      name: 'Dune by Frank Herbert',
      description:
        'Dune is a timeless science fiction masterpiece that transports readers to the desert planet of Arrakis, where noble houses vie for control of the most valuable substance in the universe: spice.',
      image: 'dune.jpg',
      category: categories[1]._id,
      price: 19.99,
      qauntity: 500
    },













  ]);
});
