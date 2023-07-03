// Declaring array 
const data = [];
// Function for adding or setting task in localstorage
function add_task() {
    let variable_task = document.getElementById('task_input').value;
    console.log(variable_task);
    if (variable_task.length != 0 && variable_task != " ") {
        data.push(variable_task);
    }
    localStorage.setItem("Local_task", JSON.stringify(data));
    // Calling show_data() function for view tasks list after immediately adding them
    show_task();
}
function show_task() {
    // Declaring variable for adding js content in HTML
    let tbl = "";
    let data2 = JSON.parse(localStorage.getItem("Local_task"));
    data2.map((val_, index_, array_) => {
        tbl += `
        <tr>
        <td>${val_}</td>
        <td><button onclick="update_task(${index_})">Update task</button></td>
        <td><button id="dlt_btn${index_}" onclick="delete_task_pre(${index_})">Delete task</button>
        <button id="undo_btn${index_}" style="display:none" onclick="undo_boolean(${index_})">Undo task</button></td>
        <td><button class="last_btn" onclick="delete_task(${index_})">Completed task</button></td>
        </tr>
        `
    })
    // Showing js data in HTML
    document.getElementById('records_').innerHTML = tbl;
}
function update_task(update_index) {
    let update_task_ = prompt("Enter new task");
    data.map((val_, index_, array_) => {
        // verifying same index for updating
        if (index_ == update_index) {
            data[index_] = update_task_;
        }
    })
    localStorage.setItem("Local_task", JSON.stringify(data));
    // Calling show_data() function for view tasks list after immediately updating them
    show_task();
}
function delete_task_pre(delete_index){
        data.map((val_, index_, array_) => {
        if (index_ == delete_index){
            document.getElementById(`dlt_btn${index_}`).style.display = "none";
            document.getElementById(`undo_btn${index_}`).style.display = "block";
        }
    })    
    setTimeID = setTimeout(delete_task,3000,delete_index);
}
function delete_task(delete_index){
    data.map((val_, index_, array_) => {
        // verifying same index for deleting
        if (index_ == delete_index) {
            data.splice(delete_index, 1);
        }
    })
    localStorage.setItem("Local_task", JSON.stringify(data));
    // calling show_data() function for view tasks list after immediately deleting them
    show_task();
}
function undo_boolean(delete_index){
    data.map((val_, index_, array_) => {
        if (index_ == delete_index){
            document.getElementById(`dlt_btn${index_}`).style.display = "block";
            document.getElementById(`undo_btn${index_}`).style.display = "none";
        }
    })
    clearTimeout(setTimeID);
}
function clear_task(){
    document.getElementById('task_input').value = "";
}
