// motivational quote api
const quoteEl = document.querySelector('#quote')
const motivationAPI = "https://type.fit/api/quotes"
fetch(motivationAPI)
.then(
    (response) => {
        const parsedData = response.json()
        return parsedData
    }
    )
    .then(
        (quotes) => {
            // pick a random quote from the list of quotes received from the typefit api
            const quoteIndex = Math.floor(Math.random() * quotes.length)
            quoteEl.innerHTML = `"${quotes[quoteIndex].text}" -${quotes[quoteIndex].author}`
        }
    )

// showing list of tasks upon startup
// if there are no tasks, show a p tag saying "no current tasks...", else list the tasks
let testListArray = [
    {id: 0, name: "Wash Dishes", description: "Scrub and rinse dirty dishes"},
    {id: 1, name: "Take Out Trash", description: "Empty out all trash cans and throw all bags out"},
    {id: 2, name: "Do Laundry", description: "Wash, dry, and hang clothes"},
    {id: 3, name: "Groceries", description: "Pick up eggs, cheese, and milk from the store."}
]
const listEl = document.querySelector('#list')
const listAllTasks = () => {
    let numOfTasks = testListArray.length
    if (numOfTasks === 0) {
        listEl.innerHTML = `<p>There are currently no tasks, woohoo!</p>`
    } else {
        let listItemElements = ""
        let listItemIndex = 0
        // change "testListArray" to the actual name of the list once it is created
        for (const listItem of testListArray) {
            // add each list-item div
            listItemElements += `
            <div class="list-item" style="animation-delay: ${listItemIndex * 0.1}s">
                <div>
                    <li>${listItem.name}</li>
                </div>
                <div>
                    <button id="view-task">View</button>
                    <button class="delete-task" data-task-id="${listItem.id}">Delete</button>
                </div>
            </div>
            `
            listItemIndex++
        }
        // view button event listener
        listEl.innerHTML = listItemElements
    
        // Adding a timeout for each task to animate
        const listItems = document.querySelectorAll('.list-item');
        listItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100); // Adjust the delay as per your preference
        });
    }
}
listAllTasks()

// Clearing the task list, CHANGE LATER ONCE FIREBASE IS IMPLEMENTED
const clearAll = () => {
    if (testListArray.length != 0) {
        let confirmation = window.confirm("Hey there! Sure you wanna clear this list? This CAN NOT be undone!")
        if (confirmation) {
            // set the task list array to an empty array, then update the task list on the DOM to show there are no tasks
            testListArray = [] // For now, this is clearing the test array. Later we will need to clear an actual database list of tasks.
            listEl.innerHTML = `<p>There are currently no tasks, woohoo!</p>`
            window.alert("All tasks have been cleared")
        }
    } else {
        window.alert('There are no tasks to clear.')
    }
}

// Clear button event listener
const clearBtn = document.querySelector('#delete-all')
clearBtn.addEventListener("click", clearAll)

// Identify a task before viewing or deleting it
const identifyTask = (idOfTaskToFind) => {
    // CHANGE ONCE FIREBASE IS IMPLEMENTED
    for (let i = 0; i < testListArray.length; i++) {
        // if i matches idOfTaskToFind, return array[i]
        if (testListArray[i].id === idOfTaskToFind) {
            return testListArray[i]
        }
    }
}

// Deleting a specific task, CHANGE LATER ONCE FIREBASE IS IMPLEMENTED
const deleteTaskBtns = document.querySelectorAll('.delete-task')
const deleteTask = (taskId) => {
    let confirmation = window.confirm('Are you sure you want to delete this task?')
    if (confirmation) {
        // 1. Find target task in the task list array
        let taskToBeRemoved = identifyTask(taskId)
        // 2. Remove that task
        // testListArray.splice(taskToBeRemoved, 1)
        let updatedTaskList = testListArray.filter(item => item !== taskToBeRemoved)
        testListArray = updatedTaskList
        // 3. Update DOM to reflect array changes
        listAllTasks()
    }
}

// Delegating delete event (just learned what Event Delegation is)
const deleteTaskHandler = (event) => {
    if (event.target.classList.contains('delete-task')) {
        const taskToDelete = parseInt(event.target.dataset.taskId);
        deleteTask(taskToDelete)
    }
}

// Delete task event listener
document.addEventListener('click', deleteTaskHandler)

// Search for a task by name or description
const searchBar = document.querySelector('#search-bar')
const searchBtn = document.querySelector('#search-btn')

const searchForTask = () => {
    let searchText = searchBar.value.toLowerCase()
    let searchResults = []
    for (let i=0; i < testListArray.length; i++) {
        let taskName = testListArray[i].name.toLowerCase()
        let taskDesc = testListArray[i].description.toLowerCase()
        if (taskName.includes(searchText)) {
            searchResults.push(testListArray[i])
        } else if (taskDesc.includes(searchText)) {
            searchResults.push(testListArray[i])
        }
    }
    // generate HTML for each search result
    listEl.innerHTML = ''
    for (let i=0; i < searchResults.length; i++) {
        listEl.innerHTML += `
        <div class="list-item">
            <div>
                <li>${searchResults[i].name}</li>
            </div>
            <div>
                <button id="view-task">View</button>
                <button class="delete-task" data-task-id="${searchResults[i].id}">Delete</button>
            </div>
        </div>
        `
    }
}

searchBtn.addEventListener('click', searchForTask)

