import React from 'react';
import hideBlips from './util/factory';
import { Dropdown } from 'semantic-ui-react'
import filtering from './util/filtering';
import { Link } from 'react-router-dom';
// todo: change the file structure to share the header between the pages
import Header from '../src-backoffice/src/components/Header';

const FilterComponent = ({ options, onChange }) => (
    <div id='filter'>
        <Dropdown placeholder='Filters ...' fluid multiple search selection
            options={options}
            onChange={onChange}
        />
    </div>
);

const RHeader = ({ hideBlips, blips = [], radarIn, categories, selectedCategory, stateOptions }) => {
    const none = function () { };
    radarIn = radarIn || {
        mouseoverQuadrant: none,
        mouseoutQuadrant: none,
        selectQuadrant: none,
        redrawFullRadar: none
    }
    hideBlips = hideBlips || none;
    return (
        <header>
            {/* <div className="radar-title">
                <div className="radar-title__text">
                    <img src="/assets/images/SQLI_logo.png" className="radar-title__logo sqli-logo" />
                    <h1 style={{ cursor: 'pointer' }}>
                        Technology Radar - SQLi ISCM</h1>
                </div>
                <div className="radar-title__logo">
                </div>
            </div> */}
            {
                categories.map((category, index) => {
                    return <div
                        key={index}
                        className={(selectedCategory ? '' : 'full-view ') + "button pie-" + index + (category === selectedCategory ? " selected" : '')}
                        onMouseOver={radarIn.mouseoverQuadrant.bind({}, 'pie-' + index)}
                        onMouseOut={radarIn.mouseoutQuadrant.bind({}, 'pie-' + index)}
                        onClick={radarIn.selectQuadrant.bind({}, 'pie-' + index, null)}
                    >{category}</div>
                })
            }
            {/* todo: link to about page */}
            <Link to="/about">
                <div className="print-radar button no-capitalize">About</div>
            </Link>
            <div onClick={radarIn.redrawFullRadar}
                className="home-link"
                style={{ visibility: 'hidden' }}
            >
                « Back to Radar home
        </div>
            <FilterComponent
                options={stateOptions}
                onChange={function (e, { value: values }) {
                    // console.log(arguments);
                    let indexes = filtering.filrerBy(blips, values);
                    hideBlips(indexes);
                }}
            />
        </header>
    );
};

module.exports = RHeader;