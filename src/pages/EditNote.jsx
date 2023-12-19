import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../RequestUrl'

const EditNote = () => {
         const {id} = useParams()
         const [note, setnote] = useState();


         useEffect(() => {
                  getSingleBlog()
         }, []);

         async function getSingleBlog(){
                 try {
                  // const {data} = await axios.get('http://localhost:5000/api/v2/newBlog/' + id)
                  const {data} = await axiosInstance.get(`note/${id}`)
                  console.log(data ,'yo')
                  setnote(data)
                  console.log(data)
                 } catch (error) {
                  console.log(error)
                 }
         }
  return (
    <div>
         {
                  note&&
                  <div>
                  <h1>{blog.title}</h1>
                  <p>{blog.desc}</p>
                  <p>{blog.author}</p>
                  <p>{blog.publishYear}</p>
               </div>
         }
         <EditCurrentBlog id={id}/>
    </div>
  )
}

export default EditNote




const EditCurrentBlog = ({id}) => {
         const [data, setdata] = useState();
         const navigate = useNavigate()
         function handleChange(e) {
                  let name = e.target.name
                  let val = e.target.value
                  setdata({ ...data, [name]: val })
                  

         }
        async function UpdateData(e){
                  e.preventDefault()
                  console.log(data)
                  try {
                          //  const res = await axios.patch('http://localhost:5000/api/v2/newBlog/' + id, data)
                          const res = await publiRequest.patch('newBlog/' + id, data)
                           console.log(res)
                           alert('you have successfully update your blog')
                           navigate('/') 
                  } catch (error) {
                           console.log(error)
                  }

         }
  return (
    <div>
       <div>
                  <form className='container mt-5' >
                           <div>
                           <label htmlFor="name">tittle</label>
                           <input type="text" className='form-control' name='title' onChange={handleChange} />
                           </div>
                           <div>
                           <label htmlFor="name">description</label>
                           <input type="name" className='form-control' name='desc' onChange={handleChange} />
                  </div>
                           <div>
                           <label htmlFor="email">Author Name</label>
                           <input type="name" className='form-control' name='author' onChange={handleChange} />
                  </div>
                           <div>
                           <label htmlFor="email">publish Year</label>
                           <input type="name" className='form-control' name='publishYear' onChange={handleChange} />
                  </div>
                              <button className='btn btn-success' onClick={UpdateData}>Update your blog</button>
                                    </form>
                           </div>
                           
                  </div>

 
  )
}


