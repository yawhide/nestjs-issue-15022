to reproduce:

```bash
npm run start:dev

curl -X POST  localhost:3000 -H 'Content-Type: foo' -d '{"a": "b"}'
```
