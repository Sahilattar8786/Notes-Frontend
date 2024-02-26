import axios from "axios";
import { NOTES_CREATE_FAIL, NOTES_CREATE_REQUEST, NOTES_CREATE_SUCCESS, NOTES_DELETE_FAIL, NOTES_DELETE_REQUEST, NOTES_DELETE_SUCCESS, NOTES_LIST_FAIL, NOTES_LIST_REQUEST, NOTES_LIST_SUCCESS, NOTES_UPDATE_FAIL, NOTES_UPDATE_REQUEST, NOTES_UPDATE_SUCCESS, } from "../constant/notesConstant";

export const listNotes = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: NOTES_LIST_REQUEST,
    });

    const state = getState();
    const { userLogin } = state;

    if ( userLogin.userInfo && userLogin.userInfo.token) {
      const { token } = userLogin.userInfo;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get('http://localhost:5000/api/notes', config);

      dispatch({
        type: NOTES_LIST_SUCCESS,
        payload: data
      });
    } else {
      console.error("userInfo is not defined in the userLogin object");
      dispatch({
        type: NOTES_LIST_FAIL,
        payload: "User information not available",
      });
    }
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({
      type: NOTES_LIST_FAIL,
      payload: message,
    });
  }
};

export const createNote=(title,Content,Category)=>async(dispatch,getState)=>{
 
  try{
     dispatch({
      type:NOTES_CREATE_REQUEST
     })
     const state =getState()
     const {userLogin}=state;
     if(userLogin.userInfo && userLogin.userInfo.token ){
       const {token} =userLogin.userInfo;

       const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const {data}=await axios.post('http://localhost:5000/api/notes/create',{title,Content,Category},config)

      dispatch({
        type:NOTES_CREATE_SUCCESS,
        payload:data
      })
     } 
     else{
      console.error("userInfo is not defined in the userLogin object");
      dispatch({
        type: NOTES_CREATE_FAIL,
        payload: "User information not available",
      });
     }
  }
  catch(error){
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({
      type: NOTES_CREATE_FAIL,
      payload: message,
    });
  }
  }

  export const updateNote = (id, title, Content, Category) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: NOTES_UPDATE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.put(
        `/api/notes/${id}`,
        { title, Content, Category },
        config
      );
  
      dispatch({
        type: NOTES_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: NOTES_UPDATE_FAIL,
        payload: message,
      });
    }
  };
  export const DeleteNote=(id)=>async(
    dispatch,getState
  )=>{
     try{
        dispatch({type:NOTES_DELETE_REQUEST})

        const {userLogin :{userInfo}} =getState() ;
        
        const config={
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },

        }
        const {data} = await  axios.delete(`http://localhost:5000/api/notes/${id}`,config);

        dispatch({
          type:NOTES_DELETE_SUCCESS,
          payload:data
        })
     }

     catch(error)
     {
      const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type:NOTES_DELETE_FAIL,
      payload: message,
    });
     }
  }