import { Component } from "./component.js";
import { Item } from "./item.js";
import ProjectState from "../state/index.js";
import { Project, ProjectStatus } from "../models/index.js";

const projectState = ProjectState.getInstance();

export class List extends Component<HTMLDivElement, HTMLElement>{
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
            new Item(hostId, project);
        }
    }
}
