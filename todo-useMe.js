// The Ultimate ToDo App
let thingToDo = getSavedTodos()

const filters = {
    searchText: ' ',
    hideCompleted: false 
}


renderTodos(thingToDo, filters)


    // Create text input for filters
    document.querySelector('#filter').addEventListener('input', function(e){
    filters.searchText = e.target.value   
    renderTodos(thingToDo, filters)
})

    // Program delete note button
    document.querySelector('#delete-todo').addEventListener('click', function(){
    // Select all notes and iterate through each to delete.    
        document.querySelectorAll('.todo').forEach(function(note){     
            note.remove()
        })
    })

    // Add to-do in forms
    document.querySelector('#add-text').addEventListener('submit', function(e){
    // prevent default page refresh (Default in JS)
    e.preventDefault()
    const id = uuidv4()
    thingToDo.push({
        id: id,
        title: e.target.elements.text.value,
        completed: false
    })
    // save in local storage
    saveTodos(thingToDo)
    // create the href for each new todo
    location.assign(`/todo-edit.html#${id}`)
    // clear search fields
    e.target.elements.text.value = ''
})

