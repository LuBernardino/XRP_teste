const scrollRightArrow = document.querySelector(".container .arrow-right");
const scrollLeftArrow = document.querySelector(".container .arrow-left");
const tabList = document.querySelector(".container ul.client-list");

const manageLeftbtn = () => {
  if (tabList.scrollLeft >= 20) {
    scrollLeftArrow.classList.add("active");
  } else {
    scrollLeftArrow.classList.remove("active");
  }

  let maxScroll = tabList.scrollWidth - tabList.clientWidth - 20;
  if (tabList.scrollLeft >= maxScroll) {
    scrollRightArrow.classList.remove("active");
  } else {
    scrollRightArrow.classList.add("active");
  }
};

scrollRightArrow.addEventListener("click", () => {
  tabList.scrollLeft += 300;
  manageLeftbtn();
});

scrollLeftArrow.addEventListener("click", () => {
  tabList.scrollLeft -= 300;
  manageLeftbtn();
});

tabList.addEventListener("scroll", manageLeftbtn);

let drag = false;
const dragging = (e) => {
  if (!drag) return;
  tabList.classList.add("dragging");
  tabList.scrollLeft -= e.movementX;
};

tabList.addEventListener("mousedown", () => {
  drag = true;
  tabList.addEventListener("mousemove", dragging);
});

document.addEventListener("mouseup", () => {
  drag = false;
  tabList.removeEventListener("mousemove", dragging);
  tabList.classList.remove("dragging");
});
