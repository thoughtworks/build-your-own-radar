import each from 'lodash/each';
import { MalformedDataError } from '../exceptions/malformedDataError';
import { ExceptionMessages } from './exceptionMessages';

export function ContentValidator(columnNames) {
    columnNames = columnNames.map(function (columnName) {
        return columnName.trim();
    });

    return {
        verifyContent: function () {
            if (columnNames.length === 0) {
                throw new MalformedDataError(ExceptionMessages.MISSING_CONTENT);
            }
        },
        verifyHeaders: function () {
            each(
                ['name', 'ring', 'quadrant', 'isNew', 'description'],
                function (field) {
                    if (columnNames.indexOf(field) === -1) {
                        throw new MalformedDataError(
                            ExceptionMessages.MISSING_HEADERS,
                        );
                    }
                },
            );
        },
    };
}
