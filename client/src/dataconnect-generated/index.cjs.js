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
