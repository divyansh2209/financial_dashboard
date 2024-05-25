import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from "./routes/kpi.js";
import productRoutes from "./routes/product.js"
import transactionRoutes from "./routes/transaction.js";


import path from 'path';
import { fileURLToPath } from 'url'

// import KPI from "./modals/KPI.js";
// import { kpis, products , transactions } from './data/data.js';
// import Product from "./modals/Product.js";
// import Transaction from './modals/Transaction.js'

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.resolve(__dirname, 'dist')));


app.use(express.json()); // Correct usage of express.json()
app.use(helmet());
app.use(helmet.crossOriginEmbedderPolicy({ policy: "require-corp" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/kpi", kpiRoutes);
app.use("/product" , productRoutes)
app.use("/transaction" , transactionRoutes)

const PORT = process.env.PORT || 9000;
mongoose
    .connect(process.env.MONGO_URL)
    .then(async () => {
        app.listen(PORT, () => console.log("SERVER STARTED"));
        // await mongoose.connection.db.dropDatabase()
        // KPI.insertMany(kpis);
        // Product.insertMany(products);
        // Transaction.insertMany(transactions);
    })
    .catch((error) => console.log(error));
