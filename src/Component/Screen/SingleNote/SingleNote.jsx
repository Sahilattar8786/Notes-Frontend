import React ,{useEffect, useState} from 'react'
import MainScreen from '../../MainScreen/MainScreen';
import {Button,Card,Form} from "react-bootstrap";
import Loading from '../../Loading/Loading';
import axios from 'axios';
import ErrorMess from '../../ErrorMessage/ErrorMess';
import ReactMarkdown from "react-markdown";
import { useSelector,useDispatch } from 'react-redux';
import { updateNote } from '../../../actions/notesAction';
import { useNavigate, useParams } from 'react-router-dom';
export default function SingleNote() {
    const [title, setTitle] = useState();
    const [Content, setContent] = useState();
    const [Category, setCategory] = useState();
    const [date, setDate] = useState("");
    const navigate=useNavigate();
    const noteUpdate=useSelector((state)=>state.noteUpdate)
    const {loading ,error} =noteUpdate;
    const {id}=useParams();
    const dispatch=useDispatch();
    useEffect(()=>{
        const fetching =async()=>{
            const {data} =await axios.get(`/api/notes/${id}`)
             setTitle(data.title);
             setContent(data.Content);
             setCategory(data.Category);
        }
        fetching();
    },[id,date])
    
    
  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateNote(id,title,Content,Category))
    if (!title || !Content || !Category) return;
   
    resetHandler();
    navigate("/mynotes");
  };
  const resetHandler =()=>{
    setTitle("");
    setContent("");
    setCategory("")
  }
  const deleteHandler =()=>{

  }
  return (
    <>
     <MainScreen title="Edit Note">
      <Card>
        <Card.Header>Edit your Note</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {/* {loadingDelete && <Loading />} */}
            {error && <ErrorMess variant="danger">{error}</ErrorMess>}
            {/* {errorDelete && (
              <ErrorMess variant="danger">{errorDelete}</ErrorMess>
            )} */}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter the title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the content"
                rows={4}
                value={Content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {Content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{Content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                placeholder="Enter the Category"
                value={Category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button variant="primary" type="submit">
              Update Note
            </Button>
            <Button
              className="mx-2"
              variant="danger"
              onClick={() => deleteHandler(id)}
            >
              Delete Note
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
    </>
   
  )
}
