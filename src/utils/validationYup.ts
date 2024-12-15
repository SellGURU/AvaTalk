import * as Yup from "yup";

const validationYup = (property:string) => {
    switch(property) {
        case 'fullName':
            return Yup.string().required('Full Name is required').max(25,'Full Name must be between 5 and 25 characters.').min(5,'Full Name must be between 5 and 25 characters.')
        case 'firstname':
            return Yup.string().required('First Name is required').max(15,'First Name must be between 3 and 15 characters.').min(3,'First Name must be between 3 and 15 characters.')
        case 'lastname':
            return Yup.string().required('Last Name is required').max(15,'Last Name must be between 3 and 15 characters.').min(3,'Last Name must be between 3 and 15 characters.')
    }
    return Yup.string().required('Full Name is required')
}

export {validationYup}