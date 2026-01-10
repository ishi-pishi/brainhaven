import { MeData, MySubjectsData, MyStudySessionsData, MyStudySessionsVariables, CreateSubjectData, CreateSubjectVariables, CreateStudySessionData, CreateStudySessionVariables, DeleteStudySessionData, DeleteStudySessionVariables, UpdateSubjectData, UpdateSubjectVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useMe(options?: useDataConnectQueryOptions<MeData>): UseDataConnectQueryResult<MeData, undefined>;
export function useMe(dc: DataConnect, options?: useDataConnectQueryOptions<MeData>): UseDataConnectQueryResult<MeData, undefined>;

export function useMySubjects(options?: useDataConnectQueryOptions<MySubjectsData>): UseDataConnectQueryResult<MySubjectsData, undefined>;
export function useMySubjects(dc: DataConnect, options?: useDataConnectQueryOptions<MySubjectsData>): UseDataConnectQueryResult<MySubjectsData, undefined>;

export function useMyStudySessions(vars?: MyStudySessionsVariables, options?: useDataConnectQueryOptions<MyStudySessionsData>): UseDataConnectQueryResult<MyStudySessionsData, MyStudySessionsVariables>;
export function useMyStudySessions(dc: DataConnect, vars?: MyStudySessionsVariables, options?: useDataConnectQueryOptions<MyStudySessionsData>): UseDataConnectQueryResult<MyStudySessionsData, MyStudySessionsVariables>;

export function useCreateSubject(options?: useDataConnectMutationOptions<CreateSubjectData, FirebaseError, CreateSubjectVariables>): UseDataConnectMutationResult<CreateSubjectData, CreateSubjectVariables>;
export function useCreateSubject(dc: DataConnect, options?: useDataConnectMutationOptions<CreateSubjectData, FirebaseError, CreateSubjectVariables>): UseDataConnectMutationResult<CreateSubjectData, CreateSubjectVariables>;

export function useCreateStudySession(options?: useDataConnectMutationOptions<CreateStudySessionData, FirebaseError, CreateStudySessionVariables>): UseDataConnectMutationResult<CreateStudySessionData, CreateStudySessionVariables>;
export function useCreateStudySession(dc: DataConnect, options?: useDataConnectMutationOptions<CreateStudySessionData, FirebaseError, CreateStudySessionVariables>): UseDataConnectMutationResult<CreateStudySessionData, CreateStudySessionVariables>;

export function useDeleteStudySession(options?: useDataConnectMutationOptions<DeleteStudySessionData, FirebaseError, DeleteStudySessionVariables>): UseDataConnectMutationResult<DeleteStudySessionData, DeleteStudySessionVariables>;
export function useDeleteStudySession(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteStudySessionData, FirebaseError, DeleteStudySessionVariables>): UseDataConnectMutationResult<DeleteStudySessionData, DeleteStudySessionVariables>;

export function useUpdateSubject(options?: useDataConnectMutationOptions<UpdateSubjectData, FirebaseError, UpdateSubjectVariables>): UseDataConnectMutationResult<UpdateSubjectData, UpdateSubjectVariables>;
export function useUpdateSubject(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateSubjectData, FirebaseError, UpdateSubjectVariables>): UseDataConnectMutationResult<UpdateSubjectData, UpdateSubjectVariables>;
