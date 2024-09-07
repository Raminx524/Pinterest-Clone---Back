import dotenv from "dotenv";
import mongoose from "mongoose";
import Topic from "../models/topic.model";
dotenv.config();

const seedData = [
  { title: "Home", image: "" },
  { title: "Fashion", image: "" },
  { title: "Food", image: "" },
  { title: "Beauty", image: "" },
  { title: "Travel", image: "" },
  { title: "DIY", image: "" },
  { title: "Art", image: "" },
  { title: "Health", image: "" },
  { title: "Weddings", image: "" },
  { title: "Technology", image: "" },
  { title: "Parenting", image: "" },
  { title: "Business", image: "" },
  { title: "Motivation", image: "" },
  { title: "Gardening", image: "" },
  { title: "Hobbies", image: "" },
  { title: "Education", image: "" },
  { title: "Entertainment", image: "" },
  { title: "Sustainability", image: "" },
  { title: "Sports", image: "" },
  { title: "Pets", image: "" },
  { title: "Photography", image: "" },
  { title: "Interior Design", image: "" },
  { title: "Streetwear", image: "" },
  { title: "Vegan Recipes", image: "" },
  { title: "Makeup Tutorials", image: "" },
  { title: "Adventure Travel", image: "" },
  { title: "Crafting", image: "" },
  { title: "Fitness", image: "" },
  { title: "Wedding Dresses", image: "" },
  { title: "Gadgets", image: "" },
  { title: "Baby Tips", image: "" },
  { title: "Marketing Strategies", image: "" },
  { title: "Inspiration", image: "" },
  { title: "Flower Gardening", image: "" },
  { title: "Painting", image: "" },
  { title: "Online Learning", image: "" },
  { title: "Movies", image: "" },
  { title: "Eco-friendly Living", image: "" },
  { title: "Camping", image: "" },
  { title: "Dog Care", image: "" },
  { title: "Graphic Design", image: "" },
  { title: "Minimalist Decor", image: "" },
  { title: "Seasonal Fashion", image: "" },
  { title: "Baking", image: "" },
  { title: "Skincare", image: "" },
  { title: "Beach Travel", image: "" },
  { title: "Woodworking", image: "" },
  { title: "Yoga", image: "" },
  { title: "Event Planning", image: "" },
  { title: "Wearable Tech", image: "" },
  { title: "Toddler Activities", image: "" },
  { title: "Entrepreneurship", image: "" },
  { title: "Self-care", image: "" },
  { title: "Landscape Design", image: "" },
  { title: "Craft Supplies", image: "" },
  { title: "Language Learning", image: "" },
  { title: "TV Shows", image: "" },
  { title: "Recycling Tips", image: "" },
  { title: "Hiking", image: "" },
  { title: "Cat Care", image: "" },
  { title: "Digital Art", image: "" },
  { title: "Kitchen Design", image: "" },
  { title: "Runway Fashion", image: "" },
  { title: "Desserts", image: "" },
  { title: "Haircare", image: "" },
  { title: "Mountain Adventures", image: "" },
  { title: "Knitting", image: "" },
  { title: "Workout Plans", image: "" },
  { title: "Bridal Ideas", image: "" },
  { title: "Smart Home", image: "" },
  { title: "Kids Education", image: "" },
  { title: "Financial Planning", image: "" },
  { title: "Mindfulness", image: "" },
  { title: "Succulent Gardens", image: "" },
  { title: "Illustration", image: "" },
  { title: "Work-from-Home Tips", image: "" },
  { title: "Book Recommendations", image: "" },
  { title: "Water Conservation", image: "" },
  { title: "Cycling", image: "" },
  { title: "Exotic Pets", image: "" },
  { title: "Animation", image: "" },
  { title: "Outdoor Living", image: "" },
  { title: "Vintage Fashion", image: "" },
  { title: "Quick Meals", image: "" },
  { title: "Perfumes", image: "" },
  { title: "Road Trips", image: "" },
  { title: "Origami", image: "" },
  { title: "Pilates", image: "" },
  { title: "Wedding Decorations", image: "" },
  { title: "Wearables", image: "" },
  { title: "Baby Products", image: "" },
  { title: "Small Business", image: "" },
  { title: "Personal Growth", image: "" },
  { title: "Herb Gardening", image: "" },
  { title: "Sculpture", image: "" },
  { title: "Freelancing", image: "" },
  { title: "Podcasts", image: "" },
  { title: "Organic Living", image: "" },
  { title: "Rock Climbing", image: "" },
  { title: "Bird Watching", image: "" },
  { title: "Tattoo Art", image: "" },
];

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in the environment variables");
    }
    await mongoose.connect(mongoUri);

    console.log("Database connected");

    // Clear existing data
    await Topic.deleteMany({});
    console.log("Existing data cleared");

    // Insert seed data
    await Topic.insertMany(seedData);
    console.log("Data seeded successfully");

    mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding data:", error);
    mongoose.disconnect();
  }
};

seedDatabase();
