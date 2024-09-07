import mongoose, { Types } from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import User from "./src/models/user.model"; // замените на правильный путь импорта вашей модели User
import Pin from "./src/models/pin.model"; // замените на правильный путь импорта вашей модели Pin
import Board from "./src/models/board.model"; // замените на правильный путь импорта вашей модели Board

// Настройка Cloudinary
cloudinary.config({
  cloud_name: "dikbmr1ja",
  api_key: "368445348754717",
  api_secret: "nIk9pHfXhOwFSRpRYA8fAqj7o94",
});

async function createPinsFromCloudinary() {
  try {
    // Подключение к MongoDB
    await mongoose.connect(
      "mongodb+srv://raminx524:832514473o@cluster0.1grnnsu.mongodb.net/Pinterest-Clone?retryWrites=true&w=majority&appName=Cluster0"
    );

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
    });

    await board.save();
    console.log("Board created:", board);

    // Добавление ID доски в массив boards пользователя
    user.boards.push(board._id as Types.ObjectId); // Явное приведение к ObjectId
    await user.save();
    console.log("User updated with board:", user);

    // Получение изображений из Cloudinary
    cloudinary.api.resources(
      {
        type: "upload",
        max_results: 500,
        // prefix: 'xx' // добавьте ваш префикс папки, если требуется
      },
      async function (error, result) {
        if (error) {
          console.error("Error fetching images from Cloudinary:", error);
          return;
        }

        try {
          // Определение типа ресурса
          interface CloudinaryResource {
            url: string;
          }

          const imageUrls = result.resources.map(
            (resource: CloudinaryResource) => resource.url
          );

          // Проход по каждому URL и создание объекта Pin
          for (let i = 0; i < imageUrls.length; i++) {
            const newPin = new Pin({
              user: user._id as Types.ObjectId, // Явное приведение к ObjectId
              title: `Pin ${i + 1}`,
              imageUrl: imageUrls[i],
              description: `Description for Pin ${i + 1}`,
              board: board._id as Types.ObjectId, // Явное приведение к ObjectId
              comments: [],
            });

            await newPin.save();
            console.log(`Pin ${i + 1} created with URL: ${imageUrls[i]}`);

            // Добавление Pin к доске
            board.pins.push(newPin._id as Types.ObjectId); // Явное приведение к ObjectId
          }

          // Сохранение доски с привязкой к Pin
          await board.save();
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
