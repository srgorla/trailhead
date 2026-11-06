/// <reference types="vite/client" />

interface SfdcEnvironment {
    basePath?: string;
}

interface Window {
    SFDC_ENV?: SfdcEnvironment;
}
