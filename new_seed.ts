import mongoose, { Types } from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import User from "./src/models/user.model"; // замените на правильный путь импорта вашей модели User
import Pin from "./src/models/pin.model"; // замените на правильный путь импорта вашей модели Pin
import Board from "./src/models/board.model"; // замените на правильный путь импорта вашей модели Board
import { log } from "console";
import dotenv from "dotenv";
dotenv.config(); // Load env vars

// Настройка Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function createPinsFromCloudinary() {
  const topicIds = [
    "66dc4fc82fc11629ecd3c3ad", // Home
    "66dc4fc82fc11629ecd3c3ae", // Fashion
    "66dc4fc82fc11629ecd3c3af", // Food
    "66dc4fc82fc11629ecd3c3b0", // Beauty
    "66dc4fc82fc11629ecd3c3b1", // Travel
    "66dc4fc82fc11629ecd3c3b2", // DIY
    "66dc4fc82fc11629ecd3c3b3", // Art
    "66dc4fc82fc11629ecd3c3b4", // Health
    "66dc4fc82fc11629ecd3c3b5", // Weddings
    "66dc4fc82fc11629ecd3c3b6", // Technology
    "66dc4fc82fc11629ecd3c3b7", // Parenting
    "66dc4fc82fc11629ecd3c3b8", // Business
    "66dc4fc82fc11629ecd3c3b9", // Motivation
    "66dc4fc82fc11629ecd3c3ba", // Gardening
    "66dc4fc82fc11629ecd3c3bb", // Hobbies
    "66dc4fc82fc11629ecd3c3bc", // Education
    "66dc4fc82fc11629ecd3c3bd", // Sports
    "66dc4fc82fc11629ecd3c3be", // Pets
    "66dc4fc82fc11629ecd3c3bf", // Photography
    "66dc4fc82fc11629ecd3c3c0", // Interior Design
    "66dc4fc82fc11629ecd3c3c1", // Vegan Recipes
    "66dc4fc82fc11629ecd3c3c2", // Makeup Tutorials
    "66dc4fc82fc11629ecd3c3c3", // Adventure Travel
    "66dc4fc82fc11629ecd3c3c4", // Fitness
    "66dc4fc82fc11629ecd3c3c5", // Wedding Dresses
    "66dc4fc82fc11629ecd3c3c6", // Gadgets
    "66dc4fc82fc11629ecd3c3c7", // Baby Tips
    "66dc4fc82fc11629ecd3c3c8", // Inspiration
    "66dc4fc82fc11629ecd3c3c9", // Flower Gardening
    "66dc4fc82fc11629ecd3c3ca", // Painting
    "66dc4fc82fc11629ecd3c3cb", // Movies
    "66dc4fc82fc11629ecd3c3cc", // Eco-friendly Living
    "66dc4fc82fc11629ecd3c3cd", // Camping
    "66dc4fc82fc11629ecd3c3ce", // Graphic Design
    "66dc4fc82fc11629ecd3c3cf", // Baking
    "66dc4fc82fc11629ecd3c3d0", // Skincare
    "66dc4fc82fc11629ecd3c3d1", // Woodworking
    "66dc4fc82fc11629ecd3c3d2", // Yoga
    "66dc4fc82fc11629ecd3c3d3", // Self-care
    "66dc4fc82fc11629ecd3c3d4", // Language Learning
    "66dc4fc82fc11629ecd3c3d5", // TV Shows
    "66dc4fc82fc11629ecd3c3d6", // Hiking
    "66dc4fc82fc11629ecd3c3d7", // Kitchen Design
    "66dc4fc82fc11629ecd3c3d8", // Desserts
    "66dc4fc82fc11629ecd3c3d9", // Mountains
    "66dc4fc82fc11629ecd3c3da", // Knitting
    "66dc4fc82fc11629ecd3c3db", // Mindfulness
    "66dc4fc82fc11629ecd3c3dc", // Illustration
    "66dc4fc82fc11629ecd3c3dd", // Books
    "66dc4fc82fc11629ecd3c3de", // Cycling
    "66dc4fc82fc11629ecd3c3df", // Exotic Pets
    "66dc4fc82fc11629ecd3c3e0", // Animation
    "66dc4fc82fc11629ecd3c3e1", // Outdoor Living
    "66dc4fc82fc11629ecd3c3e2", // Vintage Fashion
    "66dc4fc82fc11629ecd3c3e3", // Perfumes
    "66dc4fc82fc11629ecd3c3e4", // Road Trips
    "66dc4fc82fc11629ecd3c3e5", // Origami
    "66dc4fc82fc11629ecd3c3e6", // Pilates
    "66dc4fc82fc11629ecd3c3e7", // Wedding Decorations
    "66dc4fc82fc11629ecd3c3e8", // Wearables
    "66dc4fc82fc11629ecd3c3e9", // Baby Products
  ];

  // Функция для случайного выбора нескольких элементов из массива
  function getRandomTopics() {
    const shuffledTopics = topicIds.sort(() => 0.5 - Math.random()); // Перемешиваем массив
    const randomCount = Math.floor(Math.random() * (5 - 2 + 1)) + 2; // Генерируем число от 2 до 5
    return shuffledTopics.slice(0, randomCount); // Берем случайные топики
  }

  try {
    // Подключение к MongoDB
    await mongoose.connect(process.env.MONGO_URI as string);
    await Pin.deleteMany();
    await Board.deleteMany();
    console.log("Connected to MongoDB");

    // Создание нового пользователя
    const user = new User({
      firebaseUid: "exampleUid",
      email: "example@example.com",
      username: "exampleUser",
      dob: "2000-01-01",
      gender: "male",
      country: "ExampleCountry",
      avatarUrl: "", // URL из Cloudinary позже
      bio: "This is an example user",
      searchHistory: [],
      boards: [],
      topics: [],
      pins: [],
      followers: [],
      following: [],
    });

    await user.save();
    console.log("User created:", user);

    // Создание новой доски
    const board = new Board({
      user: user._id as Types.ObjectId, // Явное приведение к ObjectId
      title: "Example Board",
      description: "This is an example board",
      pins: [],
      isVisible: true,
    });

    await board.save();
    console.log("Board created:", board);

    user.boards.push(board._id as Types.ObjectId);
    await user.save();
    console.log("User updated with board:", user);

    cloudinary.api.resources(
      {
        type: "upload",
        max_results: 500,
      },
      async function (error, result) {
        if (error) {
          console.error("Error fetching images from Cloudinary:", error);
          return;
        }

        try {
          interface CloudinaryResource {
            secure_url: string;
          }

          const imageUrls = result.resources.map(
            (resource: CloudinaryResource) => resource.secure_url
          );

          for (let i = 0; i < imageUrls.length; i++) {
            const newPin = new Pin({
              user: user._id as Types.ObjectId,
              title: `Pin ${i + 1}`,
              imageUrl: imageUrls[i],
              description: `Description for Pin ${i + 1}`,
              board: board._id as Types.ObjectId,
              comments: [],
              topics: getRandomTopics(),
            });

            await newPin.save();
            console.log(`Pin ${i + 1} created with URL: ${imageUrls[i]}`);

            // Добавление Pin к доске
            board.pins.push(newPin._id as Types.ObjectId);
            user.pins.push(newPin._id as Types.ObjectId);
          }
          // Сохранение доски с привязкой к Pin
          await board.save();
          await user.save();
          console.log("Board updated with pins:", board);
        } catch (dbError) {
          console.error("Error saving data to database:", dbError);
        } finally {
          // Отключение от MongoDB после завершения работы
          mongoose.disconnect();
          console.log("Disconnected from MongoDB");
        }
      }
    );
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

createPinsFromCloudinary();
