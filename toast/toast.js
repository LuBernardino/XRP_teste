const toast = document.querySelector(".toast");

const closeIcon = document.querySelector(".close");
const progress = document.querySelector(".progress");

let timer1, timer2;

function notify(type, title, info) {
  toast.classList.add("active");
  progress.classList.add("active");

  toast.querySelector(".title").innerHTML = title;
  toast.querySelector(".info").innerHTML = info;

  const icon = toast.querySelector(".check");
  const progressBar = toast.querySelector(".progress");

  switch(type)
  {
    case "error":
        icon.setAttribute('src', './assets/icons/close.png');
        progressBar.classList.add('error');
    break;
    case "success": 
        icon.setAttribute('src', './assets/icons/checkmark.png');
        progressBar.classList.add('success');
    break;
    case "warning": 
        icon.setAttribute('src', './assets/icons/alert-circle.png');
        progressBar.classList.add('warning');
    break;
  }


  timer1 = setTimeout(() => {
    toast.classList.remove("active");
  }, 5000);

  timer2 = setTimeout(() => {
    progress.classList.remove("active");
  }, 5300);
}