const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
const refreshButtonElement = document.getElementById('refresh-btn')
let state = {}

function startGame() {
  state = {}
  showTextNode(1)
  refreshButtonElement.addEventListener('click',()=> startGame())
}


function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
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
        text: "Comienzo de un juego de elecciones con intención de tratar el tema de la identidad Digital",
        options:[
            {

            text: "Opción 1",
            setState: {luz : true},
            nextText: 2,
            },
            {
                text: "Opción 2",
                nextText: 201 ,
                
            },
            {
              text: "Opción 3",
              nextText: 301 ,           },
            {
              text: "Opción 4",
              nextText:401,
            },



        ]
    },
    {
        id:2,
        text:"Vienes de la Opción 1",
        options:[
            {
                text:"Sí",
                nextText:3,
            },
            {
                text:"También",
                nextText: 4,
            },
        ]
    },
    {
        id:201,
        text:"Vienes de la Opción 2",
        options:[
            {
                text:"Cierto",
                nextText:102,
            },
            {
                text: "Correcto",
                nextText: 201,
            },
        ]
    },
    {
        id:102,
        text:"Le diste a cierto"
    },

    
]
startGame()
