import React from 'react';
import Navbar from '../Navbar/navbar.component'

class Que extends React.Component {
    render() {
        return (
            <div className="container wrapper">
                <div className="row">
                    <div className="col-md-8">
                        <div className="jumbotron">
                            <h1>Håkan Hellström</h1>
                            <p>Ullevi 27/6</p>
                        </div>
                        <div className="panel panel-default">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tincidunt eros ut lacus porttitor dapibus. Proin ultrices consectetur tortor a euismod. Morbi nulla risus, feugiat non risus nec, tempus vestibulum tortor. Phasellus felis metus, venenatis ut rhoncus eget, tincidunt non mauris. Pellentesque mauris felis, pellentesque eu ex vel, cursus auctor lacus. Duis consectetur sollicitudin rhoncus. Vestibulum feugiat suscipit ex quis finibus. Suspendisse pretium non felis eu pellentesque. Nunc sem ex, volutpat ac dui eu, pretium mollis ex. Maecenas tempor bibendum sapien, vel hendrerit lacus laoreet vel. Donec justo lacus, pharetra ut auctor at, ullamcorper vel leo. Maecenas et suscipit eros. Morbi consectetur tincidunt lorem sed elementum. Nulla maximus et nisl non maximus.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                    </div>
                </div>
            </div>
        );
    }
}

export default Que;