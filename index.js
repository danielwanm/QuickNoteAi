import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
    databaseURL: "https://quicknoteai-d04d4-default-rtdb.asia-southeast1.firebasedatabase.app/" 
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const identity = ref(database, "identity")
let signupBtn = document.getElementById("signup-btn")
let signinBtn = document.getElementById("signin-btn")
let password = document.getElementById("password")
let username = document.getElementById("username")
let identityLocal = []
let myidentity = {}
let access = false
onValue(identity, function(snapshot){
    let identityArray = Object.values(snapshot.val())
    identityLocal = identityArray


})
const form = document.getElementById("signin-form");
form.addEventListener("submit", function(e){
    e.preventDefault(); // Prevent form submission
    myidentity = {
        password: password.value,
        username: username.value
    }
    console.log(myidentity)
    console.log(identityLocal)
    for (let i =0;i<identityLocal.length;i++){
        console.log("inloop")
        console.log(i)
        const newObj = (({ password, username }) => ({ password, username }))(identityLocal[i]);
        console.log(newObj)
        console.log(JSON.stringify(myidentity))
        console.log(JSON.stringify(newObj))
        if (JSON.stringify(myidentity) == JSON.stringify(newObj)){
            console.log("account found")
            sessionStorage.setItem("key", i+1)
            window.location.href = '../home/home.html'
        }
    }
});
