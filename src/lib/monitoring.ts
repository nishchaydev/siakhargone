/**
 * Server-side error monitoring helper.
 * In production, this can be wired to Sentry or another monitoring service.
 */
function sanitizeForMonitoring(data: unknown): unknown {
    if (data === null) return null;
    if (typeof data === 'string' || typeof data === 'number' || typeof data === 'boolean') {
        return data;
    }
    if (Array.isArray(data)) {
        return data.map((item) => sanitizeForMonitoring(item));
    }
    if (typeof data !== 'object') {
        return String(data);
    }

    const result: Record<string, unknown> = {};
    const SENSITIVE_KEYS = ['email', 'token', 'password', 'secret', 'ssn', 'ssnlast4', 'auth', 'accesstoken', 'refreshtoken', 'userid', 'id'];
    const objectData = data as Record<string, unknown>;

    for (const [key, value] of Object.entries(objectData)) {
        const lowerKey = key.toLowerCase();
        result[key] = SENSITIVE_KEYS.includes(lowerKey) ? '[REDACTED]' : sanitizeForMonitoring(value);
    }

    return result;
}

export function sendErrorToMonitoring(error: unknown, context?: Record<string, unknown>) {

    const errorDetails = {
        name: error instanceof Error ? error.name : 'Error',
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        context: context ? sanitizeForMonitoring(context) : undefined,
        timestamp: new Date().toISOString()
    };

    // Log to console with compact formatting
    console.error("[Monitoring Error]:", JSON.stringify(errorDetails));
}
