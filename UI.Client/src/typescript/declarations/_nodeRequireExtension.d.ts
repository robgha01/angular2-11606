interface NodeRequire {
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void, name?: string) => void;
}

declare var ENV: Environments;
type Environments =
    "production"
    | "development";