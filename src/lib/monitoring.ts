/**
 * Server-side error monitoring helper.
 * In production, this can be wired to Sentry or another monitoring service.
 */
export function sendErrorToMonitoring(error: unknown, context?: Record<string, any>) {
    const errorDetails = {
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        context,
        timestamp: new Date().toISOString()
    };

    // Log to console with specific formatting for log aggregators
    console.error("[Monitoring Error]:", JSON.stringify(errorDetails, null, 2));

    // Example of Sentry integration (if Sentry was installed):
    // if (process.env.NODE_ENV === 'production') {
    //     Sentry.captureException(error, { extra: context });
    // }
}
