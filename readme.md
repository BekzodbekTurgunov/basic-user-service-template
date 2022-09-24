- .env file like this ->
    - DATABASE_URL=postgresql://postgres:1@localhost:5432/user-service
    - SENDGRID_EMAIL=ali@truckpin.com
    - SENDGRID_API_KEY=
    - PORT=8080
    - SITE_URL =http://localhost:8080
    - JWT_SECRET=secret

-   API

    - **AUTH**
        - POST /api/auth/signup
            - body:{ email,password"}               

        - POST api/auth/confirm-user
            - body { uuid, code }

        - POST api/auth/login
            - body {email, password}
        - POST /api/auth/resend-verification
            - body {email}