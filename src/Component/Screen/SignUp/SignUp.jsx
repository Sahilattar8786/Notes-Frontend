import React,{useState} from 'react'
import MainScreen from '../../MainScreen/MainScreen'
import { Form,Button } from 'react-bootstrap'
import ErrorMess from '../../ErrorMessage/ErrorMess';
import axios from 'axios';
import Loading from '../../Loading/Loading';
export default function SignUp() {
  const [name,setName]=useState("");
  const[password,setPassword] = useState("");
  const[email,setEmail] = useState("");
  const[error,setError] = useState("");
  const[Confirmpassword,setConfirmPassword] =useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const[loading,setLoading] = useState(false)
  const [message, setMessage] = useState("");
  const [picMessage, setPicMessage] = useState(null);
 
  const SubmitHandler=async(e)=>{
    e.preventDefault();
    if( password !== Confirmpassword){
      setMessage("Passwords do not match");
    }else{
      try{
        const config={
          headers:{
            "Content-type": "application/json"
          }

        }
         setLoading(true);
        const {data}=axios.post("http://localhost:5000/api/users/",{name,pic,email,password},config)
        setLoading(false);

      }
      catch(err){
          setError(err.response.data.message)
      }
    
  }
}
const postDetails = (pics) => {
  if (
    pics ===
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  ) {
    return setPicMessage("Please Select an Image");
  }
  setPicMessage(null);
  if (pics.type === "image/jpeg" || pics.type === "image/png") {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "SmartNotes");
    data.append("cloud_name", "dbz2den3c");
    fetch("https://api.cloudinary.com/v1_1/dbz2den3c/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setPic(data.url.toString());
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    return setPicMessage("Please Select an Image");
  }
};
  return (
    <div>
      <MainScreen title="Register">
        <div className="loginContainer">
          {message && <ErrorMess variant="danger">{message}</ErrorMess>}
          {error && <ErrorMess variant="danger">{error}</ErrorMess>}
          {loading && <Loading></Loading>}
           <Form  onSubmit={SubmitHandler}>
              <Form.Group className="mb-3" controlId='formEmail'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId='formName'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter Name" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId='formPassword'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter Name" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId='formConfirmPassword'>
                  <Form.Label>Confirmed Password</Form.Label>
                  <Form.Control type="text" placeholder="Enter Name" value={Confirmpassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
              </Form.Group>
              <Form.Group controlId="pic" className='mb-3'>
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control  onChange={(e) => postDetails(e.target.files[0])}
              id="custom-file"
              type="file"
             />
          </Form.Group>
          <Button variant="primary" type="submit">
           Submit
         </Button>
           </Form>
        </div>
      </MainScreen>
    </div>
  )
}
