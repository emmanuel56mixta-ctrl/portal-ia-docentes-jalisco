/**
 * Server-only defaults for the optional OAuth preview connection.
 *
 * No client credential is stored in source control. Any environment that
 * enables authentication must inject GROK_AUTH_CLIENT_ID and
 * GROK_AUTH_CLIENT_SECRET. Authentication is disabled for this portal.
 */
export const PREVIEW_CLIENT_ID = "";
export const PREVIEW_CLIENT_SECRET = "";

/** The shared auth broker issuer (OIDC discovery lives under it). */
export const GROK_ISSUER_DEFAULT = "https://auth.grok.me";

/**
 * Host patterns whose callbacks the preview client accepts. Better Auth derives
 * the live preview's real origin from the request host and validates it against
 * this list.
 */
export const PREVIEW_ALLOWED_HOSTS = ["*.grok-sandbox.com"] as const;
