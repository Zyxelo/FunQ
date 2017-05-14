import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Auth from '../../auth';

import QueuePage from '../QuePage/QueuePage';
import Navbar from '../Navbar/QueNavbar';
import NotFound from '../NotFound/NotFound';
import QueBrowser from '../QueBrowser/QueBrowser';
import ReCaptcha from '../ReCaptcha/ReCaptcha';
import CreateQueue from '../CreateQueue/CreateQueue';
import MyQueuesPage from '../MyQueuesPage/MyQueuesPage'
import EnterQueuePopup from '../EnterQueuePopup/EnterQueuePopup';
import Signup from '../Signup/Signup';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        Auth.isUserAuthenticated() ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/home',
                state: { from: props.location }
            }}/>
        )
    )}/>
)

const Routes = (props) => (

  <Router>
    <div>
      <Navbar displayModal={props.displayModal}/>
      <Switch>
        <Route exact path="/" component={QueBrowser} />
        <Route path="/queue/:queueId" component={QueuePage}/>
        <Route path="/home" component={QueBrowser} />
        <Route path="/captcha" component={ReCaptcha}/>
        <Route path="/signup" component={Signup} />
        <PrivateRoute path="/mypage" component={MyQueuesPage} />
        <PrivateRoute path="/create" component={CreateQueue}/>
        <Route component={NotFound} />
      </Switch>
      <EnterQueuePopup displayModal={props.displayModal}/>
    </div>
  </Router>
);

export default Routes;