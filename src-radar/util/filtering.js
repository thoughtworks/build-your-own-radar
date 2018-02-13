import { map, uniqBy } from 'lodash';

//todo refactor this ...

const getIndexes = function(blips, values){
    let indexes = [];
    blips.forEach((blip, idx) => {
        if(values.indexOf(blip.pole) !== -1){
            indexes.push(blip.number());
        }
    });

    return indexes;
}

module.exports = {
    getPoles : function(blips){
       return  map(uniqBy(blips, 'pole'), 'pole')
        .filter((a) => a)
        .map(function(pole){
            //todo test with spaces
            return { key: pole, value: pole, text: pole };
        });
    },
    filrerBy : function(blips, values){
        var indexesToShow = getIndexes(blips, values);
        return indexesToShow;
    }
};