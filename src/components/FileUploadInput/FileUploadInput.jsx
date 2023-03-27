import { Button } from '@mui/material'
import React from 'react'
import QuestionComponent from '../QuestionComponent/QuestionComponent'

const FileUploadInput = ({question, onChange}) => {
    const file = question.value
    return (
        <QuestionComponent {...question}>
            <Button variant="contained" component="label">
                {question.title}
                <input 
                    required={question.required}
                    type={question.type} 
                    onChange={(event) => onChange(event.target.files[0])} 
                    style={{
                        opacity: 0,
                        maxWidth: '5px'
                    }}
                />
            </Button>
            <p>{file && `${file.name}`}</p>
        </QuestionComponent>
    )
}

export default FileUploadInput