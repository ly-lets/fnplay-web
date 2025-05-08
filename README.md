# Finnplay App - React + Vite

This project is a React-based gallery application built with Vite for fast development and hot module replacement (HMR). The app integrates with a backend server via a proxy and provides features like dynamic filters, responsive design, and backend API integration.

---

## Prerequisites

Before starting, ensure you have the following installed on your system:

1. **Node.js** (v16 or higher) and **npm** (v8 or higher)
   - [Download Node.js](https://nodejs.org/)
2. **Backend API**:
   - Ensure the backend project is running and accessible. The frontend communicates with the backend via a proxy. Refer to repository  of `fnplay-api`.

---

## Installation Steps

1. **Install Dependencies**: Run the following command to install all required dependencies:
   ```bash
   npm install
   ```
2. **Set up Proxy**:
   - Open the vite.config.js file.
   - Locate the proxy configuration under the server field and ensure it matches the backend project address. For example:
   ```javascript
   server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, "/api"),
            },
        },
    }
   ```
3. **Start the Development Server**: Run the following command to start the app:
   ```bash
   npm run dev
   ```
   This will start the app on http://localhost:5173.

4. **Lint and fix**: 
   Run the following command view `ESLint` findings:
   ```bash
   npm run lint
   ```
   Run the following command to fix `ESLint` findings:
   ```bash
   npm run lint-fix
   ```

## Common Issues and Troubleshooting

1. App is Not Accessible in the Browser
   - Cause: The frontend cannot communicate with the backend due to an incorrect proxy configuration.
   - Solution:
     - Verify that the backend server is running.
    - Check the proxy configuration in vite.config.js and ensure it matches the backend server address
    - Restart the frontend server after updating the proxy:

2. CORS Errors
   - Cause: The backend server does not allow requests from the frontend.
   - Solution:
     - Ensure the backend server is configured to allow requests from the frontend's origin.
     - If using a proxy, ensure the proxy is correctly set up in vite.config.js.