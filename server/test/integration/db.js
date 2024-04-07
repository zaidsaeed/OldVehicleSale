const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongod = MongoMemoryServer.create();

const User = require("../../models/User.js");

const loadData = async () => {
  await User.create({
    name: "Dummy Account",
    email: "dummyaccount@gmail.com",
    password: "$2a$10$xXPCOPBhVxfuM5wWaW9xruu67uTOusO10GfhVZsixisOtntlDIIz.",
  });
};

const connect = async () => {
  const uri = await (await mongod).getUri();
  await mongoose.connect(uri);
};

const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await (await mongod).stop();
};

const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

module.exports = {
  connect,
  closeDatabase,
  clearDatabase,
  loadData,
};
