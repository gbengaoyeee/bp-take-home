import React from 'react'
import QuestionComponent from '../QuestionComponent/QuestionComponent'

const DatePicker = ({question, onChange}) => {
  return (
    
      <QuestionComponent {...question}>
          <input 
            {...question} 
            aria-label={question.id} 
            onChange={(event) => onChange(event.target.value)}
            className='border border-blue-200 md:w-4/6 p-5'
          />
      </QuestionComponent>
    
  )
}

export default DatePicker