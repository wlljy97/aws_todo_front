import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup/Signup';
import Signin from './pages/Signin/Signin';
import Main from './pages/Main/Main';
import AuthRouter from './components/AuthRouter/AuthRouter';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={ <AuthRouter element={ <Main /> } /> } />
        <Route path='/auth/signup' element={ <AuthRouter element={ <Signup /> } /> } />
        <Route path='/auth/signin' element={ <AuthRouter element={ <Signin /> } /> } />
      </Routes>
    </>
  );
}

export default App;
