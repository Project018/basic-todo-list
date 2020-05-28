const todoList = {
    todos: [],
    addTodo: function(todoText) { // pass in object
      this.todos.push({ // push object to todos array
        todoText: todoText, // text that the user enters
        completed: false
      });
    },
    
    changeTodo: function(position, todoText) {
      this.todos[position].todoText = todoText; // todoList.changeTodo should change the todoText property
    },
    
    deleteTodo: function(position) {
      this.todos.splice(position, 1);
    },
    
    toggleCompleted: function(position) {
      let todo = this.todos[position]; // access targeted object
      todo.completed = !todo.completed // target completed prop and flip it
    },
    
    toggleAll: function() {
    let totalTodos = this.todos.length;
    let completedTodos = 0;
  
      // get number of completed todos
      this.todos.forEach(function(todo) {
        if (todo.completed === true) {
          completedTodos++;
        }
      })
  
      this.todos.forEach(function(todo) {
        // Case 1: If everything's true, make everything false
        if (completedTodos === totalTodos) {
          todo.completed = false;
          // Case 2: toggleAll: Otherwise, make everything true.
        } else {
          todo.completed = true;
        }
      })
    },
  };
  
  
  // onclick handlers
  const handlers = { 
    addTodo: function() {
      let addTodoTextInput = document.querySelector("#addTodoTextInput");
      // todoList.addTodo('Item 1') instead of console.log text passed in we can get the input value
      todoList.addTodo(addTodoTextInput.value); // get value of input text
      addTodoTextInput.value = ''; // clears input value after adding text
      view.displayTodos();
    },
    
    changeTodo: function() {
      let changeTodoPositionInput = document.querySelector("#changeTodoPositionInput");
      let changeTodoTextInput = document.querySelector("#changeTodoTextInput");
      todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
      changeTodoPositionInput.value = '';
      changeTodoTextInput.value = '';
      view.displayTodos();
    },
    
    deleteTodo: function(position) {
      todoList.deleteTodo(position);
      view.displayTodos();
    },
    
    toggleCompleted: function() {
      let toggleCompletedPositionInput = document.querySelector('#toggleCompletedPositionInput');
      todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
      toggleCompletedPositionInput.value = '';
      view.displayTodos();
    },
    
    toggleAll: function() {
      todoList.toggleAll();
      view.displayTodos();
    }
  };
  
  
  // only thing associated with displaying changing/updating data
  const view = {
    displayTodos: function() {
      let todosUl = document.querySelector("ul");
      // make numbers of li to reflect todos items in array
      // starts from zero and then adds the correct number of items 
      todosUl.innerHTML = '';
      
      todoList.todos.forEach(function(todo, id) { // id arg is similar to [i] in a for loop. This second arg is given to us for free
        let todoLi = document.createElement('li')
        let todoTextWithCompletion = '';
        
        // Each li element should show .completed
        if (todo.completed === true) {
            todoTextWithCompletion = '(x) ' + todo.todoText;
        } else {
            todoTextWithCompletion = '( ) ' + todo.todoText;
        }
        
        todoLi.textContent = todoTextWithCompletion; // Each li element should contain .todoText
        todoLi.id = id; // Each li should have an id that has the todo position
        todoLi.appendChild(this.createDeleteButton()); // There should be a delete button for each todo
        todosUl.appendChild(todoLi)
      }, this); // need to add this in forEach method to gain access to other view methods in view object
    },
    createDeleteButton: function() {
      let deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'delete';
      
      return deleteButton;
    },
    setUpEventListeners: function() {
      let todosUL = document.querySelector("ul");
      todosUL.addEventListener("click", function(event) {
        // get the element that was clicked on
        let elementClicked = event.target;
  
        // check if elementClicked is a delete button
        if (elementClicked.className === 'delete') {
          // run handlers.deleteTodo(position)
          handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
        }
      });
    }
  };
  
  view.createDeleteButton();
  view.setUpEventListeners();
  
  