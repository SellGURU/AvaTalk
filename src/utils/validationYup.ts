import * as Yup from "yup";

const validationYup = (property:string) => {
    switch(property) {
        case 'company':
            return Yup.string().min(3,'Company name must be between 3 to 50 characters.').max(50,'Company name must be between 3 to 50 characters.').trim('Company Name must not be empty or just spaces.')
        case 'job':
            return Yup.string().min(3,'Job title must be between 3 to 50 characters.').max(50,'Job title must be between 3 to 50 characters.').trim('Job must not be empty or just spaces.')
        case 'fullName':
            return Yup.string().required('Full Name is required').max(25,'Full Name must be between 5 and 25 characters.').min(5,'Full Name must be between 5 and 25 characters.').trim('Full Name must not be empty or just spaces.')
        case 'firstname':
            return Yup.string().required('First Name is required').max(50,'First Name must be between 3 and 50 characters.').min(3,'First Name must be between 3 and 50 characters.').trim('First Name must not be empty or just spaces.')
        case 'lastname':
            return Yup.string().required('Last Name is required').max(50,'Last Name must be between 3 and 50 characters.').min(3,'Last Name must be between 3 and 50 characters.').trim('Last Name must not be empty or just spaces.')
    }
    return Yup.string().required('Full Name is required')
}

export {validationYup}