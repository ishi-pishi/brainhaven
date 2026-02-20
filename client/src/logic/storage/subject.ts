
import { mySubjects, createSubject, deleteSubject} from "@dataconnect/generated";




// Saves a subject to the database
export async function saveSubject(name: string) {
    if (await subjectNameAlreadyExists(name)) {
        throw new Error("Subject name already exists");
    }

    const res = await createSubject({ name });
    return res;
}

// Returns all subjects in a user's database
export async function getSubjects() {
    const res = await mySubjects();
    return res.data.subjects;
}

// Returns all subject names in a user's database
export async function getSubjectNames() {
    const subjects = await getSubjects();
    return subjects.map(subject => subject.name); // not the problem - get subjects is returning nothing.
}

// Checks if a subject name already exists in the database
// Returns true if it does, false if it doesn't
export async function subjectNameAlreadyExists(name: string) {
    const existingSubjs = await getSubjectNames();
    return existingSubjs.some(subject => subject.toLowerCase() === name.toLowerCase());
}

// Deletes a subject from the database with given name.
// Assumes the object of the name exists.
export async function deleteSubjectByName(name: string) {
    const subjects = await getSubjects();

    const subject = subjects.find(subject => subject.name === name);
    const id = subject?.id;
    console.log("Deleting subject" + subject?.name);

    if (id == null) {
        throw new Error("Subject not found");
    }

    await deleteSubject({
        key: { id: id }
    });
}