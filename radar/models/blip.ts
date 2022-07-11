export function Blip(name, ring, isNew, topic, description) {
    let number = -1;
    let idealBlipWidth = 22;

    return {
        width: idealBlipWidth,
        name: function () {
            return name;
        },
        topic: function () {
            return topic || '';
        },
        description: function () {
            return description || '';
        },
        isNew: function () {
            return isNew;
        },
        ring: function () {
            return ring;
        },
        number: function () {
            return number;
        },
        setNumber: function (newNumber) {
            number = newNumber;
        },
    };
}
