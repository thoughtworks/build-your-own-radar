import React from 'react';
import hideBlips from './util/factory';
import { Dropdown } from 'semantic-ui-react'

const FilterComponent = ({ options, onChange }) => (
    <div id='filter'>
        <Dropdown placeholder='Filters ...' fluid multiple search selection
            options={options}
            onChange={onChange}
        />
    </div>
);

const Header = ({redrawFullRadar, categories, selectedCategory, stateOptions }) => {
    return (
        <header>
            <div className="radar-title">
                <div className="radar-title__text">
                    <img src="/images/SQLI_logo.png" className="radar-title__logo sqli-logo" />
                    <h1 style={{ cursor: 'pointer' }}>
                        Technology Radar - SQLi ISCM</h1>
                </div>
                <div className="radar-title__logo">
                </div>
            </div>
            {
                categories.map((category, index) => {
                    return <div className={"button pie-" + index + (category === selectedCategory ? " selected" : '')}>{category}</div>
                })
            }
            {/* todo: link to about page */}
            <div className="print-radar button no-capitalize">About</div>
            <div onClick={redrawFullRadar} className="home-link" style={{ visibility: 'visible' }}>
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

module.exports = Header;