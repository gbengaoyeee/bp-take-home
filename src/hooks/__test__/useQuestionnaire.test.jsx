import {useQuestionnaire} from '../useQuestionnaire'
import {cleanup, render, screen} from '@testing-library/react'
import {renderHook, act} from '@testing-library/react-hooks'
import { vi } from 'vitest'


describe('useQuestionnaire', () => {

    const questions = [
        {
            id: 'full-name',
            title: 'What is your full name?',
            tag: 'input',
            type: 'text',
            required: true,
            pattern: "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$",
            value: ''
        },
        {
            id: 'email',
            title: 'What is your email?',
            tag: 'input',
            type: 'email',
            required: true,
            pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
            value: ''
        },
    ]
    const updateValue = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()
    })

    afterEach(() => {
        cleanup()
    })

    it('should render the first question when hook is initially loaded', () => {
        const {currentQuestion, isFirstQuestion, isLastQuestion} = renderHook(() => useQuestionnaire(questions, updateValue)).result.current
        render(currentQuestion)
        expect(screen.queryByText(new RegExp(questions[0].title, 'i'))).toBeInTheDocument()
        expect(isFirstQuestion).toBe(true)
        expect(isLastQuestion).toBe(false)
    })

    it('should render the second question when next() is called', () => {
        const { result } = renderHook(() => useQuestionnaire(questions, updateValue))
    
        act(() => {
          result.current.next()
        })
        render(result.current.currentQuestion)
        expect(screen.queryByText(new RegExp(questions[1].title, 'i'))).toBeInTheDocument()
        expect(result.current.isFirstQuestion).toBe(false)
        expect(result.current.isLastQuestion).toBe(true)
    })

    it('should navigating back and forth', () => {
        const {result} = renderHook(() => useQuestionnaire(questions, updateValue))

        // go to next
        act(() => {
            result.current.next()
        })

        render(result.current.currentQuestion)
        expect(screen.queryByText(new RegExp(questions[1].title, 'i'))).toBeInTheDocument()

        // go back to previous
        act(() => {
            result.current.previous()
        })
        render(result.current.currentQuestion)
        expect(screen.queryByText(new RegExp(questions[0].title, 'i'))).toBeInTheDocument()
    })

    it('should try to submit when next is called on the last question', async () => {
        const {result, waitForNextUpdate} = renderHook(() => useQuestionnaire(questions, updateValue))
        
        // go to next
        act(() => {
            result.current.next()
        })
        // try to submit
        act(() => {
            result.current.next()
        })

        expect(result.current.isSubmitting).toBe(true)
        await waitForNextUpdate({timeout: 3000})
        expect(result.current.isSubmitting).toBe(false)
        expect(result.current.submitted).toBe(true)

    })
})