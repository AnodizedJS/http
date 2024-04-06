
export type Logger = {
    log: (value: any) => void
    warn: (value: any) => void
    error: (value: any) => void
    exception: (value: any) => void
}