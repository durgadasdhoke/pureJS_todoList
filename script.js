        const title = document.getElementById("title");
        const desc = document.getElementById("desc");
        const titleTemp = document.getElementById("titleTemp");
        const descTemp = document.getElementById("descTemp");
        const save = document.getElementById( "save");
        const popup = document.getElementById( "popup");
        const saveTemp = document.getElementById( "saveTemp");
        const content = document.getElementById( "content");

        const search = document.getElementById("search");
        const todoList = JSON.parse(localStorage.getItem('todoList'));
        console.log(search.value);
        console.log(todoList);
        showList();

        search.addEventListener('input',(e)=>{
            if(e.target.value === "")
            {
                showList();
            }else{
                let searchList = [];
                content.innerHTML = "";
                todoList.forEach((element)=>{
                    if(element.title.toLowerCase().includes(e.target.value.toLowerCase())||element.desc.toLowerCase().includes(e.target.value.toLowerCase()))
                    {
                        searchList.push(element);
                        console.log(searchList);
                    }
                });

                let complete = "";
                {
                    let len = searchList.length;
                    for(let i=len-1;i>=0;i--)
                    {
                        let str = `
                            <div class="listCard">
                                <div class="firstDiv">
                                    <label for="">Title :<span>${searchList[i].title}</span> </label>
                                    <div class="timeBar">
                                        ${searchList[i].date}
                                    </div>
                                </div>
    
                                <div class="secondDiv">
    
                                    <label for="">Description :<span>${searchList[i].desc}<span> </label>
                                    <div class="btnDiv">    
                                        <button class="deleteBtn" onclick="editList(${i})">
                                            <img src="./edit.jpg" class="icon">
                                        </button>
                                        <button class="editBtn" onclick="deleteList(${i})">  
                                            <img src="./delete.jpg" class="icon">
                                        </button>
                                    </div>
                                </div>
                             </div>
    `;
                            complete += str;
                    }
                        content.innerHTML = complete;      
                }
    
            }
        });

       
        save.addEventListener('click',()=>{
            if(title.value === "")
            {
                alert("Please Enter the Title");
            }else{
                if(desc.value === "")
                {
                    alert("Please Enter the Description");
                }else{
                    todoList.push({title:title.value,desc:desc.value,date:new Date().toLocaleString(undefined)}); 
                    // console.log(todoList);  
                    localStorage.setItem("todoList",JSON.stringify(todoList));
                    showList();
                    title.value = "";
                    desc.value = "";
                }
            }
        });

      

        function editList(i){
                let titleTem = todoList[i].title;
                let descTem = todoList[i].desc;
                deleteList(i);
                console.log(todoList);
                popup.style.display = "block";
                titleTemp.value = titleTem;
                descTemp.value = descTem;

                saveTemp.addEventListener('click',()=>{
                    todoList.push({title:titleTemp.value,desc:descTemp.value,date:new Date().toLocaleString(undefined)});
                    localStorage.setItem("todoList",JSON.stringify(todoList));
                    popup.style.display = "none";
                    console.log(todoList);
                    showList();
                });
        }

        function showList()
        {
            let complete = "";
            if(todoList === null)
            {
                localStorage.setItem("todoList",JSON.stringify([]));
            }else if(todoList.length === 0){
                content.innerHTML = `<h2>No data available...</h2>`;
            }else{
                let len = todoList.length;
                for(let i=len-1;i>=0;i--)
                {
                    let str = `
                        <div class="listCard">
                            <div class="firstDiv">
                                <label for="">Title :<span>${todoList[i].title}</span> </label>
                                <div class="timeBar">
                                    ${todoList[i].date}
                                </div>
                            </div>

                            <div class="secondDiv">

                                <label for="">Description :<span>${todoList[i].desc}<span> </label>
                                <div class="btnDiv">    
                                    <button class="deleteBtn" onclick="editList(${i})">
                                        <img src="./edit.jpg" class="icon">
                                    </button>
                                    <button class="editBtn" onclick="deleteList(${i})">  
                                        <img src="./delete.jpg" class="icon">
                                    </button>
                                </div>
                            </div>
                         </div>
`;
                        complete += str;
                }
                    content.innerHTML = complete;      
            }
        }

        function deleteList(index){
            todoList.splice(index,1);
            console.log("deleted..");
            localStorage.setItem("todoList",JSON.stringify(todoList));
            showList();
        }        
