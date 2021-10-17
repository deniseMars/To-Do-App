document.querySelector('#go-back').addEventListener('click', function(){
    location.assign('/toDo-app.html')
})

// get the id (hash) for each note. Substrin method allows to get part of a string
// when using substring specify from where you'd like to start
const todoID = location.hash.substring(1)
// get all saved todos in local storage, using the function already created
const todos = getSavedTodos()
// check whether the todoID matches any items saved in local storage
const todo = todos.find(function(todo){
    return todo.id === todoID
})
if (todo === undefined){
    location.assign('/toDo-app.html')
}

// Create easy access to title and body
const todoTitle = document.querySelector('#todo-title')
const todoBody = document.querySelector('#status-area')
const todoDelete = document.querySelector('#remove-todo')

// Pre-populate edit page with note info
todoTitle.value = todo.title
todoBody.value = todo.completed

//Update and save the title
todoTitle.addEventListener('input', function (e){
    todo.title = e.target.value
    saveTodos(todos)
})

// Update and save body
todoBody.addEventListener('input', function(e){
    todo.completed = e.target.value
    saveTodos(todos)
})
// Set up remove note
todoDelete.addEventListener('click', function(e){
    removeTodo(todo.id)
    saveTodos(todos)
    location.assign('/toDo-app.html')
})
