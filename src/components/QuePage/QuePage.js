import React from 'react';
import hakan from '../../../public/images/hakan_ullevi.jpg';
import './QuePage.css';

class Que extends React.Component {
    render() {

        var imageStyle = {
            backgroundImage: "url(" + hakan + ")",
        };

        return (
            <div className="container wrapper">
                <div className="row">
                    <div className="col-md-8">
                        <div className="row que-header" style={imageStyle}>
                            <div className="que-info">
                                <div className="que-details">
                                    <h1>Håkan Hellström</h1>
                                    <h3>Ullevi 27/6</h3>
                                </div>
                            </div>
                        </div>
                        <div className="row que-detailed-info" >
                            <div className="panel panel-primary">
                                <div className="panel-heading">
                                    <h1 className="panel-title">Detaljerad information</h1>
                                </div>
                                <div className="panel-body">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tincidunt eros ut lacus porttitor dapibus. Proin ultrices consectetur tortor a euismod. Morbi nulla risus, feugiat non risus nec, tempus vestibulum tortor. Phasellus felis metus, venenatis ut rhoncus eget, tincidunt non mauris.
                                    <br/><br/>
                                    Pellentesque mauris felis, pellentesque eu ex vel, cursus auctor lacus. Duis consectetur sollicitudin rhoncus. Vestibulum feugiat suscipit ex quis finibus. Suspendisse pretium non felis eu pellentesque. Nunc sem ex, volutpat ac dui eu, pretium mollis ex.
                                    <br/><br/>
                                    Maecenas tempor bibendum sapien, vel hendrerit lacus laoreet vel. Donec justo lacus, pharetra ut auctor at, ullamcorper vel leo. Maecenas et suscipit eros. Morbi consectetur tincidunt lorem sed elementum. Nulla maximus et nisl non maximus.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="que-detailed-info">
                            <h3>Kön stänger om: <b>7h 42min 20s</b></h3>
                        </div>
                        <button className="btn btn-primary enter-que">Enter queue</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Que;