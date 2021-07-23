import mongoose from 'mongoose'

export default function() {
  const connectionUrl = `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`

  mongoose.connect(connectionUrl, {
    ...(process.env.NODE_ENV === "production" && {
      authSource: "admin", //
      pass: process.env.DB_PASS,
      user: process.env.DB_USER
    }),
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  });

  mongoose.connection.on("connected", () => {
    console.log('DB is connected')
  });

  mongoose.connection.on("error", error => {
    console.error("Mongoose default connection error:", error);
  });
}