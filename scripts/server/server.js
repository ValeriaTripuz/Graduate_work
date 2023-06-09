// Весь сервер
const mysql = require("mysql2");
const cors = require("cors");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

// Подключаем файл с базой данных
const dbService = require("./dbService");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Оповещаем в консоле о запуске сервера
app.listen(process.env.PORT, () => console.log("Сервер работает !"));
// app.listen(process.env.PORT, notifyClient);

app.get("/connect", (request, response) => {
  response.json("connected");
});

// Принимаем данные для регистрации от клиента
app.post("/registration", (request, response) => {
  const client = request.body;
  const firstName = client.firstName;
  const lastName = client.lastName;
  const email = client.email;
  const password = client.password;

  const db = dbService.getDbServiceInstance();
  const result = db.insertNewRowIntoClients(
    firstName,
    lastName,
    email,
    password
  );

  result
    .then((data) => response.json({ success: true }))
    .catch((err) => console.log(err));
});

// Находим клиента по логину и паролю в БД и отправляем клиенту
app.get("/getClient", (request, response) => {
  console.log(request.query);
  const firstName = request.query.firstName;
  const lastName = request.query.lastName;
  const password = request.query.password;

  const db = dbService.getDbServiceInstance();
  const result = db.findClient(firstName, lastName, password);

  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});

//subscription
app.post("/subscription", (request, response) => {
  const client = request.body;
  const email = client.email;

  const db = dbService.getDbServiceInstance();
  const result = db.insertSubscriptionEmail(email);

  result
    .then((data) => response.json({ success: true }))
    .catch((err) => console.log(err));
});

// Отправляем клиенту данные об услугах
app.get("/getServices", (request, response) => {
  const db = dbService.getDbServiceInstance();

  const result = db.getServices();
  console.log(result);

  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});
