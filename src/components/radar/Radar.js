
import axios from 'axios';
import { CSVContent, plotRadar, hideBlips } from './util/factory';
import React from 'React';

class Radar extends React.Component {
    constructor(){
        this.setredarDom = this.setredarDom.bind(this);
    }
    setredarDom(domEl){
        this.radarDom = domEl;
    }
    componentDidMount(){
        
    }
    render(){
        <div id="radar" ref={setredarDom}></div>
    }
}