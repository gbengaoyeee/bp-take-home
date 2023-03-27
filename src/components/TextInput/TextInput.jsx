import { TextField, Typography } from '@mui/material'
import React from 'react'
import QuestionComponent from '../QuestionComponent/QuestionComponent'

const TextInput = ({question, onChange}) => {
    return (
        <QuestionComponent {...question} >
            <TextField {...question}
                name={question.title}
                inputProps={{pattern: question.pattern, title:question.title}}
                autoFocus 
                onChange={(event) => onChange(event.target.value)} variant="standard" />
        </QuestionComponent>
    )
}

export default TextInput