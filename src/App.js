import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import PvmCalculator from './pages/PvmCalculator/Calculator';
import Calculator from './pages/Calculator/Calculator';
import PayrollCalculator from './pages/PayrollCalculator/PayrollCalculator';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/calc'>
            <Calculator />
          </Route>
          <Route path='/pvm'>
            <PvmCalculator />
          </Route>
          <Route path='/payroll'>
            <PayrollCalculator />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App

