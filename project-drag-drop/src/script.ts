// -------------------------- Decorators ------------------------

const autoBind = (_target: any, _methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    return  {
        configurable: true,
        get() {
            return descriptor.value.bind(this);
        }
    };
}

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

// -------------------------- ProjectState Management ------------------

const STATUS = ['active', 'finished'] as const
type ProjectStatus = typeof STATUS[number]

class Project {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public people: number,
        public status: ProjectStatus
    ) {}
}

// Project ProjectState Management
type Listener<T> = (items: T[]) => void;

class State<T> {
    protected listeners: Listener<T>[] = [];

    receiveEvents(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}

class ProjectState extends State<Project>{
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
        super()
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
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
            'active'
        ));

        this.emitEvents()
    }
}

const projectState = ProjectState.getInstance();

// ---------------- Base Component ---------------

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    protected constructor(templateId: string, hostElementId: string, insertAtStart: boolean, newElementId?: string) {
        this.templateElement = <HTMLTemplateElement>document.getElementById(templateId);

        this.element = <U>document.importNode(this.templateElement.content,true).firstElementChild
        if (newElementId) {
            this.element.id = newElementId;
        }

        this.hostElement = <T>document.getElementById(hostElementId);
        this.hostElement.insertAdjacentElement(insertAtStart ? 'afterbegin' : 'beforeend', this.element);

    }

    abstract configure(): void;
    abstract renderContent(): void;
}

// ----------------- Project Item ----------------

// ProjectItem Class
class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> {
    private project: Project;

    constructor(hostId: string, project: Project) {
        super('single-project', hostId, false, project.id);
        this.project = project;

        this.configure();
        this.renderContent();
    }

    configure() {}

    renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.project.people.toString();
        this.element.querySelector('p')!.textContent = this.project.description;
    }
}

// -------------------------- Project List ------------------------

class ProjectList extends Component<HTMLDivElement, HTMLElement>{
    private readonly status: ProjectStatus
    assignedProjects: Project[] = [];

    constructor(status: ProjectStatus) {
        super('project-list', 'app', false, `${status}-projects`);
        this.status = status

        this.configure();
        this.renderContent();
    }

    configure() {
        projectState.receiveEvents((receivedProjects: Project[]) => {
            this.assignedProjects = this.filterProjects(receivedProjects, this.status)
            this.renderProjects();
        });
    }

    renderContent() {
        this.element.querySelector('ul')!.id = `${this.status}-projects-list`;
        this.element.querySelector('h2')!.textContent = this.status.toUpperCase() + ' PROJECTS';
    }

    private filterProjects(projects:Project[], status: ProjectStatus): Project[] {
        return projects.filter(project => {
            if (status === 'active') {
                return project.status === 'active';
            }
            return project.status === 'finished';
        });
    }

    private renderProjects() {
        const listEl = <HTMLUListElement>document.getElementById(`${this.status}-projects-list`);
        listEl.innerHTML = '';
        for (const project of this.assignedProjects) {
            const hostId = this.element.querySelector('ul')!.id
            new ProjectItem(hostId, project);
        }
    }
}

// -------------------------- Project Input ------------------------

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;
    constructor() {
        super('project-input', 'app', true, 'user-input')
        // this.templateElement = <HTMLTemplateElement>document.getElementById('project-input')
        // this.hostElement = <HTMLDivElement>document.getElementById('app');
        //
        // const importedNode = document.importNode(this.templateElement.content,true);
        // this.element = <HTMLFormElement>importedNode.firstElementChild;
        // this.element.id = 'user-input';

        this.titleInputElement = <HTMLInputElement>this.element.querySelector('#title');
        this.descriptionInputElement = <HTMLInputElement>this.element.querySelector('#description');
        this.peopleInputElement = <HTMLInputElement>this.element.querySelector('#people');

        this.configure();
    }

    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    renderContent() {}

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
}

// -------------------------- Main ------------------------

new ProjectInput();
new ProjectList('active');
new ProjectList('finished');