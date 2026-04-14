import express from "express";
import { AppDataSource } from "./config/data-source";
import authRoutes from "./Routes/Auth.route";
import rentalRoutes from "./Routes/Rentalagreement.routes";
import cors from "cors";  



const app = express();
app.use(express.json());
app.use(cors());  

app.use("/api", authRoutes);
app.use("/api/rental-agreements", rentalRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("DB Connected");

    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((err: any) => console.log(err));