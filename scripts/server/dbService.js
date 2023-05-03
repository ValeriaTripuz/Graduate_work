// Вся база данных

// Подключение всех используемых компонентов
const mysql = require("mysql2");

const dotenv = require("dotenv");
let instance = null;
dotenv.config();

// Создаем соединение с базой данных MySQL
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "teatrprod",
  password: "root1234",
});

// Проверяем соединения с MySQL
connection.connect((err) => {
  if (err) {
    return console.log("Error: " + err.message);
  } else {
    console.log("db" + connection.state);
  }
});

class DbService {
  static getDbServiceInstance() {
    return instance ? instance : new DbService();
  }

  // Полученне сервером данные добавляем в соответствующие таблицы в MySQL
  async insertNewRowIntoClients(firstName, lastName, email, password) {
    try {
      const insertId = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO teatrprod.Clients (firstName, lastName, emailAddress, password) VALUES (?,?,?,?);";
        connection.query(
          query,
          [firstName, lastName, email, password],
          (err, result) => {
            if (err) reject(new Error(err.message));
            else resolve(result.insertId);
          }
        );
      });
      //   return response;
    } catch (error) {
      console.log(error);
    }
  }

  async insertSubscriptionEmail(email) {
    try {
      const insertId = await new Promise((resolve, reject) => {
        const query = "INSERT INTO teatrprod.Subscription (email) VALUES (?);";
        connection.query(query, [email], (err, result) => {
          if (err) reject(new Error(err.message));
          else resolve(result.insertId);
        });
      });
      //   return response;
    } catch (error) {
      console.log(error);
    }
  }

  async findClient(firstName, lastName, password) {
    console.log(firstName, lastName, password);
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `SELECT * from teatrprod.Clients WHERE firstName = "${firstName}" AND lastName = "${lastName}" AND password = "${password}" `;
        connection.query(query, (err, result) => {
          if (err) reject(new Error(err.message));
          else {
            console.log(result);
            resolve(result);
          }
        });
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  //Получение данных из таблицы service
  async getServices() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `SELECT * FROM teatrprod.Services`;
        connection.query(query, (err, result) => {
          if (err) reject(new Error(err.message));
          else resolve(result);
        });
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = DbService;
