# My Chat Backend

This is a realtime chatting application, with great UI (similar to whatsapp).  
This repository includes only back-end part of my-chat application.

## Links
> [Backend deployed on heroku](https://my-chat-api.herokuapp.com)  
> [Backend github](https://github.com/RohitKumar-200/my-chat-backend)  
> [Deployed website](https://my-chat-289919.web.app)  
> [Front-end github](https://github.com/RohitKumar-200/my-chat-frontend)  

## Tech Stack
* Node.js
* Express.js
* Pusher
* MongoDB / Mongoose

## Setting up locally
1. Clone this repository  
` git clone https://github.com/RohitKumar-200/my-chat-backend.git `
2. cd to my-chat-frontend
4. create .env file and add following into it  
   > DB_CONNECTION=(Your mongoDB connection url)  
   > PUSHER_appId=(Pusher app Id)  
   > PUSHER_key=(Pusher Key)  
   > PUSHER_secret=(Pusher secret)
3. Run command  
`npm install`
4. Start your server by running this command  
`npm start`
5. Open your browser and open this link http://localhost:4000/

### If You liked my work, please ⭐ this repository