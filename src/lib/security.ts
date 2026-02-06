import sanitizeHtml from 'sanitize-html';

/**
 * Sanitizes HTML content to prevent XSS attacks
 * Used for blog posts and other user-generated content
 */
export function sanitizeHTML(html: string): string {
    return sanitizeHtml(html, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat([
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'img', 'figure', 'figcaption',
            'div', 'span', 'section', 'article',
            'br', 'hr'
        ]),
        allowedAttributes: {
            ...sanitizeHtml.defaults.allowedAttributes,
            '*': ['class'],
            'a': ['href', 'name', 'target', 'rel', 'id'],
            'img': ['src', 'alt', 'title', 'width', 'height', 'id'],
            'h1': ['id'], 'h2': ['id'], 'h3': ['id'], 'h4': ['id'], 'h5': ['id'], 'h6': ['id'], // Allow IDs on headings for anchors
        },
        allowedSchemes: ['http', 'https', 'mailto'],
        allowedSchemesByTag: {
            img: ['http', 'https']
        },
        transformTags: {
            'a': sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }, true)
        }
    });
}

/**
 * Escapes JSON for safe injection into script tags
 * Prevents script injection through </script> sequences
 */
export function escapeJsonForScript(json: string): string {
    return json
        .replace(/</g, '\\u003c')
        .replace(/>/g, '\\u003e')
        .replace(/&/g, '\\u0026')
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029');
}
