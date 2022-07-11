import * as d3 from 'd3';
import map from 'lodash/map';
import uniqBy from 'lodash/uniqBy';
import capitalize from 'lodash/capitalize';
import each from 'lodash/each';

import { MalformedDataError } from '../exceptions/malformedDataError';
import { ExceptionMessages } from './exceptionMessages';
import { Ring } from '../models/ring';
import { Quadrant } from '../models/quadrant';
import { Blip } from '../models/blip';
import { Radar } from '../models/radar';
import { GraphingRadar } from '../graphing/radar';
import { ContentValidator } from './contentValidator';
import { InputSanitizer } from './inputSanitizer';

const plotRadar = function (blips) {
    const rings = map(uniqBy(blips, 'ring'), 'ring');
    const ringMap = {};
    const maxRings = 4;

    if (hasRadarBeenRendered()) {
        return;
    }

    each(rings, function (ringName, i) {
        if (i === maxRings) {
            throw new MalformedDataError(ExceptionMessages.TOO_MANY_RINGS);
        }

        ringMap[ringName] = Ring(ringName, i);
    });

    const quadrants = {};

    each(blips, function (blip) {
        if (!quadrants[blip.quadrant]) {
            quadrants[blip.quadrant] = Quadrant(capitalize(blip.quadrant));
        }

        quadrants[blip.quadrant].add(
            Blip(
                blip.name,
                ringMap[blip.ring],
                blip.isNew.toLowerCase() === 'true',
                blip.topic,
                blip.description,
            ),
        );
    });

    const radar = Radar();

    each(quadrants, function (quadrant) {
        radar.addQuadrant(quadrant);
    });

    const size =
        window.innerHeight - 133 < 620 ? 620 : window.innerHeight - 133;

    const graphingRadar = GraphingRadar(size, radar);
    graphingRadar.init();
    graphingRadar.plot();
};

const CSVDocument = function (url) {
    const createBlips = function (data) {
        try {
            const columnNames = data.columns;

            delete data.columns;

            const contentValidator = ContentValidator(columnNames);

            contentValidator.verifyContent();
            contentValidator.verifyHeaders();

            const blips = map(data, InputSanitizer().sanitize);

            plotRadar(blips);
        } catch (exception) {
            plotErrorMessage(exception);
        }
    };

    return {
        build: function () {
            d3.csv(url).then(createBlips);
        },
    };
};

export function CSVDocumentInput() {
    let sheet;

    return {
        build: function () {
            sheet = CSVDocument(
                'https://raw.githubusercontent.com/amido/interfaces-and-devices-radar/master/data/Interfaces%20%26%20devices%20-%20Technology%20Radar.csv',
            );
            sheet.build();
        },
    };
}

function plotErrorMessage(exception) {
    showErrorMessage(exception);
}

function plotError(exception, container) {
    let message = "Oops! There's been a problem";

    if (exception instanceof MalformedDataError) {
        // @ts-ignore
        message = message.concat(exception.message);
    } else {
        console.error(exception);
    }

    container = container.append('div').attr('class', 'error-container');
    const errorContainer = container
        .append('div')
        .attr('class', 'error-container__message');
    errorContainer.append('div').append('p').html(message);
}

function showErrorMessage(exception) {
    d3.select('#loadingWrapper').style('display', 'none');

    const container = d3
        .select('main')
        .append('div')
        .attr('class', 'error-container');
    plotError(exception, container);
}

function hasRadarBeenRendered(): boolean {
    return !d3.selectAll('#radar').empty();
}
