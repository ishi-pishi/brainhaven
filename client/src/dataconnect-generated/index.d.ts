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
  startTime: TimestampString;
  endTime?: TimestampString | null;
  workBlockMs: number;
  breakBlockMs: number;
  productivityRating?: number | null;
  reflections?: string | null;
  earnedCurrency: number;
}

export interface CreateSubjectData {
  subject_insert: Subject_Key;
}

export interface CreateSubjectVariables {
  name: string;
}

export interface DeleteStudySessionData {
  studySession_delete?: StudySession_Key | null;
}

export interface DeleteStudySessionVariables {
  key: StudySession_Key;
}

export interface MeData {
  user?: {
    id: string;
    displayName: string;
    currencyBalance: number;
    createdAt: TimestampString;
  } & User_Key;
}

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

export interface MyStudySessionsVariables {
  subjectId?: UUIDString | null;
  startAfter?: TimestampString | null;
  startBefore?: TimestampString | null;
  limit?: number | null;
}

export interface MySubjectsData {
  subjects: ({
    id: UUIDString;
    name: string;
    createdAt: TimestampString;
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

export interface UpdateSubjectData {
  subject_update?: Subject_Key | null;
}

export interface UpdateSubjectVariables {
  key: Subject_Key;
  name?: string | null;
}

export interface User_Key {
  id: string;
  __typename?: 'User_Key';
}

interface MeRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<MeData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<MeData, undefined>;
  operationName: string;
}
export const meRef: MeRef;

export function me(): QueryPromise<MeData, undefined>;
export function me(dc: DataConnect): QueryPromise<MeData, undefined>;

interface MySubjectsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<MySubjectsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<MySubjectsData, undefined>;
  operationName: string;
}
export const mySubjectsRef: MySubjectsRef;

export function mySubjects(): QueryPromise<MySubjectsData, undefined>;
export function mySubjects(dc: DataConnect): QueryPromise<MySubjectsData, undefined>;

interface MyStudySessionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: MyStudySessionsVariables): QueryRef<MyStudySessionsData, MyStudySessionsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: MyStudySessionsVariables): QueryRef<MyStudySessionsData, MyStudySessionsVariables>;
  operationName: string;
}
export const myStudySessionsRef: MyStudySessionsRef;

export function myStudySessions(vars?: MyStudySessionsVariables): QueryPromise<MyStudySessionsData, MyStudySessionsVariables>;
export function myStudySessions(dc: DataConnect, vars?: MyStudySessionsVariables): QueryPromise<MyStudySessionsData, MyStudySessionsVariables>;

interface CreateSubjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateSubjectVariables): MutationRef<CreateSubjectData, CreateSubjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateSubjectVariables): MutationRef<CreateSubjectData, CreateSubjectVariables>;
  operationName: string;
}
export const createSubjectRef: CreateSubjectRef;

export function createSubject(vars: CreateSubjectVariables): MutationPromise<CreateSubjectData, CreateSubjectVariables>;
export function createSubject(dc: DataConnect, vars: CreateSubjectVariables): MutationPromise<CreateSubjectData, CreateSubjectVariables>;

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

interface DeleteStudySessionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteStudySessionVariables): MutationRef<DeleteStudySessionData, DeleteStudySessionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteStudySessionVariables): MutationRef<DeleteStudySessionData, DeleteStudySessionVariables>;
  operationName: string;
}
export const deleteStudySessionRef: DeleteStudySessionRef;

export function deleteStudySession(vars: DeleteStudySessionVariables): MutationPromise<DeleteStudySessionData, DeleteStudySessionVariables>;
export function deleteStudySession(dc: DataConnect, vars: DeleteStudySessionVariables): MutationPromise<DeleteStudySessionData, DeleteStudySessionVariables>;

interface UpdateSubjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateSubjectVariables): MutationRef<UpdateSubjectData, UpdateSubjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateSubjectVariables): MutationRef<UpdateSubjectData, UpdateSubjectVariables>;
  operationName: string;
}
export const updateSubjectRef: UpdateSubjectRef;

export function updateSubject(vars: UpdateSubjectVariables): MutationPromise<UpdateSubjectData, UpdateSubjectVariables>;
export function updateSubject(dc: DataConnect, vars: UpdateSubjectVariables): MutationPromise<UpdateSubjectData, UpdateSubjectVariables>;

