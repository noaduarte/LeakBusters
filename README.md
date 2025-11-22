# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Running Locally

To run this project on your local machine, follow these steps:

1.  **Install Dependencies**:
    Open your terminal and run the following command to install the necessary packages:
    ```bash
    npm install
    ```

2.  **Set Up Environment Variables**:
    Create a file named `.env` in the root of the project and add your Gemini API key. You can get a key from [Google AI Studio](https://aistudio.google.com/app/apikey).
    ```
    GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```

3.  **Run the Genkit AI Flows**:
    In a new terminal window, start the Genkit development server. This will watch for changes in your AI flows.
    ```bash
    npm run genkit:watch
    ```

4.  **Run the Application**:
    In a separate terminal window, start the Next.js development server:
    ```bash
    npm run dev
    ```

5.  **Open in Browser**:
    Open your browser and navigate to [http://localhost:9002](http://localhost:9002) to see the application running.
