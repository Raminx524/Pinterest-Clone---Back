import dotenv from "dotenv";
import mongoose from "mongoose";
import Topic from "../models/topic.model";
dotenv.config();

const seedData = [
  {
    title: "Home",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725712138/Exterior-Lighting-Designs-by-Interior-Designer-Vishal-kumar-Rewari-_-Kolo-Transitional-Style-koloapp.in__d5fjnp.jpg",
  },
  {
    title: "Fashion",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725712260/3dcca66f-70c2-48dc-b7bb-15831b0ab071.png",
  },
  {
    title: "Food",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725712436/4a35a75c-7d16-414b-9ba7-9f094e2df9d6.png",
  },
  {
    title: "Beauty",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725712469/c40d0af9-e0d2-4de6-a7c4-7c51c26c3790.png",
  },
  {
    title: "Travel",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725712492/b3a4414b-008b-49c8-b551-c2a4128b8fa1.png",
  },
  {
    title: "DIY",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725712542/2526f58e-c3ac-432a-be1f-c3757b2007ee.png",
  },
  {
    title: "Art",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725712589/7e1b68af-fa03-4fef-a7bf-ffc85dab315b.png",
  },
  {
    title: "Health",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725712623/3fba4d74-ae07-4da5-9f94-9c10960c5efb.png",
  },
  {
    title: "Weddings",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725712668/a2c5acf2-f67f-4314-b0e5-ad2591f88903.png",
  },
  {
    title: "Technology",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725712751/aa86e42e-509d-44c9-b9be-616c1c29c008.png",
  },
  {
    title: "Parenting",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725712823/8b224ad9-5a0d-47ec-a814-5141fedf1b77.png",
  },
  {
    title: "Business",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725712848/9d67f7ea-10e5-462b-b055-5a0d8eee839a.png",
  },
  {
    title: "Motivation",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725712903/6ae04fa8-c31d-4c14-8b7b-5e0f19d42865.png",
  },
  {
    title: "Gardening",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725712927/db60e2da-d842-48f1-9574-0fd5ffa7e2aa.png",
  },
  {
    title: "Hobbies",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725712952/6e3500d6-89e2-4817-a4e4-0d4e6abb56d1.png",
  },
  {
    title: "Education",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725713020/cb3dfa0e-7ca5-4ae6-8d7a-d9df9b0b0af3.png",
  },
  {
    title: "Sports",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725713081/ab66e513-4a4e-48f9-bc81-88d673dda095.png",
  },
  {
    title: "Pets",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725713158/9ff7eaa0-486c-4a7b-a41e-b4cf1876f2f8.png",
  },
  {
    title: "Photography",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725713182/d49a4229-7fcd-4a95-91e9-08d3a2f1d255.png",
  },
  {
    title: "Interior Design",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725713211/c51ede6a-439f-45ce-ad51-cf3dda613d5c.png",
  },
  {
    title: "Vegan Recipes",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725713243/39af9bb3-6d1e-4607-8324-9b258c3672f4.png",
  },
  {
    title: "Makeup Tutorials",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725713292/40733fcb-e7d0-4b79-937f-3c18accec330.png",
  },
  {
    title: "Adventure Travel",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725713318/3202af7e-b216-42dd-80f6-f673e33cc742.png",
  },
  {
    title: "Fitness",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725713403/5ddaaabf-cdb2-4357-9159-536d1d69a491.png",
  },
  {
    title: "Wedding Dresses",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725713440/e68efdee-e55c-411e-9e8d-cadaed2fcee9.png",
  },
  {
    title: "Gadgets",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725713499/0cae0abb-0138-465d-8885-60f8e96f4ad3.png",
  },
  {
    title: "Baby Tips",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725713647/a432b15d-423a-401f-940e-514e34e202f0.png",
  },
  {
    title: "Inspiration",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725713909/0b42c1a5-cac4-4e35-9154-69210921c16c.png",
  },
  {
    title: "Flower Gardening",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725713950/234a99b3-7438-4022-b3fa-5309cbe2ccf0.png",
  },
  {
    title: "Painting",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725713983/6af2cb2f-c40e-48c1-a571-b831a5d7859b.png",
  },
  {
    title: "Movies",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725714033/586555f2-bc49-4519-977b-584a133103ab.png",
  },
  {
    title: "Eco-friendly Living",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725714068/255e6912-2713-42e8-b3aa-8324949b2eaf.png",
  },
  {
    title: "Camping",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725714095/7ae83a56-be01-4018-b668-94f7ceb99b11.png",
  },
  {
    title: "Graphic Design",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725714140/41886d1c-b57a-4655-99c5-9129f2116779.png",
  },
  {
    title: "Baking",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725714201/042280c7-6070-4224-b08e-da191118ac2c.png",
  },
  {
    title: "Skincare",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725714120/4837f86f-eb71-46ec-805e-da06bffaae2c.png",
  },
  {
    title: "Woodworking",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725714090/4c696908-6181-4792-a4d1-0cfed685dc6a.png",
  },
  {
    title: "Yoga",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725714069/4f20ed0f-108d-4d0d-9f1e-bce5805cab10.png",
  },
  {
    title: "Self-care",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725714033/a83c59e2-a1bd-48bc-99b8-448f0909bcc5.png",
  },
  {
    title: "Language Learning",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725713943/0ab3228a-4a3b-4a12-aad5-8828ced33657.png",
  },
  {
    title: "TV Shows",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725713880/e0eb329f-5b02-4423-8b48-2b0eccc8a13f.png",
  },
  {
    title: "Hiking",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725713838/11852ad5-56c6-48f5-959f-598a230af8cf.png",
  },
  {
    title: "Kitchen Design",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725713733/5cffd0b6-58e2-4a66-9c25-a5d8b631c328.png",
  },
  {
    title: "Desserts",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725713701/604f0d08-d28b-482a-9020-7ce755d9e718.png",
  },
  {
    title: "Mountains",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725713667/b0f4c117-24c0-4bc9-8ff8-4ebe321fd999.png",
  },
  {
    title: "Knitting",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725713626/ca4b1cd9-0165-4ae9-b302-206f403d3037.png",
  },
  {
    title: "Mindfulness",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725713547/49270e4a-b9a9-45bb-ab6c-03edcc0a837e.png",
  },
  {
    title: "Illustration",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725713518/7ed2470b-acc5-40c7-8027-e9a2a9bddb1d.png",
  },
  {
    title: "Books",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725713399/b5e0a060-d18a-438f-bc8b-fc8c12af152a.png",
  },
  {
    title: "Cycling",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725713326/38af7f74-36cb-4b1f-a86a-c7731ddd866f.png",
  },
  {
    title: "Exotic Pets",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725713298/74996b00-8ca7-42da-b69b-1a370044bd3b.png",
  },
  {
    title: "Animation",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725713272/aae2bc9e-e18e-4985-a5a2-67e6cec5f3bb.png",
  },
  {
    title: "Outdoor Living",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725713198/fe153687-4819-48d2-af27-79711d1d71bd.png",
  },
  {
    title: "Vintage Fashion",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725713154/09b6aa5a-b25f-40c6-9d42-ff9ff7b98b2f.png",
  },
  {
    title: "Perfumes",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725713113/d4c9aeef-4c8b-4c76-9c2e-7dade4e74c61.png",
  },
  {
    title: "Road Trips",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725713045/363a10ea-485e-4a48-b2e9-c68ba6db0bd6.png",
  },
  {
    title: "Origami",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725713016/7a9ffae0-38d8-4ae7-bcbb-602de0da7b66.png",
  },
  {
    title: "Pilates",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725712944/8d1ddfab-c073-4b42-8a5c-632051efe753.png",
  },
  {
    title: "Wedding Decorations",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725712916/1c151d42-33ac-4550-add5-9230ad786118.png",
  },
  {
    title: "Wearables",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725712879/4d6d9add-039d-4e51-9f3f-d88373ad8987.png",
  },
  {
    title: "Baby Products",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725712842/63bd7579-9578-4c03-bd75-dbc04214f5ee.png",
  },
  {
    title: "Business",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725712732/fbfca043-4a9e-4e20-b681-d00f686b7558.png",
  },
  {
    title: "Herb Gardening",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725712647/e1dbc2d4-fc3b-4003-af4f-f5a6b43697dd.png",
  },
  {
    title: "Sculpture",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725712593/09b53ad8-c207-43a9-befa-f7c4246ac0ce.png",
  },
  {
    title: "Organic Living",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725712504/b90c6c10-8619-4d5e-bdba-a1aef1070866.png",
  },
  {
    title: "Rock Climbing",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725712452/80310336-29cf-4c5f-bb72-b1c1d9cd25ac.png",
  },
  {
    title: "Bird Watching",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725712385/5bb6f2ca-da1f-43c2-bb5d-98779ae82a26.png",
  },
  {
    title: "Tattoo Art",
    image:
      "https://res.cloudinary.com/dtnear5xs/image/upload/v1725712315/Tattoo_cs6ugp.jpg",
  },
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
