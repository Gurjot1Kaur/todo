//selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')
//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('change', filterTodo)
//Functions
function addTodo(event) {
    //prevent form from submitting
    event.preventDefault()
    if (
        todoInput.value === null ||
        todoInput.value === undefined ||
        todoInput.value === ''
    ) {
        return
    }
    /*
CREATING THIS
                <div class="todo" >
                    <li></li>
                    <button>delete</button>
                    <button>Checked</button>
                </div>
                creating it using JS
*/

    //Todo DIV
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')

    //Create Li
    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo) //Li appended to div as a child

    //Add todo to local storage
    saveLocalTodos({ name: todoInput.value, isCompleted: false })

    //Check Mark Button

    const completedButton = document.createElement('button')
    //completedButton.innerText='idhdj ' can be done but what if I wish to add an icon tag to it rather than just simple text then
    completedButton.innerHTML = '<i class= "fas fa-check"><i>'
    completedButton.classList.add('complete-btn')
    todoDiv.appendChild(completedButton)

    //Check Trash Button
    const trashButton = document.createElement('button')
    //completedButton.innerText='idhdj ' can be done but what if I wish to add an icon tag to it rather than just simple text then
    trashButton.innerHTML = '<i class= "fas fa-trash"><i>'
    trashButton.classList.add('trash-btn')
    todoDiv.appendChild(trashButton)

    //append this entire div block to {<ul>} list
    todoList.appendChild(todoDiv)

    //Clear Todo Input Value//when you input data for 1 todo it should disappear for you can put second todo,and not delete it manually
    todoInput.value = ''
}

function deleteCheck(e) {
    const item = e.target
    //delete todo
    if (item.classList[0] === 'trash-btn') {
        /*
    todoInput.remove(); removes the area where we enter the entry, item.remove removes the icon itself //also we are not able to delete even the icon unless we click to the corner of the trash icon for that lets go to css and do .fa-trash,
    .fa-check {
    pointer-events: none;    
    }
    and now to delete not just the icon but the whole thing go to parent
*/
        const todo = item.parentElement
        /*
        if I want to add animation and I add this line here: 
        todo.classList.add('fall') and in css I specify the details 
        then it is not visible because it is immidiately proceded by
        todo.remove() so if I dont write todo.remove then animation works 
        but element remains there, so we add a eventlistener 
        */
        todo.classList.add('fall')
        //removing it from local storage
        removeLocalTodos(todo)
        todo.addEventListener('transitionend', function () {
            todo.remove()
        })
    }
    //check mark
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement
        todo.classList.toggle('completed')
        const todoName = todo.innerText
        const todos = JSON.parse(localStorage.getItem('todos')) || []
        todos.forEach((todoItem) => {
            if (todoItem.name === todoName) {
                todoItem.isCompleted = !todoItem.isCompleted
            }
        })
        setTodosToLocalStorage(todos)
    }
}
function filterTodo(e) {
    const todos = todoList.childNodes
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex'
                break //already have them shown
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break
            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break
        }
    })
}

function setTodosToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
}
function saveLocalTodos(todo) {
    //check if you already have a todo in the storage
    let todos
    if (localStorage.getItem('todos') === null) todos = []
    else todos = JSON.parse(localStorage.getItem('todos'))
    todos.push(todo)
    setTodosToLocalStorage(todos)
}
function getTodos() {
    let todos
    if (localStorage.getItem('todos') === null) todos = []
    else todos = JSON.parse(localStorage.getItem('todos'))
    todos.forEach(function (todo) {
        //Todo DIV
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')
        if (todo.isCompleted) {
            todoDiv.classList.add('completed')
        }

        //Create Li
        const newTodo = document.createElement('li')
        newTodo.innerText = todo.name
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo) //Li appended to div as a child
        //Check Mark Button

        const completedButton = document.createElement('button')
        //completedButton.innerText='idhdj ' can be done but what if I wish to add an icon tag to it rather than just simple text then
        completedButton.innerHTML = '<i class= "fas fa-check"><i>'
        completedButton.classList.add('complete-btn')
        todoDiv.appendChild(completedButton)

        //Check Trash Button
        const trashButton = document.createElement('button')
        //completedButton.innerText='idhdj ' can be done but what if I wish to add an icon tag to it rather than just simple text then
        trashButton.innerHTML = '<i class= "fas fa-trash"><i>'
        trashButton.classList.add('trash-btn')
        todoDiv.appendChild(trashButton)

        //append this entire div block to {<ul>} list
        todoList.appendChild(todoDiv)
    })
}

//even after refresh the list remains but if you delete then also the list remains so we need to remove

function removeLocalTodos(todo) {
    let todos
    if (localStorage.getItem('todos') === null) todos = []
    else todos = JSON.parse(localStorage.getItem('todos'))
    /*getting the element on which we clicked trash button
    when we click on button we are clicking on div(todo) and we have to go downto the text
    */
    let i = 0
    todos.forEach((value, index) => {
        if (value === todo.children[0].innerText) {
            i = index
            return
        }
    })
    todos.splice(i, 1) // which element is to be removed and how many
    setTodosToLocalStorage(todos)
}
