package services

func RotateMatrix(matrix [][]float64) [][]float64 {
    rowCount := len(matrix)
    colCount := len(matrix[0])
    rotated := make([][]float64, colCount)
    for i := range rotated {
        rotated[i] = make([]float64, rowCount)
    }

    for i := 0; i < rowCount; i++ {
        for j := 0; j < colCount; j++ {
            rotated[j][rowCount-1-i] = matrix[i][j]
        }
    }

    return rotated
}