import dotenv from "dotenv";

dotenv.config();

const environment = {
  port: +process.env.PORT || 4000,
  mongoUrl: process.env.MONGO_URL,
};

export default environment;
