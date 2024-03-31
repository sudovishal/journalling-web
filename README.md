# journalling-web
A digitalized version of a diary. Users can log in to their profiles, have their daily journals filled up, and show up on their profiles. A specific page of a diary can be shared with a link, by default all will be private to logged-in user.

[My Postman collection](https://www.postman.com/vishshinde/workspace/vishal-workspace/collection/24020296-baabb0a4-ed51-4c1f-83bf-9e1fe6d1e518?action=share&creator=24020296)


[Data Model](https://app.eraser.io/workspace/6jGK8Mfxbc1DUIppwRBG?origin=share)

## The app can be setup using Plain NodeJS and Docker Compose. 
### For Setting up with node.
1. Create a .env file and create the necessary variables shown in `.env.example`.
2. Start the app at port 3000 by the command.
```bash
npm run dev
```

### For Docker
Type the command
```bash
docker compose up -d
```
Your app will start at port 4000.
To connect to the mongosh of the initiated mongo container- ``mongosh --port 2717``

Note: **Routes at /requestResetPassword and /passsord-rest work only in Postman currently.**

Here are the list of advanced upcoming features- [link](https://github.com/sudovishal/journalling-web/discussions/5) 
