# [AI Resume Builder Frontend](http://ec2-3-135-220-37.us-east-2.compute.amazonaws.com:3000/)

[Link to try it!](http://ec2-3-135-220-37.us-east-2.compute.amazonaws.com:3000/)

This is the frontend code for the Ai Resume App.
![landing page](https://github.com/santy81855/ResumeBuilder_Frontend/blob/main/github_images/home.png?raw=true)
![login page](https://github.com/santy81855/ResumeBuilder_Frontend/blob/main/github_images/login.png?raw=true)
![resume page](https://github.com/santy81855/ResumeBuilder_Frontend/blob/main/github_images/dashboard.png?raw=true)
![edit page](https://github.com/santy81855/ResumeBuilder_Frontend/blob/main/github_images/resume.png?raw=true)

# Getting Started
## Setup Instructions

Follow these steps to configure your website to run on an EC2 instance.
This guide also works if you're just downloading it to your machine as well; just skip the EC2 instance steps and use your own IP address and localhost.

## Step 1: Create EC2 Instance

- **OS Image**: Ubuntu OS Image (Ubuntu Server 22.04 LTS)
- **Key Pair**: Create a key pair name to be able to SSH into the instance.
- **Network Settings**:
  - Allow SSH traffic from your IP address or anywhere.
  - Allow HTTPS traffic from the internet.
  - Allow HTTP traffic from the internet.
- Launch the instance.

## Step 2: Add Your Ports to the EC2 instance

- **Server Port**:
  - Go to instance -> security -> Security groups -> Edit inbound rules -> Add rule -> (Type: Custom TCP, Port range: "your-port", availability: 0.0.0.0/0)
- **Client-side Development Port** (optional, only if you'll be developing on the instance):
  - Go to instance -> security -> Security groups -> Edit inbound rules -> Add rule -> (Type: Custom TCP, Port range: "your-port", availability: 0.0.0.0/0)

## Step 3: Get Instance Information

Get the following information from the instance:

- Public IPv4 address (PIA): I'll refer to it as **PIA** (Public IP Address).
- Public IPv4 DNS: I'll refer to it as **PID**.

## Step 4: Configure MongoDB

Add the **PIA** to the "IP Access List" on MongoDB.

## Step 5: SSH into the Instance

Using PuTTY:
- Use the **PIA** as the Host Name.
- Connection type is SSH.
- Connection -> Seconds between Keepalives = 59.
- Connection -> SSH -> Auth -> Credentials -> Private Key file = file downloaded from the Key pair when you created the EC2 instance.
- Click "Open".
- Login as: ubuntu.

## Step 6: Install Node.js

Run the following commands:
- `curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -`
- `sudo apt install nodejs`

## Step 7: Optional - Configure Git Access

If you want to make changes with Git on the instance:
- Create an SSH key using `ssh-keygen` command.
- Access the public key using `cat ~/.ssh/id_rsa.pub`.
- Add it to your GitHub account.

## Step 8: Clone Repositories

Clone the frontend and backend repositories:
- Frontend repo:
  - Run `npm i` to install all necessary dependencies.
  - Add a `.env` file with the following variable:
    ```
    REACT_APP_API_URL="your-PID:your-server-port#"
    ```
  - Run `npm run build` to build the static files of the project.
- Backend repo:
  - Run `npm i` to install all necessary dependencies.
  - Add a `.env` file with the required variables.
    ```
    SESSION_SECRET="your-session-secret"
    JWT_SECRET_KEY="your-jwt-secret-key"
    OPENAI_API_KEY="your-openai-api-key"
    MONGODB_URI="your-mongodb-uri"
    BUILD_PATH="path-to-react-build-folder"
    CORS_OPTIONS=["cors-option1", "cors-option2", etc] (optional if you want to develop using npm start)
    PORT=your-server-port# (default is 3000, for http use 80, for https use 443)
    SSL_CERT_PATH="your-optional-ssl-cert-path"
    SSL_KEY_PATH="your-optional-ssl-key-path"

    ```
  - Install PM2 to run the server: `npm install pm2 -g`.

## Step 9: Run the Server

In the backend repo:
- Run `pm2 start index.js`.
- Use other PM2 commands as needed: `pm2 list`, `pm2 stop 'id'`, `pm2 logs`.

## Credits
This project was created by Santiago Garcia. 

## Special thanks to the following technologies:

### - Node.js: https://nodejs.org/
### - Express: https://expressjs.com/
### - Passport: http://www.passportjs.org/
### - MongoDB: https://www.mongodb.com/
### - OpenAI API: https://openai.com/
