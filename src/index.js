var studyingStatuses;
(function (studyingStatuses) {
    studyingStatuses[studyingStatuses["enrolled"] = 0] = "enrolled";
    studyingStatuses[studyingStatuses["studying"] = 1] = "studying";
    studyingStatuses[studyingStatuses["graduated"] = 2] = "graduated";
    studyingStatuses[studyingStatuses["expelled"] = 3] = "expelled";
})(studyingStatuses || (studyingStatuses = {}));
var School = /** @class */ (function () {
    function School() {
        // implement 'add area', 'remove area', 'add lecturer', and 'remove lecturer' methods
        this._areas = [];
        this._lecturers = []; // Name, surname, position, company, experience, courses, contacts
    }
    Object.defineProperty(School.prototype, "areas", {
        get: function () {
            return this._areas;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(School.prototype, "lecturers", {
        get: function () {
            return this._lecturers;
        },
        enumerable: false,
        configurable: true
    });
    School.prototype.addArea = function (field) {
        var areaExistence = Boolean(this._areas.filter(function (area) { return area.areaName === field.areaName; }));
        !areaExistence ? this._areas.push(field) : null;
    };
    School.prototype.removeArea = function (field) {
        this._areas.filter(function (area) { return area.areaName != field.areaName; });
    };
    School.prototype.addLecturer = function (master) {
        var lecturerExistence = Boolean(this._lecturers.filter(function (lecturer) {
            return lecturer.name && lecturer.surname === master.name && master.surname;
        }));
        !lecturerExistence ? this._lecturers.push(master) : null;
    };
    School.prototype.removeLecturer = function (master) {
        this._lecturers.filter(function (lecturer) {
            return lecturer.name && lecturer.surname != master.name && master.surname;
        });
    };
    return School;
}());
var Area = /** @class */ (function () {
    function Area(name) {
        // implement getters for fields and 'add/remove level' methods
        this._levels = [];
        this._name = name;
    }
    Object.defineProperty(Area.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Area.prototype, "levels", {
        get: function () {
            return this._levels;
        },
        enumerable: false,
        configurable: true
    });
    Area.prototype.addLevel = function (rate) {
        var levelExistence = this._levels.filter(function (level) { return level.levelName === rate.levelName; });
        !levelExistence ? this._levels.push(rate) : null;
    };
    Area.prototype.removeLevel = function (rate) {
        this._levels.filter(function (level) { return level.levelName != rate.levelName; });
    };
    return Area;
}());
var Level = /** @class */ (function () {
    function Level(name, description) {
        // implement getters for fields and 'add/remove group' methods
        this._groups = [];
        this._name = name;
        this._description = description;
    }
    Object.defineProperty(Level.prototype, "groups", {
        get: function () {
            return this._groups;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Level.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Level.prototype, "description", {
        get: function () {
            return this._description;
        },
        enumerable: false,
        configurable: true
    });
    Level.prototype.addGroup = function (group) {
        var groupExistence = Boolean(this._groups.filter(function (team) { return team.name === group.name; }));
        !groupExistence ? this._groups.push(group) : null;
    };
    Level.prototype.removeGroup = function (group) {
        this._groups.filter(function (team) { return team.name != group.name; });
    };
    return Level;
}());
var Group = /** @class */ (function () {
    function Group(directionName, levelName) {
        this._students = []; // Modify the array so that it has a valid toSorted method*
        this.directionName = directionName;
        this.levelName = levelName;
    }
    Object.defineProperty(Group.prototype, "status", {
        get: function () {
            return this._status;
        },
        set: function (state) {
            this._status = state;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "area", {
        get: function () {
            return this._area;
        },
        enumerable: false,
        configurable: true
    });
    Group.prototype.addStudent = function (student) {
        var studentExistence = Boolean(this._students.filter(function (applicant) { return applicant.fullName === student.fullName; }));
        !studentExistence ? this._students.push(student) : null;
    };
    Group.prototype.removeStudent = function (student) {
        this._students.filter(function (applicant) { return applicant.fullName !== student.fullName; });
    };
    Group.prototype.showPerformance = function () {
        var sortedStudents = this._students
            .toSorted(function (a, b) { return b.getPerformanceRating() - a.getPerformanceRating(); });
        return sortedStudents;
    };
    return Group;
}());
var Student = /** @class */ (function () {
    function Student(firstName, lastName, birthYear) {
        // _grades: [string, number][] = []; // workName: mark
        this._grades = {};
        // _visits: [string, boolean][] = []; // lesson: present
        this._visits = {};
        this._firstName = firstName;
        this._lastName = lastName;
        this._birthYear = birthYear;
    }
    Object.defineProperty(Student.prototype, "fullName", {
        get: function () {
            return "".concat(this._lastName, " ").concat(this._firstName);
        },
        set: function (value) {
            var _a;
            _a = value.split(' '), this._lastName = _a[0], this._firstName = _a[1];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Student.prototype, "age", {
        get: function () {
            return new Date().getFullYear() - this._birthYear;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Student.prototype, "grade", {
        set: function (discipline) {
            // this._grades.push(discipline)
            this._grades["".concat(discipline[0])] = discipline[1];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Student.prototype, "visit", {
        set: function (presence) {
            // this._visits.push(presence)
            this._visits["".concat(presence[0])] = presence[1];
        },
        enumerable: false,
        configurable: true
    });
    Student.prototype.getPerformanceRating = function () {
        var gradeValues = Object.values(this._grades);
        var presenceValues = Object.values(this._visits);
        if (!gradeValues.length)
            return 0;
        var averageGrade = gradeValues
            .reduce(function (sum, grade) { return sum + grade; }, 0) / gradeValues.length;
        var attendancePercentage = presenceValues
            .reduce(function (acc, presence) { return acc + presence; }, 0) / presenceValues.length * 100;
        // (this._visits.filter(present => present[1]).length / this._visits.length) * 100;
        return (averageGrade + attendancePercentage) / 2;
    };
    return Student;
}());
