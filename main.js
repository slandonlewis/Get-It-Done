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
    {id: 2, name: "Do Laundry", description: "Wash, dry, and hang clothes"}
]
const listEl = document.querySelector('#list')
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
                <button id="delete-task">Delete</button>
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

// Clearing the task list, CHANGE LATER ONCE FIREBASE IS IMPLEMENTED
const clearAll = () => {
    // ask the user if they are sure about clearing everything
    let confirmation = window.confirm("Hey there! Sure you wanna clear this list? This CAN NOT be undone!")
    if (confirmation) {
        // set the task list array to an empty array, then update the task list on the DOM to show there are no tasks
        testListArray = [] // For now, this is clearing the test array. Later we will need to clear an actual database list of tasks.
        listEl.innerHTML = `<p>There are currently no tasks, woohoo!</p>`
        window.alert("All tasks have been cleared")
    }
}

// Clear button event listener
const clearBtn = document.querySelector('#delete-all')
clearBtn.addEventListener("click", clearAll)
