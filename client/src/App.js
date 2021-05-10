import './App.css';
import Header from './components/Header'
import Module from './components/Module'
import Prof from './components/Prof'
import Student from './components/Student'
import OneModule from './components/OneModule'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path='/student' component={Student} />
          <Route exact path='/prof' component={Prof} />
          <Route exact path='/module' component={Module} />
          <Route exact path='/:id' component={OneModule} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
