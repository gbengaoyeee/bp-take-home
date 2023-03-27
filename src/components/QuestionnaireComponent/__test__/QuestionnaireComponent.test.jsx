import {cleanup, render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import QuestionnaireComponent from '../QuestionnaireComponent'

describe('QuestionnaireComponent', () => {

    afterEach(() => {
        cleanup()
    })

    it('should show only next button on initial mount', () => {
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
        render(<QuestionnaireComponent questions={questions} />)
        const nextButton = screen.getByRole('button', {name: 'Next'})
        expect(nextButton).toBeEnabled()
        expect(nextButton).toBeInTheDocument()
    })
    it('should show submit button on last question', () => {
        const questions = [
            {
                id: 'full-name',
                title: 'What is your full name?',
                tag: 'input',
                type: 'text',
                required: true,
                pattern: "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$",
                value: ''
            }
        ]
        render(<QuestionnaireComponent questions={questions} />)
        const submitButton = screen.getByRole('button', {name: 'Submit'})
        expect(submitButton).toBeEnabled()
        expect(submitButton).toBeInTheDocument()
    })

    it('should show a question', () => {
        const questions = [
            {
                id: 'full-name',
                title: 'What is your full name?',
                tag: 'input',
                type: 'text',
                required: true,
                pattern: "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$",
                value: ''
            }
        ]
        render(<QuestionnaireComponent questions={questions} />)
        const heading = screen.queryByText(new RegExp(questions[0].title, 'i'));
        expect(heading).toBeInTheDocument()
    })

    it('should not go to next question if input is empty', async () => {
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
        render(<QuestionnaireComponent questions={questions} />)
        const nextButton = screen.getByRole('button', {name: 'Next'})
        await userEvent.click(nextButton)

        const question1Title = screen.queryByText(new RegExp(questions[0].title, 'i'));
        expect(question1Title).toBeInTheDocument()
    })

    it('should go to next question if input is entered', async () => {
        const questions = [
            {
                id: 'full-name',
                title: 'What is your full name?',
                tag: 'input',
                type: 'text',
                required: true,
                pattern: "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$",
                value: 'ayo'
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
        render(<QuestionnaireComponent questions={questions} />)
        const nextButton = screen.getByRole('button', {name: 'Next'})
        await userEvent.click(nextButton)

        const question1Title = screen.queryByText(new RegExp(questions[1].title, 'i'));
        expect(question1Title).toBeInTheDocument()
    })

    it('should be able to go back to previous question', async () => {
        const questions = [
            {
                id: 'full-name',
                title: 'What is your full name?',
                tag: 'input',
                type: 'text',
                required: true,
                pattern: "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$",
                value: 'ayo'
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
        render(<QuestionnaireComponent questions={questions} />)
        const nextButton = screen.getByRole('button', {name: 'Next'})
        await userEvent.click(nextButton)
        
        const question2Title = screen.queryByText(new RegExp(questions[1].title, 'i'));
        expect(question2Title).toBeInTheDocument()
        
        const backButton = screen.getByRole('button', {name: 'Back'})
        await userEvent.click(backButton)
        const question1Title = screen.queryByText(new RegExp(questions[0].title, 'i'));
        expect(question1Title).toBeInTheDocument()
    })
    
    it('should be able to submit a questionnaire', async () => {
        const questions = [
            {
                id: 'full-name',
                title: 'What is your full name?',
                tag: 'input',
                type: 'text',
                required: true,
                pattern: "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$",
                value: 'ayo'
            }
        ]
        render(<QuestionnaireComponent questions={questions} />)
        const submitButton = screen.getByRole('button', {name: 'Submit'})
        expect(submitButton).toBeInTheDocument()

        // simulate submit click
        await userEvent.click(submitButton)

        const spinner = screen.getByRole('progressbar')
        expect(spinner).toBeInTheDocument()

        await waitForElementToBeRemoved(() => screen.getByRole('progressbar'), {timeout: 5000})

        let checkmark = screen.getByAltText(/checkmark/i)
        let submitText = screen.queryByText(/You have submitted/i)
        expect(checkmark).toBeInTheDocument()
        expect(submitText).toBeInTheDocument()
    })

    it('should display error message when a required input has not input', async () => {
        const questions = [
            {
                id: 'full-name',
                title: 'What is your full name?',
                tag: 'input',
                type: 'text',
                required: true,
                pattern: "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$",
                value: ''
            }
        ]

        render(<QuestionnaireComponent questions={questions} />)
        const submitButton = screen.getByRole('button', {name: 'Submit'})
        expect(submitButton).toBeInTheDocument()

        // simulate submit click
        await userEvent.click(submitButton)

        let errorMessage = screen.queryByText(/please fill out this field/i)
        expect(errorMessage).toBeInTheDocument()
    })
    it('should display error message when a invalid input is entered', async () => {
        const questions = [
            {
                id: 'email',
                title: 'What is your email?',
                tag: 'input',
                type: 'email',
                required: true,
                pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
                message: 'Please enter a valid email',
                value: 'a'
            }
        ]

        render(<QuestionnaireComponent questions={questions} />)
        const submitButton = screen.getByRole('button', {name: 'Submit'})
        expect(submitButton).toBeInTheDocument()

        // simulate submit click
        await userEvent.click(submitButton)

        let errorMessage = screen.queryByText(questions[0].message)
        expect(errorMessage).toBeInTheDocument()
    })
})