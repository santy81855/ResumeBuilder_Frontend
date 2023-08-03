# Host multiple domains on a single server

## This can be accomplished by using a reverse-proxy like NGINX

### Step 1: Ensure all domains are listening to ports other than 80 and 443

-   This is important because the reverse-proxy will be listening on ports 80 and 443, so if your applications are listening on the same ports there would be conflicts.
-   If you have custom server code for your apps, you can set your app to listen on port 3000 for example, and then the reverse-proxy would send the http and https traffic to that port.

### Step 2: Install NGINX

```bash
sudo apt-get update
sudo apt-get install nginx
```

### Step 3: Configure NGINX to handle multiple domains

-   This is accomplished by creating a configuration file for each domain like so:

    ```bash
    sudo nano /etc/nginx/sites-available/domain1
    sudo nano /etc/nginx/sites-available/domain2
    ```

-   An example configuration file for a website that is being run on port 3000, but is listening for http and https traffic:

    ```
    server {
        listen 80;
        server_name your-domain.com;

        location / {
            proxy_pass http://localhost:3000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }

    }

    server {
        listen 443 ssl;
        server_name your-domain.com;

        ssl_certificate /path/to/your/ssl_certificate.pem;
        ssl_certificate_key /path/to/your/ssl_key.pem;

        location / {
            proxy_pass http://localhost:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
    ```

### Step 4: Enable the Server Blocks:

-   After you create the configuration files, you need to enable them by creating a symbolic link to the 'sites-enabled' directory. You can do it using:

    ```
    sudo ln -s /etc/nginx/sites-available/domain1 /etc/nginx/sites-enabled/
    sudo ln -s /etc/nginx/sites-available/domain2 /etc/nginx/sites-enabled/
    ```

### Step 5: Test the NGINX configuration:

-   Just ensure that there are no syntax errors with:

    ```
    sudo nginx -t

    ```

### Step 6: Reload NGINX:

```
sudo service nginx reload

```

### Step 7: Install pm2

-   To run both applications continously you can use pm2. Install with:

```
npm install pm2 -g
```

### Step 8: Start your applications

-   Go to each applications root directory and start your application with pm2 using the appropriate command for your framework:

    -   For Node application:

    ```
    pm2 start your-app.js --name "any-name-you-want"
    ```

    -   For Next application:

    ```
    PORT=your-port-number pm2 start npm --name "any-name-you-want" -- start
    ```
