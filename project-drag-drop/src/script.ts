// autoBind decorator
function autoBind(_target: any, _methodName: string, descriptor: PropertyDescriptor) {
    return  {
        configurable: true,
        get() {
            return descriptor.value.bind(this);
        }
    };
}

// --------------------------------------------------

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

    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
    @autoBind
    private submitHandler(event: Event) {
        event.preventDefault();
        console.log(this.titleInputElement.value);
    }

    private configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
}

const prjInput = new ProjectInput();
