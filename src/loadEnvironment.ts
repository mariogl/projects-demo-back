import dotenv from "dotenv";

dotenv.config();

const environment = {
  port: +process.env.PORT || 4000,
  mongoUrl: process.env.MONGO_URL,
  tokenSecret: process.env.TOKEN_SECRET,
};

export default environment;
