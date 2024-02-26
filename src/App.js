import logo from './logo.svg';
import './App.css';
import Header from './Component/Header/Header';
import Footer from './Component/Footer/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './Component/Screen/LandingPage/LandingPage';
import MyNotes from './Component/MyNotes/MyNotes';
import Login from './Component/Screen/Login/Login';
import SignUp from './Component/Screen/SignUp/SignUp';
import CreateNote from './Component/Screen/CreateNote/CreateNote';
import SingleNote from './Component/Screen/SingleNote/SingleNote';
import Profile from './Component/Profile/Profile';


function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        
        <Routes>
           <Route path="/" element={<LandingPage />} />
           <Route path="/login" element={<Login />} />
           <Route path="/signup" element={<SignUp/>} />
           <Route path="/mynotes" element={<MyNotes />} />
           <Route path="/createNote" element={<CreateNote/>}/>
           <Route path="/note/:id" element={<SingleNote/>}></Route>
           <Route path="/Profile" element={<Profile/>}></Route>
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
