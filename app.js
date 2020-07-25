//selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
//Event Listeners
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
//Functions
function addTodo(event) {
    //prevent form from submitting
    event.preventDefault()
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
        todo.addEventListener('transitionend', function () {
            todo.remove()
        })
    }
    //check mark
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement
        todo.classList.toggle('completed')
    }
}
