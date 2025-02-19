export class CommonHelper {
    static removeBlankAttributes<T extends Record<string, unknown>>(obj: T): Partial<T> {
        return Object.fromEntries(
            Object.entries(obj).filter(([, value]) => value !== null && value !== undefined && value !== '')
        ) as Partial<T>;
    }
}
