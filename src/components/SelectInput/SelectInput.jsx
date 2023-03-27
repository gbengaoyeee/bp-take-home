import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import QuestionComponent from '../QuestionComponent/QuestionComponent'

const SelectInput = ({question, onChange}) => {
    return (
        <QuestionComponent {...question} >
        <FormControl sx={{ m: 1, minWidth: 180 }} size='medium'>
            <InputLabel>Country</InputLabel>
            <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                onChange={(event) => onChange(event.target.value)} 
                value={question.value}
                autoWidth
                label="Age"
                required={question.required}
            >
                {
                    question.options.map((option) => {
                        return (
                            <MenuItem selected={question.value === option.value} key={option.label} value={option.value}>{option.label}</MenuItem>

                        )
                    })
                }
            </Select>
        </FormControl>
        </QuestionComponent>
    )
}

export default SelectInput