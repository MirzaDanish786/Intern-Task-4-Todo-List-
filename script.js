let defaultTextContainer = document.getElementsByClassName(
  "defaultTextContainer"
)[0];

let todoText = "";
let todoLayout = "";
let addTodo_Input = document.getElementById("addTodo");
let addButton = document.getElementById("addButton");
let listContainer_itemsContainer = document.getElementsByClassName(
  "listContainer_itemsContainer"
)[0];
addButton.addEventListener("click", () => {
  defaultTextContainer.style.display = "none";
  todoText = addTodo_Input.value;
  console.log(todoText);
  todoLayout = ` <div class="items">
                    <div class="todoText">
                        ${todoText}
                    </div>
                    <div class="todoBtnContainer">
                        <div class="checkBtn">
                         <img src="icons/checkMark.svg" alt="">
                        </div>
                        <div class="editBtn">
                            <img src="icons/edit.svg" alt="">
                        </div>
                        <div class="deleteBtn">
                            <img src="icons/delete.svg" alt="">
                        </div>
                    </div>
                </div>`;
  listContainer_itemsContainer.innerHTML += todoLayout;
  addTodo_Input.value = "";
});
