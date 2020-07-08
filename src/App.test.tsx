import React from 'react';
import {getProjectStatus} from './App';

test('can determine status from one workflow when workflow was successful', () => {
    const workflows = [
        {status: "success", name: "name"}
    ]
    const status = getProjectStatus(workflows);
    expect(status).toEqual("success");
});

test('can determine status from multiple workflows when workflow was successful', () => {
    const workflows = [
        {status: "success", name: "nameA"},
        {status: "success", name: "nameB"}
    ]
    const status = getProjectStatus(workflows);
    expect(status).toEqual("success");
});

test('can determine status from one workflow when workflow is on-hold', () => {
    const workflows = [
        {status: "on_hold", name: "name"}
    ]
    const status = getProjectStatus(workflows);
    expect(status).toEqual("on_hold");
});

test('can determine status from multiple workflows when workflow is on-hold', () => {
    const workflows = [
        {status: "on_hold", name: "nameA"},
        {status: "on_hold", name: "nameB"}
    ]
    const status = getProjectStatus(workflows);
    expect(status).toEqual("on_hold");
});

test('can determine status from one workflow when workflow is running', () => {
    const workflows = [
        {status: "running", name: "nameA"},
    ]
    const status = getProjectStatus(workflows);
    expect(status).toEqual("running");
});

test('can determine status from one workflow when workflow is cancelled', () => {
    const workflows = [
        {status: "cancelled", name: "nameA"},
    ]
    const status = getProjectStatus(workflows);
    expect(status).toEqual("cancelled");
});

test('can determine status from multiple workflows when all workflow are cancelled', () => {
    const workflows = [
        {status: "cancelled", name: "nameA"},
        {status: "cancelled", name: "nameB"}
    ]
    const status = getProjectStatus(workflows);
    expect(status).toEqual("cancelled");
});

test('can determine status from multiple workflows when at least one workflow is running', () => {
    const workflows = [
        {status: "running", name: "nameA"},
        {status: "success", name: "nameB"},
        {status: "success", name: "nameC"},
    ]
    const status = getProjectStatus(workflows);
    expect(status).toEqual("running");
});

test('can determine status from multiple workflows when at least one workflow is cancelled but others are a success', () => {
    const workflows = [
        {status: "cancelled", name: "nameA"},
        {status: "success", name: "nameB"},
        {status: "success", name: "nameC"},
    ]
    const status = getProjectStatus(workflows);
    expect(status).toEqual("cancelled");
});

test('can determine status from multiple workflows when at least one workflow is on-hold but others are a success', () => {
    const workflows = [
        {status: "on_hold", name: "nameA"},
        {status: "success", name: "nameB"},
        {status: "success", name: "nameC"},
    ]
    const status = getProjectStatus(workflows);
    expect(status).toEqual("on_hold");
});

test('can determine status from multiple workflows, and the latest success counts (workflow rerun scenario)', () => {
    const workflows = [
        {status: "success", name: "nameA"},
        {status: "failed", name: "nameA"},
        {status: "success", name: "nameA"},
    ]
    const status = getProjectStatus(workflows);
    expect(status).toEqual("success");
});

test('can determine status from multiple workflows, and the latest running counts (workflow rerun scenario)', () => {
    const workflows = [
        {status: "running", name: "nameA"},
        {status: "failed", name: "nameA"},
        {status: "success", name: "nameA"},
    ]
    const status = getProjectStatus(workflows);
    expect(status).toEqual("running");
});

test('can determine status from multiple workflows, and the latest cancelled counts (workflow rerun scenario)', () => {
    const workflows = [
        {status: "cancelled", name: "nameA"},
        {status: "failed", name: "nameA"},
        {status: "failed", name: "nameA"},
        {status: "success", name: "nameA"},
    ]
    const status = getProjectStatus(workflows);
    expect(status).toEqual("cancelled");
});

