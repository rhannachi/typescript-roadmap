export interface ValidationForm {
    fieldsValidator: FieldsValidatorRules | undefined
    setFieldsValidator(fieldValidators: FieldsValidatorRules): void
}

export interface ValidatorRules {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

export type FieldsValidatorRules = {
    [field: string]: ValidatorRules;
}

export function validate<T extends Record<string, any>, U extends FieldsValidatorRules>(values: T, fieldsValidator: U | undefined) {
    if (!fieldsValidator) {
        return true;
    }

    let isValid = true;

    for (const [prop, validators] of Object.entries(fieldsValidator)) {

        const value = values[prop]

        // check required
        if (validators.required) {
            isValid = isValid && value.toString().trim().length !== 0;
        }
        // check min Length
        if (!!validators.minLength && typeof value === 'string') {
            isValid = isValid && value.length >= validators.minLength;
        }
        // check max length
        if (!!validators.maxLength && typeof value === 'string') {
            isValid = isValid && value.length <= validators.maxLength;
        }
        // check min
        if (!!validators.min && typeof value === 'number') {
            isValid = isValid && value >= validators.min;
        }
        // check max
        if (!!validators.max && typeof value === 'number') {
            isValid = isValid && value <= validators.max;
        }
    }

    return isValid;
}
