var express = require('express');
var router = express.Router();
const axios = require('axios');
const {authenticateFromCookie} = require('../authentication')
const CIRCLECI_BASE_URL = "https://circleci.com/api/v2";
const CIRCLECI_BASE_URL_V1_1 = "https://circleci.com/api/v1.1";
const getHeaders = (token) => ({"Circle-Token": token, "Content-Type": "application/json;charset=utf-8"});

/* GET pipelines workflows and jobs for projects */
router.get('/builddata', async function (req, res, next) {
    const auth = authenticateFromCookie(req.cookies);

    if (!auth.success) {
        auth.error(res);
    } else {
        const headers = getHeaders(auth.token);
        const projects = req.query.projects.split(",").map(projectBranch => ({name: projectBranch.split("|")[0], branch: projectBranch.split("|")[1]}));

        const pipelineUrlTemplate = (project, branch) => `${CIRCLECI_BASE_URL}project/github/ITV/${project}/pipeline?branch=${branch}`;
        const pipelinesForProjectsUrls = projects.map(project => ({project: project.name, url: pipelineUrlTemplate(project.name, project.branch)}));

        const workflowsUrlTemplate = (pipelineId) => `${CIRCLECI_BASE_URL}pipeline/${pipelineId}/workflow`;
        const jobsUrlTemplate = (job) => `${CIRCLECI_BASE_URL}workflow/${job}/job`;

        const pipelines = await getPipelines(pipelinesForProjectsUrls, headers);

        const pipelinesAndWorkflows = await addWorkflows(pipelines, workflowsUrlTemplate, headers)

        const pipelinesWorkflowsAndJobs = await addJobs(pipelinesAndWorkflows, jobsUrlTemplate, headers)

        res.send(pipelinesWorkflowsAndJobs);
    }

});

/* GET users collaborations. */
router.get('/collaborations', async function(req, res, next) {
    const auth = authenticateFromCookie(req.cookies);
    !auth.success ? auth.error(res) : res.send((await axios.get(`${CIRCLECI_BASE_URL}/me/collaborations`, {headers: getHeaders(auth.token)})).data);

});

/* GET list of followed projects. */
router.get('/projects', async function(req, res, next) {
    const auth = authenticateFromCookie(req.cookies);
    !auth.success ? auth.error(res) : res.send((await axios.get(`${CIRCLECI_BASE_URL_V1_1}/projects`, {headers: getHeaders(auth.token)})).data);
});

function getPipelines(pipelinesForProjectsUrls, headers) {
    return Promise.all(pipelinesForProjectsUrls.map(async pipelines => {
        const {project, url} = pipelines;
        const response = await axios.get(url, {headers});

        return {project, pipelines: response.data.items};
    }));
}

function addWorkflows(pipelines, workflowsUrlTemplate, headers) {
    return Promise.all(pipelines.map(async result => {
        const firstPipelineId = result.pipelines[0].id;
        const url = workflowsUrlTemplate(firstPipelineId);
        const response = await axios.get(url, {headers});

        return {...result, workflows: response.data.items}
    }));
}

function addJobs(pipelinesAndWorkflows, jobsUrlTemplate, headers) {
    return Promise.all(pipelinesAndWorkflows.map(async result => {
        const jobsForWorkflowsUrls = result.workflows.map(workflow => ({workflowId: workflow.id, url: jobsUrlTemplate(workflow.id)}));
        const jobsForWorkflow = await Promise.all(jobsForWorkflowsUrls.map(async workflows => {
            const {workflowId, url} = workflows;
            const response = await axios.get(url, {headers});

            return {workflowId, jobs: response.data.items};
        }));
        return {...result, jobs: jobsForWorkflow}
    }));
}

module.exports = router;
