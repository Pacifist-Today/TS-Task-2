enum studyingStatuses {
    'enrolled',
    'studying',
    'graduated',
    'expelled'
}

interface Ilecturer {
    name: string
    surname: string
    position: string
    company: string
    experience: number
    courses: []
    contacts: []
}

class School {
    // implement 'add area', 'remove area', 'add lecturer', and 'remove lecturer' methods

    _areas: {}[] = [];
    _lecturers: Ilecturer[] = []; // Name, surname, position, company, experience, courses, contacts

    get areas(): {}[] {
        return this._areas;
    }

    get lecturers(): {}[] {
        return this._lecturers;
    }

    addArea (field: {}): void {
        const areaExistence: boolean = Boolean(
            this._areas.filter((area: {}) => area.areaName === field.areaName)
        )

        !areaExistence ? this._areas.push(field) : null
    }

    removeArea (field: {}): void {
        this._areas.filter((area: {}) => area.areaName != field.areaName)
    }

    addLecturer (master: Ilecturer): void {
        const lecturerExistence: boolean = Boolean(
            this._lecturers.filter(
                (lecturer: Ilecturer) =>
                    lecturer.name && lecturer.surname === master.name && master.surname)
        )

        !lecturerExistence ? this._lecturers.push(master) : null
    }

    removeLecturer (master: Ilecturer): void {
        this._lecturers.filter((lecturer: Ilecturer) =>
            lecturer.name && lecturer.surname != master.name && master.surname)
    }
}

class Area {
    // implement getters for fields and 'add/remove level' methods
    _levels: {}[] = [];
    _name: string;

    constructor(name: string) {
        this._name = name;
    }

    get name (): string {
        return this._name
    }

    get levels (): {}[] {
        return this._levels
    }

    addLevel (rate: {}): void {
        const levelExistence: {}[] = this._levels.filter((level: {}) => level.levelName === rate.levelName)

        !levelExistence ? this._levels.push(rate) : null
    }

    removeLevel (rate: {}): void {
        this._levels.filter((level: {}) => level.levelName != rate.levelName)
    }
}

class Level {
    // implement getters for fields and 'add/remove group' methods

    _groups: {}[] = [];
    _name: string;
    _description: string

    constructor(name: string, description: string) {
        this._name = name;
        this._description = description;
    }

    get groups (): {}[] {
        return this._groups
    }

    get name (): string {
        return this._name
    }

    get description (): string {
        return this._description
    }

    addGroup (group: {}): void {
        const groupExistence: boolean = Boolean(
            this._groups.filter((team: {}) => team.name === group.name)
        )

        !groupExistence ? this._groups.push(group) : null
    }

    removeGroup (group: {}): void {
        this._groups.filter((team: {}) => team.name != group.name)
    }
}

class Group {
    // implement getters for fields and 'add/remove student' and 'set status' methods

    _area: string;
    _status: studyingStatuses;
    directionName: string
    levelName: string
    _students: {}[] = []; // Modify the array so that it has a valid toSorted method*

    constructor(directionName: string, levelName: string) {
        this.directionName = directionName;
        this.levelName = levelName;
    }

    get status (): studyingStatuses {
        return this._status
    }

    set status (state: studyingStatuses) {
        this._status = state
    }

    get area (): string {
        return this._area
    }

    addStudent (student: {}): void {
        const studentExistence: boolean = Boolean(
            this._students.filter((applicant: {}): boolean => applicant.fullName === student.fullName)
        )
        !studentExistence ? this._students.push(student) : null
    }

    removeStudent (student: {}): void {
        this._students.filter((applicant: {}) => applicant.fullName !== student.fullName)
    }

    showPerformance(): [] {
        const sortedStudents: [] = this._students
            .toSorted((a: {}, b: {}) => b.getPerformanceRating() - a.getPerformanceRating());

        return sortedStudents;
    }
}

class Student {
    // implement 'set grade' and 'set visit' methods

    _firstName: string;
    _lastName: string;
    _birthYear: number;
    // _grades: [string, number][] = []; // workName: mark
    _grades: {[computedProperty: string]: number} = {}
    // _visits: [string, boolean][] = []; // lesson: present
    _visits: {[computedProperty: string]: boolean} = {}

    constructor(firstName: string, lastName: string, birthYear: number) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._birthYear = birthYear;
    }

    get fullName(): string {
        return `${this._lastName} ${this._firstName}`;
    }

    set fullName(value: string) {
        [this._lastName, this._firstName] = value.split(' ');
    }

    get age(): number {
        return new Date().getFullYear() - this._birthYear;
    }

    set grade(discipline: [string, number]) {
        // this._grades.push(discipline)
        this._grades[`${discipline[0]}`] = discipline[1]
    }

    set visit(presence: [string, boolean]) {
        // this._visits.push(presence)
        this._visits[`${presence[0]}`] = presence[1]
    }

    getPerformanceRating(): number {
        const gradeValues = Object.values(this._grades);
        const presenceValues = Object.values(this._visits)

        if (!gradeValues.length) return 0;

        const averageGrade: number = gradeValues
            .reduce((sum: number, grade: number) => sum + grade, 0) / gradeValues.length;

        const attendancePercentage: number = presenceValues
            .reduce((acc: number, presence: number) => acc + presence, 0) / presenceValues.length * 100
            // (this._visits.filter(present => present[1]).length / this._visits.length) * 100;

        return (averageGrade + attendancePercentage) / 2;
    }
}