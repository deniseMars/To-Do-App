// get saved todos
const getSavedTodos = function(){
    let todoJSON = localStorage.getItem('To do')
    if (todoJSON !== null){
        return JSON.parse(todoJSON)
    } else {
        return []
    }
}

const removeTodo = function(id){
    // find index of the element
    const todoIndex = thingToDo.findIndex(function(todo){
        return todo.id === id
    })
    if (todoIndex > -1){
        thingToDo.splice(todoIndex, 1)
    }
}

const checkTodo = function(id){
    // find element by value
    let todoIndex = thingToDo.find(function(todo){
        return todo.id === id
    })
    if (todoIndex !== undefined){
        return todoIndex.completed = !todoIndex.completed
    }
}


// Generate a pragraph for each added todo
const createDOMElement =   function(todo){
    let newPara = document.createElement('div')
    // Create checkbox
    let checkbox = document.createElement('input')
    // configure checkbox
    checkbox.setAttribute('type', 'checkbox')
    newPara.appendChild(checkbox)
    checkbox.checked = todo.completed
    let newTodo = document.createElement('a')
    // create delete button
    let removeButton = document.createElement('button')
    removeButton.textContent = 'remove'
    // Config button to remove to-do
    removeButton.addEventListener('click', function(){
        removeTodo(todo.id)
        saveTodos(thingToDo)
        renderTodos(thingToDo, filters)
    })

    checkbox.addEventListener('change', function(){
        checkTodo(todo.id)
        saveTodos(thingToDo)
        renderTodos(thingToDo, filters)
    })
    
    // verify todo text content (if empty)
    if (todo.title.length > 0){
        newTodo.textContent = `${todo.title} - Is this competed? ${todo.completed}!`
    } else {
        newTodo.textContent = 'empty todo'
    }
    
    // ADd link to each crated note
        ashLink =  `/todo-edit.html#` + todo.id
        newTodo.setAttribute('href', ashLink)
        newPara.appendChild(newTodo)
    // Append button after the text to set order
    newPara.appendChild(removeButton)
    return newPara
}

// save todos in local storage
let saveTodos = function(thingToDo){
    localStorage.setItem('To do', JSON.stringify(thingToDo))
}


// render todos
const renderTodos = function(todos, filter){
    let filterTodo = todos.filter(function (todo){
        let textMatch = todo.title.toLowerCase().includes(filter.searchText.toLowerCase())
        let completedMatch = !filter.hideCompleted || !todo.completed
        return textMatch && completedMatch
})


let incompleteTodo = filterTodo.filter(function(todo){
    return !todo.completed
})

// clear the search box
document.querySelector('.todo').innerHTML = ''

// Get summary of todos left
document.querySelector('.todo').appendChild(getSummary(incompleteTodo))

// for each filtered note we create a paragraph
filterTodo.forEach(function(todo){   
    let newPara = createDOMElement(todo)
        document.querySelector('.todo').appendChild(newPara)
})

}

// create summary 
let getSummary = function(incompleteTodo){
    let summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodo.length} things to do left.`
    return summary
}

