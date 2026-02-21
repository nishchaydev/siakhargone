/**
 * Server-side error monitoring helper.
 * In production, this can be wired to Sentry or another monitoring service.
 */
export function sendErrorToMonitoring(error: unknown, context?: Record<string, any>) {
    const sanitize = (data: any): any => {
        if (!data || typeof data !== 'object') return data;
        const result = Array.isArray(data) ? [] : {};
        const SENSITIVE_KEYS = ['email', 'token', 'password', 'secret', 'ssn', 'ssnlast4', 'auth', 'accesstoken', 'refreshtoken', 'userid', 'id'];

        for (const key in data) {
            const lowerKey = key.toLowerCase();
            if (SENSITIVE_KEYS.includes(lowerKey)) {
                (result as any)[key] = '[REDACTED]';
            } else if (typeof data[key] === 'object') {
                (result as any)[key] = sanitize(data[key]);
            } else {
                (result as any)[key] = data[key];
            }
        }
        return result;
    };

    const errorDetails = {
        name: error instanceof Error ? error.name : 'Error',
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        context: context ? sanitize(context) : undefined,
        timestamp: new Date().toISOString()
    };

    // Log to console with compact formatting
    console.error("[Monitoring Error]:", JSON.stringify(errorDetails));
}
