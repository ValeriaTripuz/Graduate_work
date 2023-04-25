// Вся база данных

// Подключение всех используемых компонентов
const mysql = require("mysql");
const dotenv = require("dotenv");
let instance = null;
dotenv.config();

// Создаем соединение с базой данных MySQL
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "teatrprod",
  // password: "Taximoto_12345678",
});

// Проверяем соединения с MySQL
connection.connect((err) => {
  if (err) {
    return console.log("Error: " + err.message);
  } else {
    console.log("db" + connection.state);
  }
});
