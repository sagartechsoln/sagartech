const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const pageAuth = require("../middleware/pageAuth")
const multer = require('multer');
const fs = require('fs');

// Schemas
const ProductSchema = require('../models/ProductSchema')
const Admin = require('../models/admin')
const Category = require("../models/Category");
const enquirySchema = require('../models/ProductEnquiry');
const userSchema = require("../models/users");
const Blog = require("../models/blogSchema");

// Admin Login Route 
router.post("/admin_login", async (req, res) => {
  try {
    const { emailId, password } = req.body

    const AdminData = await Admin.findOne({ email: emailId })
    console.log(AdminData);
    if (!AdminData) {
      res.status(400).json({ message: "Invalid Data" })
    } else {
      const isMatch = await bcrypt.compare(password, AdminData.password)
      if (isMatch) {
        // Getting Generated Tokens 
        const token = await AdminData.generateAuthToken()

        res.cookie("vittobaAdminCookie", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true
        })
        res.status(200).json({ message: "Logged Successfully" })
      } else {
        res.status(400).json({ message: "Invalid Credentials" })
      }
    }
  } catch (error) {
    console.log(error);
  }
})

// Profile Page Router
router.get("/admin_profile", pageAuth, (req, res) => {
  res.send(req.rootAdmin)
})

//Admin Logout
router.get("/admin_logout", (req, res) => {
  res.cookie('vittobaAdminCookie', '', { expires: new Date(1) });
  res.send('Cookie cleared');
})

// Admin Update
router.post('/admin_update', async (req, res) => {
  try {
    const { id, firstName, lastName, middleName, position, joined_this_position_on, status } = req.body
    let status_num = status==='Active' ? 1 : 0
    // console.log(id)
    Admin.findByIdAndUpdate(id, { firstname: firstName, lastname: lastName, middlename: middleName, position, joined_this_position_on, status: status_num }, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Admin updated successfully!');
        res.status(200).send({ status: 200, message: 'done' })
      }
    });
  } catch (error) {
    console.log(error)
  }
})

// Add Product
router.post('/add_product', async (req, res) => {
  // Creating a new Product
  try {
    const { product_name, category, color, description,  company, material, price, quantity, size, weight, cta, makeitfeatured } = req.body.values
    const newProduct = new ProductSchema({ product_name, category, color, description, company, material, price, quantity, size, weight, cta, images0: [], images1: [], images2: [], images3: [], images4: [], images5: [], images6: [], makeitfeatured })

    newProduct.save((error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Product saved successfully!');
        res.status(200).send({ status: 200, message: 'done' })
      }
    });


  } catch (error) {
    console.log(error)
  }
})

// Update product
router.post('/update_product', async (req, res) => {
  // Creating a new product
  try {
    const { selectedKey } = req.body
    const { product_name, category, color, description, company, material, price, quantity, size, weight, cta, makeitfeatured } = req.body.values
    // console.log(name,party)
    ProductSchema.findByIdAndUpdate(selectedKey, { product_name, category, color, description, company, material, price, quantity, size, weight, cta, makeitfeatured }, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Product updated successfully!');
        res.status(200).send({ status: 200, message: 'done' })
      }
    });
  } catch (error) {
    console.log(error)
  }
})

// Delete Products
router.post('/delete_product', async (req, res) => {
  try {
    const { selectedKey } = req.body
    ProductSchema.deleteOne({ _id: selectedKey }, (err) => {
      if (!err) {
        res.status(200).send({ status: 200, message: 'done' })
      }
    })
  } catch (error) {
    console.log(error)
  }
})

// get all Products list 
router.get('/getAllProducts', (req, res) => {
  try {
    ProductSchema.find({}, function (err, Products) {
      if (err) throw err;
      res.status(200).send(Products);
    });
  } catch (error) {
    res.status(400).send(error);
  }
})

