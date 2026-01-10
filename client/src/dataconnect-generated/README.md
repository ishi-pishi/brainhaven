# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*Me*](#me)
  - [*MySubjects*](#mysubjects)
  - [*MyStudySessions*](#mystudysessions)
- [**Mutations**](#mutations)
  - [*CreateSubject*](#createsubject)
  - [*CreateStudySession*](#createstudysession)
  - [*DeleteStudySession*](#deletestudysession)
  - [*UpdateSubject*](#updatesubject)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## Me
You can execute the `Me` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
me(): QueryPromise<MeData, undefined>;

interface MeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<MeData, undefined>;
}
export const meRef: MeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
me(dc: DataConnect): QueryPromise<MeData, undefined>;

interface MeRef {
  ...
  (dc: DataConnect): QueryRef<MeData, undefined>;
}
export const meRef: MeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the meRef:
```typescript
const name = meRef.operationName;
console.log(name);
```

### Variables
The `Me` query has no variables.
### Return Type
Recall that executing the `Me` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `MeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface MeData {
  user?: {
    id: string;
    displayName: string;
    currencyBalance: number;
    createdAt: TimestampString;
  } & User_Key;
}
```
### Using `Me`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, me } from '@dataconnect/generated';


// Call the `me()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await me();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await me(dataConnect);

console.log(data.user);

// Or, you can use the `Promise` API.
me().then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `Me`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, meRef } from '@dataconnect/generated';


// Call the `meRef()` function to get a reference to the query.
const ref = meRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = meRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## MySubjects
You can execute the `MySubjects` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
mySubjects(): QueryPromise<MySubjectsData, undefined>;

interface MySubjectsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<MySubjectsData, undefined>;
}
export const mySubjectsRef: MySubjectsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
mySubjects(dc: DataConnect): QueryPromise<MySubjectsData, undefined>;

interface MySubjectsRef {
  ...
  (dc: DataConnect): QueryRef<MySubjectsData, undefined>;
}
export const mySubjectsRef: MySubjectsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the mySubjectsRef:
```typescript
const name = mySubjectsRef.operationName;
console.log(name);
```

### Variables
The `MySubjects` query has no variables.
### Return Type
Recall that executing the `MySubjects` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `MySubjectsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface MySubjectsData {
  subjects: ({
    id: UUIDString;
    name: string;
    createdAt: TimestampString;
  } & Subject_Key)[];
}
```
### Using `MySubjects`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, mySubjects } from '@dataconnect/generated';


// Call the `mySubjects()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await mySubjects();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await mySubjects(dataConnect);

console.log(data.subjects);

// Or, you can use the `Promise` API.
mySubjects().then((response) => {
  const data = response.data;
  console.log(data.subjects);
});
```

### Using `MySubjects`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, mySubjectsRef } from '@dataconnect/generated';


// Call the `mySubjectsRef()` function to get a reference to the query.
const ref = mySubjectsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = mySubjectsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.subjects);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.subjects);
});
```

## MyStudySessions
You can execute the `MyStudySessions` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
myStudySessions(vars?: MyStudySessionsVariables): QueryPromise<MyStudySessionsData, MyStudySessionsVariables>;

interface MyStudySessionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: MyStudySessionsVariables): QueryRef<MyStudySessionsData, MyStudySessionsVariables>;
}
export const myStudySessionsRef: MyStudySessionsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
myStudySessions(dc: DataConnect, vars?: MyStudySessionsVariables): QueryPromise<MyStudySessionsData, MyStudySessionsVariables>;

interface MyStudySessionsRef {
  ...
  (dc: DataConnect, vars?: MyStudySessionsVariables): QueryRef<MyStudySessionsData, MyStudySessionsVariables>;
}
export const myStudySessionsRef: MyStudySessionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the myStudySessionsRef:
```typescript
const name = myStudySessionsRef.operationName;
console.log(name);
```

### Variables
The `MyStudySessions` query has an optional argument of type `MyStudySessionsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface MyStudySessionsVariables {
  subjectId?: UUIDString | null;
  startAfter?: TimestampString | null;
  startBefore?: TimestampString | null;
  limit?: number | null;
}
```
### Return Type
Recall that executing the `MyStudySessions` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `MyStudySessionsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface MyStudySessionsData {
  studySessions: ({
    id: UUIDString;
    startTime: TimestampString;
    endTime?: TimestampString | null;
    workBlockMs: number;
    breakBlockMs: number;
    intendedCycles?: number | null;
    productivityRating?: number | null;
    reflections?: string | null;
    earnedCurrency: number;
    subject?: {
      id: UUIDString;
      name: string;
    } & Subject_Key;
  } & StudySession_Key)[];
}
```
### Using `MyStudySessions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, myStudySessions, MyStudySessionsVariables } from '@dataconnect/generated';

// The `MyStudySessions` query has an optional argument of type `MyStudySessionsVariables`:
const myStudySessionsVars: MyStudySessionsVariables = {
  subjectId: ..., // optional
  startAfter: ..., // optional
  startBefore: ..., // optional
  limit: ..., // optional
};

// Call the `myStudySessions()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await myStudySessions(myStudySessionsVars);
// Variables can be defined inline as well.
const { data } = await myStudySessions({ subjectId: ..., startAfter: ..., startBefore: ..., limit: ..., });
// Since all variables are optional for this query, you can omit the `MyStudySessionsVariables` argument.
const { data } = await myStudySessions();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await myStudySessions(dataConnect, myStudySessionsVars);

console.log(data.studySessions);

// Or, you can use the `Promise` API.
myStudySessions(myStudySessionsVars).then((response) => {
  const data = response.data;
  console.log(data.studySessions);
});
```

### Using `MyStudySessions`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, myStudySessionsRef, MyStudySessionsVariables } from '@dataconnect/generated';

// The `MyStudySessions` query has an optional argument of type `MyStudySessionsVariables`:
const myStudySessionsVars: MyStudySessionsVariables = {
  subjectId: ..., // optional
  startAfter: ..., // optional
  startBefore: ..., // optional
  limit: ..., // optional
};

// Call the `myStudySessionsRef()` function to get a reference to the query.
const ref = myStudySessionsRef(myStudySessionsVars);
// Variables can be defined inline as well.
const ref = myStudySessionsRef({ subjectId: ..., startAfter: ..., startBefore: ..., limit: ..., });
// Since all variables are optional for this query, you can omit the `MyStudySessionsVariables` argument.
const ref = myStudySessionsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = myStudySessionsRef(dataConnect, myStudySessionsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.studySessions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.studySessions);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateSubject
You can execute the `CreateSubject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createSubject(vars: CreateSubjectVariables): MutationPromise<CreateSubjectData, CreateSubjectVariables>;

interface CreateSubjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateSubjectVariables): MutationRef<CreateSubjectData, CreateSubjectVariables>;
}
export const createSubjectRef: CreateSubjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createSubject(dc: DataConnect, vars: CreateSubjectVariables): MutationPromise<CreateSubjectData, CreateSubjectVariables>;

