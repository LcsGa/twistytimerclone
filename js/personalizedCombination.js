import { addPersonalizedCombination } from "./main.js";

export const buttons = {
  openDialog: document.querySelector(".fa-pencil-alt"),
  cancel: document.querySelector("#cancel"),
  done: document.querySelector("#done"),
};
const dialogWindow = document.querySelector("#dialog-window");
const form = document.querySelector("form");
export const input = document.querySelector("input");

// Event listeners_____________________________________________________________
form.addEventListener("click", (e) => e.stopPropagation());

dialogWindow.addEventListener("click", (e) => onDialogButtonClicked(e));

buttons.openDialog.addEventListener("click", (e) => {
  dialogWindow.style.display = "block";
  input.focus();
  e.stopPropagation();
});

buttons.cancel.addEventListener("click", (e) => onDialogButtonClicked(e));

window.addEventListener("keydown", (e) => {
  if (dialogWindow.style.display === "block") {
    if (e.key === "Enter") {
      addPersonalizedCombination(e);
    }
  }
});

// Functions___________________________________________________________________
export function onDialogButtonClicked(e) {
  dialogWindow.style.display = "none";
  input.value = "";
  e.preventDefault();
  e.stopPropagation();
}
