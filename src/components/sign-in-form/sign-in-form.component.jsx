import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import './sign-in-form.styles.scss';

const defaultFieldValues = {
    email: '',
    password: '',
};

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFieldValues);
    const { email, password } = formFields;
    console.log(formFields);

    const signInGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        createUserDocumentFromAuth(user);
    };

    const resetFormFields = () => {
        setFormFields(defaultFieldValues);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/user-not-found':
                    alert('Email do not exists!');
                    break;
                case 'auth/wrong-password':
                    alert('Password is wrong!');
                    break;
                default:
                    console.log('Error creating user: ', error.message);
            }
        };
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value});
    }

    return (
        <div className='sign-in-container'>
            <h2>Already have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' required type='email' onChange={handleChange} name='email' value={email}/>

                <FormInput label='Password' required type='password' onChange={handleChange} name='password' value={password}/>

                <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInGoogleUser}>Google sign in</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;