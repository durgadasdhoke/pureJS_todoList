// selectors**********************************************************************************************************************************************
const title = document.getElementById("title");
const desc = document.getElementById("desc");
const titleTemp = document.getElementById("titleTemp");
const descTemp = document.getElementById("descTemp");
const save = document.getElementById("save");
const popup = document.getElementById("popup");
const saveTemp = document.getElementById("saveTemp");
const content = document.getElementById("content");
const search = document.getElementById("search");

var todoList = JSON.parse(localStorage.getItem('todoList'));
showList();
// event listerners*******************************************************************************************************************************************
// searching element
search.addEventListener('input', (e) => {
    if (e.target.value === "") {
        showList();
    }
    else {
        let searchList = [];
        content.innerHTML = "";
        todoList.forEach((element) => {
            if (element.title.toLowerCase().includes(e.target.value.toLowerCase()) || element.desc.toLowerCase().includes(e.target.value.toLowerCase())) {
                searchList.push(element);
            }
        });
        content.innerHTML = populate(searchList);
    }
});


save.addEventListener('click', () => {
    if (title.value === "") {
        alert("Please Enter the Title");
    } else {
        if (desc.value === "") {
            alert("Please Enter the Description");
        } else {
            todoList.push({ title: title.value, desc: desc.value, date: new Date().toLocaleString(undefined) });
            console.log(todoList);
            localStorage.setItem("todoList", JSON.stringify(todoList));
            showList();
            title.value = "";
            desc.value = "";
        }
    }
});

// Functions**********************************************************************************************************************************

function editList(i) {
    let titleTem = todoList[i].title;
    let descTem = todoList[i].desc;
    deleteList(i);
    popup.style.display = "block";
    titleTemp.value = titleTem;
    descTemp.value = descTem;

    saveTemp.addEventListener('click', () => {
        todoList.push({ title: titleTemp.value, desc: descTemp.value, date: new Date().toLocaleString(undefined) });
        localStorage.setItem("todoList", JSON.stringify(todoList));
        popup.style.display = "none";
        showList();
    });
}

function showList() {
    todoList = JSON.parse(localStorage.getItem("todoList"));

    if (todoList === null) {
        todoList = [];
        localStorage.setItem("todoList", JSON.stringify([]));
    } else if (todoList.length === 0) {
        content.innerHTML = `<h2>No data available...</h2>`;
    }
    content.innerHTML = populate(todoList);

}

function deleteList(index) {
    todoList.splice(index, 1);
    localStorage.setItem("todoList", JSON.stringify(todoList));
    showList();
}

function populate(arr) {
    let complete = "";
    let len = arr.length;
    for (let i = len - 1; i >= 0; i--) {
        let str = `
                    <div class="listCard">
                            <div class="firstDiv">
                                <label for="">Title :<span>${arr[i].title}</span> </label>
                                <div class="timeBar">
                                    ${arr[i].date}
                                </div>
                            </div>

                            <div class="secondDiv">
                                <label for="">Description :<span>${arr[i].desc}<span> </label>
                                <div class="btnDiv">    
                                    <button class="deleteBtn" onclick="editList(${i})">
                                        <img src="./edit.jpg" class="icon">
                                    </button>
                                    <button class="editBtn" onclick="deleteList(${i})">  
                                        <img src="./delete.jpg" class="icon">
                                    </button>
                                </div>
                            </div>
                    </div>`;
        complete += str;
    }
    return complete;
}
