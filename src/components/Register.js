// import "./style.css"
import bacg from "../images/bg.jpg"
import React, { useState } from "react"
import firebaseDb from './firebase';

function Register(){
  var key = "3#2@3~32#3";
  
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  
  const initialFieldValues = {
    username: '',
    email: '',
    password: '',
    credits: 0,
    tokens:[{ token_name:'', token_symbol:'', token_supply:'', decimal_places:'', contract_address:'', blockchain:''}],
    nfts:[{id:'',name:'',description:'',image:'', tag:'', network:''}],
    date: today.toDateString(),
    eth_address : ""
  }

  const [values, setValues] = useState(initialFieldValues)
  
  
  

  const addOrEdit = (obj) => {   
    firebaseDb.child('users').push(
      obj,
      err => {
          if (err){
              console.log(err)
          }
          else{
            alert("Register Successfully!")
            window.location.href = '/login'
          }      
      }
    )
  }

  function encryption(str){
    var hash = []
    for(var i=0; i<str.length; i++){
        hash.push(str[i].concat(key))
        
    }
    str = '';
    for(i=0; i<hash.length; i++){
        str += hash[i]
    }
    return str;
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(values)
    addOrEdit(values)
  }
 
  return(
  <div className="body" style={{backgroundImage: bacg}}>
  <div className="container body1">
   <br/><br/><br/><br/><br/><br/>  
   <div className="login-container" style={{color:'black'}}>
     <div className="login-form">
       <div className="login-form-inner">
         <div className="logo"><svg height="512" viewBox="0 0 192 192" width="512" xmlns="http://www.w3.org/2000/svg">
             <path d="m155.109 74.028a4 4 0 0 0 -3.48-2.028h-52.4l8.785-67.123a4.023 4.023 0 0 0 -7.373-2.614l-63.724 111.642a4 4 0 0 0 3.407 6.095h51.617l-6.962 67.224a4.024 4.024 0 0 0 7.411 2.461l62.671-111.63a4 4 0 0 0 .048-4.027z" />
           </svg></div>
         <h1>Register</h1>
         <p className="body-text">See your growth and get consulting support!</p>

         <div className="login-form-group">
            <label for="username">Username <span class="required-star">*</span></label>
            <input
              type="text" 
              placeholder="username12345" 
              id="username" 
              onChange={(e)=> setValues({...values, username: e.target.value })}
            />
         </div>

         <div className="login-form-group">
           <label for="email">Email <span class="required-star">*</span></label>
           <input 
            type="email" 
            placeholder="email@website.com" 
            id="email"
            onChange={(e)=> setValues({...values, email: e.target.value })} 
           />
         </div>

         <div className="login-form-group">
           <label for="password">Password <span class="required-star">*</span></label>
           <input 
            autoComplete="off" 
            type="password" 
            placeholder="Minimum 8 characters" 
            id="pwd" 
            onChange={(e)=> setValues({...values, password: encryption(String(e.target.value).toString()) })}
           />
         </div>

         <a className="rounded-button login-cta" onClick={handleSubmit}>Register</a>

         <div className="register-div">Already registered? <a href="/login" className="link create-account">Sign in</a></div>
       </div>

     </div>


     <div className="onboarding">
       <div className="swiper-container">
         <div className="swiper-wrapper">
           <div className="swiper-slide">
             <div className="slide-content" style={{marginTop:'45%',color:'white'}}>
               <h2>Welcome to Register</h2>
               <p>Already hanve an account?</p>
               <a href="/login" className="rounded-button reg-cta" style={{fontSize:"18px",fontWeight:"800"}}>Login</a>
             </div>
           </div>
           
           
         </div>
       </div>
     </div>

     </div>
     <br/><br/><br/><br/>
   </div>
   <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Raleway:wght@200;300;400;500&display=swap");

        



        :root {
          --bodybg: white;
          --primary-color: #e362c0;
          --grey: #d6d6d6;
          
          --white: ;
          --text: #333;
          --slider-opacity: 0.5;
          
        }
        
        * {
          margin: 0;
          padding: 0;
        }
        
        .login-container {
          display: flex;
          max-width: 1200px;
          background: var(--white);
          margin: auto;
          width: 100%;
          min-width: 320px;
        }
        
        .login-container .logo svg {
          height: 40px;
          width: 40px;
          fill: var(--primary-color);
        }
        
        .login-container .login-form {
          width: 50%;
          box-sizing: border-box;
          background-color: white;
          padding: 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
        }
        
        .login-container .login-form .login-form-inner {
          max-width: 380px;
          width: 95%;
        }
        
        .login-container .login-form .google-login-button .google-icon svg {
          height: 20px;
          display: flex;
          margin-right: 10px;
        }
        
        .login-container .login-form .google-login-button {
          
          border: 1px solid var(--grey);
          margin: 40px 0 20px;
        }
        
        .login-container .login-form .sign-in-seperator {
          text-align: center;
          color: var(--placeholder);
          position: relative;
          margin: 30px 0 20px;
        }
        
        .login-container .login-form .sign-in-seperator #sign-sep {
          background: var(--white);
          z-index: 1;
          position: relative;
          padding: 0 10px;
          font-size: 14px;
        }
        
        .login-container .login-form .sign-in-seperator:after {
          content: "";
          position: absolute;
          width: 100%;
          height: 1px;
          background: var(--grey);
          left: 0;
          top: 50%;
          z-index: 0;
        }
        
        .login-container .login-form .login-form-group {
          position: relative;
          display: flex;
          flex-direction: column;
          margin-bottom: 20px;
        }
        
        .login-container .login-form .login-form-group label {
          font-size: 14px;
          font-weight: 500;
          
          margin-bottom: 10px;
        }
        
        .login-container .login-form .login-form-group input {
          padding: 13px 20px;
          box-sizing: border-box;
          border: 1px solid var(--grey);
          border-radius: 50px;
          font-family: "Raleway", sans-serif;
          font-weight: 600;
          font-size: 14px;
          
          transition: linear 0.2s;
        }
        
        .login-container .login-form .login-form-group input:focus {
          outline: none;
          border: 1px solid var(--primary-color);
        }
        
        .login-container
          .login-form
          .login-form-group
          input::-webkit-input-placeholder {
          
          font-weight: 300;
          font-size: 14px;
        }
        
        .login-container .login-form .login-form-group.single-row {
          flex-direction: row;
          justify-content: space-between;
          padding-top: 5px;
        }
        
        /* custom checkbox */
        .login-container .login-form .custom-check input[type="checkbox"] {
          height: 23px;
          width: 23px;
          margin: 0;
          padding: 0;
          opacity: 1;
          appearance: none;
          border: 2px solid var(--primary-color);
          border-radius: 3px;
          background: var(--white);
          position: relative;
          margin-right: 10px;
          cursor: pointer;
        }
        
        .login-container .login-form .custom-check input[type="checkbox"]:checked {
          border: 2px solid var(--primary-color);
          background: var(--primary-color);
        }
        
        .login-container
          .login-form
          .custom-check
          input[type="checkbox"]:checked:before,
        .login-container
          .login-form
          .custom-check
          input[type="checkbox"]:checked:after {
          content: "";
          position: absolute;
          height: 2px;
          background: var(--white);
        }
        
        .login-container
          .login-form
          .custom-check
          input[type="checkbox"]:checked:before {
          width: 8px;
          top: 11px;
          left: 2px;
          transform: rotate(44deg);
        }
        
        .login-container
          .login-form
          .custom-check
          input[type="checkbox"]:checked:after {
          width: 14px;
          top: 8px;
          left: 5px;
          transform: rotate(-55deg);
        }
        
        .login-container .login-form .custom-check input[type="checkbox"]:focus {
          outline: none;
        }
        
        .login-container .login-form .custom-check {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .login-container .login-form .custom-check label {
          margin: 0;
        
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
        }
        
        .login-container .login-form .link {
          font-weight: 700;
          text-decoration: none;
          font-size: 14px;
          color : black;
        }
        
        .login-container .login-form .link:hover {
          text-decoration: underline;
        }
        
        .login-container .login-form .login-cta {
          color: white;
          font-size: 20px;
          font-weight: 900;
          text-decoration: none;
          border: 1px solid var(--primary-color);
          margin: 25px 0 35px;
          background: rgb(217,19,175);
          background: linear-gradient(90deg, rgba(217,19,175,0.47) 0%, rgba(186,24,164,1) 49%, rgba(98,3,98,0.63) 100%);
        }
        
        .login-container .login-form .login-cta:hover {
          background: rgb(98,3,98);
background: linear-gradient(90deg, rgba(98,3,98,0.8631827731092436) 0%, rgba(186,24,164,1) 49%, rgba(217,19,175,0.6474964985994398) 100%);
        }
        
        .login-container .onboarding {
          flex: 1;
          background: var(--slider-bg);
          display: none;
          width: 50%;
        }
        
        .login-container .login-form .login-form-group label .required-star {
          color: var(--primary-color);
          font-size: 18px;
          line-height: 10px;
        }
        
        .login-container .rounded-button {
          display: flex;
          width: 100%;
          text-decoration: none;
          border-radius: 50px;
          padding: 13px 20px;
          box-sizing: border-box;
          justify-content: center;
          font-size: 14px;
          font-weight: 500;
          align-items: center;
          transition: linear 0.2s;
        }
        
        .login-container .rounded-button:hover {
          box-shadow: 0px 0px 4px 0px var(--grey);
        }
        
        .login-container .body-text {
          font-size: 14px;
          font-weight: 500;
          
        }
        
        .login-container .onboarding .swiper-container {
          width: 100%;
          height: 100%;
          margin-left: auto;
          margin-right: auto;
          background: rgb(74,14,74);
          background: linear-gradient(90deg, rgba(74,14,74,0.35057773109243695) 0%, rgba(128,18,113,0.7371323529411764) 49%, rgba(252,118,224,0.6054796918767507) 100%);
        }
        .login-container .onboarding .swiper-slide {
          text-align: center;
          font-size: 18px;
          font-weight: 400;
          
          /* Center slide text vertically */
          display: -webkit-box;
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          -webkit-justify-content: center;
          justify-content: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          -webkit-align-items: center;
          align-items: center;
        }
        
        .login-container .onboarding .swiper-pagination-bullet-active {
          background-color: var(--primary-color);
        }
        
        .login-container .onboarding .swiper-slide {
          flex-direction: column;
          display: flex;
        }
        
        .login-container .onboarding .swiper-slide .slide-image img {
          width: 100%;
          height: 80%;
        }
        .login-container .onboarding .slide-content {
          width: 60%;
        }
        
        .login-container .onboarding .slide-content h2 {
          font-size: 22px;
          font-weight: 500;
          margin-bottom: 15px;
        }
        
        .login-container .onboarding .slide-content p {
          font-size: 16px;
          line-height: 22px;
          font-weight: 300;
        }
        .swiper-pagination-fraction,
        .swiper-pagination-custom,
        .swiper-container-horizontal > .swiper-pagination-bullets {
          bottom: 30px;
        }
        
        .login-container .login-form .login-form-inner h1 {
          margin-bottom: 20px;
          margin-top: 10px;
        }
        
        @media screen and (min-width: 768px) {
          .login-container .onboarding {
            display: flex;
          }
        }
        
        @media screen and (max-width: 767px) {
          .login-container {
            height: 100vh;
          }
        }
        
        @media screen and (width: 768px) {
          .login-container .onboarding {
            order: 0;
          }
          .login-container .login-form {
            order: 1;
          }
          .login-container {
            height: 100vh;
          }
        }
        
        @media screen and (max-width: 420px) {
          .login-container .login-form {
            padding: 20px;
          }
          .login-container .login-form-group {
            margin-bottom: 16px;
          }
          .login-container {
            margin: 0;
          }
        }

        .reg-cta{
          color: white;
          text-decoration: none;
          border: 1px solid var(--primary-color);
          margin: 25px 0 35px;
          background: rgb(217,19,175);
          background: linear-gradient(90deg, rgba(217,19,175,0.47) 0%, rgba(186,24,164,1) 49%, rgba(98,3,98,0.63) 100%);
        }

       .reg-cta:hover{
          background: rgb(98,3,98);
          color:white;
          background: linear-gradient(90deg, rgba(98,3,98,0.8631827731092436) 0%, rgba(186,24,164,1) 49%, rgba(217,19,175,0.6474964985994398) 100%);
        }
        
      `}</style>
 </div>
)
  
}
export default Register;