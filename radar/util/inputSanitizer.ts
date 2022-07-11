import * as sanitizeHtml from 'sanitize-html';
import forOwn from 'lodash/forOwn';

export function InputSanitizer() {
    const relaxedOptions = {
        allowedTags: [
            'b',
            'i',
            'em',
            'strong',
            'a',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'li',
            'ul',
            'br',
            'p',
            'u',
        ],
        allowedAttributes: {
            a: ['href'],
        },
    };

    const restrictedOptions = {
        allowedTags: [],
        allowedAttributes: {},
    };

    function trimWhiteSpaces(blip) {
        const processedBlip = {};

        forOwn(blip, function (value, key) {
            processedBlip[key.trim()] = value.trim();
        });

        return processedBlip;
    }

    return {
        sanitize: function (rawBlip) {
            const blip: any = trimWhiteSpaces(rawBlip);

            blip.description = sanitizeHtml(blip.description, relaxedOptions);
            blip.name = sanitizeHtml(blip.name, restrictedOptions);
            blip.isNew = sanitizeHtml(blip.isNew, restrictedOptions);
            blip.ring = sanitizeHtml(blip.ring, restrictedOptions);
            blip.quadrant = sanitizeHtml(blip.quadrant, restrictedOptions);

            return blip;
        },
    };
}
