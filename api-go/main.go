package main

import (
    "log"

    "github.com/gofiber/fiber/v2"
    "api-go/handlers"
    "api-go/token"
    "api-go/middleware"
)

func main() {
    app := fiber.New()

    // 1. Habilitar CORS headers
    app.Use(func(c *fiber.Ctx) error {
        c.Set("Access-Control-Allow-Origin", "*")
        c.Set("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
        c.Set("Access-Control-Allow-Headers", "Authorization, Content-Type")

        if c.Method() == fiber.MethodOptions {
            return c.SendStatus(fiber.StatusNoContent)
        }

        return c.Next()
    })

    app.Get("/token", func(c *fiber.Ctx) error {
		tok, err := token.GenerateJWT("javier")
		if err != nil {
			return c.Status(500).SendString("Error generando token")
		}
		return c.JSON(fiber.Map{
			"token": tok,
		})
	})

    // 2. Validación JWT después de CORS
    app.Use(func(c *fiber.Ctx) error {
        if c.Path() == "/token" {
            return c.Next()
        }
        // Aplica JWTMiddleware para el resto
        return middleware.JWTMiddleware()(c)
    })

    // 3. Endpoints protegidos
    app.Post("/process", handlers.ProcessMatrix)

    log.Fatal(app.Listen(":3000"))
}
