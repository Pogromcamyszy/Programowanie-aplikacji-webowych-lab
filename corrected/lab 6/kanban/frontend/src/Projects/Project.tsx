
export interface IProject {
    id: number;
    name: string;
    description: string;
}

export class Project implements IProject {
    id: number;
    name: string;
    description: string;

    constructor(name: string, description: string) {
        this.id = Date.now();
        this.name = name;
        this.description = description;
    }
}