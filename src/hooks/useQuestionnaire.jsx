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
        let percentage = Math.round((currentIndex / questionInputs.length) * 100)
        setProgressPercentage(percentage)
      }

      calculatePercentage()
    
    }, [currentIndex] )
    

    // constructs the body of the post request
    const getSubmitBody = () => {
        let body = new FormData()

        questions.forEach((question) => {
            if((question.value)) {
                body.append(question.id, question.value)
            }
        })
        return body
    }

    const submit = () => {
        const submitBody = getSubmitBody()
        setIsSubmitting(true)
        fetch(`${import.meta.env.VITE_SUBMIT_URL}`, {
            method: 'POST',
            body: submitBody
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