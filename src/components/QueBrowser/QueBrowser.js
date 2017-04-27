import React from 'react';
import hakan from './hakan_ullevi.jpg';
import middag from './middag.jpg';
import sof from './sof.jpg';
import QueElement from './QueElement/QueElement';
import './QueBrowser.css';

class QueBrowser extends React.Component {
    render() {
        return (
            <div className="container">
                <QueElement isTopQue={true} mainClass="top-que" imageSrc={hakan} timeLeft="7h 42min 20s" queTitle="Håkan Hellström" queDetails="Ullevi 27/6" href=""/>
                <div className="row">
                    <QueElement mainClass="col-sm-12 col-md-6" imageSrc={middag} timeLeft="3h 42min 20s" queTitle="C-klassittning" queDetails="KK 5/6 18.00" href=""/>
                    <QueElement mainClass="col-sm-12 col-md-6" imageSrc={sof} timeLeft="14h 42min 20s" queTitle="Studentorkesterfestivalen 2017" queDetails="12/6-14/6" href=""/>
                </div>
            </div>
        );
    }
}

export default QueBrowser;