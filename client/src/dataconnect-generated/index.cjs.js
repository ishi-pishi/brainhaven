const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'client',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const meRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'Me');
}
meRef.operationName = 'Me';
exports.meRef = meRef;

exports.me = function me(dc) {
  return executeQuery(meRef(dc));
};

const updateUserProgressRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateUserProgress', inputVars);
}
updateUserProgressRef.operationName = 'UpdateUserProgress';
exports.updateUserProgressRef = updateUserProgressRef;

exports.updateUserProgress = function updateUserProgress(dcOrVars, vars) {
  return executeMutation(updateUserProgressRef(dcOrVars, vars));
};

const listRewardsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListRewards');
}
listRewardsRef.operationName = 'ListRewards';
exports.listRewardsRef = listRewardsRef;

exports.listRewards = function listRewards(dc) {
  return executeQuery(listRewardsRef(dc));
};

const createRewardRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateReward', inputVars);
}
createRewardRef.operationName = 'CreateReward';
exports.createRewardRef = createRewardRef;

exports.createReward = function createReward(dcOrVars, vars) {
  return executeMutation(createRewardRef(dcOrVars, vars));
};

const deleteRewardRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteReward', inputVars);
}
deleteRewardRef.operationName = 'DeleteReward';
exports.deleteRewardRef = deleteRewardRef;

exports.deleteReward = function deleteReward(dcOrVars, vars) {
  return executeMutation(deleteRewardRef(dcOrVars, vars));
};

const mySubjectsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'MySubjects');
}
mySubjectsRef.operationName = 'MySubjects';
exports.mySubjectsRef = mySubjectsRef;

exports.mySubjects = function mySubjects(dc) {
  return executeQuery(mySubjectsRef(dc));
};

const myStudySessionsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'MyStudySessions', inputVars);
}
myStudySessionsRef.operationName = 'MyStudySessions';
exports.myStudySessionsRef = myStudySessionsRef;

exports.myStudySessions = function myStudySessions(dcOrVars, vars) {
  return executeQuery(myStudySessionsRef(dcOrVars, vars));
};

const createUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
createUserRef.operationName = 'CreateUser';
exports.createUserRef = createUserRef;

exports.createUser = function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
};

const createSubjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateSubject', inputVars);
}
createSubjectRef.operationName = 'CreateSubject';
exports.createSubjectRef = createSubjectRef;

exports.createSubject = function createSubject(dcOrVars, vars) {
  return executeMutation(createSubjectRef(dcOrVars, vars));
};

const createStudySessionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateStudySession', inputVars);
}
createStudySessionRef.operationName = 'CreateStudySession';
exports.createStudySessionRef = createStudySessionRef;

exports.createStudySession = function createStudySession(dcOrVars, vars) {
  return executeMutation(createStudySessionRef(dcOrVars, vars));
};

const deleteStudySessionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteStudySession', inputVars);
}
deleteStudySessionRef.operationName = 'DeleteStudySession';
exports.deleteStudySessionRef = deleteStudySessionRef;

exports.deleteStudySession = function deleteStudySession(dcOrVars, vars) {
  return executeMutation(deleteStudySessionRef(dcOrVars, vars));
};

const updateSubjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateSubject', inputVars);
}
updateSubjectRef.operationName = 'UpdateSubject';
exports.updateSubjectRef = updateSubjectRef;

exports.updateSubject = function updateSubject(dcOrVars, vars) {
  return executeMutation(updateSubjectRef(dcOrVars, vars));
};

const deleteSubjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteSubject', inputVars);
}
deleteSubjectRef.operationName = 'DeleteSubject';
exports.deleteSubjectRef = deleteSubjectRef;

exports.deleteSubject = function deleteSubject(dcOrVars, vars) {
  return executeMutation(deleteSubjectRef(dcOrVars, vars));
};
