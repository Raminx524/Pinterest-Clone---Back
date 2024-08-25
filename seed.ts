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

    
    
    await User.deleteMany({});
    await Board.deleteMany({});
    await Pin.deleteMany({});
    await Comment.deleteMany({});
    await Like.deleteMany({});
    console.log("Existing data cleared");

    
    
    const user = new User({
      firebaseUid: `uid_12345`,
      email: `user@example.com`,
      username: `user`,
      avatarUrl: `http:
      
      //example.com/avatar.png`,
      bio: `Bio for user`,
      boards: [],
      pins: [],
      followers: [],
      following: []
    });
    await user.save();
    console.log("User created");

    
    
    const boards = [];
    for (let i = 1; i <= 2; i++) {
      const board = new Board({
        user: user._id,
        title: `Board ${i}`,
        description: `Description for board ${i}`,
      });
      await board.save();
      boards.push(board);
      user.boards.push(board._id);
    }
    await user.save(); 
    
    console.log("Boards created");

    const pins = [];
    for (const board of boards) {
      for (let i = 1; i <= 3; i++) {
        const pin = new Pin({
          user: board.user,
          title: `Pin ${i}`,
          description: `Description for pin ${i}`,
          imageUrl: `http:
          
          //example.com/image${i}.png`,
          board: board._id,
        });
        await pin.save();
        pins.push(pin);

        
        
        for (let j = 1; j <= 3; j++) {
          const comment = new Comment({
            user: user._id, 
            
            pin: pin._id,
            text: `Comment ${j} on pin ${i}`,
          });
          await comment.save();
        }

        
        
        for (let k = 0; k < 2; k++) {
          const like = new Like({
            user: user._id, 
            
            pin: pin._id,
          });
          await like.save();
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
