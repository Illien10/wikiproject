const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
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
        text: "Amaneces en una cama extraña todo está a oscuras y tienes las manos esposadas, atisbas un interruptor de luz a la par que escuchas pasos acercándose",
        options:[
            {

            text: "Enciendes el interruptor",
            setState: {luz : true},
            nextText: 2,
            },
            {
                text: "Esperas en silencio",
                nextText: 101 ,
                
            },


        ]
    },
    {
        id:2,
        text:"Aparece Carlos haciendo el baile de la lluvia y te pide que te unas a el o si no te degollará",
        options:[
            {
                text:"Acepto",
                nextText:3,
            },
            {
                text:"Me río a carcajadas",
                nextText: 3,
            },
        ]
    },
    {
        id:101,
        text:"Aparece Carlos sigiloso, sientes como se mueve al ritmo de la lluvia y te susurra algo al oído",
        options:[
            {
                text:"te estremeces con miedo",
                nextText:102,
            },
            {
                text: "te estremeces de gustito",
                nextText: 201,
            },
        ]
    },
    {
        id:102,
        text:"Te dice que te va a obligar a ver los 1034 capítulos de OnePiece"
    },

    
]
startGame()
