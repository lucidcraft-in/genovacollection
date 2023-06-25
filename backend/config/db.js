import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      'mongodb://admin:admin@localhost:27017/genova',
      // 'mongodb+srv://genova:123@genova.mz1ru.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      // process.env.MONGO_URI,
      // 'mongodb://localhost:27017/genova',
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      }
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.log("error")
    console.error(`Error: ${error.message}`.red.underline.bold)
    process.exit(1)
  }
}

export default connectDB
