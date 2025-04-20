
## Installation

### Prerequisites
- Node.js 18.x or later (recommended to use Node.js 20.x or later)

- Add .env file and add below content 
   ```
   VITE_GOOGLE_MAP_API_KEY=AIzaSyAMwjyfKOQtfmlJEneEXbhlSf65KjXzPCg
   VITE_BASE_API_ENDPOINT=http://localhost:3001
   VITE_CDN_URL=https://manzil-dev.s3.ap-south-1.amazonaws.com/
   ```

1. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

   > On `npm` some included packages can cause peer-deps issue with React 18 while installing.
   >
   > Use the `--legacy-peer-deps` flag, at the end of the installation command, as a workaround for that.

2. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

