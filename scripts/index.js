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

btnSignUp.addEventListener("click", () => {
  console.log(name.value, surname.value, password.value, password2.value);
});