test('can determine status from multiple workflows, and the latest on-hold counts (workflow rerun scenario)', () => {
    const workflows = [
        {status: "on_hold", name: "nameA"},
        {status: "cancelled", name: "nameA"},
        {status: "failed", name: "nameA"},
        {status: "failed", name: "nameA"},
        {status: "success", name: "nameA"},
    ]
    const status = getProjectStatus(workflows);
    expect(status).toEqual("on_hold");
});

test('can determine status from multiple workflows, and the latest failed counts (workflow rerun scenario)', () => {
    const workflows = [
        {status: "failed", name: "nameA"},
        {status: "success", name: "nameA"},
        {status: "success", name: "nameA"},
    ]
    const status = getProjectStatus(workflows);
    expect(status).toEqual("failed");
});

test('can determine status from multiple different workflows, and the latest overall success counts (workflow rerun scenario)', () => {
    const workflows = [
        {status: "success", name: "nameA"},
        {status: "failed", name: "nameA"},
        {status: "success", name: "nameB"},
        {status: "failed", name: "nameB"},
    ]
    const status = getProjectStatus(workflows);
    expect(status).toEqual("success");
});

test('can determine status from multiple different workflows, and the latest overall on_hold counts (workflow rerun scenario)', () => {
    const workflows = [
        {status: "on_hold", name: "nameA"},
        {status: "failed", name: "nameA"},
        {status: "success", name: "nameB"},
        {status: "failed", name: "nameB"},
    ]
    const status = getProjectStatus(workflows);
    expect(status).toEqual("on_hold");
});

test('can determine status from multiple different workflows, and the latest overall running counts (workflow rerun scenario)', () => {
    const workflows = [
        {status: "success", name: "nameA"},
        {status: "failed", name: "nameA"},
        {status: "running", name: "nameB"},
        {status: "failed", name: "nameB"},
    ]
    const status = getProjectStatus(workflows);
    expect(status).toEqual("running");
});

test('can determine status from multiple different workflows, and the latest overall running counts (workflow rerun scenario)', () => {
    const workflows = [
        {status: "on_hold", name: "nameA"},
        {status: "failed", name: "nameA"},
        {status: "running", name: "nameB"},
        {status: "failed", name: "nameB"},
    ]
    const status = getProjectStatus(workflows);
    expect(status).toEqual("running");
});

test('can determine status from multiple different workflows, and the latest overall running counts (workflow rerun scenario)', () => {
    const workflows = [
        {status: "failed", name: "nameA"},
        {status: "failed", name: "nameA"},
        {status: "running", name: "nameB"},
        {status: "failed", name: "nameB"},
    ]
    const status = getProjectStatus(workflows);
    expect(status).toEqual("running");
});

test('can determine status from multiple different workflows, and the latest overall failed counts (workflow rerun scenario)', () => {
    const workflows = [
        {status: "failed", name: "nameA"},
        {status: "failed", name: "nameA"},
        {status: "success", name: "nameB"},
        {status: "failed", name: "nameB"},
    ]
    const status = getProjectStatus(workflows);
    expect(status).toEqual("failed");
});

test('can determine status from multiple different workflows, and the latest overall cancelled counts when the other unique wf is success (workflow rerun scenario)', () => {
    const workflows = [
        {status: "success", name: "nameA"},
        {status: "failed", name: "nameA"},
        {status: "cancelled", name: "nameB"},
        {status: "failed", name: "nameB"},
    ]
    const status = getProjectStatus(workflows);
    expect(status).toEqual("cancelled");
});

test('can determine status from multiple different workflows, and the latest overall cancelled counts when the other unique wf is failed (workflow rerun scenario)', () => {
    const workflows = [
        {status: "failed", name: "nameA"},
        {status: "failed", name: "nameA"},
        {status: "cancelled", name: "nameB"},
        {status: "failed", name: "nameB"},
        {status: "success", name: "nameC"},
        {status: "on_hold", name: "nameD"},
    ]
    const status = getProjectStatus(workflows);
    expect(status).toEqual("cancelled");
});
