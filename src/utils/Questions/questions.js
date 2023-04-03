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
    {
        id: 'email',
        title: 'What is your email?',
        tag: 'input',
        type: 'email',
        required: true,
        pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
        message: 'Please enter a valid email',
        value: ''
    },
    {
        id: 'phone-number',
        title: 'What is your phone number?',
        tag: 'input',
        type: 'tel',
        pattern: "^(?:[0-9]{3}-[0-9]{3}-[0-9]{4}|[0-9]{10}|\([0-9]{3}\)\s*[0-9]{3}-[0-9]{4})$",
        message: 'Please enter a phone number that follows the format: XXXXXXXXXX or XXX-XXX-XXXX',
        required: true,
        value: ''
    },
    {
        id: 'dob',
        title: 'What is your date of birth?',
        tag: 'date',
        type: 'date',
        max: `${formatDate(-18)}`,
        required: true,
        message: 'Please choose your date of birth',
        value: ''
    },
    {
        id: 'gender',
        title: 'What is your gender?',
        tag: 'radio',
        type: 'radio',
        options: ['male', 'female', 'other'],
        required: true,
        value: ''
    },
    {
        id: 'visa-status',
        title: 'What kind of visa are you looking to obtain?',
        tag: 'radio',
        type: 'radio',
        options: ['student', 'work', 'visitor', 'other'],
        required: true,
        message: 'Please select one of the options',
        value: ''
    },
    {
        id: 'education-level',
        title: 'What is your highest level of education',
        tag: 'select',
        type: 'select',
        required: true,
        message: 'Please select your highest level of education',
        options: [
            {label:'Highest level of education', value:''}, 
            {label: 'Bachelors Degree', value: 'Bachelors Degree'}, 
            {label:'Associate Degree', value: 'Associate Degree'}, 
            {label:'Some College', value: 'Some College'}, 
            {label:'High School', value:'High School'},
        ],
        value: ''
    },
    {
        id: 'disability',
        title: 'Select one or more disabilities? (Select all that applies)',
        tag: 'checked',
        type: 'checked',
        options: ['Vision', 'Hearing', 'Autism Spectrum Disorder'],
        value: []
    },
    {
        id: 'nationality',
        title: 'What country will you be traveling from?',
        tag: 'select',
        type: 'select',
        required: true,
        message: 'Please select your country of citizenship',
        options: [
            {label:'Select your country of citizenship', value:''}, 
            {label: 'Algeria', value: 'Algeria'}, 
            {label:'Bangladesh', value: 'Bangladesh'}, 
            {label:'Costa Rica', value: 'Costa Rica'}, 
            {label:'Denmark', value:'Denmark'}, 
            {label: 'Nigeria', value:'Nigeria'}, 
            {label:'Portugal', value: 'Portugal'}, 
            {label: 'United States', value:'UnitedStates'}
        ],
        value: ''
    },
    {
        id: 'dob',
        title: 'When do you plan to come to Canada?',
        tag: 'date',
        type: 'date',
        min: `${formatDate(0)}`,
        value: ''
    },
    {
        id: 'passport-photo',
        title: 'Upload your passport photo',
        tag: 'file',
        type: 'file',
        required: true,
        message: 'Please upload a copy of your passport photo',
        accept: '.pdf,.jpg,.jpeg,.png',
        value:''
    },
    {
        id: 'proof-of-funds',
        title: 'Upload a proof of funds(if you have one). Usually a bank statement',
        tag: 'file',
        type: 'file',
        accept: '.pdf,.jpg,.jpeg,.png',
        value:''
    },
]

export default questionsList