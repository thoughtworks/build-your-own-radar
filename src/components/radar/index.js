require('./stylesheets/base.scss');
require('./images/tech-radar-201611-landing-page-wide.png');
// require('./images/tw-logo.png');
require('./images/favicon.ico');
require('./images/radar_legend.png');
require('./stylesheets/feedback.scss');
require('./images/SQLI_logo.png');

import React from 'react';
import ReactDOM from 'react-dom';
import Feed, { Dropdown } from 'semantic-ui-react'
import { CSVContent, plotRadar, hideBlips} from './util/factory';
import filtering from './util/filtering';
import axios from 'axios';
import Radar from './Radar';
import Feedbacks from './Feedbacks';
import RHeader from './RHeader';
import { map, uniqBy } from 'lodash';


const API = '/api';

class RadarContent extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      stateOptions: []
    }
    // this.redrawFullRadar = this.redrawFullRadar.bind(this);
  }
  componentDidMount() {
    axios.get(API + '/technologies/_csv_')
      .then(({ data }) => {
        var blipsO = CSVContent(data);
        var {blipsObjs:blips, radarIn} = plotRadar(blipsO);

        this.radarIn = radarIn;
        this.blips = blips;

        let stateOptions = filtering.getPoles(blips);
        let categories = map(uniqBy(blips, 'category'), 'category');

        this.setState({
          stateOptions,
          categories
        });

      });
  }

  render() {
    return <div className="wid">
      <Feedbacks />
      <RHeader hideBlips={hideBlips} blips={this.blips} radarIn={this.radarIn} stateOptions={this.state.stateOptions} categories={this.state.categories} />
      <Radar/>
    </div>
  }
}

module.exports = RadarContent;
