import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { SignUpContainer, H2Container } from './sign-up-form.styles.jsx';

const defaultFieldValues = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFieldValues);
    const { displayName, email, password, confirmPassword } = formFields;

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
        <SignUpContainer>
            <H2Container>Don't have an account?</H2Container>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Display Name' required type='text' onChange={handleChange} name='displayName' value={displayName}/>

                <FormInput label='Email' required type='email' onChange={handleChange} name='email' value={email}/>

                <FormInput label='Password' required type='password' onChange={handleChange} name='password' value={password}/>

                <FormInput label='Confirm Password' required type='password' onChange={handleChange} name='confirmPassword' value={confirmPassword}/>

                <Button type='submit'>Sign Up</Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm;