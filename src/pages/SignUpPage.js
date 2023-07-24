import React, { useState } from "react";
import Header from "../Components/common/Header";
import SignupForm from "../Components/SignupComponents/SignupForm.js";
import LoginForm from "../Components/SignupComponents/LoginForm.js";

function SignUpPage() {
       const [flag, setFlag] = useState(false)


       return (
              <div>
                     <Header />
                     <div className="input-wrapper">
                            {!flag ? <h1>Signup</h1> : <h1>Login</h1>}
                            {!flag ? <SignupForm /> : <LoginForm />}
                            {!flag ?
                                   (
                                   <p style={{cursor:"pointer"}} onClick={()=>setFlag(!flag)}>
                                          Already have an Account? Click here to Login.</p>
                                   ) : (
                                   <p style={{cursor:"pointer"}} onClick={()=>setFlag(!flag)}>
                                          Don't have an Account? Click here to Signup.</p>
                                   )}

                     </div>
              </div>
       )
}


export default SignUpPage;