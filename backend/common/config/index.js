import {mongoose} from "mongoose";

const connectToMongo = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
      });
  
      console.log('Connected to MongoDB');
      
      // Return the Mongoose connection object
      return mongoose.connection;
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error; // Rethrow the error to be handled by the calling code
    }
};

export default connectToMongo;