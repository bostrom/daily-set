
var dimensions = 4;

/* Generate a random card. */
function GenerateRandomCard() {
    var card = [-1,-1,-1,-1];
    var i;
    for (i = 0; i < dimensions; i++) {
        card[i] = Math.floor((Math.random() * 3));
    };
    return card;
}

/* Generate all possible combinations. */
function GenerateDeck () {

}

/* Is PROPERTY the same in the cards C1, C2, C3? */
function CardPropertySame (property, c1, c2, c3) {
   return (c1[property] == c2[property]) && 
        (c2[property] == c3[property]);
}

/* Is PROPERTY all different in the cards C1, C2, C3? */
function CardPropertyAllDifferent (property, c1, c2, c3) {
    return (c1[property] != c2[property]) && 
        (c1[property] != c3[property]) && 
        (c2[property] != c3[property]);
}

/* Do the cards C1, C2 and C3 constitute a proper set? */
function isSet (c1, c2, c3) {
    var i;
    for (i = 0; i < dimensions; i++) {
        if !(CardPropertySame(i, c1, c2, c3) ||
             CardPropertyAllDifferent(i, c1, c2, c3)) {
            return false;
        }; 
    };
    return true;
}

function mapCombinations(fn, array, combinationLength) {
    var combination = array.slice(0, combinationLength);

    var combine = function(count, start) {
        if(0 == count) { fn(combination); };

        for (i = start; i < array.length; i++) {
            var j = count - 1;
            combination[j] = array[i];
            combine(j, i+1);
        };
    };

    return combine(combinationLength, 0);
}

/* How many sets in a puzzle? */
function SetCountInPuzzle (puzzle, subSetIndex) {
    // base case
    if (subSetIndex == (puzzle.length - 3)) {
        if (isSet(puzzle[subSetIndex],
                  puzzle[subSetIndex+1],
                  puzzle[subSetIndex+2]))
            return 1;
        else { 
            return 0; 
        };
    };

    // recursive case
    var first = puzzle[0];
    var second;
    var third;
    var sets = 0;
    for (i = subSetIndex + 1; i < (puzzle.length - 3); i++) {
        second = puzzle[i];
        for (j = subSetIndex + i ; j < (puzzle.length - 2); j++) {
            third = puzzle[j];
            if (isSet(puzzle[first], puzzle[second], puzzle[third])) {
                sets = sets + 1;
            };
        };
    };
    
    return sets + SetCountInPuzzle(puzzle, subSetIndex + 1);
}
