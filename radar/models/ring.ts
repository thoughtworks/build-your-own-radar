export function Ring(name, order) {
    return {
        name: function () {
            return name;
        },
        order: function () {
            return order;
        },
    };
}
