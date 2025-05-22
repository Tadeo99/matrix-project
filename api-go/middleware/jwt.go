package middleware

import (
    "github.com/gofiber/fiber/v2"
    "github.com/golang-jwt/jwt/v5"
)

func JWTMiddleware() fiber.Handler {
    return func(c *fiber.Ctx) error {
        if c.Method() == fiber.MethodOptions {
            return c.Next()
        }
        tokenStr := c.Get("Authorization")
        if tokenStr == "" {
            return c.Status(401).SendString("Unauthorized")
        }
        token, err := jwt.Parse(tokenStr[7:], func(t *jwt.Token) (interface{}, error) {
            return []byte("secret"), nil
        })

        if err != nil || !token.Valid {
            return c.Status(401).SendString("Invalid token")
        }

        return c.Next()
    }
}