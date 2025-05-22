package services
import (
    "gonum.org/v1/gonum/mat"
)

func QRDecomposition(input [][]float64) [][]float64 {
    r := len(input)
    c := len(input[0])
    data := make([]float64, 0, r*c)
    for _, row := range input {
        data = append(data, row...)
    }

    m := mat.NewDense(r, c, data)
    var qr mat.QR
    qr.Factorize(m)

    var rmat mat.Dense
    qr.RTo(&rmat)

    result := make([][]float64, r)
    for i := 0; i < r; i++ {
        result[i] = make([]float64, c)
        for j := 0; j < c; j++ {
            result[i][j] = rmat.At(i, j)
        }
    }

    return result
}