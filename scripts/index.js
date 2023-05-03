// Slider
const carousel = document.querySelector(".carousel");
const firstImg = carousel.querySelectorAll("img")[0];
const arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false,
  isDragging = false,
  prevPageX,
  prevScrollLeft,
  positionDiff;

const showHideIcons = () => {
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
  arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
  arrowIcons[1].style.display =
    carousel.scrollRight == scrollWidth ? "none" : "block";
};

arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    let firstImgWidth = firstImg.clientWidth + 14; // getting first img width and adding 14 margin value;
    carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
    setTimeout(() => showHideIcons(), 60);
  });
});

const autoSlide = () => {
  if (carousel.scrollLeft == carousel.scrollWidth - carousel.clientWidth)
    return;

  positionDiff = Math.abs(positionDiff);
  let firstImgWidth = firstImg.clientWidth + 14;
  let valDifference = firstImgWidth - positionDiff;
  if (carousel.scrollLeft > prevScrollLeft) {
    //right
    return (carousel.scrollLeft +=
      positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff);
  }
  //left
  carousel.scrollLeft -=
    positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
};

const dragStart = (e) => {
  //updating globsl variables value on mouse down event
  isDragStart = true;
  prevPageX = e.pageX || e.touched[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  //scrolling img to left according to mouse pointer
  if (!isDragStart) return;
  e.preventDefault();
  isDragging = true;
  carousel.classList.add("dragging");
  positionDiff = (e.pageX || e.touched[0].pageX) - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
  showHideIcons();
};

const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove("dragging");
  if (!isDragging) return;
  isDragging = false;
  autoSlide();
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstrat", dragStart);
carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);
carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchstop", dragStop);

// Modal
const iconUser = document.querySelector(".icon");
const modalWindow = document.querySelector(".modal_window");
const cross = document.querySelector(".cross");

iconUser.addEventListener("click", () => {
  modalWindow.style.display = "block";
});

cross.addEventListener("click", () => {
  modalWindow.style.display = "none";
});

const enter = document.querySelector("#enter");
const signUp = document.querySelector("#sign_up");
const boxSignUp = document.querySelector("#box_sign_up");
const boxEnter = document.querySelector("#box_enter");

enter.addEventListener("click", (e) => {
  boxEnter.style.display = "block";
  boxSignUp.style.display = "none";
  e.preventDefault();
  console.log("enter");
});

signUp.addEventListener("click", (e) => {
  boxSignUp.style.display = "block";
  boxEnter.style.display = "none";
  e.preventDefault();
  console.log("sign up");
});

// Sign Up
const name = document.getElementById("name");
const surname = document.getElementById("surname");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const btnSignUp = document.querySelector(".modal_button");
const btnLogIn = document.querySelector(".login");

// btnSignUp.addEventListener("click", () => {
//   console.log(name.value, surname.value, password.value, password2.value);
// });

btnSignUp.addEventListener("click", registration);
btnLogIn.addEventListener("click", login);

// Функция регистрации
function registration() {
  // Берем данные из формы регистрации и приваиваем пустому объекту
  const newClient = {};
  const name = document.getElementById("name");
  const surname = document.getElementById("surname");
  const password = document.getElementById("password");
  const password2 = document.getElementById("password2");
  const email = document.getElementById("email");
  const btnSignUp = document.querySelector(".modal_button");

  newClient.firstName = name.value;
  newClient.lastName = surname.value;
  newClient.password = password.value;
  newClient.email = email.value;

  // Отправляем данные о зарегестрировавшемся клиенте на сервер
  fetch("http://localhost:5002/registration", {
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(newClient),
  });

  // Вносим данные в localeStorage о том, что был выполнен вход в аккаунт
  localStorage.setItem("isLoggedIn", true);
  localStorage.setItem("name", newClient.firstName);
  showAccountNav(newClient);
  //   closeRegistration();
}

// Функция входа
function login() {
  // Берем данные из формы входа и приваиваем пустому объекту
  const inputedInfo = {};

  const name = document.getElementById("enterName");
  const surname = document.getElementById("enterSurname");
  const password = document.getElementById("enterPassword");

  inputedInfo.firstName = name.value;
  inputedInfo.lastName = surname.value;
  inputedInfo.password = password.value;

  console.log(inputedInfo);

  // Получаем с сервера данные о клиентах
  getClient(inputedInfo).then((data) => {
    const client = data[0];
    // console.log(client);
    if (!client) {
      const err = document.querySelector(".error_enter");
      err.innerHTML =
        "такого пользователя не существует или неправильный пароль!";
      setTimeout(() => {
        err.innerHTML = "";
      }, 5000);
      //   console.log("error");
    } else {
      console.log(client);
      localStorage.setItem("name", client.firstName);

      showAccountNav(client);
      //   console.log("client");
    }
  });
}

function closeRegistration() {
  modalWindow.style.display = "none";
}

function showAccountNav() {
  window.location.href = "http://127.0.0.1:5500/html/client.html?message=";
}

// Comments

const btnComment = document.querySelector(".btn_comment");
const commentText = document.getElementById("comment_text");
const commentSection = document.querySelector(".comments__section");

btnComment.addEventListener("click", () => {
  console.log(localStorage.getItem("name"));

  if (localStorage.getItem("isLoggedIn") === "true") {
    const newDiv = document.createElement("div");
    newDiv.classList = "comments__section_comment";
    newDiv.innerHTML = `
    <div class="comments__section_comment_photo">
      <img src="../images/face1.jpeg" alt="photo" />
    </div>
    <div class="comments__section_comment_text">
      <span>${localStorage.getItem("name")}</span>
      <p>
      ${commentText.value}
      </p>
    </div>
  `;
    // console.log(newDiv);
    commentSection.appendChild(newDiv);
    commentText = "";
  } else {
    console.log("err");
  }
});

// subscription

const btnSubscribe = document.querySelector(".subscribe");

btnSubscribe.addEventListener("click", () => {
  const subscribe = document.getElementById("subscribe_email");
  console.log(subscribe.value);
  const client = {};
  client.email = subscribe.value;
  // Отправляем данные о зарегестрировавшемся клиенте на сервер
  fetch("http://localhost:5002/subscription", {
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(client),
  });
  subscribe.value = "";
  // Вносим данные в localeStorage о том, что был выполнен вход в аккаунт
  // localStorage.setItem("isLoggedIn", true);
  // localStorage.setItem("name", newClient.firstName);
  // showAccountNav(newClient);
  //   closeRegistration();
});