interface CreateSubjectRef {
  ...
  (dc: DataConnect, vars: CreateSubjectVariables): MutationRef<CreateSubjectData, CreateSubjectVariables>;
}
export const createSubjectRef: CreateSubjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createSubjectRef:
```typescript
const name = createSubjectRef.operationName;
console.log(name);
```

### Variables
The `CreateSubject` mutation requires an argument of type `CreateSubjectVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateSubjectVariables {
  name: string;
}
```
### Return Type
Recall that executing the `CreateSubject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateSubjectData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateSubjectData {
  subject_insert: Subject_Key;
}
```
### Using `CreateSubject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createSubject, CreateSubjectVariables } from '@dataconnect/generated';

// The `CreateSubject` mutation requires an argument of type `CreateSubjectVariables`:
const createSubjectVars: CreateSubjectVariables = {
  name: ..., 
};

// Call the `createSubject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createSubject(createSubjectVars);
// Variables can be defined inline as well.
const { data } = await createSubject({ name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createSubject(dataConnect, createSubjectVars);

console.log(data.subject_insert);

// Or, you can use the `Promise` API.
createSubject(createSubjectVars).then((response) => {
  const data = response.data;
  console.log(data.subject_insert);
});
```

### Using `CreateSubject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createSubjectRef, CreateSubjectVariables } from '@dataconnect/generated';

// The `CreateSubject` mutation requires an argument of type `CreateSubjectVariables`:
const createSubjectVars: CreateSubjectVariables = {
  name: ..., 
};

// Call the `createSubjectRef()` function to get a reference to the mutation.
const ref = createSubjectRef(createSubjectVars);
// Variables can be defined inline as well.
const ref = createSubjectRef({ name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createSubjectRef(dataConnect, createSubjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.subject_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.subject_insert);
});
```

## CreateStudySession
You can execute the `CreateStudySession` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createStudySession(vars: CreateStudySessionVariables): MutationPromise<CreateStudySessionData, CreateStudySessionVariables>;

interface CreateStudySessionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateStudySessionVariables): MutationRef<CreateStudySessionData, CreateStudySessionVariables>;
}
export const createStudySessionRef: CreateStudySessionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createStudySession(dc: DataConnect, vars: CreateStudySessionVariables): MutationPromise<CreateStudySessionData, CreateStudySessionVariables>;

interface CreateStudySessionRef {
  ...
  (dc: DataConnect, vars: CreateStudySessionVariables): MutationRef<CreateStudySessionData, CreateStudySessionVariables>;
}
export const createStudySessionRef: CreateStudySessionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createStudySessionRef:
```typescript
const name = createStudySessionRef.operationName;
console.log(name);
```

### Variables
The `CreateStudySession` mutation requires an argument of type `CreateStudySessionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateStudySessionVariables {
  subjectId: UUIDString;
  startTime: TimestampString;
  endTime?: TimestampString | null;
  workBlockMs: number;
  breakBlockMs: number;
  productivityRating?: number | null;
  reflections?: string | null;
  earnedCurrency: number;
}
```
### Return Type
Recall that executing the `CreateStudySession` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateStudySessionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateStudySessionData {
  studySession_insert: StudySession_Key;
}
```
### Using `CreateStudySession`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createStudySession, CreateStudySessionVariables } from '@dataconnect/generated';

// The `CreateStudySession` mutation requires an argument of type `CreateStudySessionVariables`:
const createStudySessionVars: CreateStudySessionVariables = {
  subjectId: ..., 
  startTime: ..., 
  endTime: ..., // optional
  workBlockMs: ..., 
  breakBlockMs: ..., 
  productivityRating: ..., // optional
  reflections: ..., // optional
  earnedCurrency: ..., 
};

// Call the `createStudySession()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createStudySession(createStudySessionVars);
// Variables can be defined inline as well.
const { data } = await createStudySession({ subjectId: ..., startTime: ..., endTime: ..., workBlockMs: ..., breakBlockMs: ..., productivityRating: ..., reflections: ..., earnedCurrency: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createStudySession(dataConnect, createStudySessionVars);

console.log(data.studySession_insert);

// Or, you can use the `Promise` API.
createStudySession(createStudySessionVars).then((response) => {
  const data = response.data;
  console.log(data.studySession_insert);
});
```

### Using `CreateStudySession`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createStudySessionRef, CreateStudySessionVariables } from '@dataconnect/generated';

// The `CreateStudySession` mutation requires an argument of type `CreateStudySessionVariables`:
const createStudySessionVars: CreateStudySessionVariables = {
  subjectId: ..., 
  startTime: ..., 
  endTime: ..., // optional
  workBlockMs: ..., 
  breakBlockMs: ..., 
  productivityRating: ..., // optional
  reflections: ..., // optional
  earnedCurrency: ..., 
};

// Call the `createStudySessionRef()` function to get a reference to the mutation.
const ref = createStudySessionRef(createStudySessionVars);
// Variables can be defined inline as well.
const ref = createStudySessionRef({ subjectId: ..., startTime: ..., endTime: ..., workBlockMs: ..., breakBlockMs: ..., productivityRating: ..., reflections: ..., earnedCurrency: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createStudySessionRef(dataConnect, createStudySessionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.studySession_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.studySession_insert);
});
```

## DeleteStudySession
You can execute the `DeleteStudySession` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteStudySession(vars: DeleteStudySessionVariables): MutationPromise<DeleteStudySessionData, DeleteStudySessionVariables>;

interface DeleteStudySessionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteStudySessionVariables): MutationRef<DeleteStudySessionData, DeleteStudySessionVariables>;
}
export const deleteStudySessionRef: DeleteStudySessionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteStudySession(dc: DataConnect, vars: DeleteStudySessionVariables): MutationPromise<DeleteStudySessionData, DeleteStudySessionVariables>;

interface DeleteStudySessionRef {
  ...
  (dc: DataConnect, vars: DeleteStudySessionVariables): MutationRef<DeleteStudySessionData, DeleteStudySessionVariables>;
}
export const deleteStudySessionRef: DeleteStudySessionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteStudySessionRef:
```typescript
const name = deleteStudySessionRef.operationName;
console.log(name);
```

### Variables
The `DeleteStudySession` mutation requires an argument of type `DeleteStudySessionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteStudySessionVariables {
  key: StudySession_Key;
}
```
### Return Type
Recall that executing the `DeleteStudySession` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteStudySessionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteStudySessionData {
  studySession_delete?: StudySession_Key | null;
}
```
### Using `DeleteStudySession`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteStudySession, DeleteStudySessionVariables } from '@dataconnect/generated';

// The `DeleteStudySession` mutation requires an argument of type `DeleteStudySessionVariables`:
const deleteStudySessionVars: DeleteStudySessionVariables = {
  key: ..., 
};

// Call the `deleteStudySession()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteStudySession(deleteStudySessionVars);
// Variables can be defined inline as well.
const { data } = await deleteStudySession({ key: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteStudySession(dataConnect, deleteStudySessionVars);

console.log(data.studySession_delete);

// Or, you can use the `Promise` API.
deleteStudySession(deleteStudySessionVars).then((response) => {
  const data = response.data;
  console.log(data.studySession_delete);
});
```

### Using `DeleteStudySession`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteStudySessionRef, DeleteStudySessionVariables } from '@dataconnect/generated';

// The `DeleteStudySession` mutation requires an argument of type `DeleteStudySessionVariables`:
const deleteStudySessionVars: DeleteStudySessionVariables = {
  key: ..., 
};

// Call the `deleteStudySessionRef()` function to get a reference to the mutation.
const ref = deleteStudySessionRef(deleteStudySessionVars);
// Variables can be defined inline as well.
const ref = deleteStudySessionRef({ key: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteStudySessionRef(dataConnect, deleteStudySessionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.studySession_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.studySession_delete);
});
```

## UpdateSubject
You can execute the `UpdateSubject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateSubject(vars: UpdateSubjectVariables): MutationPromise<UpdateSubjectData, UpdateSubjectVariables>;

interface UpdateSubjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateSubjectVariables): MutationRef<UpdateSubjectData, UpdateSubjectVariables>;
}
export const updateSubjectRef: UpdateSubjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateSubject(dc: DataConnect, vars: UpdateSubjectVariables): MutationPromise<UpdateSubjectData, UpdateSubjectVariables>;

interface UpdateSubjectRef {
  ...
  (dc: DataConnect, vars: UpdateSubjectVariables): MutationRef<UpdateSubjectData, UpdateSubjectVariables>;
}
export const updateSubjectRef: UpdateSubjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateSubjectRef:
```typescript
const name = updateSubjectRef.operationName;
console.log(name);
```

### Variables
The `UpdateSubject` mutation requires an argument of type `UpdateSubjectVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateSubjectVariables {
  key: Subject_Key;
  name?: string | null;
}
```
### Return Type
Recall that executing the `UpdateSubject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateSubjectData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateSubjectData {
  subject_update?: Subject_Key | null;
}
```
### Using `UpdateSubject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateSubject, UpdateSubjectVariables } from '@dataconnect/generated';

// The `UpdateSubject` mutation requires an argument of type `UpdateSubjectVariables`:
const updateSubjectVars: UpdateSubjectVariables = {
  key: ..., 
  name: ..., // optional
};

// Call the `updateSubject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateSubject(updateSubjectVars);
// Variables can be defined inline as well.
const { data } = await updateSubject({ key: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateSubject(dataConnect, updateSubjectVars);

console.log(data.subject_update);

// Or, you can use the `Promise` API.
updateSubject(updateSubjectVars).then((response) => {
  const data = response.data;
  console.log(data.subject_update);
});
```

### Using `UpdateSubject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateSubjectRef, UpdateSubjectVariables } from '@dataconnect/generated';

// The `UpdateSubject` mutation requires an argument of type `UpdateSubjectVariables`:
const updateSubjectVars: UpdateSubjectVariables = {
  key: ..., 
  name: ..., // optional
};

// Call the `updateSubjectRef()` function to get a reference to the mutation.
const ref = updateSubjectRef(updateSubjectVars);
// Variables can be defined inline as well.
const ref = updateSubjectRef({ key: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateSubjectRef(dataConnect, updateSubjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.subject_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.subject_update);
});
```

