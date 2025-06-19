import express from "express";
import "express-async-errors";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import {
  applyCoreSecurityMiddleware,
  getSecurityMiddleware,
} from "./middleware/security-setup.js";
import { setupRoutes } from "./routes/index.js";
import errorHandler from "./middleware/errorHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const configureLogging = (app) => {
  if (process.env.NODE_ENV === "production") {
    app.use(morgan("combined"));
  } else {
    app.use(morgan("dev"));
  }
};

const getAllowedOrigins = () => [
  process.env.FRONTEND_URL || "http://localhost:5175",
  "http://localhost:5174",
  "http://localhost:5173",
  "http://localhost:5172",
];

const configureCORS = (app) => {
  const allowedOrigins = getAllowedOrigins();

  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          console.warn("CORS violation from origin:", origin);
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
      methods: ["GET", "POST", "PATCH", "DELETE", "PUT", "OPTIONS"],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cookie",
        "X-Requested-With",
      ],
      exposedHeaders: [
        "Set-Cookie",
        "X-RateLimit-Limit",
        "X-RateLimit-Remaining",
        "X-RateLimit-Reset",
      ],
      optionsSuccessStatus: 200,
      maxAge: 86400,
    })
  );

  app.options("*", cors());
};

const configureCoreMiddleware = (app) => {
  app.use(
    express.json({
      limit: process.env.JSON_LIMIT || "10mb",
      strict: true,
      type: "application/json",
    })
  );

  app.use(
    express.urlencoded({
      extended: true,
      limit: process.env.URLENCODED_LIMIT || "10mb",
    })
  );

  app.use(cookieParser());
};

const configureStaticFiles = (app) => {
  app.use(
    "/uploads",
    (req, res, next) => {
      res.set({
        "Cache-Control": "public, max-age=31536000",
        "X-Content-Type-Options": "nosniff",
        "Content-Security-Policy":
          "default-src 'none'; img-src 'self'; style-src 'none'; script-src 'none';",
      });
      next();
    },
    express.static(path.join(__dirname, "../uploads"))
  );
};

const setupHealthCheck = (app) => {
  app.get("/api/health", (req, res) => {
    res.json({
      status: "OK",
      timestamp: new Date().toISOString(),
      version: process.env.API_VERSION || "1.0.0",
      environment: process.env.NODE_ENV || "development",
    });
  });
};

const setupSecurityMonitoring = (app) => {
  app.get("/api/security/status", (req, res) => {
    const isDevelopment = process.env.NODE_ENV === "development";
    const disableRateLimits =
      process.env.DISABLE_RATE_LIMITS === "true" ||
      (isDevelopment && process.env.DISABLE_RATE_LIMITS !== "false");

    res.json({
      status: "Security monitoring active",
      environment: process.env.NODE_ENV || "development",
      devMode: {
        enabled: isDevelopment,
        rateLimitingDisabled: disableRateLimits,
      },
      features: {
        rateLimiting: !disableRateLimits,
        inputSanitization: true,
        bruteForceProtection: !disableRateLimits,
        securityHeaders: true,
        corsProtection: true,
        contentValidation: true,
      },
      timestamp: new Date().toISOString(),
    });
  });
};

export const connectDB = async () => {
  try {
    const mongoOptions = {
      authSource: "admin",
      ssl: process.env.NODE_ENV === "production",
      maxPoolSize: parseInt(process.env.MONGO_MAX_POOL_SIZE || "10"),
      serverSelectionTimeoutMS: parseInt(
        process.env.MONGO_SERVER_TIMEOUT || "5000"
      ),
      socketTimeoutMS: parseInt(process.env.MONGO_SOCKET_TIMEOUT || "45000"),
      family: 4,
    };

    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/jam-together",
      mongoOptions
    );

    console.log("MongoDB connected successfully");

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected");
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

const setupGracefulShutdown = () => {
  const gracefulShutdown = () => {
    console.log("Starting graceful shutdown...");
    mongoose.connection.close(() => {
      console.log("MongoDB connection closed");
      process.exit(0);
    });
  };

  process.on("SIGTERM", gracefulShutdown);
  process.on("SIGINT", gracefulShutdown);
};

const app = express();

applyCoreSecurityMiddleware(app);
configureLogging(app);
configureCORS(app);
configureCoreMiddleware(app);
configureStaticFiles(app);

setupHealthCheck(app);

setupRoutes(app, getSecurityMiddleware());

setupSecurityMonitoring(app);

app.use(errorHandler);

setupGracefulShutdown();

export default app;
