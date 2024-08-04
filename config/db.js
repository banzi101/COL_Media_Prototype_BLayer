const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(
      `mongodb+srv://banu:nXCaJ97IchsJ9KoV@cluster0.oobgic4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log(
      "DB connected",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDb;
