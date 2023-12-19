import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../RequestUrl';


const CreateNote = () => {
         const [data, setdata] = useState([]);
         const [Result, setResult] = useState([]);
  const navigate = useNavigate();

         const formRef = useRef();
        
         function handleChange(e) {
                  let name = e.target.name
                  let val = e.target.value
                  setdata({ ...data, [name]: val })
            }
         async function submitForm(e) {
         e.preventDefault(); 
         // Retrieve the token string from local storage
    const tokenString = localStorage.getItem("user");
    const { token } = JSON.parse(tokenString);
         try {
                  const response = await axiosInstance.post("note/createNote", data, {
                        headers: {
                              Authorization: `Bearer ${token}`,
                              "Content-Type": "application/json",
                            },});
                  console.log(response);
                     alert('you have successfully add to your note')
               setResult(response.data)
                     navigate('/')
               } catch (error) {
                     console.log(error)
               }
         }



         
  return (
    <div>
      

      
<div>
      <form className='container mt-5' ref={formRef} style={{ fontSize: '20px' }}>
            <div>
                  <input type="text" className='form-control' name='title' onChange={handleChange} />
            </div>
            <div>
                  <textarea className="form-control" name='content' onChange={handleChange} style={{ height: '100vh' }} ></textarea>

            </div>
            <br /> 
            <button style={{width:'100%'}} className='btn btn-success' onClick={submitForm}>SAVE</button>
      </form>
      {Result && <div style={{ color: "red" }}>{Result}</div>}
        

</div>


    </div>
  )
}

export default CreateNote
