const notes = ref(database, `identity/${sessionStorage.getItem("key")}/notes`)
let notesLocal = []
onValue(notes, function(snapshot){
    let notes = Object.values(snapshot.val())[0]
    notesLocal = notes
    console.log(notesLocal)})



