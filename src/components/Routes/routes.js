import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';


import QueuePage from '../QuePage/QueuePage';
import Navbar from '../Navbar/QueNavbar';
import NotFound from '../NotFound/NotFound';
import QueBrowser from '../QueBrowser/QueBrowser';
import ReCaptcha from '../ReCaptcha/ReCaptcha';
import CreateQueue from '../CreateQueue/CreateQueue';
import MyQueuesPage from '../MyQueuesPage/MyQueuesPage';
import EnterQueuePopup from '../EnterQueuePopup/EnterQueuePopup';
import SignUp from '../Signup/Signup';
import { switchModal, MODAL_SIGN_IN } from '../../actions';
import { connect } from 'react-redux';


const PrivateRoute = ({ component: Component, ...rest }, isAuthenticated) => (
  <Route {...rest} render={props => (
    isAuthenticated ? (
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
      <Navbar/>
      <Switch>
        <Route exact path="/" component={QueBrowser} />
        <Route path="/queues/:queueId" component={QueuePage}/>
        <Route path="/home" component={QueBrowser} />
        <Route path="/captcha" component={ReCaptcha}/>
        <Route path="/signup" component={SignUp} />
        <PrivateRoute path="/mypage" component={MyQueuesPage} isAuthenticated={props.isAuthenticated}/>
        <PrivateRoute path="/create" component={CreateQueue} isAuthenticated={props.isAuthenticated} />
        <Route component={NotFound} />
      </Switch>
      <EnterQueuePopup/>
    </div>
  </Router>
);

export default connect()(Routes);