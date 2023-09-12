import { useState } from "react";
import { createAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';

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

    const handleSubmit = async (event) => {
        event.preventDefault();
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value});
    }

    return (
        <div>
            <h1>Sign up with your email and password:</h1>
            <form onSubmit={() => {}}>
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