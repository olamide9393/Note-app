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

         try {
                  const response = await axiosInstance.post("note/createNote", data,);
                  console.log(response);
                     alert('you have successfully add your blog')
               setResult(response.data)
                     navigate('/NoteList')
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
            <button style={{width:'100%'}} className='btn btn-success' onClick={submitForm}>PUBLISH</button>
      </form>
      {Result && <div style={{ color: "red" }}>{Result}</div>}
        

</div>


    </div>
  )
}

export default CreateNote
