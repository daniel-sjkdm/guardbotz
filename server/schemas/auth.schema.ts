export class AuthErrorResponseSchema {

    success: boolean;
    error: string;
    data: object;

    constructor(success: boolean, error: string, data: object) {
        this.success = success;
        this.error = error;
        this.data = data;
    };

    toJSON () {
        return {
            success: this.success,
            error: this.error,
            data: this.data
        };
    };
}