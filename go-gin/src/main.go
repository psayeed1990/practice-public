package main

import (
	//gin
	"github.com/gin-gonic/gin"
)

func main() {
	app := gin.Default()

	//use a middleware to "/ping"

	app.Use(func(c *gin.Context) {
		//do something
		hi()
		//pass to next handler
		c.Next()
	})

	app.GET("/ping", func(c *gin.Context) {
		hi()
		//pass to next handler
		//c.Next()
	},
	func(ctx *gin.Context) {
		
		ctx.String(200, "pong")
		},
	)

	app.Run(":7000") // listen and serve on
}
