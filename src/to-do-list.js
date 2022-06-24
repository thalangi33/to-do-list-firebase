// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, doc, setDoc, updateDoc, addDoc, deleteDoc  } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkIzfHR5ErPqOVmobV9J-B7MpdU-azP-0",
  authDomain: "to-do-list-development-628db.firebaseapp.com",
  projectId: "to-do-list-development-628db",
  storageBucket: "to-do-list-development-628db.appspot.com",
  messagingSenderId: "209228645095",
  appId: "1:209228645095:web:6461b1765490134f459842"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize database
const db = getFirestore();

// Collection ref
const colRef = collection(db, "tasks");

let tasks = [];

// Get collection data
onSnapshot(colRef, (snapshot) => {
    console.log(snapshot.docs)
    tasks = [];
    snapshot.docs.forEach((doc) => {
        tasks.push({...doc.data(), id: doc.id})
    })
    console.log(tasks)

    listRendering();

    buttonReset();
})

const input = document.querySelector(".input-to-do");
const submit = document.querySelector(".to-do-submit");

let removeList = document.querySelectorAll(".delete-list");
let doneList = document.querySelectorAll(".done-check");
let undoneList = document.querySelectorAll(".undone-check");

function listRendering () {
    document.querySelector(".result-list").replaceChildren();

    tasks.forEach((task) => {
        var div = document.createElement("div");
        var deleteButton = document.createElement("button");
        var doneButton = document.createElement("button");
        var text = document.createElement("span");

    
        div.classList = "result-box";
        div.setAttribute("id", task.id);
    
        deleteButton.classList = "delete-list material-icons-outlined md-36";
        deleteButton.textContent = "delete"

        
        if(task.finished === true){
            doneButton.innerText = "undo"
            doneButton.classList = "undone-check material-icons-outlined md-36";
        } else {
            doneButton.innerText = "done"
            doneButton.classList = "done-check material-icons-outlined md-36";
        }
        
    
        text.textContent = task.name;
        console.log(task.description);
    
        div.appendChild(text);
        div.appendChild(doneButton);
        div.appendChild(deleteButton);
        document.querySelector(".result-list").appendChild(div);

        finishedChecker(task);
    })
}



submit.addEventListener("click", addTask, false);
input.addEventListener("keypress", function (e) {
    if (e.code  === "Enter") {
        addTask();
    }
});

function buttonReset () {
    removeList = document.querySelectorAll(".delete-list");
    doneList = document.querySelectorAll(".done-check");
    undoneList = document.querySelectorAll(".undone-check");

    for (let i = 0; i < removeList.length; i++) {
        removeList[i].addEventListener("click", deleteTask, false);
        console.log(removeList[i]);
    }

    for (let i = 0; i < doneList.length; i++) {
        doneList[i].addEventListener("click", updateDone, false);
        console.log(doneList[i]);
    }

    for (let i = 0; i < undoneList.length; i++) {
        undoneList[i].addEventListener("click", updateUndone, false);
        console.log(undoneList[i]);
    }
}

function addTask () {
    console.log(input.value)
    addDoc(colRef, {
        name: input.value,
        finished: false,
        description: "hello world",
        hidden: false
    })
}

function removeListHandler (event) {
    console.log(event.target);
    event.target.parentNode.remove();
}

function finishedChecker (task) {
    if (task.finished === true){
        let x = document.querySelector("#" + task.id)
        x.style.backgroundColor = "#A1CAF1";
    }

    if (task.finished === false){
        let x = document.querySelector("#" + task.id)
        x.style.backgroundColor = "white";
    }
}

function updateDone (event) {
    console.log(event.target.parentNode.id)
    const docRef = doc(db, "tasks", event.target.parentNode.id)

    updateDoc(docRef, {
        finished: true
    })
    .then(() => {
        console.log("success")
    })
}

function updateUndone (event) {
    console.log(event.target.parentNode.id)
    const docRef = doc(db, "tasks", event.target.parentNode.id)

    updateDoc(docRef, {
        finished: false
    })
    .then(() => {
        console.log("success")
    })
}

function deleteTask (event) {
    console.log(event.target.parentNode.id)
    const docRef = doc(db, "tasks", event.target.parentNode.id)

    deleteDoc(docRef)
        .then(() => {
            console.log("Delete success")
        })
}