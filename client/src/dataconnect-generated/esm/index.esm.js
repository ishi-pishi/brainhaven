import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'client',
  location: 'us-east4'
};

export const meRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'Me');
}
meRef.operationName = 'Me';

export function me(dc) {
  return executeQuery(meRef(dc));
}

export const updateUserProgressRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateUserProgress', inputVars);
}
updateUserProgressRef.operationName = 'UpdateUserProgress';

export function updateUserProgress(dcOrVars, vars) {
  return executeMutation(updateUserProgressRef(dcOrVars, vars));
}

export const listRewardsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListRewards');
}
listRewardsRef.operationName = 'ListRewards';

export function listRewards(dc) {
  return executeQuery(listRewardsRef(dc));
}

export const createRewardRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateReward', inputVars);
}
createRewardRef.operationName = 'CreateReward';

export function createReward(dcOrVars, vars) {
  return executeMutation(createRewardRef(dcOrVars, vars));
}

export const deleteRewardRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteReward', inputVars);
}
deleteRewardRef.operationName = 'DeleteReward';

export function deleteReward(dcOrVars, vars) {
  return executeMutation(deleteRewardRef(dcOrVars, vars));
}

export const mySubjectsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'MySubjects');
}
mySubjectsRef.operationName = 'MySubjects';

export function mySubjects(dc) {
  return executeQuery(mySubjectsRef(dc));
}

export const myStudySessionsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'MyStudySessions', inputVars);
}
myStudySessionsRef.operationName = 'MyStudySessions';

export function myStudySessions(dcOrVars, vars) {
  return executeQuery(myStudySessionsRef(dcOrVars, vars));
}

export const createUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
createUserRef.operationName = 'CreateUser';

export function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
}

export const createSubjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateSubject', inputVars);
}
createSubjectRef.operationName = 'CreateSubject';

export function createSubject(dcOrVars, vars) {
  return executeMutation(createSubjectRef(dcOrVars, vars));
}

export const createStudySessionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateStudySession', inputVars);
}
createStudySessionRef.operationName = 'CreateStudySession';

export function createStudySession(dcOrVars, vars) {
  return executeMutation(createStudySessionRef(dcOrVars, vars));
}

export const deleteStudySessionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteStudySession', inputVars);
}
deleteStudySessionRef.operationName = 'DeleteStudySession';

export function deleteStudySession(dcOrVars, vars) {
  return executeMutation(deleteStudySessionRef(dcOrVars, vars));
}

export const updateSubjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateSubject', inputVars);
}
updateSubjectRef.operationName = 'UpdateSubject';

export function updateSubject(dcOrVars, vars) {
  return executeMutation(updateSubjectRef(dcOrVars, vars));
}

export const deleteSubjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteSubject', inputVars);
}
deleteSubjectRef.operationName = 'DeleteSubject';

export function deleteSubject(dcOrVars, vars) {
  return executeMutation(deleteSubjectRef(dcOrVars, vars));
}

