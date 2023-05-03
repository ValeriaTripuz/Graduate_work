function connect() {
  fetch("http://localhost:5002/connect")
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {});
}
connect();

// Отправляем серверу запрос на поиск клиента в БД
async function getClient(client) {
  const url = new URL("http://localhost:5002/getClient");
  url.searchParams.append("firstName", client.firstName);
  url.searchParams.append("lastName", client.lastName);
  url.searchParams.append("password", client.password);

  let response = await fetch(url);
  let { data } = await response.json();
  // console.log(data);

  return data;
}

if (
  window.location.href === "http://127.0.0.1:5500/html/client.html?message="
) {
  if (localStorage.getItem("name") !== null) {
    const welcome = document.querySelector("#welcoming");
    const name = localStorage.getItem("name");
    welcome.innerHTML = name;
  } else {
    welcome.innerHTML = "";
    console.log("no name");
  }
}

// Получаем данные с сервера из таблицы services
async function getServices() {
  let response = await fetch("http://localhost:5002/getServices");
  let { data } = await response.json();
  return data;
}

// console.log(client);
