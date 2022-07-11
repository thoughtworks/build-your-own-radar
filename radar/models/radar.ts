const MalformedDataError = require('../exceptions/malformedDataError');
const ExceptionMessages = require('../util/exceptionMessages');

const _ = {
    map: require('lodash/map'),
    uniqBy: require('lodash/uniqBy'),
    sortBy: require('lodash/sortBy'),
};

export function Radar() {
    let blipNumber = 0;
    let addingQuadrant = 0;
    let quadrants = [
        { order: 'first', startAngle: 90 },
        { order: 'second', startAngle: 0 },
        { order: 'third', startAngle: -90 },
        { order: 'fourth', startAngle: -180 },
    ];

    function setNumbers(blips) {
        blips.forEach(function (blip) {
            blip.setNumber(++blipNumber);
        });
    }

    function allQuadrants() {
        if (addingQuadrant < 4) {
            throw new MalformedDataError(
                ExceptionMessages.LESS_THAN_FOUR_QUADRANTS,
            );
        }

        return _.map(quadrants, 'quadrant');
    }

    function allBlips() {
        return allQuadrants().reduce(function (blips, quadrant) {
            return blips.concat(quadrant.blips());
        }, []);
    }

    return {
        addQuadrant: function (quadrant) {
            if (addingQuadrant >= 4) {
                throw new MalformedDataError(
                    ExceptionMessages.TOO_MANY_QUADRANTS,
                );
            }
            // @ts-ignore
            quadrants[addingQuadrant].quadrant = quadrant;
            setNumbers(quadrant.blips());
            addingQuadrant++;
        },
        rings: function () {
            return _.sortBy(
                _.map(
                    _.uniqBy(allBlips(), function (blip) {
                        return blip.ring().name();
                    }),
                    function (blip) {
                        return blip.ring();
                    },
                ),
                function (ring) {
                    return ring.order();
                },
            );
        },
        quadrants: function () {
            return quadrants;
        },
    };
}
