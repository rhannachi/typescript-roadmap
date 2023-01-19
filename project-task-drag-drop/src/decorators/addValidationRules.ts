import { ValidatorRules} from "../utils/index.js";
import { Form } from "../factory/index.js";

export function AddValidationRules(validatorRules: ValidatorRules) {
    return function(target: Form, propName: string) {
        const field = propName.replace('InputElement', '')
        target.setFieldsValidator({ [field]: validatorRules })
    }
}
