import { CreateUserData, ListSubjectsData, CreateStudySessionData, CreateStudySessionVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateUserData, undefined>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateUserData, undefined>;

export function useListSubjects(options?: useDataConnectQueryOptions<ListSubjectsData>): UseDataConnectQueryResult<ListSubjectsData, undefined>;
export function useListSubjects(dc: DataConnect, options?: useDataConnectQueryOptions<ListSubjectsData>): UseDataConnectQueryResult<ListSubjectsData, undefined>;

export function useCreateStudySession(options?: useDataConnectMutationOptions<CreateStudySessionData, FirebaseError, CreateStudySessionVariables>): UseDataConnectMutationResult<CreateStudySessionData, CreateStudySessionVariables>;
export function useCreateStudySession(dc: DataConnect, options?: useDataConnectMutationOptions<CreateStudySessionData, FirebaseError, CreateStudySessionVariables>): UseDataConnectMutationResult<CreateStudySessionData, CreateStudySessionVariables>;
