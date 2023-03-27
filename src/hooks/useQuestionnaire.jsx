import { useEffect, useMemo, useState } from "react"
import { QuestionsComponentLoader } from "../utils"

export const useQuestionnaire = (questions, updateValue) => {
    const questionInputs = useMemo(() => QuestionsComponentLoader(questions, updateValue), [updateValue])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState(null)
    const [progressPercentage, setProgressPercentage] = useState(0)

    useEffect(() => {
      const calculatePercentage = () => {
        let percentage = Number((currentIndex / questionInputs.length).toFixed(2)) * 100
        setProgressPercentage(percentage)
      }

      calculatePercentage()
    
    }, [currentIndex] )
    

    const getSubmitBody = () => {
        let body = {}

        questions.forEach((question) => {
            if((question.value)) {
                if(question.value.length > 0) {
                    body[question.id] = question.value
                }
            }
        })
        console.log(body)
        return body
    }

    const submit = () => {
        console.log('submitting')
        const submitBody = getSubmitBody()
        setIsSubmitting(true)
        fetch(`${import.meta.env.VITE_SUBMIT_URL}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submitBody)
        })
        .then((res) => {
            if (res.status === 200) {
                setSubmitted(true)
            } else {
                setError(new Error('Could not submit questionnaire successfully'))
            }
        })
        .catch((error) => {
            setError(error)
        })
        .finally(() => {
            setIsSubmitting(false)
        })
    }
    const next = () => {
        if(currentIndex <= questionInputs.length - 2) {
            setCurrentIndex((prev) => prev+1)
        } else {
            submit()
        }
    }
    const previous = () => {
        if(currentIndex > 0) {
            setCurrentIndex((prev) => prev-1)
        }
    }
    return {
        currentQuestion: questionInputs[currentIndex] ? questionInputs[currentIndex] : undefined,
        currentIndex,
        previous,
        next,
        isFirstQuestion: currentIndex === 0,
        isLastQuestion: currentIndex === questionInputs.length-1,
        progressPercentage,
        isSubmitting,
        submitted,
        error
    }
}