
import axios from 'axios';
import { CSVContent, plotRadar, hideBlips } from './util/factory';
import React from 'React';

class Radar extends React.Component {
    constructor(){
        super();
        // this.setredarDom = this.setredarDom.bind(this);
    }
    // setredarDom(domEl){
    //     this.radarDom = domEl;
    // }
    shouldComponentUpdate(){
        return false;
    }
    render(){
        return <div id="radar"></div>;
    }
}

module.exports = Radar;