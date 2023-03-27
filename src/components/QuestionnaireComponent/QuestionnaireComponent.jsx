import React, { useState } from 'react'
import { useQuestionnaire } from '../../hooks/useQuestionnaire'
import CircularProgress from '@mui/material/CircularProgress';
import { Button, LinearProgress, Stack, Typography } from '@mui/material';
import { useStyles } from './styles';
import { Box } from '@mui/system';
import SubmittedComponent from '../SubmittedComponent/SubmittedComponent';
import ErrorComponent from '../ErrorComponent/ErrorComponent';

const QuestionnaireComponent = ({questions, updateValue}) => {
    const {
        currentQuestion,
        currentIndex,
        next, 
        previous, 
        isFirstQuestion, 
        isLastQuestion, 
        progressPercentage, 
        isSubmitting, 
        submitted, 
        error
    } = useQuestionnaire(questions, updateValue)
    const [validationMessage, setValidationMessage] = useState(null)
    const classes = useStyles()

    /**
     * 
     * @param {Event} e 
     * @returns 
     */
    const handleNextOrSubmit = (e) => {
        setValidationMessage(null)
        const question = questions[currentIndex]
        if(question.required && !question.value.length) {
            setValidationMessage('Please fill out this field')
            return
        }
        if(question.pattern) {
            if (isValidInput(question.value, question.pattern)) {
                next()
            } else {
                setValidationMessage(question.message)
            }
        } else {
            next()
        }
    }

    /**
     * 
     * @param {string} value 
     * @param {string} pattern 
     * @returns boolean
     */
    const isValidInput = (value, pattern) => {
        const regex = new RegExp(pattern)
        return regex.test(value)
    }

    if(questions.length === 0) return <Box className={classes.questionnaireContainer}>
        <Typography>No Questions to answer</Typography>
    </Box>

    if(isSubmitting) {
        return <Box className=' h-[20rem] flex justify-center items-center'><CircularProgress color="secondary" /></Box>
    }
    if(error) {
        return <Box className=' h-[20rem] flex justify-center items-center'>
            <ErrorComponent error={error}/>
        </Box>
    }
    return (
        <Box className='w-full flex justify-center'>
            {
                submitted ? <SubmittedComponent />
                :
                <Box className='flex flex-col gap-10 items-center bg-white rounded-xl 
                                p-3 mx-4 my-8 w-full md:w-[65%] h-[60vh] shadow-xl'
                >
                    <div className='flex flex-col md:flex-row gap-2 w-[70%] md:justify-between items-center text-center'>
                        <LinearProgress className='w-[85%]'  variant="determinate" value={progressPercentage} />
                        <Typography className='whitespace-nowrap' >{progressPercentage}% completed</Typography>
                    </div>
                    <p className='text-red-500'>{validationMessage}</p>
                    <Box 
                        className='w-full h-full flex flex-col justify-between p-9 md:px-14'
                    >
                        { currentQuestion && currentQuestion }

                        <Box className='flex justify-between w-full'>
                            <div>
                                {!isFirstQuestion && <Button variant='contained' className={classes.backButton} type='button' onClick={previous}>Back</Button>}
                            </div>

                            <Button 
                                className='self-end' 
                                variant='contained' 
                                onClick={handleNextOrSubmit}
                            >{isLastQuestion ? 'Submit' : 'Next'}</Button>
                        </Box>
                    </Box>
                </Box>
            }
        </Box>
    )
}

export default QuestionnaireComponent