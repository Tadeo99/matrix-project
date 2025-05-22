function isDiagonal(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (i !== j && matrix[i][j] !== 0) return false;
        }
    }
    return true;
}

function analyzeMatrix(matrix) {
    let max = -Infinity;
    let min = Infinity;
    let sum = 0;
    let count = 0;

    for (const row of matrix) {
        for (const val of row) {
            max = Math.max(max, val);
            min = Math.min(min, val);
            sum += val;
            count++;
        }
    }

    const average = count > 0 ? sum / count : 0;
    return {
        max,
        min,
        sum,
        average,
        isDiagonal: isDiagonal(matrix)
    };
}

module.exports = { analyzeMatrix };
