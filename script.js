let defaultTextContainer = document.getElementsByClassName(
  "defaultTextContainer"
)[0];
let arrTodos = [];
let todoText = "";
let todoLayout = "";
let addTodo_Input = document.getElementById("addTodo");
let addButton = document.getElementById("addButton");
let listContainer_itemsContainer = document.getElementsByClassName(
  "listContainer_itemsContainer"
)[0];
let deleteAllBox = document.getElementsByClassName("deleteAllBox")[0];

// Add todo when press enter:
addTodo_Input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    todoText = addTodo_Input.value.trim();
    if (todoText != "") {
      arrTodos.push(todoText);
      setTodo(arrTodos);
      listContainer_itemsContainer.innerHTML = "";
      renderTodos();
      defaultTextContainer.style.display = "none";
      addTodo_Input.value = "";
    } else {
      defaultTextContainer.style.animation = "alert 1s ease-in 0s 6 alternate";
      defaultTextContainer.style.color = "red";
      defaultTextContainer.innerHTML = `Please write a todo to add!`;
    }
  }
});

// Add todo when click on the add button
addButton.addEventListener("click", () => {
  todoText = addTodo_Input.value.trim();
  if (todoText != "") {
    arrTodos.push(todoText);
    setTodo(arrTodos);
    listContainer_itemsContainer.innerHTML = "";
    renderTodos();
    defaultTextContainer.style.display = "none";
    addTodo_Input.value = "";
  } else {
    defaultTextContainer.style.animation = "alert 1s ease-in 0s 6 alternate";
    defaultTextContainer.style.color = "red";
    defaultTextContainer.innerHTML = `Please write a todo to add!`;
  }
});

deleteAllBox.addEventListener("click", () => {
  let deleteAllIcon = document.querySelector(".deleteAllIcon");
  deleteAllIcon.style.animation = "none";
  deleteAllIcon.offsetHeight;
  deleteAllIcon.style.animation = "deleteAll 1s ease-in-out 1 alternate";
  localStorage.clear("todos");
  arrTodos = [];
  listContainer_itemsContainer.innerHTML = "";
  renderTodos();
});

const setTodo = (todo) => {
  localStorage.setItem("todos", JSON.stringify(todo));
};

const getTodo = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
};

const renderTodos = () => {
  arrTodos = getTodo();
  arrTodos.forEach((todo, index) => {
    todoLayout = ` <div class="items">
                    <div class="todoText">
                        ${todo}
                    </div>
                    <div class="todoBtnContainer">
                         <div class="saveBtn" data-index="${index}" style="display:none;">
                         <img src="icons/save.svg" alt="">
                         </div>
                        <div class="checkBtn" data-index="${index}">
                        <img src="icons/checkMark.svg" alt="">
                        </div>
                        <div class="editBtn" data-index="${index}">
                            <img src="icons/edit.svg" alt="">
                        </div>
                        <div class="deleteBtn" data-index="${index}">
                            <img src="icons/delete.svg" alt="">
                        </div>
                    </div>
                    </div>`;
    listContainer_itemsContainer.insertAdjacentHTML("beforeend", todoLayout);
    addTodo_Input.value = "";
  });

  // Create Edit button:
  document.querySelectorAll(".editBtn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let index = e.currentTarget.getAttribute("data-index");
      let saveBtn = document.querySelector(`.saveBtn[data-index="${index}"]`);
      let checkBtn = document.querySelector(`.checkBtn[data-index="${index}"]`)
      let deleteBtn = document.querySelector(`.deleteBtn[data-index="${index}"]`)
      checkBtn.style.display = "none";
      deleteBtn.style.display = "none"
      saveBtn.style.display = "flex";
      console.log(index);
      editTodo(index);
    });
  });

  const editTodo = (indexEdit) => {
    let items = document.querySelectorAll(".items");
    let todoText = document.querySelectorAll(".todoText");
    let inputEdit = document.createElement('input');
    let editText = arrTodos[indexEdit];
    inputEdit.value = editText;
    inputEdit.id = "editInput";
    todoText[indexEdit].innerHTML = "";
    todoText[indexEdit].append(inputEdit);
    console.log(editText);

    document.querySelector(`.saveBtn[data-index="${indexEdit}"]`).addEventListener('click', () => {
      if (inputEdit.value != "") {
        arrTodos[indexEdit] = inputEdit.value.trim();
        items[indexEdit].style.display = "none";
        listContainer_itemsContainer.innerHTML = "";
        setTodo(arrTodos);
        renderTodos();
      }
    });
  };

  // Delete Button:
  document.querySelectorAll(".deleteBtn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let index = e.currentTarget.getAttribute("data-index");
      deleteTodo(index);
    });
  });

  const deleteTodo = (index) => {
    arrTodos.splice(index, 1);
    setTodo(arrTodos);
    listContainer_itemsContainer.innerHTML = "";
    renderTodos();
  };

  // Check Mark Button:
  document.querySelectorAll(".checkBtn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let index = e.currentTarget.getAttribute("data-index");
      checkMark(index);
    });
  });

  const checkMark = (index) => {
    let todoText = document.getElementsByClassName("todoText");
    if (todoText[index]) {
      todoText[index].style.textDecoration = "line-through";
    }
  };
};

renderTodos();