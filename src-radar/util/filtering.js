import { map, uniqBy } from 'lodash';

//todo refactor this ...

const getIndexes = function(blips, values){
    let indexes = [];
    blips.forEach((element, idx) => {
        if(values.indexOf(element.pole) !== -1){
            indexes.push(idx + 1);
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