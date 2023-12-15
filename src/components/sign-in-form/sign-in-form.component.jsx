import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import { SignInContainer, H2Container, ButtonsContainer } from './sign-in-form.styles.jsx';

const defaultFieldValues = {
    email: '',
    password: '',
};

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFieldValues);
    const { email, password } = formFields;
    
    const signInGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
    };

    const resetFormFields = () => {
        setFormFields(defaultFieldValues);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
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
        <SignInContainer>
            <H2Container>Already have an account?</H2Container>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' required type='email' onChange={handleChange} name='email' value={email}/>

                <FormInput label='Password' required type='password' onChange={handleChange} name='password' value={password}/>

                <ButtonsContainer>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInGoogleUser}>Google sign in</Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm;