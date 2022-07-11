const sequence = [0, 6, 5, 3, 2, 1, 1, 1];

function sum(length) {
    return sequence.slice(0, length + 1).reduce(function (previous, current) {
        return previous + current;
    }, 0);
}

export function RingCalculator(numberOfRings, maxRadius) {
    return {
        getRadius: function (ring) {
            const total = sum(numberOfRings);
            const sumLocal = sum(ring);

            return (maxRadius * sumLocal) / total;
        },
    };
}
