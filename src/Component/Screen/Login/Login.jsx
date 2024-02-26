import React,{useState} from 'react'
import MainScreen from '../../MainScreen/MainScreen'
import {Form,Button,Row,Col} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../../Loading/Loading';
import axios from 'axios';
import "./LoginScreen.css"
import ErrorMess from '../../ErrorMessage/ErrorMess';
import { LoginFun } from '../../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
export default function Login() {
    const [email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const userLogin=useSelector((state)=>state.userLogin);
    const { loading, error, userInfo } = userLogin;
    const navigate=useNavigate()
    const dispatch=useDispatch();
    const submitHandler = async (e) => {
        e.preventDefault();
        await dispatch(LoginFun(email,password));
        navigate('/mynotes');
    }
      
  return (
    <>
    <MainScreen title="Login">
     <div className="loginContainer">
        {error && <ErrorMess variant="danger">{error}</ErrorMess>}
        {loading && <Loading />}
     <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <Row>
        <Col>
        New Customer ? <Link to="/signup">Register Here</Link></Col>
      </Row>
    </Form>
     </div>
    </MainScreen>
    </>
  )
}
