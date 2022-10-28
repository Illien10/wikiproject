const search_wrapper = document.getElementById('search-wrapper')
const redButton = document.getElementById('Personaje1')
const blueButton = document.getElementById('Personaje2')
const pinkButton = document.getElementById('Personaje3')


function startGame (){
    redButton.addEventListener('click',()=> showfindings(1))
    blueButton.addEventListener('click',()=> showfindings(2))
    pinkButton.addEventListener('click',()=> showfindings(3))
}


function showfindings(index){
    
    while (search_wrapper.firstChild) {
        search_wrapper.removeChild(search_wrapper.firstChild);
    }  
   
const node = findingsNodes.find(node => node.id === index)

node.finding_options.forEach(finding_option=> {
    const findingsreal = document.createElement('div')
    const header = document.createElement('div')
    header.className= "search-header"
    header.textContent=finding_option.header

    const body = document.createElement('div')
    body.className= "search-body"
    body.textContent=finding_option.body
   
    findingsreal.appendChild(header)
    findingsreal.appendChild(body)
    
    
    document.getElementById('search-wrapper').appendChild(findingsreal)
 })
}


   
const findingsNodes = [
    {
        id:1,
        finding_options:[
            {
            header: "Red Blob Instagram",
            body: "redBlob photos",
            },
            {
                header:"Red Blob Facebook",
                body:"facebook photos red",
            },

        ],
    },
    {
        id:2,
        finding_options:[
            {
                header:"blue",
                body:"bluephotos",
            },
        ],
    },
    {
        id:3,
        finding_options:[
            {
                header:"Pink Instagram",
                body:"Pink Instagram's Photos",
            },
            {
                header:'Pinks Facebook',
                body:"pink's Facebook Photos",
            },


        ]
    },
]
startGame()