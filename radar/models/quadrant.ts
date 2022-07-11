export function Quadrant(name) {
    let blips = [];

    return {
        name: function () {
            return name;
        },
        add: function (newBlips: []) {
            if (Array.isArray(newBlips)) {
                blips = blips.concat(newBlips);
            } else {
                blips.push(newBlips);
            }
        },
        blips: function () {
            return blips.slice(0);
        },
    };
}
