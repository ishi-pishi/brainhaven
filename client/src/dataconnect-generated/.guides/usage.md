# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useMe, useUpdateUserProgress, useListRewards, useCreateReward, useDeleteReward, useMySubjects, useMyStudySessions, useCreateUser, useCreateSubject, useCreateStudySession } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useMe();

const { data, isPending, isSuccess, isError, error } = useUpdateUserProgress(updateUserProgressVars);

const { data, isPending, isSuccess, isError, error } = useListRewards();

const { data, isPending, isSuccess, isError, error } = useCreateReward(createRewardVars);

const { data, isPending, isSuccess, isError, error } = useDeleteReward(deleteRewardVars);

const { data, isPending, isSuccess, isError, error } = useMySubjects();

const { data, isPending, isSuccess, isError, error } = useMyStudySessions(myStudySessionsVars);

const { data, isPending, isSuccess, isError, error } = useCreateUser(createUserVars);

const { data, isPending, isSuccess, isError, error } = useCreateSubject(createSubjectVars);

const { data, isPending, isSuccess, isError, error } = useCreateStudySession(createStudySessionVars);

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
import { me, updateUserProgress, listRewards, createReward, deleteReward, mySubjects, myStudySessions, createUser, createSubject, createStudySession } from '@dataconnect/generated';


// Operation Me: 
const { data } = await Me(dataConnect);

// Operation UpdateUserProgress:  For variables, look at type UpdateUserProgressVars in ../index.d.ts
const { data } = await UpdateUserProgress(dataConnect, updateUserProgressVars);

// Operation ListRewards: 
const { data } = await ListRewards(dataConnect);

// Operation CreateReward:  For variables, look at type CreateRewardVars in ../index.d.ts
const { data } = await CreateReward(dataConnect, createRewardVars);

// Operation DeleteReward:  For variables, look at type DeleteRewardVars in ../index.d.ts
const { data } = await DeleteReward(dataConnect, deleteRewardVars);

// Operation MySubjects: 
const { data } = await MySubjects(dataConnect);

// Operation MyStudySessions:  For variables, look at type MyStudySessionsVars in ../index.d.ts
const { data } = await MyStudySessions(dataConnect, myStudySessionsVars);

// Operation CreateUser:  For variables, look at type CreateUserVars in ../index.d.ts
const { data } = await CreateUser(dataConnect, createUserVars);

// Operation CreateSubject:  For variables, look at type CreateSubjectVars in ../index.d.ts
const { data } = await CreateSubject(dataConnect, createSubjectVars);

// Operation CreateStudySession:  For variables, look at type CreateStudySessionVars in ../index.d.ts
const { data } = await CreateStudySession(dataConnect, createStudySessionVars);


```