const swaggerUI = require('swagger-ui-express')
const swagguerJsonDoc = require('swagger-jsdoc')

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "PipeDrive Challenge",
            version: "1.0.0",
            description:
                "Swagger Documentation to test the PipeDrive API challenge",
            contact: {
                name: "Jonaphael A.",
                url: "https://github.com/jonaphael",
                email: "jonaphael.aristil@gmail.com"
            }
        },
        servers: [
            {
                url: "http://localhost:3000/",
                "description": "The pipedrive challenge documentation"
            }
        ]
    },
    apis: ["./routes/*.js"]
};

const specs = swagguerJsonDoc(options)

module.exports = { specs, swaggerUI };