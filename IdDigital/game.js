const textElement = document.getElementById('text')
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
        id: 1,
        text: "¿A 'azul' le gusta jugar a las máquinas?",
        options: [
            {
                text: "Sí",
                nextText: 2,
            },
            {
                text: "No",
                nextText: "error1",
            }
        ]
    },
    {
        id: 2,
        text: "¿A 'azul' le gusta hacer Skate?",
        options: [
            {
                text: "Sí",
                nextText: 3,
            },
            {
                text: "No",
                nextText: "error1",
            }
        ]
    },
    {
        id: 3,
        text: "¿A 'azul' le gustan los ordenadores?",
        options: [
            {
                text: "Sí",
                nextText: 4,
            },
            {
                text: "No",
                nextText: "error1",
            }
        ]
    },
    {
        id: 4,
        text: "¿A 'azul' le gusta la fotografía?",
        options: [
            {
                text: "Sí",
                nextText: "error1",
            },
            {
                text: "No",
                nextText: 5,
            }
        ]
    },
    {
        id: 5,
        text: "¿A 'rojo' le gusta la naturaleza?",
        options: [
            {
                text: "Sí",
                nextText: 6,
            },
            {
                text: "No",
                nextText: "error2",
            }
        ]
    },
    {
        id: 6,
        text: "¿A 'rojo' le gusta la fotografía?",
        options: [
            {
                text: "Sí",
                nextText: 7,
            },
            {
                text: "No",
                nextText: "error2",
            }
        ]
    },
    {
        id: 7,
        text: "¿Sabemos que 'rosa' toca la guitarra?",
        options: [
            {
                text: "Sí",
                nextText: 8,
            },
            {
                text: "No",
                nextText: "error3",
            }
        ]
    },
    {
        id: 8,
        text: "Fin del cuestionario. ¡Gracias por participar!"
    },
    {
        id: "error1",
        text: "Incorrecto. Por favor vuelve a revisar la información sobre 'azul'."
    },
    {
        id: "error2",
        text: "Incorrecto. Por favor vuelve a revisar la información sobre 'rojo'."
    },
    {
        id:"error3",
        text:"Incorrecto. Mira a ver si encuentras algo sobre rosa"
    },]
        
    

startGame()
