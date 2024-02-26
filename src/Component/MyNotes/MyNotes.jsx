import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import MainScreen from '../../Component/MainScreen/MainScreen';
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { useDispatch, useSelector } from "react-redux";
import Loading from  '../../Component/Loading/Loading';
import ErrorMess from '../../Component/ErrorMessage/ErrorMess'
import { DeleteNote, listNotes } from "../../actions/notesAction";

function MyNotes({ history, search }) {
  const dispatch = useDispatch();
 const navigate=useNavigate();
  const noteList = useSelector((state) => state.noteList);
  const { loading, error, notes } = noteList;

  // const filteredNotes = notes.filter((note) =>
  //   note.title.toLowerCase().includes(search.toLowerCase())
  // );

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

 const noteDelete = useSelector((state) => state.noteDelete);
  const {
     loading: loadingDelete,
     error: errorDelete,
     success: successDelete,
   } = noteDelete;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      navigate('/')
    }
  }, [
    dispatch,successUpdate,successCreate,successDelete
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(DeleteNote(id))
    }
  };

  return (
    <MainScreen title={`Welcome Back ${userInfo && userInfo.name}..`}>
      {console.log(notes)}
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create new Note
        </Button>
      </Link>
      {/* {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />} */}
      {notes && notes.map((note, index) => (
  <div class="accordion accordion-flush" id={`accordionFlushExample-${index}`} key={index}>
    <div class="accordion-item">
      <h2 class="accordion-header d-flex ">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse-${index}`} aria-expanded="false" aria-controls={`flush-collapse-${index}`}>
          {note.title}
        </button>
         <Link to={`/note/${note._id}`}className="btn btn-primary m-2">EDIT</Link>
         <button className="btn btn-danger m-2" onClick={()=>deleteHandler(note._id)}>DELETE</button>
      </h2>
      <div id={`flush-collapse-${index}`} class="accordion-collapse collapse" data-bs-parent={`#accordionFlushExample-${index}`}>
        <div class="accordion-body">
        <h4>
  <span className="badge bg-success">
    Category - {note.Category}
  </span>
</h4>
<div className="card">
  <div className="card-body">
    <p className="card-text">
      {note.Content}
    </p>
    <footer className="blockquote-footer">
      Created on{" "}
      <cite title="Source Title">
        {/* {note.createdAt */}
      </cite>
    </footer>
  </div>
</div>
        </div>
      </div>
    </div>
  </div>
))}


    </MainScreen>
  );
}

export default MyNotes;