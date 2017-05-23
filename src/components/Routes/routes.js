import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';


import QueuePage from '../QueuePage/QueuePage';
import Navbar from '../Navbar/QueNavbar';
import NotFound from '../NotFound/NotFound';
import QueBrowser from '../QueueBrowser/QueueBrowser';
import ReCaptcha from '../ReCaptcha/ReCaptcha';
import CreateQueue from '../CreateQueue/CreateQueue';
import MyQueuesPage from '../MyQueuesPage/MyQueuesPage';
import EnterQueuePopup from '../EnterQueuePopup/EnterQueuePopup';
import SignUp from '../Signup/Signup';
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
);


const Routes = (props) => (
  <BrowserRouter>
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
  </BrowserRouter>
);

export default connect()(Routes);