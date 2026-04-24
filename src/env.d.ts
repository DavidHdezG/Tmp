interface ImportMetaEnv {
  readonly DIRECTUS_URL: string;
  readonly DIRECTUS_TOKEN: string;
  readonly FORM_REGISTER_URL: string;
  readonly FORM_CONTACT_URL: string;
  readonly PUBLIC_SITE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}