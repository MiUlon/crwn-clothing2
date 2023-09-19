import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from './routes/authentication/authentication.component';
import { Routes, Route } from 'react-router-dom';

const Test = () => {
  return (
    <div>
      <h1>I'm Test</h1>
    </div>
  )
}

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='test' element={<Test />} />
        <Route path='authentication' element={<Authentication />} />
      </Route>
    </Routes>
  )
}

export default App;
