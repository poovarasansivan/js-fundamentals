const id = document.getElementById('task');
const listcontainer = document.getElementById('list-container');    

function AddTask (){
    
    if(id.value === ""){
        alert("Please Enter Task");
    }
    else{
        let li = document.createElement('li');
        li.innerHTML = id.value;
        listcontainer.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML = "\u00D7";
        li.appendChild(span); 
    }
    id.value="";
    saveData();
}

listcontainer.addEventListener('click', function(ev) {
    if(ev.target.tagName === 'LI'){
        ev.target.classList.toggle('checked');
        saveData();
    }
    if(ev.target.tagName === 'SPAN'){
        ev.target.parentElement.remove();
        saveData();
    }
},false);

function saveData(){
    localStorage.setItem('data', listcontainer.innerHTML);
}

function loadData(){
    listcontainer.innerHTML = localStorage.getItem('data');
}

loadData();