import React,{useState, useEffect} from 'react'
import MainScreen from '../../MainScreen/MainScreen'
import ErrorMess from '../../ErrorMessage/ErrorMess';
import Loading from '../../Loading/Loading';
import { Card,Form,Button} from 'react-bootstrap'
import ReactMarkdown from "react-markdown";
import { useDispatch,useSelector } from 'react-redux';
import { createNote } from '../../../actions/notesAction';
import { useNavigate, useParams } from 'react-router-dom';
export default function CreateNote() {
    const [title, setTitle] = useState("");
    const [Content, setContent] = useState("");
    const [Category, setCategory] = useState("");
    const navigate=useNavigate()
    const dispatch = useDispatch();
  
    const noteCreate = useSelector((state) => state.noteCreate);
    const { loading, error, note } = noteCreate;

    const submitHandler =(e)=>{
      e.preventDefault();
      dispatch(createNote(title,Content,Category))
      if (!title || !Content || !Category) return;
      alert('Your Note has been submitted successfully!')
      navigate('/mynotes');
    }
    const resetHandler = () => {
      setTitle("");
      setCategory("");
      setContent("");
    };

    useEffect(()=>{
      
    },[])
  

  return (
    <div>
       <MainScreen title="Create a Note">
      <Card>
        <Card.Header>Create a new Note</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMess variant="danger">{error}</ErrorMess>}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={Content}
                placeholder="Enter the content"
                rows={4}
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
                value={Category}
                placeholder="Enter the Category"
                onChange={(e) => setCategory(e.target.value)}
                className="mb-2"
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Create Note
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
    </div>
  )
}
