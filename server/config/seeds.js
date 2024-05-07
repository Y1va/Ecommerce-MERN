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
    {
      name: 'Mens Polo Shirt',
      description:
        ' This classic polo shirt is a timeless addition to any wardrobe. Made from breathable cotton fabric, it features a ribbed collar and cuffs for a polished look.',
      image: 'menspoloshirt.jpg',
      category: categories[2]._id,
      price: 49.99,
      qauntity: 250
    },
    {
      name: 'Mens Nike Tracksuit set',
      description:
        'This versatile hooded sweatshirt is a must-have for casual wear. Made from soft cotton-polyester blend fabric, it features a kangaroo pocket and adjustable drawstring hood for added convenience.',
      image: 'nikeset.jpg',
      category: categories[2]._id,
      price: 74.99,
      qauntity: 250
    },
    {
      name: 'North Face Hoodie',
      description:
        'Stay warm and comfortable on all your outdoor adventures with The North Face Mens Half Dome Hoodie. Crafted from soft and durable cotton-polyester blend fabric, this hoodie offers the perfect combination of warmth and breathability',
      image: 'nfhoodie.jpg',
      category: categories[2]._id,
      price: 99.99,
      qauntity: 250
    },
    {
      name: 'Mens Slim-Fit Dress Shirt',
      description:
        'A classic wardrobe staple, this slim-fit dress shirt is perfect for formal occasions or professional settings. Made from high-quality cotton blend fabric, it offers both style and comfort.',
      image: 'shirt.jpg',
      category: categories[2]._id,
      price: 49.99,
      qauntity: 250
    },
    {
      name: 'Womens High-Waisted Skinny Jeans',
      description:
        'These high-waisted skinny jeans are designed to flatter and elongate the silhouette.',
      image: 'wmnsjeans.jpg',
      category: categories[2]._id,
      price: 49.99,
      qauntity: 250
    },
    {
      name: 'Womens Wrap Dress',
      description:
        'Elegant and versatile, this wrap dress is perfect for both casual and formal occasions. With its flattering silhouette and adjustable tie waist, it offers comfort and style.',
      image: 'wrapdress.png',
      category: categories[2]._id,
      price: 38.99,
      qauntity: 250
    },
    {
      name: 'Industrial Style Bookcase',
      description:
        'Organize your books, decor, and keepsakes with this industrial-style bookcase. Made from metal and reclaimed wood, it combines rugged charm with functional storage, perfect for adding character to any room.',
      image: 'bookshelf.jpg',
      category: categories[3]._id,
      price: 38.99,
      qauntity: 250
    },
    {
      name: 'Scandinavian Coffee Table',
      description:
        'Bring Scandinavian charm to your living room with this coffee table. Its clean lines, natural wood finish, and minimalist design create a timeless centerpiece for your seating area.',
      image: 'coffeetable.jpg',
      category: categories[3]._id,
      price: 174.99,
      qauntity: 90
    },
    {
      name: 'Mid-Century Modern Sofa',
      description:
        ' Elevate your living room with this sleek and stylish mid-century modern sofa. Featuring clean lines, tapered legs, and button-tufted cushions, it adds a touch of retro charm to any space.',
      image: 'modernsofa.jpg',
      category: categories[3]._id,
      price: 799.99,
      qauntity: 300
    },
    {
      name: 'Ergonomic Office Chair',
      description:
        'Stay comfortable and productive with this ergonomic office chair. Adjustable lumbar support, padded armrests, and breathable mesh upholstery provide optimal comfort during long work hours.',
      image: 'officechair.jpg',
      category: categories[3]._id,
      price: 249.99,
      qauntity: 300
    },
    {
      name: 'Outdoor Patio Set',
      description:
        "Transform your outdoor space into an oasis of relaxation with this patio set. Complete with a table and chairs, it's perfect for al fresco dining, entertaining guests, or simply enjoying a morning cup of coffee in the sun.",
      image: 'outdoorpatioset.png',
      category: categories[3]._id,
      price: 1099.99,
      qauntity: 250
    },
    {
      name: 'Leather Recliner Sofa',
      description:
        "Sink into luxury with this leather recliner sofa. Featuring plush cushioning, padded armrests, and a reclining mechanism, it's the perfect spot to unwind after a long day.",
      image: 'reclinesofa.jpg',
      category: categories[3]._id,
      price: 799.99,
      qauntity: 250
    },
    {
      name: 'Floating Wall Shelves',
      description:
        'Crafted from high-quality MDF wood and featuring a sleek, minimalist design, these shelves offer both style and functionality for any room in your home.',
      image: 'wallshelves.jpg',
      category: categories[3]._id,
      price: 99.99,
      qauntity: 100
    },
    {
      name: 'Air Fryer',
      description:
        'Experience guilt-free frying with our Compact Air Fryer. This innovative appliance uses rapid air technology to fry your favorite foods with little to no oil, resulting in crispy and delicious results every time. ',
      image: 'airfryer.jpg',
      category: categories[4]._id,
      price: 99.99,
      qauntity: 100
    },
    {
      name: 'Electric Kettle',
      description:
        'Boil water quickly and efficiently with this electric kettle. Whether for making tea, coffee, or instant noodles, its sleek design and rapid heating make it a convenient addition to any kitchen countertop.',
      image: 'electrickettle.jpg',
      category: categories[4]._id,
      price: 84.99,
      qauntity: 400
    },
    {
      name: 'Kitchen Knife Set',
      description:
        "Equip your kitchen with this comprehensive knife set, complete with chef's knives, paring knives, and steak knives, all stored in a stylish wooden block. With sharp blades and ergonomic handles, it's perfect for slicing, dicing, and chopping ingredients with precision.",
      image: 'kitchenknifeset.jpg',
      category: categories[4]._id,
      price: 149.99,
      qauntity: 150
    },
    {
      name: 'Nespresso Coffee Machine',
      description:
        'This sleek and compact machine offers the ultimate convenience and versatility, allowing you to brew both espresso and coffee with the touch of a button.',
      image: 'nespressomachine.jpg',
      category: categories[4]._id,
      price: 199.99,
      qauntity: 150
    },
    {
      name: 'Non-Stick Bakeware Set',
      description:
        "Bake delicious treats with this non-stick bakeware set, including cookie sheets, cake pans, and muffin tins. Designed for easy release and cleanup, it's a must-have for any home baker.",
      image: 'nsbakewareset.jpg',
      category: categories[4]._id,
      price: 74.99,
      qauntity: 150
    },
    {
      name: 'Spice Rack Organiser',
      description:
        'Keep spices neat and accessible with this spice rack organiser. Featuring tiered shelves or magnetic strips, it mounts to the wall or fits inside cabinets for efficient storage.',
      image: 'spicerackorganiser.jpg',
      category: categories[4]._id,
      price: 34.99,
      qauntity: 250
    },
    {
      name: 'Stainless Steel Cookware Set',
      description:
        "Upgrade your kitchen with this durable stainless steel cookware set. Including pots, pans, and lids, it's perfect for cooking a variety of dishes with ease and efficiency.",
      image: 'SSset.jpg',
      category: categories[4]._id,
      price: 164.99,
      qauntity: 250
    }
  ]);

  console.log('products seeded');

  await User.create({
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bob@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Harry',
    lastName: 'Holt',
    email: 'harry@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
