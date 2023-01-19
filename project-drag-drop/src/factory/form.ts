import { Component } from "./component.js";
import {
    FieldsValidatorRules,
    ID_HOST_ELEMENT,
    ID_TASK_FORM,
    ID_TASK_FORM_TEMPLATE,
    validate, ValidationForm,
} from "../utils/index.js";
import { AddValidationRules, AutoBind } from "../decorators/index.js";
import { Subject } from "../observers/index.js";
import { TaskModel } from "../models/index.js";

export class Form extends Component<HTMLDivElement, HTMLFormElement> implements ValidationForm {
    fieldsValidator: FieldsValidatorRules | undefined

    @AddValidationRules({required: true})
    titleInputElement: HTMLInputElement;
    @AddValidationRules({required: true, minLength: 5})
    descriptionInputElement: HTMLInputElement;
    @AddValidationRules({required: true, min: 1, max: 5})
    peopleInputElement: HTMLInputElement;

    constructor(subject: Subject<TaskModel>) {
        super(ID_TASK_FORM_TEMPLATE, ID_HOST_ELEMENT, true, ID_TASK_FORM)

        this.subject = subject

        this.titleInputElement = <HTMLInputElement>this.element.querySelector('#title');
        this.descriptionInputElement = <HTMLInputElement>this.element.querySelector('#description');
        this.peopleInputElement = <HTMLInputElement>this.element.querySelector('#people');

        this.configure();

        console.log('fieldsValidator:', this.fieldsValidator)
    }

    setFieldsValidator(fieldValidators: FieldsValidatorRules) {
        this.fieldsValidator = {
            ...this.fieldsValidator,
            ...fieldValidators
        };
    }

    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    renderContent() {}

    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;

        const values = {
            title: enteredTitle,
            description: enteredDescription,
            people: Number(enteredPeople)
        }
        const isValid = !validate(values, this.fieldsValidator);

        if (isValid) {
            alert('Invalid input, please try again!');
            return;
        } else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }

    private clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }

    @AutoBind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            this.subject.setState({
                id: Math.random().toString(),
                title,
                description,
                people,
                status: 'active'
            })
            this.clearInputs();
        }
    }

    update(): void {}

}