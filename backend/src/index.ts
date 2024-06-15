import cors from "cors";
import "dotenv/config";
import express, { Request, Response } from "express";
import http, { IncomingMessage } from "http";
import mongoose from "mongoose";
import path from "path";
import recipeRoutes from "./routes/recipes.routes";
import userRoutes from "./routes/user.routes";

const port = process.env.PORT || 3000;
const app = express();

// checking database connection
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log("DB is connected"));

// middleware
app.use(express.json());
app.use(cors());

// Starting the client
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.get("/result", (req: Request, res: Response) => {
  // import http from "http"; // Importing http module
  // import { IncomingMessage } from "http";
  // import { Request, Response } from "express"; // Assuming you're using Express

  const targetUrl = new URL(
    "http://103.113.200.7/honours/second_year_result_show.php?roll_number=2488231&reg_no=20222252108&exam_year=2022"
  );

  const options: http.RequestOptions = {
    hostname: targetUrl.hostname,
    port: targetUrl.port || 80, // Use targetUrl.port if available, otherwise default to 80
    path: `${targetUrl.pathname}${targetUrl.search}`,
    method: "GET",
  };

  const request = http.request(options, (response: IncomingMessage) => {
    let data = "";

    response.on("data", (chunk: Buffer) => {
      data += chunk.toString(); // Convert Buffer to string
    });

    response.on("end", () => {
      const contentType = response.headers["content-type"];

      if (response.statusCode === 200) {
        try {
          if (contentType && contentType.includes("application/json")) {
            // Handle JSON response
            try {
              const results = JSON.parse(data); // Assuming JSON data
              console.log("Results:", results); // Handle successful response
              // Return the response using Express res object if available
              // return res.status(200).json(results);
            } catch (error) {
              console.error("Error parsing JSON response data:", error);
              // Return error response using Express res object if available
              // return res.status(500).json({ error: 'Failed to parse response data' });
            }
          } else if (contentType && contentType.includes("text/html")) {
            // Handle HTML response
            console.error("Received HTML response:", data);
            // Return HTML response using Express res object if available
            // return res.status(200).send(data);
          } else {
            console.error("Unexpected content type:", contentType);
            // Return error response using Express res object if available
            // return res.status(500).json({ error: 'Unexpected content type' });
          }
        } catch (error) {
          console.error("Error parsing response data:", error);
          // Return error response using Express res object if available
          // return res.status(500).json({ error: 'Failed to parse response data' });
        }
      } else {
        console.error(`Error fetching results: ${response.statusMessage}`);
        // Return error response using Express res object if available
        // return res.status(response.statusCode).json({ error: 'Failed to fetch results' });
      }
    });

    response.on("error", (error) => {
      console.error("Error fetching exam results:", error);
      // Return error response using Express res object if available
      // return res.status(500).json({ error: 'Error fetching results' });
    });
  });

  request.on("error", (error) => {
    console.error("Error creating HTTP request:", error);
    // Return error response using Express res object if available
    // return res.status(500).json({ error: 'Error creating HTTP request' });
  });

  request.end();
});

// routes
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);

// default route
app.get("/", (_, res) => {
  res.send("Server is running...");
});

app.listen(port, () => console.log(`Server is running on port: ${port}`));
