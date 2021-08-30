"use strict";
let tasks = [];

const getPriorityName = function (priority) {
  switch (priority) {
    case "1":
      return "High";
    case "2":
      return "Medium";
    case "3":
      return "Low";
    default:
      return "";
  }
};

const deleteTask = function (i) {
  if (!confirm("Are you sure ?")) return;
  tasks.splice(i, 1);
  renderTable();
};
const moveUp = function (i) {
  if (i == 0) return;
  const oldTask = tasks[i];
  tasks[i] = tasks[i - 1];
  tasks[i - 1] = oldTask;
  renderTable();
};
const moveDown = function (i) {
  if (i == tasks.length - 1) return;
  const oldTask = tasks[i];
  tasks[i] = tasks[i + 1];
  tasks[i + 1] = oldTask;
  renderTable();
};

const renderTable = function () {
  const tbody = document.querySelector("#tasks_tbody");
  tbody.innerHTML = "";
  

  tasks.forEach((t, i) => {
    var row = ""
      if(!t.Edited){
     row = `
        <tr>
        <td>${i + 1}</td>
        <td>${t.name}</td>
        <td>${getPriorityName(t.priority)}</td>
        <td>
        ${
          i > 0
            ? `<button class="btn btn-sm btn-secondary" onclick="moveUp(${i})">Up</button>`
            : ``
        }
        ${
          i < tasks.length - 1
            ? `<button class="btn btn-sm btn-secondary" onclick="moveDown(${i})">Down</button>`
            : ``
        }
        </td>
        <td>
        <button class="btn btn-primary btn-sm" onclick ="EditClicked(${i})">Edit</button>
        <button class="btn btn-success btn-sm" style="display:none;">Save</button>
        <button class="btn btn-danger btn-sm" style="display:none;">Cancel</button>
        <button class="btn btn-danger btn-sm" onclick="deleteTask(${i})">Delete</button></td>
        </tr>
        `;
    }
    else{
         row = `
        <tr>
        <td>${i + 1}</td>
        <td><input type="text" id = "task_name${i}" class = "form-control" placeholder = "Task name" value = "${t.name}"></input></td>
        <td><select id = "task_priority${i}" class ="form-control">
        <option value ="1" ${t.priority == 1?'selected':''}>High</option>
        <option value ="2" ${t.priority == 2?'selected':''}>Medium</option> 
        <option value ="3" ${t.priority == 3?'selected':''}>Low</option>  
    </select></td>
        <td>
        ${
          i > 0
            ? `<button class="btn btn-sm btn-secondary" onclick="moveUp(${i})">Up</button>`
            : ``
        }
        ${
          i < tasks.length - 1
            ? `<button class="btn btn-sm btn-secondary" onclick="moveDown(${i})">Down</button>`
            : ``
        }
        </td>
        <td>
        <button class="btn btn-primary btn-sm" style="display:none;">Edit</button>
        <button class="btn btn-success btn-sm" onclick= "saveClicked(${i})">Save</button>
        <button class="btn btn-danger btn-sm" onclick = "cancelClicked(${i})">Cancel</button>
        <button class="btn btn-danger btn-sm" style="display:none;" onclick="deleteTask(${i})">Delete</button></td>
        </tr>
        `;

        
    } 
    tbody.insertAdjacentHTML("beforeEnd", row);
  });
};

const EditClicked = function(i){
tasks[i].Edited = true;
renderTable();
}

const saveClicked = function (i){
    const taskName = document.querySelector(`#task_name${i}`).value;
    const priority = document.querySelector(`#task_priority${i}`).value;
    
    if (taskName !== "" && priority > 0) {

      tasks[i] = {
        name: taskName,
        priority: priority,
        Edited: false,
  
      };
    }
renderTable();
}

const cancelClicked = function(i){
    tasks[i].Edited = false;
    renderTable();
    }



const addTask = function () {
  console.log(this);
  const taskName = document.querySelector("#task_name").value;
  const priority = document.querySelector("#task_priority").value;
  
  if (taskName !== "" && priority > 0) {
    tasks.push({
      name: taskName,
      priority: priority,
      Edited: false,

    });
    renderTable();
  }
};

document.querySelector("#add").addEventListener("click", addTask);
