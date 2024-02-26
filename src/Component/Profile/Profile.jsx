import React,{useState,useEffect} from 'react'
import MainScreen from '../MainScreen/MainScreen';
import Loading from '../Loading/Loading';
import ErrorMess from '../ErrorMessage/ErrorMess';
import { Form,Button,Row,Col } from 'react-bootstrap'
import './Profile.css';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { updateProfile } from '../../actions/userActions';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pic, setPic] = useState();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [picMessage, setPicMessage] = useState();
    const navigate=useNavigate()
    const dispatch = useDispatch();
  
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
  
    const userUpdate = useSelector((state) => state.userUpdate);
    const { loading, error, success } = userUpdate;

  const SubmitHandler=async(e)=>{
    e.preventDefault();
    dispatch(updateProfile({name,email,password,pic}));

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

}
useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  }, [userInfo]);
  return (
    <div>
      <MainScreen title="Profile">
        <div className="ProfileContainer">
        <Row>
            <Col md={6}>
          {success && <ErrorMess variant="success">Updated Successfully
</ErrorMess>}      
          {error && <ErrorMess variant="danger">{error}</ErrorMess>}
          {loading && <Loading></Loading>}
           <Form  onSubmit={SubmitHandler}>
              <Form.Group className="mb-3" controlId='formEmail'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId='formName'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId='formPassword'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter Name" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
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
            </Col>
            <Col style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                
            }}>
            <img src={pic} alt={name} className="profilePic" />
            </Col>
        </Row>
    
        </div>
      </MainScreen>
    </div>
  )

}