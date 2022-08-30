
let myLeads = []
//myLeads = JSON.stringify(myLeads) --> change type of array to string that we can use for localStorage(only accept string)
//myLeads = JSON.parse(myLeads) --> if change type our array to string by this (` `) , and want to change it again to array 
const inputEl = document.getElementById("input-el") //can't be reasigned
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
//Local Storage
const leadsFromLocalStorage = JSON.parse(localStorage.getItem(myLeads)) // myleads(string) --> array
if(leadsFromLocalStorage){ //if leadsFromLocalStorage is truthy
    myLeads = leadsFromLocalStorage
    render(myLeads)
}
//Buttons
tabBtn.addEventListener("click", function(){
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url) // get the value of the key
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
     })
    
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)

})
deleteBtn.addEventListener("dblclick", function(){
   localStorage.clear()
   myLeads = []
   render(myLeads)
})
inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads)) //save url's as setting in local storage
    render(myLeads)
})
function render(Leads){
    let listItems = ""
    for(let i = 0 ; i < Leads.length ; i++){
        //we have to way to do this :
        //1 --> ulEl.innerHTML += "<li>" + myLeads[i] + "</li>" --> instead use ulEl.textcontent we use this !
        //2 -->
        //const li = document.createElement("li")
        // li.textContent = myLeads[i]
        // ulEl.append(li) --> End
        //also we have two way to show this line :
        //1 --> listItems += "<li><a target= '_blank' href='"+ myLeads[i] +"'>" + myLeads[i] + "</a </li>"
        //2 -->
        listItems += `
            <li>
                <a target='_blank' href='${Leads[i]}'>
                    ${Leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}
