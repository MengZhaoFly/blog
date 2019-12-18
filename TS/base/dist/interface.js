"use strict";
function CalculateAreas(config) {
    var square = 100;
    if (config.width) {
        square = config.width * config.width;
    }
    return { area: square };
}
var mySquare = CalculateAreas({ widdth: 5 });
console.log(mySquare);
//# sourceMappingURL=interface.js.map