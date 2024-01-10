import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthPage from "./pages/AuthPage"
import FeedPage from "./pages/FeedPage"
import { auth } from "./firebase/config"
import ProtectedRoute from "./pages/ProtectedRoute"

const App = () => {
  //console.log(auth); // kullanıcının özelliklerine ulaşılabilir
  return (

    <BrowserRouter>
      <Routes>


        <Route path='/' element={<AuthPage />} />

        
        <Route element={<ProtectedRoute />}>
          <Route path='/feed' element={<FeedPage />} />
        </Route>
        


      </Routes>

    </BrowserRouter>

  )
}

export default App