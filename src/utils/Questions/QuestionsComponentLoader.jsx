import { CheckBoxInput, DatePicker, FileUploadInput, RadioGroup, SelectInput, TextInput } from "../../components"
import { SupportedInputs } from "./SupportedInputs"

export const QuestionsComponentLoader = (questions, updateValue) => {
    let components = []
    questions.forEach((question, index) => {
        switch (question.tag) {
            case SupportedInputs.Input: {
                const inputElement = <TextInput 
                                        question={question} 
                                        onChange={(value) => updateValue(value, index)}  
                                    />
                components.push(inputElement)
                break
            }
            
            case SupportedInputs.Radio: {
                const inputElement = <RadioGroup 
                                    question={question} 
                                    onChange={(id) => updateValue(id, index)} />
                components.push(inputElement)
                break
            }

            case SupportedInputs.Checked: {
                const inputElement = <CheckBoxInput 
                                        question={question} 
                                        onChange={(value) => updateValue(value, index, SupportedInputs.Checked)} />
                components.push(inputElement)
                break
            }

            case SupportedInputs.Select: {
                const inputElement = <SelectInput question={question} onChange={(value) => updateValue(value, index)} />
                components.push(inputElement)
                break
            }

            case SupportedInputs.File: {
                const inputElement = <FileUploadInput 
                                        question={question} 
                                        onChange={(file) => {
                                            if(file) {
                                                updateValue(file, index)
                                            }
                                        }}
                                    />
                components.push(inputElement)
                break
            }
            case SupportedInputs.Date: {
                const inputElement = <DatePicker question={question} onChange={(value) => updateValue(value, index)}   />
                components.push(inputElement)
                break
            }

            default:
                components.push(<>Question Type is not supported</>)
                break
        }
    })
    return components
}