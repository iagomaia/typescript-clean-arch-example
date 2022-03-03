export default {
  mongoUrl: process.env.MONGO_URL || "mongodb://dev:devpw@localhost:27017/clean-node-api?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false",
  port: process.env.PORT || 5050,
  nodeEnv: process.env.NODE_ENV || "local"
}