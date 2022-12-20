const textElement = document.getElementById('text')
const imageElement = document.getElementById('img1')
const optionButtonsElement = document.getElementById('option-buttons')
const refreshButtonElement = document.getElementById('refresh-btn')

const instaImage = document.getElementById('instagram')


function startGame() {
  state = {}
  showTextNode(1)
  refreshButtonElement.addEventListener('click',()=> startGame())
  
}


function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  imageElement.src = textNode.img
  

  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  
  
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id:1,
        text: "Click on Start to begin",
        options:[
            {

            text: "Start",
            nextText: 2,
            
            
            
            },
          



        ]
    },
    {
        id:2,
        text:"What kind of mixture is this one?",
        img: "imgs/sand.jpg",
        options:[
            {
                text:"Homogeneus",
                nextText:3,
            },
            {
                text:"Heterogeneus",
                nextText: 4,
            },
        ]
    },
    {
        id:3,
        text:"Wrong! go back and check the image again, remember that you can always ask for help",
        options:[
            {
                text:"Lets try again!",
                nextText:2,
            },
            
        ]
    },
    {
        id:4,
        text:"Right! Keep going!",
        options:[
            {
                text:"Bring me the next one!",
                nextText:5,
            },
            
        ]
    },
    {
      id:5,
      text:"I need to separate this sand and plastics, I think I will use a _____",
      options:[
        {
            text:"Option1",
            nextText:6,
        },
        {
            text:"Option2",
            nextText:6,
        },
        {
            text:"Option3",
            nextText:6,
        },
        {
            text:"sieve",
            nextText:7,
        }
        
    ]
  },
  {
    id:6,
    text:"Try again!",
    options:[
        {
            text:"Another go",
            nextText:5,
        }
    ]
},
{
  id:7,
  text:"Great!"
},

    
]
startGame()
