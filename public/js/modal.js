const openModalButton = document.querySelector("#imgnotificacoes");
const closeModalButton = document.querySelector("#close-modal");
const closeModalButton2 = document.querySelector("#arrow");
const modalnotf= document.querySelector("#modal");
const fade = document.querySelector("#fade");

const toggleModal = () => {
  modalnotf.classList.toggle("hide");
  fade.classList.toggle("hide");
};

[openModalButton, closeModalButton,closeModalButton2, fade].forEach((el) => {
  el.addEventListener("click", () => toggleModal());
});