// Product Image upload on server
// Handle file upload
// img storage path
const imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads/products")
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()} - ${file.originalname}`)
  }
})

// img filter
const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true)
  } else {
    callback(new Error("only images is allowd"))
  }
}

// Create the multer upload instance
const upload = multer({ storage: imgconfig, fileFilter: isImage });
router.post('/uploadProductImage', upload.array('images'), (req, res) => {
  const files = req.files;
  const { ids, index } = req.body;
  if (files && files.length > 1) {
    res.status(401).json({ status: 400, message: 'Upload 1 image at a time.' });
  } else {
    ProductSchema.findByIdAndUpdate(
      ids,
      { $set: { [`images${index}`]: [] } },
      { new: true },
      (err, doc) => {
        if (err) {
          console.error(err);
          res.status(400).json({ status: 400, message: err });
        } else {
          doc[`images${index}`].push(files[0].filename);
          doc.save((err) => {
            if (err) {
              console.error(err);
              res.status(400).json({ status: 401, message: err });
            } else {
              res.status(200).json({ status: 200, message: 'Image Uploaded Successfully' });
            }
          });
        }
      }
    );
  }
});

router.delete('/deleteProductImage', async (req, res) => {
  const { imageUrl, selectedKey, imageIndex } = req.body;
  try {
    // Delete the image file from the folder
    fs.unlink(`uploads/products/${imageUrl}`, async (error) => {
      if (error) {
        console.log('Error deleting image file:', error);
        return res.status(500).json({ message: 'Error deleting image file' });
      }
      try {
        // Update the ProductSchema to set the specified imageIndex as an empty string
        const updateQuery = { $set: { [imageIndex]: "" } };
        const updatedProduct = await ProductSchema.findByIdAndUpdate(selectedKey, updateQuery, { new: true });
        if (updatedProduct) {
          console.log('Product Image updated successfully!');
          return res.status(200).json({ status: 200, message: 'done' });
        } else {
          console.log('Product not found');
          return res.status(404).json({ status: 404, message: 'Product not found' });
        }
      } catch (error) {
        console.log('Error updating product:', error);
        return res.status(500).json({ message: 'Error updating product' });
      }
    });
  } catch (error) {
    console.log('Error deleting image:', error);
    return res.status(500).json({ message: 'Error deleting image' });
  }
});

// ------------------------- Category AUTH ------------------------------- //
// Add Category
router.post('/add_category', async (req, res) => {
  // Creating a new Category
  try {
    const { category_name } = req.body.values
    const newCategory = new Category({ category_name })

    newCategory.save((error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Category saved successfully!');
        res.status(200).send({ status: 200, message: 'done' })
      }
    });


  } catch (error) {
    console.log(error)
  }
})

// get all Category list 
router.get('/getAllcategories', (req, res) => {
  try {
    Category.find({}, function (err, Category) {
      if (err) throw err;
      res.status(200).send(Category);
    });
  } catch (error) {
    res.status(400).send(error);
  }
})

// Update category
router.post('/update_category', async (req, res) => {
  // Creating a new category
  try {

    const { selectedKey } = req.body
    const { category_name } = req.body.values

    Category.findByIdAndUpdate(selectedKey, { category_name }, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Category updated successfully!');
        res.status(200).send({ status: 200, message: 'done' })
      }
    });
  } catch (error) {
    console.log(error)
  }
})

// Delete category
router.post('/delete_category', async (req, res) => {
  try {
    const { selectedKey } = req.body
    Category.deleteOne({ _id: selectedKey }, (err) => {
      if (!err) {
        res.status(200).send({ status: 200, message: 'done' })
      }
    })
  } catch (error) {
    console.log(error)
  }
})

// CATEGORY Image upload on server
// Handle file upload
// img storage path
const imgconfigCategory = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads/category")
  },
  filename: (req, file, callback) => {
    callback(null, `Category-${Date.now()} - ${file.originalname}`)
  }
})
// img filter
const isImageCategpry = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true)
  } else {
    callback(new Error("only images is allowd"))
  }
}

// Create the multer upload instance
const uploadCategory = multer({ storage: imgconfigCategory, fileFilter: isImageCategpry });
router.post('/uploadCategoryImage', uploadCategory.array('images'), (req, res) => {
  const files = req.files;
  const { ids } = req.body;
  Category.findByIdAndUpdate(ids, { imageCategory: files[0].filename }, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Category Image updated successfully!');
      res.status(200).send({ status: 200, message: 'Image Uploaded Successfully' })
    }
  });
});

router.delete('/deleteCategoryImage', async (req, res) => {
  const { imageUrl, selectedKey } = req.body;
  
  try {
    // Delete the image file from the folder
    fs.unlink(`uploads/category/${imageUrl}`, async (error) => {
      if (error) {
        console.log('Error deleting image file:', error);
        return res.status(500).json({ message: 'Error deleting image file' });
      }
      try {
        // Update the Category to set the specified imageIndex as an empty string
        const updateQuery = { $set: { imageCategory : "" } };
        const updateCategory = await Category.findByIdAndUpdate(selectedKey, updateQuery, { new: true });
        
        if (updateCategory) {
          console.log('Category Image updated successfully!');
          return res.status(200).json({ status: 200, message: 'done' });
        } else {
          console.log('Category not found');
          return res.status(404).json({ status: 404, message: 'Category not found' });
        }
      } catch (error) {
        console.log('Error updating Category:', error);
        return res.status(500).json({ message: 'Error updating Category' });
      }
    });
  } catch (error) {
    console.log('Error deleting image:', error);
    return res.status(500).json({ message: 'Error deleting image' });
  }
});

router.post("/productEnquirySchema", async (req, res) => {
  try {
    const { name, email, pid, productQuantity, description, status } = req.body;

    // Check if the enquiry already exists based on name, email, and product
    const existingEnquiry = await enquirySchema.findOne({
      name: name,
      email: email,
      product: pid
    });

    if (existingEnquiry) {
      return res.status(400).send({ status: 400, message: 'Enquiry already exists' });
    }

    const newEnquiry = new enquirySchema({
      name,
      email,
      product: pid,
      quantity: productQuantity,
      message: description,
      status
    });

    await newEnquiry.save();
    console.log('Enquiry saved successfully:', newEnquiry);
    res.status(200).send({ status: 200, message: 'Enquiry sent successfully' });
  } catch (error) {
    console.error('Error saving enquiry:', error);
    res.status(500).send({ status: 500, message: 'Something went wrong...' });
  }
});

// Get ALL Enquires 
router.get('/getAllEnquiries', (req, res) => {
  try {
    enquirySchema.find({}, function (err, enquirySchema) {
      if (err) throw err;
      res.status(200).send(enquirySchema);
    });
  } catch (error) {
    res.status(400).send(error);
  }
})


//------------- Blog Authentication  -------------------- //
// Add Blog
router.post('/add_blog', async (req, res) => {
  // Creating a new Blog
  try {
    const { title, tags } = req.body.values
    const content = req.body.descriptionCkeditor
    const newBlog = new Blog({ title, tags, content })

    newBlog.save((error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Blog saved successfully!');
        res.status(200).send({ status: 200, message: 'Blog saved successfully!' })
      }
    });
  } catch (error) {
    console.log(error)
  }
})

// Update blog
router.post('/update_blog', async (req, res) => {
  // Creating a new blog
  try {

    const { selectedKey } = req.body
    const { title, tags } = req.body.values
    const content = req.body.descriptionCkeditor

    Blog.findByIdAndUpdate(selectedKey, { title, tags, content }, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Blog updated successfully!');
        res.status(200).send({ status: 200, message: 'Blog updated successfully!' })
      }
    });
  } catch (error) {
    console.log(error)
  }
})

// Delete Blog
router.post('/delete_blog', async (req, res) => {
  try {
    const { selectedKey } = req.body
    Blog.deleteOne({ _id: selectedKey }, (err) => {
      if (!err) {
        res.status(200).send({ status: 200, message: 'Blog Deleted Successfully' })
      }
    })
  } catch (error) {
    console.log(error)
  }
})

// Get ALL Blog 
router.get('/getAllBlogs', (req, res) => {
  try {
    Blog.find({}, function (err, Blog) {
      if (err) throw err;
      res.status(200).send(Blog);
    });
  } catch (error) {
    res.status(400).send(error);
  }
})

// CATEGORY Image upload on server
// Handle file upload
// img storage path
const imgconfigBlog = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads/blog")
  },
  filename: (req, file, callback) => {
    callback(null, `blog-${Date.now()} - ${file.originalname}`)
  }
})
// img filter
const isImageBlog = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true)
  } else {
    callback(new Error("only images is allowd"))
  }
}

// Create the multer upload instance
const uploadBlogs = multer({ storage: imgconfigBlog, fileFilter: isImageBlog });
router.post('/uploadBlogsImage', uploadBlogs.array('images'), (req, res) => {
  const files = req.files;
  const { ids } = req.body;
  Blog.findByIdAndUpdate(ids, { image: files[0].filename }, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Blog Image updated successfully!');
      res.status(200).send({ status: 200, message: 'Blog Image Uploaded Successfully' })
    }
  });
});

router.delete('/deleteBlogImage', async (req, res) => {
  const { imageUrl, selectedKey, imageIndex } = req.body;
  try {
    // Delete the image file from the folder
    fs.unlink(`uploads/blog/${imageUrl}`, async (error) => {
      if (error) {
        console.log('Error deleting image file:', error);
        return res.status(500).json({ message: 'Error deleting image file' });
      }
      try {
        // Update the Blog to set the specified imageIndex as an empty string
        const updateQuery = { $set: { image: "" } };
        const updateBlog = await Blog.findByIdAndUpdate(selectedKey, updateQuery, { new: true });
        if (updateBlog) {
          console.log('Blog Image updated successfully!');
          return res.status(200).json({ status: 200, message: 'done' });
        } else {
          console.log('Blog not found');
          return res.status(404).json({ status: 404, message: 'Blog not found' });
        }
      } catch (error) {
        console.log('Error updating Blog:', error);
        return res.status(500).json({ message: 'Error updating Blog' });
      }
    });
  } catch (error) {
    console.log('Error deleting image:', error);
    return res.status(500).json({ message: 'Error deleting image' });
  }
});
// ------------------------- USER AUTHENTICATION LOGICS ------------------- //
router.post('/user_register', async (req, res) => {
  try {
    const { name, email, password } = req.body
    const UserExists = await userSchema.findOne({ email: email });

    if (UserExists) {
      res.status(400).json({ message: "User Already Exists" });
    } else {
      const UserSave = new userSchema({ fullName: name, email, password })
      const savedUser = await UserSave.save();
      const userId = savedUser._id;
      res.status(200).json({ userId, message: "Registered Successfully" });
    }

  } catch (error) {
    console.log(error)
  }
})

module.exports = router