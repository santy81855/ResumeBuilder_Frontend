# Migrate the application from one server to another

### Step 1: Clone repo in new server

-   Clone app and install any necessary dependencies
-   Fill out any necessary .env variables

### Step 2: Update domain DNS settings

-   Update the DNS settings to use the new server's IP address

### Step 3: Update any github secrets

-   Any actions that depend on the SSH Key or Server IP need to be updated

### Step 4: SSL certificate

-   Either transfer or obtain new SSL certificate for https connection.
