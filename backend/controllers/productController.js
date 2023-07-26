import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// @dec Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @dec Fetch a specific products
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @dec Create a products
// @route POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    category: 'Sample category',
    brand: 'Sample brand',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: 'Product deleted' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create a new product review
// @route   POST /api/products/:id/reviews
// @access  Private
// const createProductReview = asyncHandler(
//   async (req, res) => {
//     const { rating, comment } = req.body;
//     const product = await Product.findById(req.params.id);

//     if (product) {
//       const alreadyReviewed = product.numReviews.find(
//         (review) =>
//           review.user.toString() === req.user._id.toString()
//       );
//       if (alreadyReviewed) {
//         res.status(400);
//         throw new Error(
//           "You've already submitted a review"
//         );
//       }
//       const review = {
//         name: req.user.name,
//         rating: Number(rating),
//         comment,
//         user: req.user._id,
//       };
//       product.numReviews.push(review);
//       product.numReviews = product.numReviews.length;
//       product.rating =
//         product.numReviews.reduce(
//           (acc, review) => acc + review.rating,
//           0
//         ) / product.numReviews.length;

//       await product.save();
//       res
//         .status(201)
//         .json({ message: 'Review has been added' });
//     } else {
//       res.status(404);
//       throw new Error('Resource not found');
//     }
//   }
// );
const createProductReview = asyncHandler(
  async (req, res) => {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error('Product already reviewed');
      }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce(
          (acc, item) => item.rating + acc,
          0
        ) / product.reviews.length;

      await product.save();
      res.status(201).json({ message: 'Review added' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  }
);
export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
};
