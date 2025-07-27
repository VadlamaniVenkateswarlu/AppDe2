import React, { useRef, useState } from 'react';

function Form() {
    let firstNameInputRef = useRef();
    let lastNameInputRef = useRef();
    let ageInputRef = useRef();
    let countryInputRef = useRef();
    let phoneNumberInputRef = useRef();
    let profilePicInputRef = useRef();
    let genderInputRef = useRef();
    let emailInputRef = useRef();
   let passwordInputRef = useRef();
    let [profilePicPath, setProfilePicPath] = useState();

    let onSignup = async () => {
      
        let dataToSend = {
            firstName: firstNameInputRef.current.value,
            lastName: lastNameInputRef.current.value,
            age: ageInputRef.current.value,
            email: emailInputRef.current.value,
            password: passwordInputRef.current.value,
            phoneNumber: phoneNumberInputRef.current.value,
            gender: genderInputRef.current.value,
            profilePic: profilePicInputRef.current.value,
            country: countryInputRef.current.value,
        };

        let reqOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataToSend),
        };

        let response = await fetch("http://localhost:2727/signUp", reqOptions);
        let result = await response.json();
        console.log(result);
        alert(result.msg);
    };

    let onSignupURLEncoded = async () => {
       

        let data = new URLSearchParams();
        data.append("firstName", firstNameInputRef.current.value);
        data.append("lastName", lastNameInputRef.current.value);
        data.append("age", ageInputRef.current.value);
        data.append("email", emailInputRef.current.value);
        data.append("password", passwordInputRef.current.value);
        data.append("phoneNumber", phoneNumberInputRef.current.value);
        data.append("gender", genderInputRef.current.value);
        data.append("profilePic", profilePicInputRef.current.value); 
        data.append("country", countryInputRef.current.value);

        let reqOptions = {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: data,
        };

        let response = await fetch("http://localhost:2727/signUp", reqOptions);
        let result = await response.json();
        console.log(result);
        alert(result.msg);
    };

    let onSignupFormData = async () => {
        let data = new FormData();
        data.append("firstName", firstNameInputRef.current.value);
        data.append("lastName", lastNameInputRef.current.value);
        data.append("age", ageInputRef.current.value);
        data.append("email", emailInputRef.current.value);
        data.append("password", passwordInputRef.current.value);
        data.append("phoneNumber", phoneNumberInputRef.current.value);
        data.append("gender", genderInputRef.current.value);
        data.append("country", countryInputRef.current.value);

        let files = profilePicInputRef.current.files;
        for (let i = 0; i < files.length; i++) {
            data.append("profilePic", files[i]);
        }

        let reqOptions = {
            method: "POST",
            body: data,
        };

        let response = await fetch("http://localhost:2727/signUp", reqOptions);
        let result = await response.json();
        console.log(result);
        alert(result.msg);
    };

    return (
        <div className='App'>
            <form>
                <div>
                    <label>First Name</label>
                    <input name="firstName" ref={firstNameInputRef} type="text" />
                </div>
                <div>
                    <label>Last Name</label>
                    <input name="lastName" ref={lastNameInputRef} type="text" />
                </div>
                <div>
                    <label>Age</label>
                    <input name="age" ref={ageInputRef} type="number" />
                </div>
                <div>
                    <label>Gender</label>
                    <input name="gender" ref={genderInputRef} type="text" />
                </div>
                <div>
                    <label>Phone Number</label>
                    <input name="phoneNumber" ref={phoneNumberInputRef} type="text" />
                </div>
                <div>
                    <label>Country</label>
                    <input name="country" ref={countryInputRef} type="text" />
                </div>
                <div>
                    <label>ProfilePic</label>
                    <input  type='file' ref={profilePicInputRef}
                    onChange={(e)=>{
                        let selectedImagePath = URL.createObjectURL(e.target.files[0]);

                        setProfilePicPath(selectedImagePath);
                    }}></input>
                    <br></br>
                    <img src={profilePicPath} className='A' alt=''></img>
                    </div>
                <div>
                    <label>Email</label>
                    <input name="email" ref={emailInputRef} type="email" />
                </div>
                <div>
                    <label>Password</label>
                    <input name="password" ref={passwordInputRef} type="password" />
                </div>
                <div>
                <button type='button' onClick={()=>{
                    onSignup();
                }}>JSON (Formte)
 
                </button>

            </div>

            <div>
                <button type='button' onClick={()=>{
                    onSignupURLEncoded();
                }}>Submit (URLEcoded)

                </button>

            </div>

            <div>
                <button type='button' onClick={()=>{
                    onSignupFormData();
                }}>Sign (FormData)

                </button>

            </div>

            </form>
        </div>
    );
}

export default Form;
