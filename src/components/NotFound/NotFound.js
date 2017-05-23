import React from 'react';

import './NotFound.css';

export default class NotFound extends React.Component {

    render() {
        return (
            <div className="notFound-wrapper">
                <h1>
                    404 <small>Not Found :(</small>
                </h1>
            </div>
        );
    }
}