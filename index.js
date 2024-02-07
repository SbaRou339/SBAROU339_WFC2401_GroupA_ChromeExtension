let myLeads = [] // Initialize an array to store leads
const inputEl = document.getElementById("input-el") // Get reference to input element
const inputBtn = document.getElementById("input-btn") // Get reference to input button
const ulEl = document.getElementById("ul-el") // Get reference to unordered list element
const deleteBtn = document.getElementById("delete-btn") // Get reference to delete button
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads")) // Retrieve leads from local storage
const tabBtn = document.getElementById("tab-btn") // Get reference to tab button

if (leadsFromLocalStorage) { // Check if leads exist in local storage
    myLeads = leadsFromLocalStorage // If leads exist, assign them to the myLeads array
    render(myLeads) // Render the leads in the user interface
}

tabBtn.addEventListener("click", function () { // Add event listener to tab button
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) { // Query active tab
        myLeads.push(tabs[0].url) // Push the URL of the active tab to myLeads array
        localStorage.setItem("myLeads", JSON.stringify(myLeads)) // Store myLeads array in local storage
        render(myLeads) // Render the leads in the user interface
    })
})

function render(leads) { // Function to render leads in the user interface
    let listItems = "" // Initialize an empty string for list items
    for (let i = 0; i < leads.length; i++) { // Loop through each lead
        listItems += ` // Add lead as a list item to the listItems string
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems // Set the innerHTML of the unordered list to listItems
}

deleteBtn.addEventListener("dblclick", function () { // Add event listener to delete button
    localStorage.clear() // Clear local storage
    myLeads = [] // Clear myLeads array
    render(myLeads) // Render an empty list in the user interface
})

inputBtn.addEventListener("click", function () { // Add event listener to input button
    myLeads.push(inputEl.value) // Push the value of the input field to myLeads array
    inputEl.value = "" // Clear the input field
    localStorage.setItem("myLeads", JSON.stringify(myLeads)) // Store myLeads array in local storage
    render(myLeads) // Render the leads in the user interface
})
