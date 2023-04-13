const item = document.getElementsByClassName("info__item");
const header = document.getElementsByClassName("info__header");
const body = document.getElementsByClassName("info__body");

for (let i = header.length - 1; i >= 0; i--) {
  header[i].addEventListener("click", function () {
    if (body[i].classList.contains("active")) {
      body[i].classList.remove("active");
    } else {
      body[i].classList.add("active");
    }
  });
}
