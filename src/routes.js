import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import Home from './components/Home/Home';
import Que from './components/QuePage/QuePage';
import Navbar from './components/Navbar/navbar.component';
import NotFound from './components/NotFound/notFound.component';
import QueBrowser from './components/QueBrowser/QueBrowser';
import ModalConductor from './components/ModalConductor/ModalConductor';
import Global from 'react-global';

<Global values={{
    currentModal:'LOG_IN'
}} />


const Routes = () => (

    <Router>
        <div>
            <Route component={Navbar} />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/que" component={Que} />
                <Route path="/home" component={QueBrowser} />
                <Route component={NotFound} />
            </Switch>
            <ModalConductor/>
        </div>
    </Router>
);

export default Routes;