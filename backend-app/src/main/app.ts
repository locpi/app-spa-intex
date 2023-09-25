import cors from "cors";
import express from "express";
import {Logger} from "~/main/config/Logger";
import {MongoRepository} from "~/main/mongo/tools/MongoRepository";

const port = 3000;
const app = express();


// HTTP SERVER CONFIG

app.use(cors({
  origin: "*",
}));
app.use(express.json());


app.listen(port, async () => {
  Logger.getLogger(MongoRepository).info("Demarrage de l'app");


});
