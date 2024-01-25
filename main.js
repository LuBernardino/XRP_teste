const inputEmail = document.querySelector("#email");
const inputPassword = document.querySelector("#password");
const passwordElement = document.querySelector(".password");
const clientsContainerElement = document.querySelector("#client-container");
const clientsListElement = document.querySelector(".client-list");
const loginButton = document.querySelector("button");
const form = document.querySelector("form");

let currentUser;
let clientSelected;

window.onload = () => {
  form.onsubmit = () => false;
};


const clientList = [
  {
    id: 1,
    name: "Escrita Digital",
    image: "escrita_digital_logo.png",
  },
  {
    id: 2,
    name: "Secil",
    image: "secil_logo.png",
  },
  {
    id: 3,
    name: "Grupo Brisa",
    image: "grupo_brisa_logo.png",
  },
  {
    id: 4,
    name: "Nos Portugal",
    image: "nos_portugal_logo.png",
  },
  {
    id: 5,
    name: "Navigator Company",
    image: "navigator_company_logo.png",
  },
  {
    id: 6,
    name: "Ascendi",
    image: "ascendi_logo.jpg",
  },
  {
    id: 7,
    name: "Paulo Duarte",
    image: "paulo_duarte_logo.png",
  },
];

const getClientsByIds = (ids) => {
  return clientList.filter((client) => ids.includes(client.id));
};

const userList = [
  {
    email: "escrita",
    password: "escrita123",
    clientsIds: [1, 2, 3],
  },
  {
    email: "teste",
    password: "teste123",
    clientsIds: [1, 5, 6, 7],
  },
];

function isValidUser(email) {
  const user = getUser(email);
  return user !== undefined;
}

function getUser(email) {
  return userList.filter((user) => user.email === email)[0];
}

function activeClient(client) {
  loginButton.style.display = "block";

  clientSelected = client;

  clientsContainerElement.style.display = "none";
  passwordElement.style.display = "flex";
  inputPassword.focus();
}

function preLogin(email) {
  if (isValidUser(email)) {
    loginButton.style.display = "none";
    clientsContainerElement.style.display = "block";
    inputEmail.setAttribute("readonly", "true");

    const userFound = getUser(email);
    currentUser = userFound;
    const userClients = getClientsByIds(userFound.clientsIds);

    const clientTemplate = document.querySelector("#client-template");
    clientsListElement.innerHTML = "";

    userClients.forEach((client) => {
      const clientElementClone = clientTemplate.content.cloneNode(true);
      const li = clientElementClone.querySelector("li");
      li.addEventListener("click", () => activeClient(client));
      const image = clientElementClone.querySelector("img");
      image.src += client.image;
      image.setAttribute("alt", client.name);
      clientsListElement.appendChild(clientElementClone);
    });
  } else {
    inputEmail.value = "";
    notify("error", "Erro", "Utilizador inválido. Tente novamente.")
  }
}

inputEmail.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.key === "Enter") {
    preLogin(this.value);
  }
});

function login(password) {
  if (currentUser && currentUser.password === password) {
    notify("success", "Sucesso", "Login bem-sucedido!")

    setTimeout(() => {
        document.querySelector('body').innerHTML = "";
        const loggedElement = document.createElement('h1');
        loggedElement.innerText = `Você esta logado no cliente: ${clientSelected.name}`;
        document.querySelector('body').appendChild(loggedElement);
    }, 2000);

  } else {
    notify("error", "Erro", "Senha incorreta. Tente novamente.")
  }
}

loginButton.addEventListener("click", function (event) {
  event.preventDefault();
  if(!currentUser)
  {
    preLogin(inputEmail.value);
  }
  else {
    login(inputPassword.value);
  }
});

inputPassword.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.key === "Enter") {
    login(this.value);
  }
});
