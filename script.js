const cloudinary = require("cloudinary").v2;
require("dotenv").config();

(async function () {
  // Configure Cloudinary
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    // Retrieve all images from Cloudinary
    const resources = await cloudinary.api.resources({
      type: "upload", // Specifies that you want to get uploaded resources
      resource_type: "image", // Specifies that you want images
      max_results: 500, // Optional: Set the number of results you want (default is 10, max is 500)
    });

    // Print the URLs of the images
    resources.resources.forEach((resource) => {
      console.log(resource.secure_url);
    });

    // You can also access other details of each image
    // console.log(resources.resources);
  } catch (error) {
    console.error("Error retrieving images:", error);
  }
})();
