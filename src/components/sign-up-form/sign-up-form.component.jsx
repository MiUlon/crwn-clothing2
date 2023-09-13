import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

const defaultFieldValues = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFieldValues);
    const { displayName, email, password, confirmPassword } = formFields;
    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFieldValues);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('Password do not match!');
            return;
        };

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Email already exists!');
            } else {
                console.log('Error creating user: ', error.message);
            };
        };
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value});
    }

    return (
        <div>
            <h1>Sign up with your email and password:</h1>
            <form onSubmit={handleSubmit}>
                <label>Display Name:</label>
                <input required type='text' onChange={handleChange} name='displayName' value={displayName}/>

                <label>Email:</label>
                <input required type='email' onChange={handleChange} name='email' value={email}/>

                <label>Password:</label>
                <input required type='password' onChange={handleChange} name='password' value={password}/>

                <label>Confirm Password:</label>
                <input required type='password' onChange={handleChange} name='confirmPassword' value={confirmPassword}/>

                <button required type='submit'>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm;