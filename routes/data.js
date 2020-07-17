var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET pipelines workflows and jobs for projects */
router.get('/', async function (req, res, next) {
    let token = req.cookies.token
    if (!token) {
        res.status(403).send({message: "Api Token not found"})

    } else {
        const projects = req.query.projects.split(",").map(projectBranch => ({name: projectBranch.split("|")[0], branch: projectBranch.split("|")[1]}));

        const circleciBaseUrl = "https://circleci.com/api/v2/";
        const pipelineUrlTemplate = (project, branch) => `${circleciBaseUrl}project/github/ITV/${project}/pipeline?branch=${branch}`;
        const pipelinesForProjectsUrls = projects.map(project => ({project: project.name, url: pipelineUrlTemplate(project.name, project.branch)}));

        const workflowsUrlTemplate = (pipelineId) => `${circleciBaseUrl}pipeline/${pipelineId}/workflow`;
        const jobsUrlTemplate = (job) => `${circleciBaseUrl}workflow/${job}/job`;

        const pipelines = await Promise.all(pipelinesForProjectsUrls.map(async pipelines => {
            const {project, url} = pipelines;

            const response = await axios.get(url, {headers: {"Circle-Token": token, "Content-Type": "application/json;charset=utf-8"}});
            return {project, pipelines: response.data.items};
        }))
        const pipelinesAndWorkflows = await Promise.all(pipelines.map(async result => {
            const firstPipelineId = result.pipelines[0].id;
            const url = workflowsUrlTemplate(firstPipelineId);
            const response = await axios.get(url, {headers: {"Circle-Token": token, "Content-Type": "application/json;charset=utf-8"}});

            return {...result, workflows: response.data.items}
        }))
        const pipelinesWorkflowsAndJobs = await Promise.all(pipelinesAndWorkflows.map(async result => {
            const jobsForWorkflowsUrls = result.workflows.map(workflow => ({workflowId: workflow.id, url: jobsUrlTemplate(workflow.id)}));
            const jobsForWorkflow = await Promise.all(jobsForWorkflowsUrls.map(async workflows => {
                const {workflowId, url} = workflows;
                let response = await axios.get(url, {headers: {"Circle-Token": token, "Content-Type": "application/json;charset=utf-8"}});

                return {workflowId, jobs: response.data.items};
            }));
            return {...result, jobs: jobsForWorkflow}
        }))

        res.send(pipelinesWorkflowsAndJobs);
    }

});

module.exports = router;
