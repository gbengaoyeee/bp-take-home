function formatDate(yearLimit) {
    const date = new Date()
    const year = date.getFullYear()+yearLimit;
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
}

const questionsList = [
    {
        id: 'full-name',
        title: 'What is your full name?',
        tag: 'input',
        type: 'text',
        required: true,
        pattern: "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$",
        message: 'Please enter your full name',
        value: ''
    },
    // {
    //     id: 'email',
    //     title: 'What is your email?',
    //     tag: 'input',
    //     type: 'email',
    //     required: true,
    //     pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
    //     message: 'Please enter a valid email',
    //     value: ''
    // },
    // {
    //     id: 'phone-number',
    //     title: 'What is your phone number?',
    //     tag: 'input',
    //     type: 'tel',
    //     pattern: "^(?:[0-9]{3}-[0-9]{3}-[0-9]{4}|[0-9]{10}|\([0-9]{3}\)\s*[0-9]{3}-[0-9]{4})$",
    //     message: 'Please enter a phone number that follows the format: XXXXXXXXXX or XXX-XXX-XXXX',
    //     required: true,
    //     value: ''
    // },
    // {
    //     id: 'dob',
    //     title: 'What is your date of birth?',
    //     tag: 'date',
    //     type: 'date',
    //     max: `${formatDate(-18)}`,
    //     required: true,
    //     value: ''
    // },
    // {
    //     id: 'gender',
    //     title: 'What is your gender?',
    //     tag: 'radio',
    //     type: 'radio',
    //     options: ['male', 'female', 'other'],
    //     required: true,
    //     value: ''
    // },
    // {
    //     id: 'disability',
    //     title: 'Select one or more disabilities? (Select all that applies)',
    //     tag: 'checked',
    //     type: 'checked',
    //     options: ['Vision', 'Hearing', 'Autism Spectrum Disorder'],
    //     value: []
    // },
    // {
    //     id: 'nationality',
    //     title: 'What country will you be traveling from?',
    //     tag: 'select',
    //     type: 'select',
    //     required: true,
    //     options: [
    //         {label:'Select your country of citizenship', value:''}, 
    //         {label: 'Algeria', value: 'Algeria'}, 
    //         {label:'Bangladesh', value: 'Bangladesh'}, 
    //         {label:'Costa Rica', value: 'Costa Rica'}, 
    //         {label:'Denmark', value:'Denmark'}, 
    //         {label: 'Nigeria', value:'Nigeria'}, 
    //         {label:'Portugal', value: 'Portugal'}, 
    //         {label: 'United States', value:'UnitedStates'}
    //     ],
    //     value: ''
    // },
    // {
    //     id: 'passport-photo',
    //     title: 'Upload your passport photo',
    //     tag: 'file',
    //     type: 'file',
    //     accept: '.pdf,.jpg,.jpeg,.png'
    // },
]

export default questionsList