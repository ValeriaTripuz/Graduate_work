const dateTimeContainer = document.querySelector(".date_time");

function zeroFirst(value) {
  if (value < 10) value = "0" + value;
  return value;
}

function date_time() {
  let currentDateTime = new Date();
  let day = zeroFirst(currentDateTime.getDate());
  let month = zeroFirst(currentDateTime.getMonth());
  let year = zeroFirst(currentDateTime.getFullYear());
  let hours = zeroFirst(currentDateTime.getHours());
  let minutes = zeroFirst(currentDateTime.getMinutes());

  return `Дата: ${day}.${month}.${year} Время: ${hours}:${minutes}`;
}

dateTimeContainer.innerHTML = date_time();

getServices().then((data) => {
  const select = document.getElementById("service_select");
  for (let i = 0; i < data.length; i++) {
    select.innerHTML += `<option>${data[i].serviceName}</option>`;
    console.log(data[i].serviceName);
  }
  //   const d = data[0];
  //   console.log(d);
});
