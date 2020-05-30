import React from 'react';
import FormSignUp from './FormSignUp';


class SignUp extends React.Component{
    render() {
        return (
            <div className="container background-form">
                <div className="row">
                    <div className="col-md-7 offset-md-5">
                        <div className="shadow-sm p-3 mb-5 bg-white rounded shadow-form">
                            <h2>Información	de	Registro</h2>
                            <FormSignUp/>                        
                        </div>

                    </div>
                </div>             
            </div>
        );
    }
}
export default SignUp;