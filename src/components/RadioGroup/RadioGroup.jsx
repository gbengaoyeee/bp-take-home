import React from 'react'
import QuestionComponent from '../QuestionComponent/QuestionComponent'
import {default as MuiRadioGroup}  from '@mui/material/RadioGroup';

const RadioGroup = ({question, onChange}) => {
    return (
        <QuestionComponent {...question}>
            <MuiRadioGroup>

                {
                    question.options.map((option) => {
                        return(
                            <div key={option}>
                                <label htmlFor={option} >
                                    <input 
                                        type="radio" 
                                        name={question.id} 
                                        id={option} 
                                        checked={option === question.value}
                                        onChange={(event) => onChange(event.target.id)} 
                                        required={question.required}
                                        style={{
                                            height: '20px',
                                            width: '20px',
                                            margin: '10px 0'
                                        }}
                                    /> <span>{option}</span>
                                </label>
                            </div>
                        )
                    })
                }
            </MuiRadioGroup>
        </QuestionComponent>
    )
}

export default RadioGroup