import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateStudySessionData {
  studySession_insert: StudySession_Key;
}

export interface CreateStudySessionVariables {
  subjectId: UUIDString;
  durationMs: number;
  endTime: TimestampString;
  productivityRating: number;
  startTime: TimestampString;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface ListSubjectsData {
  subjects: ({
    id: UUIDString;
    name: string;
    description?: string | null;
  } & Subject_Key)[];
}

export interface StudySession_Key {
  id: UUIDString;
  __typename?: 'StudySession_Key';
}

export interface Subject_Key {
  id: UUIDString;
  __typename?: 'Subject_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateUserData, undefined>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(): MutationPromise<CreateUserData, undefined>;
export function createUser(dc: DataConnect): MutationPromise<CreateUserData, undefined>;

interface ListSubjectsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListSubjectsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListSubjectsData, undefined>;
  operationName: string;
}
export const listSubjectsRef: ListSubjectsRef;

export function listSubjects(): QueryPromise<ListSubjectsData, undefined>;
export function listSubjects(dc: DataConnect): QueryPromise<ListSubjectsData, undefined>;

interface CreateStudySessionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateStudySessionVariables): MutationRef<CreateStudySessionData, CreateStudySessionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateStudySessionVariables): MutationRef<CreateStudySessionData, CreateStudySessionVariables>;
  operationName: string;
}
export const createStudySessionRef: CreateStudySessionRef;

export function createStudySession(vars: CreateStudySessionVariables): MutationPromise<CreateStudySessionData, CreateStudySessionVariables>;
export function createStudySession(dc: DataConnect, vars: CreateStudySessionVariables): MutationPromise<CreateStudySessionData, CreateStudySessionVariables>;

