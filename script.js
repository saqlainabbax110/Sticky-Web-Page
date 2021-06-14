var note_i=1
var starred_note=[]
var colors=[
    "red",
    "green",
    "#222",
    "#fffff",
    "pink",
    "purple","yellow","blue","gray","#546377", "#FFA07A", "#FA8072","#CD5C5C","#00FF00", "#00FFFF","#008080","#C0C0C0","#FF00FF","#00FF7F","#20B2AA",
    "#FFE4E1","#F5DEB3 "
]


const addBtn = document.getElementById('add')

const notes = JSON.parse(localStorage.getItem('notes'))

if(notes) {
    notes.forEach(note => addNewNote(note))
}

addBtn.addEventListener('click', () => addNewNote())

function addNewNote(text = '') {
    const note = document.createElement('div')
    note.classList.add('note')
    note.style.background=   colors[ Math.floor((Math.random()*colors.length)) ]
    note.setAttribute('id',"note_"+note_i)
    note.setAttribute('draggable',true)
    note.addEventListener('drag', function(e){
        note.style.position="absolute"
    })

    note.addEventListener('dragend', function(e){
        var x=e.pageX
        var y=e.pageY
        note.style.left=(x-30)+"px"
        note.style.top=(y-30)+"px" 
    })

    note.innerHTML = `
    <div class="tools">
    <button class="star"><i class="fas fa-star"></i></button>
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    `

    const starBtn = note.querySelector('.star')
    const editBtn = note.querySelector('.edit')
    const deleteBtn = note.querySelector('.delete')
    const main = note.querySelector('.main')
    const textArea = note.querySelector('textarea')

    textArea.value = text
    main.innerHTML =  marked(text)

    starBtn.addEventListener('click', () => {
        // console.log('sd')
        var note_id=starBtn.parentElement.parentElement.getAttribute('id')
        if(!starBtn.classList.contains('text-warning')){
            starBtn.classList.add('text-warning')
            
            starred_note.push(note_id)
        }
        else{
            starBtn.classList.remove('text-warning')
            var index=starred_note.indexOf(note_id)
            starred_note.splice(index,1)
        }

        
console.log(starred_note)
    } )

    deleteBtn.addEventListener('click', () => {
        note.remove()

        updateLS()
    })

    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden')
        textArea.classList.toggle('hidden')
    })

    textArea.addEventListener('input', (e) => {
        const { value } = e.target

        main.innerHTML = marked(value)

        updateLS()
    })

    document.querySelector('#notes').appendChild(note)

    note_i++
}

function updateLS() {
    const notesText = document.querySelectorAll('textarea')

    const notes = []

    notesText.forEach(note => notes.push(note.value))

    localStorage.setItem('notes', JSON.stringify(notes))
}



const check_starred=document.querySelector('#check_starred')
check_starred.addEventListener('click',()=>{
    

    document.querySelectorAll('.note').forEach(note=>{
        note.style.display="none"
    })

    starred_note.forEach(id=>{
        document.querySelector("#"+id).style.display="block"
    })

    if(starred_note.length<=0){
        let alert="<div id='alert_notes' class='h2 text-center text-white badge badge-danger'> No Starred Notes!!! </div>"
        document.querySelector('#notes').innerHTML+=alert
    }
})

const show_all = document.querySelector('#check_all')
show_all.addEventListener('click',() =>{
    document.querySelectorAll('.note').forEach(note=>{
        note.style.display="block"
    })

    document.querySelector('#alert_notes').style.display="none"
})

