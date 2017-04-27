import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import Home from './components/Home/Home';
import Que from './components/Que/que.component';
import NotFound from './components/NotFound/notFound.component';
import QueBrowser from './components/QueBrowser/QueBrowser';

const Routes = () => (
    <Router>
        <div>
            <Route component={Que} />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/que" component={Que} />
                <Route path="/home" component={QueBrowser} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>
);

export default Routes;