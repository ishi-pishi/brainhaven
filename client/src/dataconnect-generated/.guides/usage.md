# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useMe, useMySubjects, useMyStudySessions, useCreateSubject, useCreateStudySession, useDeleteStudySession, useUpdateSubject } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useMe();

const { data, isPending, isSuccess, isError, error } = useMySubjects();

const { data, isPending, isSuccess, isError, error } = useMyStudySessions(myStudySessionsVars);

const { data, isPending, isSuccess, isError, error } = useCreateSubject(createSubjectVars);

const { data, isPending, isSuccess, isError, error } = useCreateStudySession(createStudySessionVars);

const { data, isPending, isSuccess, isError, error } = useDeleteStudySession(deleteStudySessionVars);

const { data, isPending, isSuccess, isError, error } = useUpdateSubject(updateSubjectVars);

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { me, mySubjects, myStudySessions, createSubject, createStudySession, deleteStudySession, updateSubject } from '@dataconnect/generated';


// Operation Me: 
const { data } = await Me(dataConnect);

// Operation MySubjects: 
const { data } = await MySubjects(dataConnect);

// Operation MyStudySessions:  For variables, look at type MyStudySessionsVars in ../index.d.ts
const { data } = await MyStudySessions(dataConnect, myStudySessionsVars);

// Operation CreateSubject:  For variables, look at type CreateSubjectVars in ../index.d.ts
const { data } = await CreateSubject(dataConnect, createSubjectVars);

// Operation CreateStudySession:  For variables, look at type CreateStudySessionVars in ../index.d.ts
const { data } = await CreateStudySession(dataConnect, createStudySessionVars);

// Operation DeleteStudySession:  For variables, look at type DeleteStudySessionVars in ../index.d.ts
const { data } = await DeleteStudySession(dataConnect, deleteStudySessionVars);

// Operation UpdateSubject:  For variables, look at type UpdateSubjectVars in ../index.d.ts
const { data } = await UpdateSubject(dataConnect, updateSubjectVars);


```