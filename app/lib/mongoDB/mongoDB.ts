import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if(!process.env.MONGO_URL) {
    return console.log('MONGO_URL not found');
  }
  if(isConnected) {
    return console.log('Already connected to MONGODB');
  }
  
  try {
    await mongoose.connect(process.env.MONGO_URL);
    isConnected = true;
  } catch(error) {
    console.log(error);
  }
}