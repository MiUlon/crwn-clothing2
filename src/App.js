import Home from "./routes/home/home.component";
import { Routes, Route } from 'react-router-dom';
import Navigation from "./routes/navigation/navigation.component";

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
        <Route path='test' element={<Test />}/>
      </Route>
    </Routes>
  )
}

export default App;
