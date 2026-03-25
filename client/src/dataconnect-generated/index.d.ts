import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateRewardData {
  reward_insert: Reward_Key;
}

export interface CreateRewardVariables {
  name: string;
  cost: number;
  isOneTime: boolean;
}

export interface CreateStudySessionData {
  studySession_insert: StudySession_Key;
}

export interface CreateStudySessionVariables {
  subjectId: UUIDString;
  startTime: TimestampString;
  endTime: TimestampString;
  workBlockMs: number;
  breakBlockMs: number;
  intendedCycles?: number | null;
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

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  displayName: string;
}

export interface DeleteRewardData {
  reward_delete?: Reward_Key | null;
}

export interface DeleteRewardVariables {
  id: UUIDString;
}

export interface DeleteStudySessionData {
  studySession_delete?: StudySession_Key | null;
}

export interface DeleteStudySessionVariables {
  key: StudySession_Key;
}

export interface DeleteSubjectData {
  studySession_deleteMany: number;
  subject_delete?: Subject_Key | null;
}

export interface DeleteSubjectVariables {
  id: UUIDString;
}

export interface ListRewardsData {
  rewards: ({
    id: UUIDString;
    name: string;
    cost: number;
    isOneTime: boolean;
  } & Reward_Key)[];
}

export interface MeData {
  user?: {
    id: string;
    displayName: string;
    currencyBalance: number;
    dailyGoalMinutes: number;
    currentStreak: number;
    lastGoalMetDate?: TimestampString | null;
    createdAt: TimestampString;
  } & User_Key;
}

export interface MyStudySessionsData {
  studySessions: ({
    id: UUIDString;
    startTime: TimestampString;
    endTime: TimestampString;
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

export interface Reward_Key {
  id: UUIDString;
  __typename?: 'Reward_Key';
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

export interface UpdateUserProgressData {
  user_update?: User_Key | null;
}

export interface UpdateUserProgressVariables {
  currencyBalance?: number | null;
  currentStreak?: number | null;
  lastGoalMetDate?: TimestampString | null;
  dailyGoalMinutes?: number | null;
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

interface UpdateUserProgressRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: UpdateUserProgressVariables): MutationRef<UpdateUserProgressData, UpdateUserProgressVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: UpdateUserProgressVariables): MutationRef<UpdateUserProgressData, UpdateUserProgressVariables>;
  operationName: string;
}
export const updateUserProgressRef: UpdateUserProgressRef;

export function updateUserProgress(vars?: UpdateUserProgressVariables): MutationPromise<UpdateUserProgressData, UpdateUserProgressVariables>;
export function updateUserProgress(dc: DataConnect, vars?: UpdateUserProgressVariables): MutationPromise<UpdateUserProgressData, UpdateUserProgressVariables>;

interface ListRewardsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListRewardsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListRewardsData, undefined>;
  operationName: string;
}
export const listRewardsRef: ListRewardsRef;

export function listRewards(): QueryPromise<ListRewardsData, undefined>;
export function listRewards(dc: DataConnect): QueryPromise<ListRewardsData, undefined>;

interface CreateRewardRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateRewardVariables): MutationRef<CreateRewardData, CreateRewardVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateRewardVariables): MutationRef<CreateRewardData, CreateRewardVariables>;
  operationName: string;
}
export const createRewardRef: CreateRewardRef;

export function createReward(vars: CreateRewardVariables): MutationPromise<CreateRewardData, CreateRewardVariables>;
export function createReward(dc: DataConnect, vars: CreateRewardVariables): MutationPromise<CreateRewardData, CreateRewardVariables>;

interface DeleteRewardRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteRewardVariables): MutationRef<DeleteRewardData, DeleteRewardVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteRewardVariables): MutationRef<DeleteRewardData, DeleteRewardVariables>;
  operationName: string;
}
export const deleteRewardRef: DeleteRewardRef;

export function deleteReward(vars: DeleteRewardVariables): MutationPromise<DeleteRewardData, DeleteRewardVariables>;
export function deleteReward(dc: DataConnect, vars: DeleteRewardVariables): MutationPromise<DeleteRewardData, DeleteRewardVariables>;

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

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

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

interface DeleteSubjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteSubjectVariables): MutationRef<DeleteSubjectData, DeleteSubjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteSubjectVariables): MutationRef<DeleteSubjectData, DeleteSubjectVariables>;
  operationName: string;
}
export const deleteSubjectRef: DeleteSubjectRef;

export function deleteSubject(vars: DeleteSubjectVariables): MutationPromise<DeleteSubjectData, DeleteSubjectVariables>;
export function deleteSubject(dc: DataConnect, vars: DeleteSubjectVariables): MutationPromise<DeleteSubjectData, DeleteSubjectVariables>;

