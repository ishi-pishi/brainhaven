const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'client',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser');
}
createUserRef.operationName = 'CreateUser';
exports.createUserRef = createUserRef;

exports.createUser = function createUser(dc) {
  return executeMutation(createUserRef(dc));
};

const listSubjectsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListSubjects');
}
listSubjectsRef.operationName = 'ListSubjects';
exports.listSubjectsRef = listSubjectsRef;

exports.listSubjects = function listSubjects(dc) {
  return executeQuery(listSubjectsRef(dc));
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

const getStudyGoalsForUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetStudyGoalsForUser');
}
getStudyGoalsForUserRef.operationName = 'GetStudyGoalsForUser';
exports.getStudyGoalsForUserRef = getStudyGoalsForUserRef;

exports.getStudyGoalsForUser = function getStudyGoalsForUser(dc) {
  return executeQuery(getStudyGoalsForUserRef(dc));
};
