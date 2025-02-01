# Project Setup and API Instructions

## Project Setup

1. **Clone the repository:**
   ```sh
   git clone git@github.com:ninjacoderomi/alma-exercise.git
   cd alma-exercise
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   copy the .env.local file provided in the mail to root directory

4. **Run the project:**
   ```sh
   npm dev
   ```
   Server should start at port 3000, open `http://localhost:3000`
 ## Architecture
  * Project uses a basic i18n setup
  * [zustand](https://zustand.docs.pmnd.rs/getting-started/introduction) for state mgmt.  
  * [Auth0](https://auth0.com/) for login and authorization.
  * Uses JSON Form, material-ui and tailwind-css
 
## Routes Exposed
1. **Home** `http://localhost:3000/` 
1. **Leads** `http://localhost:3000/leads` 
1. **Submit Case** `http://localhost:3000/submit-case` 
 Due to localization, it might redirect you to a `/en` prefixed route
### API
 There are two API routes,
 1. `/api/auth/[auth]` which is used for Auth0 related setup.
 1. `/api/leads` is single module maintaining all the data in memory. It exposes handlers for following HTTP methods
   * **GET** for getting all the leads
   * **PUT** for adding a new lead, used in `/submit-case` page
   * **POST** for modifying the status of a lead

All the API do server side validations as well

## Incomplete Functionality
1. File upload
1. Differences between mocks and actual implementation



