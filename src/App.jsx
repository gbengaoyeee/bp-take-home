import { useState } from 'react'
import {bpLogo} from './assets'
import { QuestionnaireComponent } from './components'
import { questionsList } from './utils'
import { SupportedInputs } from './utils/Questions/SupportedInputs'


function App() {
  const [questions, setQuestions] = useState(questionsList)
  const updateValue = (value, index, inputType) => {
    let questionsCopy = [...questions]
    if (inputType === SupportedInputs.Checked) {
      if(questionsCopy[index].value.includes(value)){
        let filtered = questionsCopy[index].value.filter((option) => value !== option)
        questionsCopy[index].value = filtered
        setQuestions([...questionsCopy])
      } else {
        questionsCopy[index].value.push(value)
        setQuestions([...questionsCopy])
      }
    
    } else {
      questionsCopy[index] = {...questionsCopy[index], value:value}
      setQuestions(questionsCopy)
    }
  }
  return (
    <div className="App">
      <header>
        <img src={bpLogo} alt="bp-logo" />
      </header>
      <main>
        <QuestionnaireComponent questions={questions} updateValue={updateValue} />
      </main>
    </div>
  )
}

export default App
