function connect() {
  fetch("http://localhost:5002/connect")
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {});
}
connect();
// setInterval(() => {
//   connect();
// }, 5000);

// // Отправляем серверу запрос на поиск клиента в БД
// async function getClient(client) {
//   const url = new URL("http://localhost:5002/getClient");
//   url.searchParams.append("firstName", client.firstName);
//   url.searchParams.append("lastName", client.lastName);
//   url.searchParams.append("password", client.password);

//   let response = await fetch(url);
//   let { data } = await response.json();
//   console.log(data);

//   return data;
// }
