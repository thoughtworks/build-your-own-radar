
import axios from 'axios';
import { CSVContent, plotRadar, hideBlips } from './util/factory';
import React from 'React';

// TODO DABA : rings names 

class Radar extends React.Component {
    constructor(){
        super();
        this.setredarDom = this.setredarDom.bind(this);
    }
    setredarDom(domEl){
        this.radarDom = domEl;
    }
    shouldComponentUpdate(){
        // return false;
    }
    componentWillUnmount(){
        this.radarDom.innerHTML = "";
    }
    render(){
        return <div id="radar" ref={this.setredarDom}></div>;
    }
}

module.exports = Radar;