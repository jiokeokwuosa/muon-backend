import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const url = process.env.ATLAS_URL;

mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const { connection } = mongoose;

connection.once('open', () => {
  console.log('MongoDB database connected successfully');
});
