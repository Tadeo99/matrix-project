package handlers

import (
    "api-go/services"
    "github.com/gofiber/fiber/v2"
)

type MatrixRequest struct {
    Matrix [][]float64 `json:"matrix"`
}

func ProcessMatrix(c *fiber.Ctx) error {
    var req MatrixRequest
    if err := c.BodyParser(&req); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
    }

    rotated := services.RotateMatrix(req.Matrix)
    qr := services.QRDecomposition(rotated)

    return c.JSON(fiber.Map{
        "rotated": rotated,
        "qr":      qr,
    })
}
