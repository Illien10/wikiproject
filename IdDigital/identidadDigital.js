const search_wrapper = document.getElementById('search-wrapper')
const redButton = document.getElementById('Personaje1')
const blueButton = document.getElementById('Personaje2')
const pinkButton = document.getElementById('Personaje3')
const accordionTitle = document.querySelector('.accordion-title');
const accordionContent = document.querySelector('.accordion-content');

accordionTitle.addEventListener('click', function() {
  accordionContent.classList.toggle('show');
});


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
    const icon = document.createElement("img")
    icon.className= "icon"
    icon.src=finding_option.header

    const body = document.createElement('img')
    body.className= "picture"
    body.src=finding_option.body
   
    findingsreal.appendChild(icon)
    findingsreal.appendChild(body)
    
    
    document.getElementById('search-wrapper').appendChild(findingsreal)
 })
}


   
const findingsNodes = [
    {
        id:1,
        finding_options:[
            {
            header: "/wikiproject/images/Instagram.png",
            body: "/wikiproject/images/redimgs/redtakespicofbluenature.png",
            },
            {
                header: "/wikiproject/images/Instagram.png",
                body: "/wikiproject/images/pinkguitar.png",
                },

        ],
    },
    {
        id:2,
        finding_options:[
            {
                header:"/wikiproject/images/Instagram.png",
                body:"/wikiproject/images/blueimgs/bluecomputer.png",
            },
            {
                header:"/wikiproject/images/Instagram.png",
                body:"/wikiproject/images/blueimgs/blueGaming.png",
            },
            {
                header:"/wikiproject/images/Instagram.png",
                body:"/wikiproject/images/blueimgs/blueskating.png",
            },
        ],
    },
    {
        id:3,
        finding_options:[
            {
                header:"/wikiproject/images/Instagram.png",
                body:"/wikiproject/images/sin-fotos.png",
            },
            {
                header:"/wikiproject/images/Instagram.png",
                body:"/wikiproject/images/sin-fotos.png",
            },


        ]
    },
]

startGame()