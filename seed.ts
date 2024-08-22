import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/user.model';
import Board from './src/models/board.model';
import Pin from './src/models/pin.model';
import Comment from './src/models/comment.model';
import Like from './src/models/like.model';

dotenv.config();

(async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
    console.log("Database connected");

    // Clear existing data
    await User.deleteMany({});
    await Board.deleteMany({});
    await Pin.deleteMany({});
    await Comment.deleteMany({});
    await Like.deleteMany({});
    console.log("Existing data cleared");

    // Create users
    const users = [];
    for (let i = 1; i <= 5; i++) {
      const user = new User({
        firebaseUid: `uid_${i * 123}`,
        email: `user${i}@example.com`,
        username: `user${i}`,
        avatarUrl: `http://example.com/avatar${i}.png`,
        bio: `Bio for user ${i}`,
        boards: [],
        pins: [],
        followers: [],
        following: []
      });
      await user.save();
      users.push(user);
    }
    console.log("Users created");

    // Create boards
    const boards = [];
    for (const user of users) {
      for (let i = 1; i <= 4; i++) {
        const board = new Board({
          user: user._id,
          title: `Board ${i}`,
          description: `Description for board ${i}`,
        });
        await board.save();
        boards.push(board);
        user.boards.push(board._id);
      }
      await user.save(); // Update user's boards
    }
    console.log("Boards created");

    // Create pins and comments
    const pins = [];
    for (const board of boards) {
      for (let i = 1; i <= 3; i++) {
        const pin = new Pin({
          user: board.user,
          title: `Pin ${i}`,
          description: `Description for pin ${i}`,
          imageUrl: `http://example.com/image${i}.png`,
          boards: [board._id],
        });
        await pin.save();
        pins.push(pin);

        // Create comments
        for (let j = 1; j <= 4; j++) {
          const commentUser = users[Math.floor(Math.random() * users.length)];
          if (commentUser._id.toString() !== board.user.toString()) {
            const comment = new Comment({
              user: commentUser._id,
              pin: pin._id,
              text: `Comment ${j} on pin ${i}`,
            });
            await comment.save();
          }
        }

        // Create likes
        for (let k = 0; k < 3; k++) {
          const likeUser = users[Math.floor(Math.random() * users.length)];
          if (likeUser._id.toString() !== board.user.toString()) {
            const like = new Like({
              user: likeUser._id,
              pin: pin._id,
            });
            await like.save();
          }
        }
      }
    }
    console.log("Pins, comments, and likes created");

    console.log("Database seeded successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  }
})();
