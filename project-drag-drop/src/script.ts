// -------------------------- Decorators ------------------------

const autoBind = (_target: any, _methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    return  {
        configurable: true,
        get() {
            return descriptor.value.bind(this);
        }
    };
}

// -------------------------- State Management ------------------

enum ProjectStatus {
    Active,
    Finished
}

class Project {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public people: number,
        public status: ProjectStatus
    ) {}
}

// Project State Management
type Listener = (projects: Project[]) => void;

class State {
    private listeners: Listener[] = [];
    private projects: Project[] = [];
    private static instance: State;

    // private constructor() {}

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new State();
        return this.instance;
    }

    // subscribe to Events
    addListener(listenerFn: Listener) {
        this.listeners.push(listenerFn);
    }

    //
    private emitEvents() {
        for (const listenerFn of this.listeners) {
            listenerFn([...this.projects]);
        }
    }

    addProject(title: string, description: string, numOfPeople: number) {
        this.projects.push(new Project(
            Math.random().toString(),
            title,
            description,
            numOfPeople,
            ProjectStatus.Active
        ));

        this.emitEvents()
    }
}

const projectState = State.getInstance();

// -------------------------- Validator ------------------------

interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

const validate = (validatableInput: Validatable) => {
    let isValid = true;

    // check required
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    // check min Length
    if (!!validatableInput.minLength && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    // check max length
    if (!!validatableInput.maxLength && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    // check min
    if (!!validatableInput.min && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    // check max
    if (!!validatableInput.max && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
}

// -------------------------- Project List ------------------------

class ProjectList {
    private readonly type: 'active' | 'finished'
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLElement;
    assignedProjects: Project[] = [];

    constructor(type: 'active' | 'finished') {
        this.type = type
        this.templateElement = <HTMLTemplateElement>document.getElementById('project-list');
        this.hostElement = <HTMLDivElement>document.getElementById('app');

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = <HTMLElement>importedNode.firstElementChild;
        this.element.id = `${this.type}-projects`;

        projectState.addListener((projects: Project[]) => {

            const relevantProjects = projects.filter(project => {
                if (this.type === 'active') {
                    return project.status === ProjectStatus.Active;
                }
                return project.status === ProjectStatus.Finished;
            });

            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });

        this.attach();
        this.renderContent();
    }

    private renderProjects() {
        const listEl = <HTMLUListElement>document.getElementById(`${this.type}-projects-list`);
        listEl.innerHTML = ''
        for (const prjItem of this.assignedProjects) {
            const listItem = document.createElement('li');
            listItem.textContent = prjItem.title;
            listEl.appendChild(listItem)
        }
    }

    private renderContent() {
        this.element.querySelector('ul')!.id = `${this.type}-projects-list`;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }

    private attach() {
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    }
}

// -------------------------- Project Input ------------------------

class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;
    constructor() {
        this.templateElement = <HTMLTemplateElement>document.getElementById('project-input')
        this.hostElement = <HTMLDivElement>document.getElementById('app');

        const importedNode = document.importNode(this.templateElement.content,true);
        this.element = <HTMLFormElement>importedNode.firstElementChild;
        this.element.id = 'user-input';

        this.titleInputElement = <HTMLInputElement>this.element.querySelector('#title');
        this.descriptionInputElement = <HTMLInputElement>this.element.querySelector('#description');
        this.peopleInputElement = <HTMLInputElement>this.element.querySelector('#people');

        this.configure();
        this.attach();
    }

    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;

        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true
        };
        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };
        const peopleValidatable: Validatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5
        };

        const isValid = !validate(titleValidatable) || !validate(descriptionValidatable) || !validate(peopleValidatable)

        if (isValid) {
            alert('Invalid input, please try again!');
            return;
        } else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }


    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }

    private clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }

    @autoBind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            projectState.addProject(title, desc, people);
            this.clearInputs();
        }
    }

    private configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
}

// -------------------------- Main ------------------------

new ProjectInput();
new ProjectList('active');
new ProjectList('finished');