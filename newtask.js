import { testListArray } from "./main.js"

const nameEl = document.querySelector('#taskName')
const descEl = document.querySelector('#taskDescription')
const createBtn = document.querySelector('#create-task')

const createTask = () => {
    let newTask = {
        id: testListArray.length++,
        name: nameEl.value,
        description: descEl.value
    }
    testListArray.push(newTask)
    console.log(newTask)
    console.log(testListArray)
    window.alert(`Task "${newTask.name}" has been added to the list.`)
}

createBtn.addEventListener('click', createTask)