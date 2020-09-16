# NodeJs email sender microservice

- Rename `.env.sample` to `.env`
- Change the data according your SMTP server
- Install dependencies `yarn`
- Run `yarn start`

### Using

Default port `3000`

Make an http request to http://localhost:3000 (POST)

Payload:

```json
{
  "to": "sample@email.com",
  "subject": "New order",
  "template": "template.sample",
  "params": {
    "name": "User name"
  }
}
```
