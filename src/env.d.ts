interface ImportMetaEnv {
  // Server-side only: used by Astro SSR to call Directus API
  // Local dev: http://localhost:8055
  // Docker: http://directus:8055 (overridden in docker-compose.yml)
  readonly DIRECTUS_URL: string;
  readonly DIRECTUS_TOKEN: string;

  // Public: used for <img src> asset URLs loaded by the browser
  // Always the externally accessible URL (localhost in dev, domain in prod)
  readonly PUBLIC_DIRECTUS_URL: string;

  readonly FORM_REGISTER_URL: string;
  readonly FORM_CONTACT_URL: string;
  readonly PUBLIC_SITE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}