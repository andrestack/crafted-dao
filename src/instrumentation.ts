import * as Sentry from "@sentry/nextjs";

export async function register() {
  try {
    if (process.env.NEXT_RUNTIME === "nodejs") {
      await import("../sentry.server.config");
    }

    if (process.env.NEXT_RUNTIME === "edge") {
      await import("../sentry.edge.config");
    }
  } catch (error) {
    if (error instanceof Error) {
      error = new Error("Failed to register Sentry:", error);
    }
    console.error(error);
  }
  Sentry.captureException(error);
}

export const onRequestError = Sentry.captureRequestError;
