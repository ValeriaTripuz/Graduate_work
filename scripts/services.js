const rent = document.querySelector("#rent");
const events = document.querySelector("#events");
const goods = document.querySelector("#goods");

const boxRent = document.querySelector(".rent");
const boxEvents = document.querySelector(".events");
const boxGoods = document.querySelector(".goods");

rent.addEventListener("click", () => {
  if (boxRent.style.display === "block") {
    boxRent.style.display = "none";
  } else {
    boxRent.style.display = "block";
    boxEvents.style.display = "none";
    boxGoods.style.display = "none";
  }
});

events.addEventListener("click", () => {
  if (boxEvents.style.display === "block") {
    boxEvents.style.display = "none";
  } else {
    boxEvents.style.display = "block";
    boxRent.style.display = "none";
    boxGoods.style.display = "none";
  }
});

goods.addEventListener("click", () => {
  if (boxGoods.style.display === "block") {
    boxGoods.style.display = "none";
  } else {
    boxGoods.style.display = "block";
    boxEvents.style.display = "none";
    boxRent.style.display = "none";
  }
});
