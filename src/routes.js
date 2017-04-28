import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import Home from './components/Home/Home';
import Que from './components/QuePage/QuePage';
import Navbar from './components/Navbar/QueNavbar';
import NotFound from './components/NotFound/notFound.component';
import QueBrowser from './components/QueBrowser/QueBrowser';
import ModalConductor from './components/ModalConductor/ModalConductor';

const Routes = () => (

    <Router>
        <div>
            <Navbar/>
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