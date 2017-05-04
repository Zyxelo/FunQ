import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Home from '../Home/Home';
import Que from '../QuePage/QuePage';
import Navbar from '../Navbar/QueNavbar';
import NotFound from '../NotFound/NotFound';
import QueBrowser from '../QueBrowser/QueBrowser';
import ReCaptcha from '../ReCaptcha/ReCaptcha';
import CreateQueue from '../CreateQueue/CreateQueue';
import EnterQueuePopup from '../EnterQueuePopup/EnterQueuePopup';

const Routes = (props) => (

  <Router>
    <div>
      <Navbar displayModal={props.displayModal}/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/que" component={Que} />
        <Route path="/home" component={QueBrowser} />
        <Route path="/captcha" component={ReCaptcha}/>
        <Route path="/create" component={CreateQueue}/>
        <Route component={NotFound} />
      </Switch>
      <EnterQueuePopup displayModal={props.displayModal}/>
    </div>
  </Router>
);

export default Routes;