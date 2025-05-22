package utils

import (
    "bytes"
    "encoding/json"
    "net/http"
)
//ESTOS SOLO ES UN JEEMPLO PARA CNSUMIR OTRAS APIS
func SendToNodeAPI(data [][]float64) (map[string]interface{}, error) {
    body, _ := json.Marshal(map[string][][]float64{"matrix": data})
    resp, err := http.Post("http://node-api:4000/stats", "application/json", bytes.NewBuffer(body))
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()

    var result map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&result)
    return result, nil
}