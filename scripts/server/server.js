// Весь сервер
const mysql = require("mysql");
const cors = require("cors");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

// // Подключаем файл с базой данных
// const dbService = require("./dbService");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Оповещаем в консоле о запуске сервера
app.listen(process.env.PORT, () => console.log("Сервер работает !"));
// app.listen(process.env.PORT, notifyClient);

app.get("/connect", (request, response) => {
  response.json("connected");
});
