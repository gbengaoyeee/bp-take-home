import { Box } from '@mui/material'
import React from 'react'
import QuestionComponent from '../QuestionComponent/QuestionComponent'

const CheckBoxInput = ({question, onChange}) => {

    return (
        <QuestionComponent {...question}>
            <div required className='flex flex-col md:flex-row md:gap-7'>
            {
                question.options.map((option) => {
                    return (
                        <label key={option} required={true} >
                            <input 
                                type="checkbox" 
                                id={option} value={option} 
                                onChange={(event) => onChange(event.target.value)}
                                checked={question.value.includes(option)}
                                 
                            /> {option}
                        </label>
                    )
                })
            }
            </div>
        </QuestionComponent>
    )
}

export default CheckBoxInput