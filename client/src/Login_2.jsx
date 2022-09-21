import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, brands } from '@fortawesome/fontawesome-svg-core/import.macro';
import { faFacebook } from '@fortawesome/fontawesome-free-brands'


function Login() {
    const [values, setValues] = React.useState({
        user: "",
        mail: "",
        password: ""
    })

    function clickSignUp() {
        const sign_in_btn = document.querySelector("#sign-in-btn");
        const sign_up_btn = document.querySelector("#sign-up-btn");
        const container = document.querySelector(".container");

        container.classList.add("sign-up-mode");
    }

    function clickSignIn() {
        const sign_in_btn = document.querySelector("#sign-in-btn");
        const sign_up_btn = document.querySelector("#sign-up-btn");
        const container = document.querySelector(".container");

        container.classList.remove("sign-up-mode");
    }

    const handleChange = (e) => {
        setValues({...values, user: e.target.value});
        console.log(values)
    } 

    const prova = () => {
        console.log("ciao")
    }

    return (
        <div className='container'>
            <div className="forms-container">
                <div className="signin-signup">
                    <div className="sign-in-form">
                        <h2 className='title'>Sign in</h2>
                        <div className="input-field">
                            <div className='icon-form'>
                                <FontAwesomeIcon icon={solid('user')} />
                            </div>
                            <input type="text" placeholder='Username' onChange={handleChange}/>
                        </div>
                            <div className="input-field">
                                <div className="icon-form">
                                    <FontAwesomeIcon icon={solid('lock')} />
                                </div>
                            <input type="password" placeholder='Password'/>
                        </div>
                        <button className='btn solid'> Login </button>

                        <p className='social-text'>Or Sign in with social platform</p>
                        <div className="social-media">
                            <a href="#" className="social-icon">
                                <FontAwesomeIcon icon={faFacebook} />
                            </a>
                            <a href="#" className="social-icon">
                                <FontAwesomeIcon icon={brands('twitter')} />
                            </a>
                            <a href="#" className="social-icon">
                                <FontAwesomeIcon icon={brands('google')} />
                            </a>
                            <a href="#" className="social-icon">
                                <FontAwesomeIcon icon={brands('linkedin')} />
                            </a>
                        </div>
                    </div>

                    <form action="" className="sign-up-form">
                        <h2 className='title'>Sign up</h2>
                        <div className="input-field">
                            <div className="icon-form">
                                <FontAwesomeIcon icon={solid('user')} />
                            </div>
                            <input type="text" placeholder='Username'/>
                        </div>
                        <div className="input-field">
                            <div className="icon-form">
                                <FontAwesomeIcon icon={solid('envelope')} />
                            </div>
                            <input type="text" placeholder='Email'/>
                        </div>
                        <div className="input-field">
                            <div className="icon-form">
                                <FontAwesomeIcon icon={solid('lock')} />
                            </div>
                            <input type="password" placeholder='Password'/>
                        </div>
                        <button className='btn solid' onClick={prova}> Sign Up </button>

                        <p className='social-text'>Or Sign up with social platform</p>
                        <div className="social-media">
                            <a href="#" className="social-icon">
                                <FontAwesomeIcon icon={brands('facebook')} />
                            </a>
                            <a href="#" className="social-icon">
                                <FontAwesomeIcon icon={brands('twitter')} />
                            </a>
                            <a href="#" className="social-icon">
                                <FontAwesomeIcon icon={brands('google')} />
                            </a>
                            <a href="#" className="social-icon">
                                <FontAwesomeIcon icon={brands('linkedin')} />
                            </a>
                        </div>
                    </form>
                </div>
            </div>
            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>New here ?</h3>
                        <p>Paragrafetto bellino! devo scrivere tanto testo per vedere se la scritta va al centro altrimenti devo cambiare qualcosa, ok perfetto funziona</p>
                        <button className="btn transparent" id="sign-up-btn" onClick={clickSignUp}>Sign up</button>
                    </div>

                    <img src="img/log.svg" className="image" alt="" />
                </div>

                <div className="panel right-panel">
                    <div className="content">
                        <h3>One of us ?</h3>
                        <p>Paragrafetto bellino! devo scrivere tanto testo per vedere se la scritta va al centro altrimenti devo cambiare qualcosa, ok perfetto funziona</p>
                        <button className="btn transparent" id="sign-in-btn" onClick={clickSignIn}>Sign in</button>
                    </div>

                    <img src="img/register.svg" className="image" alt="" />
                </div>
                </div>
        </div>
         
    );
}

export default Login;