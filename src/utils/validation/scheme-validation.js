import { z, ZodError } from "zod";
export function schemeValidation(scheme, model) {
    try {
        return scheme.parse(model);
    }
    catch (err) {
        if (err instanceof ZodError) {
            const errorDetails = err.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message,
            }));
            const validationError = new Error("Validation failed");
            validationError.details = errorDetails;
            validationError.isValidationError = true;
            throw validationError;
        }
        throw err;
    }
}
//# sourceMappingURL=scheme-validation.js.map