# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListSubjects*](#listsubjects)
  - [*GetStudyGoalsForUser*](#getstudygoalsforuser)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*CreateStudySession*](#createstudysession)

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

## ListSubjects
You can execute the `ListSubjects` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listSubjects(): QueryPromise<ListSubjectsData, undefined>;

interface ListSubjectsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListSubjectsData, undefined>;
}
export const listSubjectsRef: ListSubjectsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listSubjects(dc: DataConnect): QueryPromise<ListSubjectsData, undefined>;

interface ListSubjectsRef {
  ...
  (dc: DataConnect): QueryRef<ListSubjectsData, undefined>;
}
export const listSubjectsRef: ListSubjectsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listSubjectsRef:
```typescript
const name = listSubjectsRef.operationName;
console.log(name);
```

### Variables
The `ListSubjects` query has no variables.
### Return Type
Recall that executing the `ListSubjects` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListSubjectsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListSubjectsData {
  subjects: ({
    id: UUIDString;
    name: string;
    description?: string | null;
  } & Subject_Key)[];
}
```
### Using `ListSubjects`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listSubjects } from '@dataconnect/generated';


// Call the `listSubjects()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listSubjects();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listSubjects(dataConnect);

console.log(data.subjects);

// Or, you can use the `Promise` API.
listSubjects().then((response) => {
  const data = response.data;
  console.log(data.subjects);
});
```

### Using `ListSubjects`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listSubjectsRef } from '@dataconnect/generated';


// Call the `listSubjectsRef()` function to get a reference to the query.
const ref = listSubjectsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listSubjectsRef(dataConnect);

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

## GetStudyGoalsForUser
You can execute the `GetStudyGoalsForUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getStudyGoalsForUser(): QueryPromise<GetStudyGoalsForUserData, undefined>;

interface GetStudyGoalsForUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetStudyGoalsForUserData, undefined>;
}
export const getStudyGoalsForUserRef: GetStudyGoalsForUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getStudyGoalsForUser(dc: DataConnect): QueryPromise<GetStudyGoalsForUserData, undefined>;

interface GetStudyGoalsForUserRef {
  ...
  (dc: DataConnect): QueryRef<GetStudyGoalsForUserData, undefined>;
}
export const getStudyGoalsForUserRef: GetStudyGoalsForUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getStudyGoalsForUserRef:
```typescript
const name = getStudyGoalsForUserRef.operationName;
console.log(name);
```

### Variables
The `GetStudyGoalsForUser` query has no variables.
### Return Type
Recall that executing the `GetStudyGoalsForUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetStudyGoalsForUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetStudyGoalsForUserData {
  studyGoals: ({
    id: UUIDString;
    description: string;
    targetValue: number;
    currentValue: number;
    unit: string;
    dueDate?: DateString | null;
    status: string;
  } & StudyGoal_Key)[];
}
```
### Using `GetStudyGoalsForUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getStudyGoalsForUser } from '@dataconnect/generated';


// Call the `getStudyGoalsForUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getStudyGoalsForUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getStudyGoalsForUser(dataConnect);

console.log(data.studyGoals);

// Or, you can use the `Promise` API.
getStudyGoalsForUser().then((response) => {
  const data = response.data;
  console.log(data.studyGoals);
});
```

### Using `GetStudyGoalsForUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getStudyGoalsForUserRef } from '@dataconnect/generated';


// Call the `getStudyGoalsForUserRef()` function to get a reference to the query.
const ref = getStudyGoalsForUserRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getStudyGoalsForUserRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.studyGoals);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.studyGoals);
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

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUser(): MutationPromise<CreateUserData, undefined>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateUserData, undefined>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect): MutationPromise<CreateUserData, undefined>;

interface CreateUserRef {
  ...
  (dc: DataConnect): MutationRef<CreateUserData, undefined>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation has no variables.
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser } from '@dataconnect/generated';


// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser().then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef } from '@dataconnect/generated';


// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
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
  durationMinutes: number;
  endTime: TimestampString;
  productivityRating: number;
  startTime: TimestampString;
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
  durationMinutes: ..., 
  endTime: ..., 
  productivityRating: ..., 
  startTime: ..., 
};

// Call the `createStudySession()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createStudySession(createStudySessionVars);
// Variables can be defined inline as well.
const { data } = await createStudySession({ subjectId: ..., durationMinutes: ..., endTime: ..., productivityRating: ..., startTime: ..., });

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
  durationMinutes: ..., 
  endTime: ..., 
  productivityRating: ..., 
  startTime: ..., 
};

// Call the `createStudySessionRef()` function to get a reference to the mutation.
const ref = createStudySessionRef(createStudySessionVars);
// Variables can be defined inline as well.
const ref = createStudySessionRef({ subjectId: ..., durationMinutes: ..., endTime: ..., productivityRating: ..., startTime: ..., });

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

