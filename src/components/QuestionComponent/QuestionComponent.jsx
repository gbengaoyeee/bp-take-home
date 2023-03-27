import React from 'react'

const QuestionComponent = ({title, required, children}) => {
  return (
    <div className=' h-full flex flex-col justify-evenly'>
        <label  data-testid="question-title" htmlFor={title} className='text-lg font-bold'>{`${title} ${required ? '*':''}`}</label>
        {children}
    </div>
  )
}

export default QuestionComponent