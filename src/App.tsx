import React, {ChangeEvent, ReactElement, useEffect, useState} from 'react';
import './App.css';
import success from './img/success.svg'
import failed from './img/failed.svg'
import cancelled from './img/cancelled.svg'
import running from './img/running.svg'
import on_hold from './img/on_hold.svg'

import styles from './widget.module.css';
import wcStyles from './widget-container.module.css';

import axios from 'axios';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

interface ApiData {
    project: string
    pipelines: Pipeline[]
    workflows: Workflow[]
    jobs: { workflowId: string, jobs: Job[] }[]
}

const inMockMode = true;

function useApiData() {
    const initialApiData: ApiData[] = [];

    async function getApiData(): Promise<ApiData[]> {
        const projects = ["atsdcf-services", "adtech-cia"];

        if (inMockMode) {
            const pipelines = await getPipelinesForProject();
            const workflows = await getWorkflowsForPipeline();
            const jobs = await getJobsForWorkflow();
            return [1].flatMap(num => projects.map(project => ({
                project,
                pipelines: pipelines.items,
                workflows: workflows.items,
                jobs: [{workflowId: "ae768c71-303e-44e0-a223-5bc3d7a35354", jobs: jobs.items}]
            })));
        } else {
            return await get<ApiData[]>("http://localhost:4000/data", {projects: projects.join(",")});
            ;
        }
    }

    const [apiData, setApiData] = useState(initialApiData);
    useEffect(() => {
        const loadApiData = async () => {
            const apiData = await getApiData();
            setApiData(apiData);
        }
        loadApiData();
    }, [])

    async function getPipelinesForProject() {
        // https://circleci.com/api/v2/project/github/ITV/atsdcf-services/pipeline?branch=AC-1402-cato-environment
        return {
            "next_page_token": "AIgXwlmXuYOzaITa2h0u5za6PARaNzDLC7YnzwBd4RI0ZXjdzwnr0DLHcm_ICki9XyC95efkhAV6CItJT0gWW_3Isn66guP6h95GEqDGBYJUyXExZn4p222ft9LVuTnUCPovRz8ykKBivawWf7H0FfnyWWIlvPEQCw",
            "items": [
                {
                    "id": "f70dc82c-42fc-46d6-8061-df3d364bdd1f",
                    "errors": [],
                    "project_slug": "gh/ITV/atsdcf-services",
                    "updated_at": "2020-07-01T16:55:17.378Z",
                    "number": 161,
                    "state": "created",
                    "created_at": "2020-07-01T16:55:17.378Z",
                    "trigger": {
                        "received_at": "2020-07-01T16:55:17.348Z",
                        "type": "webhook",
                        "actor": {
                            "login": "andyduncanitv",
                            "avatar_url": "https://avatars2.githubusercontent.com/u/47525073?v=4"
                        }
                    },
                    "vcs": {
                        "origin_repository_url": "https://github.com/ITV/atsdcf-services",
                        "target_repository_url": "https://github.com/ITV/atsdcf-services",
                        "revision": "50a43cca3bcec05ddb7c2eff68e4078040aa296f",
                        "provider_name": "GitHub",
                        "commit": {
                            "body": "",
                            "subject": "Add Spice configuration"
                        },
                        "branch": "AC-1402-cato-environment"
                    }
                },
                {
                    "id": "02883abb-1730-4eb9-9696-a9b5de0580f1",
                    "errors": [],
                    "project_slug": "gh/ITV/atsdcf-services",
                    "updated_at": "2020-07-01T16:42:36.517Z",
                    "number": 160,
                    "state": "created",
                    "created_at": "2020-07-01T16:42:36.517Z",
                    "trigger": {
                        "received_at": "2020-07-01T16:42:36.475Z",
                        "type": "webhook",
                        "actor": {
                            "login": "andyduncanitv",
                            "avatar_url": "https://avatars2.githubusercontent.com/u/47525073?v=4"
                        }
                    },
                    "vcs": {
                        "origin_repository_url": "https://github.com/ITV/atsdcf-services",
                        "target_repository_url": "https://github.com/ITV/atsdcf-services",
                        "revision": "4d6d65e7aaa800233a22067a76a997b5c08d426f",
                        "provider_name": "GitHub",
                        "commit": {
                            "body": "",
                            "subject": "Add Spice configuration"
                        },
                        "branch": "AC-1402-cato-environment"
                    }
                },
                {
                    "id": "b49a9654-55e7-4aa6-a8fa-a0f75c0f1221",
                    "errors": [],
                    "project_slug": "gh/ITV/atsdcf-services",
                    "updated_at": "2020-06-30T15:32:44.034Z",
                    "number": 159,
                    "state": "created",
                    "created_at": "2020-06-30T15:32:44.034Z",
                    "trigger": {
                        "received_at": "2020-06-30T15:32:44.001Z",
                        "type": "webhook",
                        "actor": {
                            "login": "andyduncanitv",
                            "avatar_url": "https://avatars2.githubusercontent.com/u/47525073?v=4"
                        }
                    },
                    "vcs": {
                        "origin_repository_url": "https://github.com/ITV/atsdcf-services",
                        "target_repository_url": "https://github.com/ITV/atsdcf-services",
                        "revision": "b33db24f11ee81443e16c5e00ff184514033d7c5",
                        "provider_name": "GitHub",
                        "commit": {
                            "body": "",
                            "subject": "Remove hostname redundancy"
                        },
                        "branch": "AC-1402-cato-environment"
                    }
                },
                {
                    "id": "e29ac0e8-1290-45ec-b89d-be0bba2ed3a3",
                    "errors": [],
                    "project_slug": "gh/ITV/atsdcf-services",
                    "updated_at": "2020-06-20T19:07:46.996Z",
                    "number": 157,
                    "state": "created",
                    "created_at": "2020-06-20T19:07:46.996Z",
                    "trigger": {
                        "received_at": "2020-06-20T19:07:46.963Z",
                        "type": "webhook",
                        "actor": {
                            "login": "andyduncanitv",
                            "avatar_url": "https://avatars2.githubusercontent.com/u/47525073?v=4"
                        }
                    },
                    "vcs": {
                        "origin_repository_url": "https://github.com/ITV/atsdcf-services",
                        "target_repository_url": "https://github.com/ITV/atsdcf-services",
                        "revision": "3e6f088d72a94e234e5747a7a23048e1aae78021",
                        "provider_name": "GitHub",
                        "commit": {
                            "body": "",
                            "subject": "Add UAT approval"
                        },
                        "branch": "AC-1402-cato-environment"
                    }
                },
                {
                    "id": "baf11cc7-545a-4d80-b653-fd5596fbbfd6",
                    "errors": [],
                    "project_slug": "gh/ITV/atsdcf-services",
                    "updated_at": "2020-06-20T18:19:50.753Z",
                    "number": 156,
                    "state": "created",
                    "created_at": "2020-06-20T18:19:50.753Z",
                    "trigger": {
                        "received_at": "2020-06-20T18:19:50.719Z",
                        "type": "webhook",
                        "actor": {
                            "login": "andyduncanitv",
                            "avatar_url": "https://avatars2.githubusercontent.com/u/47525073?v=4"
                        }
                    },
                    "vcs": {
                        "origin_repository_url": "https://github.com/ITV/atsdcf-services",
                        "target_repository_url": "https://github.com/ITV/atsdcf-services",
                        "revision": "8289f884e8d460008cc001b0715cda1127d7717d",
                        "provider_name": "GitHub",
                        "commit": {
                            "body": "",
                            "subject": "Refine permissions"
                        },
                        "branch": "AC-1402-cato-environment"
                    }
                },
                {
                    "id": "cb35d0bd-570d-44b4-a486-0b8b3782d6d5",
                    "errors": [],
                    "project_slug": "gh/ITV/atsdcf-services",
                    "updated_at": "2020-06-19T10:03:13.533Z",
                    "number": 155,
                    "state": "created",
                    "created_at": "2020-06-19T10:03:13.533Z",
                    "trigger": {
                        "received_at": "2020-06-19T10:03:13.491Z",
                        "type": "webhook",
                        "actor": {
                            "login": "andyduncanitv",
                            "avatar_url": "https://avatars2.githubusercontent.com/u/47525073?v=4"
                        }
                    },
                    "vcs": {
                        "origin_repository_url": "https://github.com/ITV/atsdcf-services",
                        "target_repository_url": "https://github.com/ITV/atsdcf-services",
                        "revision": "d979014fc31ba9eedcfcfe0bafa158798ce6d7a1",
                        "provider_name": "GitHub",
                        "commit": {
                            "body": "",
                            "subject": "Add UAT environment"
                        },
                        "branch": "AC-1402-cato-environment"
                    }
                },
                {
                    "id": "136a27d0-37ee-437f-b593-87710fe8348c",
                    "errors": [],
                    "project_slug": "gh/ITV/atsdcf-services",
                    "updated_at": "2020-06-18T17:09:02.372Z",
                    "number": 154,
                    "state": "created",
                    "created_at": "2020-06-18T17:09:02.372Z",
                    "trigger": {
                        "received_at": "2020-06-18T17:09:02.323Z",
                        "type": "webhook",
                        "actor": {
                            "login": "andyduncanitv",
                            "avatar_url": "https://avatars2.githubusercontent.com/u/47525073?v=4"
                        }
                    },
                    "vcs": {
                        "origin_repository_url": "https://github.com/ITV/atsdcf-services",
                        "target_repository_url": "https://github.com/ITV/atsdcf-services",
                        "revision": "539f16fd758bbce20dacca368998068c2e2134c4",
                        "provider_name": "GitHub",
                        "commit": {
                            "body": "",
                            "subject": "Add UAT environment"
                        },
                        "branch": "AC-1402-cato-environment"
                    }
                },
                {
                    "id": "b214dd00-3fca-40b1-a54e-6623d46b63cb",
                    "errors": [
                        {
                            "type": "config",
                            "message": "Job 'Test and package' requires 'deploy_application', which is the name of 0 other jobs in workflow 'Build, Test & Run'"
                        }
                    ],
                    "project_slug": "gh/ITV/atsdcf-services",
                    "updated_at": "2020-06-18T17:07:09.082Z",
                    "number": 153,
                    "state": "errored",
                    "created_at": "2020-06-18T17:07:09.082Z",
                    "trigger": {
                        "received_at": "2020-06-18T17:07:09.041Z",
                        "type": "webhook",
                        "actor": {
                            "login": "andyduncanitv",
                            "avatar_url": "https://avatars2.githubusercontent.com/u/47525073?v=4"
                        }
                    },
                    "vcs": {
                        "origin_repository_url": "https://github.com/ITV/atsdcf-services",
                        "target_repository_url": "https://github.com/ITV/atsdcf-services",
                        "revision": "78e393bc0b6672432d5cc723252175df440dc2dc",
                        "provider_name": "GitHub",
                        "commit": {
                            "body": "",
                            "subject": "Add UAT environment"
                        },
                        "branch": "AC-1402-cato-environment"
                    }
                },
                {
                    "id": "a9109133-38ce-4905-b0a4-8b206ba4273e",
                    "errors": [],
                    "project_slug": "gh/ITV/atsdcf-services",
                    "updated_at": "2020-06-18T16:06:15.748Z",
                    "number": 152,
                    "state": "created",
                    "created_at": "2020-06-18T16:06:15.748Z",
                    "trigger": {
                        "received_at": "2020-06-18T16:06:15.707Z",
                        "type": "webhook",
                        "actor": {
                            "login": "andyduncanitv",
                            "avatar_url": "https://avatars2.githubusercontent.com/u/47525073?v=4"
                        }
                    },
                    "vcs": {
                        "origin_repository_url": "https://github.com/ITV/atsdcf-services",
                        "target_repository_url": "https://github.com/ITV/atsdcf-services",
                        "revision": "afe90e3d93e7c0e785e67b91cc8e6ec4b7bfaf6a",
                        "provider_name": "GitHub",
                        "commit": {
                            "body": "",
                            "subject": "Add New Relic application name"
                        },
                        "branch": "AC-1402-cato-environment"
                    }
                },
                {
                    "id": "bde3236f-e46e-4e05-b39f-7ac2d240ab13",
                    "errors": [],
                    "project_slug": "gh/ITV/atsdcf-services",
                    "updated_at": "2020-06-18T15:36:27.882Z",
                    "number": 151,
                    "state": "created",
                    "created_at": "2020-06-18T15:36:27.882Z",
                    "trigger": {
                        "received_at": "2020-06-18T15:36:27.842Z",
                        "type": "webhook",
                        "actor": {
                            "login": "andyduncanitv",
                            "avatar_url": "https://avatars2.githubusercontent.com/u/47525073?v=4"
                        }
                    },
                    "vcs": {
                        "origin_repository_url": "https://github.com/ITV/atsdcf-services",
                        "target_repository_url": "https://github.com/ITV/atsdcf-services",
                        "revision": "5a36c9bd4144a5926cc02711953ded21402de49d",
                        "provider_name": "GitHub",
                        "commit": {
                            "body": "",
                            "subject": "Add New Relic application name"
                        },
                        "branch": "AC-1402-cato-environment"
                    }
                },
                {
                    "id": "899fa7d2-30e1-4b34-80b9-f98df457acd4",
                    "errors": [],
                    "project_slug": "gh/ITV/atsdcf-services",
                    "updated_at": "2020-06-18T14:19:16.168Z",
                    "number": 150,
                    "state": "created",
                    "created_at": "2020-06-18T14:19:16.168Z",
                    "trigger": {
                        "received_at": "2020-06-18T14:19:16.133Z",
                        "type": "webhook",
                        "actor": {
                            "login": "andyduncanitv",
                            "avatar_url": "https://avatars2.githubusercontent.com/u/47525073?v=4"
                        }
                    },
                    "vcs": {
                        "origin_repository_url": "https://github.com/ITV/atsdcf-services",
                        "target_repository_url": "https://github.com/ITV/atsdcf-services",
                        "revision": "f6f11dcd0d4369a1c9fbd8f3801b8dee40d129be",
                        "provider_name": "GitHub",
                        "commit": {
                            "body": "",
                            "subject": "Add New Relic application name"
                        },
                        "branch": "AC-1402-cato-environment"
                    }
                },
                {
                    "id": "37362cac-5d8f-4016-87b6-b1c12acae163",
                    "errors": [],
                    "project_slug": "gh/ITV/atsdcf-services",
                    "updated_at": "2020-06-18T14:10:56.983Z",
                    "number": 149,
                    "state": "created",
                    "created_at": "2020-06-18T14:10:56.983Z",
                    "trigger": {
                        "received_at": "2020-06-18T14:10:56.953Z",
                        "type": "webhook",
                        "actor": {
                            "login": "andyduncanitv",
                            "avatar_url": "https://avatars2.githubusercontent.com/u/47525073?v=4"
                        }
                    },
                    "vcs": {
                        "origin_repository_url": "https://github.com/ITV/atsdcf-services",
                        "target_repository_url": "https://github.com/ITV/atsdcf-services",
                        "revision": "f2fb50b8ad045337568a9196f88afd52592ceffe",
                        "provider_name": "GitHub",
                        "commit": {
                            "body": "",
                            "subject": "Add New Relic application name"
                        },
                        "branch": "AC-1402-cato-environment"
                    }
                },
                {
                    "id": "ab960526-e1d5-49ce-9905-5554cb751cf8",
                    "errors": [],
                    "project_slug": "gh/ITV/atsdcf-services",
                    "updated_at": "2020-06-18T14:04:09.902Z",
                    "number": 148,
                    "state": "created",
                    "created_at": "2020-06-18T14:04:09.902Z",
                    "trigger": {
                        "received_at": "2020-06-18T14:04:09.849Z",
                        "type": "webhook",
                        "actor": {
                            "login": "andyduncanitv",
                            "avatar_url": "https://avatars2.githubusercontent.com/u/47525073?v=4"
                        }
                    },
                    "vcs": {
                        "origin_repository_url": "https://github.com/ITV/atsdcf-services",
                        "target_repository_url": "https://github.com/ITV/atsdcf-services",
                        "revision": "f8188673ef44012bb9a39cfd18c1d9cda3553781",
                        "provider_name": "GitHub",
                        "commit": {
                            "body": "",
                            "subject": "Add New Relic application name"
                        },
                        "branch": "AC-1402-cato-environment"
                    }
                },
                {
                    "id": "7e75d91c-4ec0-4126-b3ef-6f6e58142997",
                    "errors": [],
                    "project_slug": "gh/ITV/atsdcf-services",
                    "updated_at": "2020-06-18T13:55:21.557Z",
                    "number": 147,
                    "state": "created",
                    "created_at": "2020-06-18T13:55:21.557Z",
                    "trigger": {
                        "received_at": "2020-06-18T13:55:21.515Z",
                        "type": "webhook",
                        "actor": {
                            "login": "andyduncanitv",
                            "avatar_url": "https://avatars2.githubusercontent.com/u/47525073?v=4"
                        }
                    },
                    "vcs": {
                        "origin_repository_url": "https://github.com/ITV/atsdcf-services",
                        "target_repository_url": "https://github.com/ITV/atsdcf-services",
                        "revision": "30e608e68d9b681faf33d490620603c83053e65d",
                        "provider_name": "GitHub",
                        "commit": {
                            "body": "",
                            "subject": "Add New Relic application name"
                        },
                        "branch": "AC-1402-cato-environment"
                    }
                },
                {
                    "id": "142134be-fc19-4e9c-82f7-63fd327a52b1",
                    "errors": [],
                    "project_slug": "gh/ITV/atsdcf-services",
                    "updated_at": "2020-06-18T13:45:32.064Z",
                    "number": 146,
                    "state": "created",
                    "created_at": "2020-06-18T13:45:32.064Z",
                    "trigger": {
                        "received_at": "2020-06-18T13:45:32.031Z",
                        "type": "webhook",
                        "actor": {
                            "login": "andyduncanitv",
                            "avatar_url": "https://avatars2.githubusercontent.com/u/47525073?v=4"
                        }
                    },
                    "vcs": {
                        "origin_repository_url": "https://github.com/ITV/atsdcf-services",
                        "target_repository_url": "https://github.com/ITV/atsdcf-services",
                        "revision": "4fe29f2cf68f12f932804994c8f327ed725136d9",
                        "provider_name": "GitHub",
                        "commit": {
                            "body": "",
                            "subject": "Add New Relic application name"
                        },
                        "branch": "AC-1402-cato-environment"
                    }
                },
                {
                    "id": "737969de-4d01-4b0f-8f92-734bebc8c8e1",
                    "errors": [],
                    "project_slug": "gh/ITV/atsdcf-services",
                    "updated_at": "2020-06-18T13:38:23.553Z",
                    "number": 145,
                    "state": "created",
                    "created_at": "2020-06-18T13:38:23.553Z",
                    "trigger": {
                        "received_at": "2020-06-18T13:38:23.525Z",
                        "type": "webhook",
                        "actor": {
                            "login": "andyduncanitv",
                            "avatar_url": "https://avatars2.githubusercontent.com/u/47525073?v=4"
                        }
                    },
                    "vcs": {
                        "origin_repository_url": "https://github.com/ITV/atsdcf-services",
                        "target_repository_url": "https://github.com/ITV/atsdcf-services",
                        "revision": "d0cb7ac3e078c979b274958ca9489cf061596dcc",
                        "provider_name": "GitHub",
                        "commit": {
                            "body": "",
                            "subject": "Add New Relic application name"
                        },
                        "branch": "AC-1402-cato-environment"
                    }
                },
                {
                    "id": "46b083c7-4e24-48a3-940c-3a802b4011db",
                    "errors": [],
                    "project_slug": "gh/ITV/atsdcf-services",
                    "updated_at": "2020-06-18T13:31:35.884Z",
                    "number": 144,
                    "state": "created",
                    "created_at": "2020-06-18T13:31:35.884Z",
                    "trigger": {
                        "received_at": "2020-06-18T13:31:35.839Z",
                        "type": "webhook",
                        "actor": {
                            "login": "andyduncanitv",
                            "avatar_url": "https://avatars2.githubusercontent.com/u/47525073?v=4"
                        }
                    },
                    "vcs": {
                        "origin_repository_url": "https://github.com/ITV/atsdcf-services",
                        "target_repository_url": "https://github.com/ITV/atsdcf-services",
                        "revision": "f51c60d46b6804b2698e879443ce41da65b5eeae",
                        "provider_name": "GitHub",
                        "commit": {
                            "body": "",
                            "subject": "Add New Relic application name"
                        },
                        "branch": "AC-1402-cato-environment"
                    }
                },
                {
                    "id": "9e906975-100b-4e6c-a42d-5eae6b9a628b",
                    "errors": [],
                    "project_slug": "gh/ITV/atsdcf-services",
                    "updated_at": "2020-06-18T13:20:38.585Z",
                    "number": 143,
                    "state": "created",
                    "created_at": "2020-06-18T13:20:38.585Z",
                    "trigger": {
                        "received_at": "2020-06-18T13:20:38.556Z",
                        "type": "webhook",
                        "actor": {
                            "login": "andyduncanitv",
                            "avatar_url": "https://avatars2.githubusercontent.com/u/47525073?v=4"
                        }
                    },
                    "vcs": {
                        "origin_repository_url": "https://github.com/ITV/atsdcf-services",
                        "target_repository_url": "https://github.com/ITV/atsdcf-services",
                        "revision": "a022b2a93230ccb011b6a7664e13d9c4c373b7ff",
                        "provider_name": "GitHub",
                        "commit": {
                            "body": "",
                            "subject": "Add New Relic application name"
                        },
                        "branch": "AC-1402-cato-environment"
                    }
                },
                {
                    "id": "907b1888-034f-4b94-9f31-1627bec54e8e",
                    "errors": [],
                    "project_slug": "gh/ITV/atsdcf-services",
                    "updated_at": "2020-06-18T11:13:50.770Z",
                    "number": 142,
                    "state": "created",
                    "created_at": "2020-06-18T11:13:50.770Z",
                    "trigger": {
                        "received_at": "2020-06-18T11:13:50.735Z",
                        "type": "webhook",
                        "actor": {
                            "login": "andyduncanitv",
                            "avatar_url": "https://avatars2.githubusercontent.com/u/47525073?v=4"
                        }
                    },
                    "vcs": {
                        "origin_repository_url": "https://github.com/ITV/atsdcf-services",
                        "target_repository_url": "https://github.com/ITV/atsdcf-services",
                        "revision": "b25fa94b3df1ae801477a01ab0f81f790de7f5e5",
                        "provider_name": "GitHub",
                        "commit": {
                            "body": "",
                            "subject": "Deploy dev environment"
                        },
                        "branch": "AC-1402-cato-environment"
                    }
                },
                {
                    "id": "3c1bea8f-a27e-4d9b-ae07-037bf1ebbcc7",
                    "errors": [],
                    "project_slug": "gh/ITV/atsdcf-services",
                    "updated_at": "2020-06-18T10:57:56.248Z",
                    "number": 141,
                    "state": "created",
                    "created_at": "2020-06-18T10:57:56.248Z",
                    "trigger": {
                        "received_at": "2020-06-18T10:57:56.211Z",
                        "type": "webhook",
                        "actor": {
                            "login": "andyduncanitv",
                            "avatar_url": "https://avatars2.githubusercontent.com/u/47525073?v=4"
                        }
                    },
                    "vcs": {
                        "origin_repository_url": "https://github.com/ITV/atsdcf-services",
                        "target_repository_url": "https://github.com/ITV/atsdcf-services",
                        "revision": "229bbed1a54fa9c4d95079cdba7aa8f06946164d",
                        "provider_name": "GitHub",
                        "commit": {
                            "body": "",
                            "subject": "Deploy dev environment"
                        },
                        "branch": "AC-1402-cato-environment"
                    }
                }
            ]
        }
    }

    async function getWorkflowsForPipeline() {
        // https://circleci.com/api/v2/pipeline/f70dc82c-42fc-46d6-8061-df3d364bdd1f/workflow
        return {
            "next_page_token": null,
            "items": [
                {
                    "pipeline_id": "f70dc82c-42fc-46d6-8061-df3d364bdd1f",
                    "id": "ae768c71-303e-44e0-a223-5bc3d7a35354",
                    "name": "Build, Test & Run",
                    "project_slug": "gh/ITV/atsdcf-services",
                    "status": "success",
                    "started_by": "f9af2aaa-91be-473d-8761-97b0cf9ec6f5",
                    "pipeline_number": 161,
                    "created_at": "2020-07-01T16:55:17Z",
                    "stopped_at": "2020-07-01T17:06:30Z"
                }
            ]
        }
    }

    async function getJobsForWorkflow() {
        // https://circleci.com/api/v2/workflow/ae768c71-303e-44e0-a223-5bc3d7a35354/job
        return {
            "next_page_token": null,
            "items": [
                {
                    "dependencies": [],
                    "job_number": 377,
                    "id": "989ead76-9aef-4d1f-8c12-920dea97ede9",
                    "started_at": "2020-07-01T16:55:21Z",
                    "name": "Deploy application",
                    "project_slug": "gh/ITV/atsdcf-services",
                    "status": "success",
                    "type": "build",
                    "stopped_at": "2020-07-01T16:55:40Z"
                },
                {
                    "dependencies": [
                        "989ead76-9aef-4d1f-8c12-920dea97ede9"
                    ],
                    "job_number": 378,
                    "id": "ce298d89-53a9-4153-90b1-9ac3f3fdeaef",
                    "started_at": "2020-07-01T16:56:49Z",
                    "name": "Test and package",
                    "project_slug": "gh/ITV/atsdcf-services",
                    "status": "failed",
                    "type": "build",
                    "stopped_at": "2020-07-01T17:00:30Z"
                },
                {
                    "dependencies": [
                        "ce298d89-53a9-4153-90b1-9ac3f3fdeaef"
                    ],
                    "job_number": 380,
                    "id": "dffa32a0-2d59-4869-91dd-34992ab3d187",
                    "started_at": "2020-07-01T17:00:35Z",
                    "name": "Remove test proxy",
                    "project_slug": "gh/ITV/atsdcf-services",
                    "status": "on_hold",
                    "type": "build",
                    "stopped_at": "2020-07-01T17:02:25Z"
                },
                {
                    "dependencies": [
                        "ce298d89-53a9-4153-90b1-9ac3f3fdeaef"
                    ],
                    "job_number": 379,
                    "id": "785cb1a3-a263-4a0a-9305-da92730b9a48",
                    "started_at": "2020-07-01T17:00:34Z",
                    "name": "Create application version",
                    "project_slug": "gh/ITV/atsdcf-services",
                    "status": "cancelled",
                    "type": "build",
                    "stopped_at": "2020-07-01T17:01:09Z"
                },
                {
                    "dependencies": [
                        "785cb1a3-a263-4a0a-9305-da92730b9a48"
                    ],
                    "job_number": 381,
                    "id": "a9a6d75c-ed4c-4905-a313-85800f1b0033",
                    "started_at": "2020-07-01T17:01:15Z",
                    "name": "Deploy dev",
                    "project_slug": "gh/ITV/atsdcf-services",
                    "status": "running",
                    "type": "build",
                    "stopped_at": "2020-07-01T17:03:35Z"
                },
                {
                    "dependencies": [
                        "785cb1a3-a263-4a0a-9305-da92730b9a48"
                    ],
                    "id": "28d16e58-a5d1-4dfa-a38f-67a968d9f61e",
                    "started_at": null,
                    "name": "Approve UAT deployment",
                    "approved_by": "f9af2aaa-91be-473d-8761-97b0cf9ec6f5",
                    "project_slug": "gh/ITV/atsdcf-services",
                    "status": "success",
                    "type": "approval",
                    "approval_request_id": "28d16e58-a5d1-4dfa-a38f-67a968d9f61e"
                },
                {
                    "dependencies": [
                        "28d16e58-a5d1-4dfa-a38f-67a968d9f61e"
                    ],
                    "job_number": 382,
                    "id": "9e657101-18e3-472f-9607-22c47cbc5670",
                    "started_at": "2020-07-01T17:04:34Z",
                    "name": "Deploy uat",
                    "project_slug": "gh/ITV/atsdcf-services",
                    "status": "success",
                    "type": "build",
                    "stopped_at": "2020-07-01T17:06:30Z"
                }
            ]
        }
    }

    return apiData;
}

interface FollowedProjectsData {
    branches: { [key: string]: any }
    oss: boolean
    reponame: string
    parallel: number
    username: string
    has_usable_key: boolean
    vcs_type: string
    language: string | null
    vcs_url: string
    following: boolean
    default_branch: string
}

interface FollowedProjects {
    branches: string[]
    projectName: string
}

function useFollowedProjects() {
    const initialApiData: FollowedProjectsData[] = [];

    async function getApiData(): Promise<FollowedProjectsData[]> {
        if (inMockMode) {
            return await getFollowedProjects();

        } else {
            return await get<FollowedProjectsData[]>("http://localhost:4000/projects");
        }
    }

    const [apiData, setApiData] = useState(initialApiData);
    useEffect(() => {
        const loadApiData = async () => {
            const apiData = await getApiData();
            setApiData(apiData);
        }
        loadApiData();
    }, [])

    async function getFollowedProjects(): Promise<FollowedProjectsData[]> {
        return [
            {
                "branches": {
                    "master": {
                        "latest_workflows": {
                            "Build%20Error": {
                                "status": "failed",
                                "created_at": "2020-06-26T08:48:46.498Z",
                                "id": "4fa2454a-b043-4cca-9115-910edf380d67"
                            }
                        },
                        "pusher_logins": [
                            "harshimoola",
                            "lewissaunders1"
                        ],
                        "running_builds": [],
                        "recent_builds": [
                            {
                                "outcome": "failed",
                                "status": "failed",
                                "build_num": 93,
                                "vcs_revision": "1c0722b394466878558a180abf10b05cbcd51b03",
                                "pushed_at": "2020-06-26T08:48:46.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-06-26T08:48:55.927Z"
                            },
                            {
                                "outcome": "failed",
                                "status": "failed",
                                "build_num": 91,
                                "vcs_revision": "26b888d8d07aff066036f88448caafd1ca4b390b",
                                "pushed_at": "2020-06-23T15:59:09.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-06-23T15:59:18.589Z"
                            },
                            {
                                "outcome": "failed",
                                "status": "failed",
                                "build_num": 86,
                                "vcs_revision": "fdb8a8f8ca5b7e7085e2f73a1c3c69a7b20fc650",
                                "pushed_at": "2020-05-14T09:21:38.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-05-14T09:21:46.155Z"
                            },
                            {
                                "outcome": "failed",
                                "status": "failed",
                                "build_num": 1,
                                "vcs_revision": "1a25a38d42260520d9af8496e73d23f0f4e75bd8",
                                "pushed_at": "2020-04-27T22:59:10.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-04-27T22:59:29.684Z"
                            }
                        ],
                        "last_non_success": {
                            "outcome": "failed",
                            "status": "failed",
                            "build_num": 93,
                            "vcs_revision": "1c0722b394466878558a180abf10b05cbcd51b03",
                            "pushed_at": "2020-06-26T08:48:46.000Z",
                            "is_workflow_job": true,
                            "is_2_0_job": true,
                            "added_at": "2020-06-26T08:48:55.927Z"
                        },
                        "latest_completed_workflows": {
                            "Build%20Error": {
                                "status": "failed",
                                "created_at": "2020-06-26T08:48:46.498Z",
                                "id": "4fa2454a-b043-4cca-9115-910edf380d67"
                            }
                        },
                        "is_using_workflows": true
                    },
                    "AC-1402": {
                        "latest_workflows": {
                            "Build%2C%20Test%20%26%20Run": {
                                "status": "failed",
                                "created_at": "2020-05-01T10:53:50.747Z",
                                "id": "563680ef-50ff-4338-aa62-6a275b4d26cf"
                            },
                            "Build%20Error": {
                                "status": "failed",
                                "created_at": "2020-06-30T16:15:12.232Z",
                                "id": "981858e9-13d8-45ac-9e47-259716f6300e"
                            },
                            "CI%20Build%2C%20Deploy": {
                                "status": "success",
                                "created_at": "2020-05-05T13:33:31.943Z",
                                "id": "798fb2d3-4dcb-45d6-acb6-70e90319b2c6"
                            },
                            "UAT%20Build%2C%20Deploy": {
                                "status": "success",
                                "created_at": "2020-05-05T13:33:31.944Z",
                                "id": "1a5a1c1e-6835-46b9-88e6-65383ebd83d2"
                            },
                            "Build%20and%20deploy": {
                                "status": "on_hold",
                                "created_at": "2020-07-10T17:11:42.129Z",
                                "id": "93b6eeae-4467-4cb6-b972-f03bb64dff45"
                            },
                            "E2E%20tests": {
                                "status": "success",
                                "created_at": "2020-07-10T17:32:43.701Z",
                                "id": "204e1d00-c756-47e4-aa61-cd7d2e2df434"
                            }
                        },
                        "pusher_logins": [
                            "harshimoola",
                            "LaszloBogacsi",
                            "andyduncanitv"
                        ],
                        "running_builds": [],
                        "recent_builds": [
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 134,
                                "vcs_revision": "c9d332dcf3ab42d79e7f6b82b3318ce5f994234d",
                                "pushed_at": "2020-07-10T17:32:43.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-10T17:33:17.999Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 133,
                                "vcs_revision": "c9d332dcf3ab42d79e7f6b82b3318ce5f994234d",
                                "pushed_at": "2020-07-10T17:32:43.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-10T17:32:57.664Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 132,
                                "vcs_revision": "c9d332dcf3ab42d79e7f6b82b3318ce5f994234d",
                                "pushed_at": "2020-07-10T17:13:28.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-10T17:14:07.252Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 131,
                                "vcs_revision": "c9d332dcf3ab42d79e7f6b82b3318ce5f994234d",
                                "pushed_at": "2020-07-10T17:13:28.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-10T17:13:55.432Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 130,
                                "vcs_revision": "c9d332dcf3ab42d79e7f6b82b3318ce5f994234d",
                                "pushed_at": "2020-07-10T17:11:41.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-10T17:13:11.387Z"
                            }
                        ],
                        "last_non_success": {
                            "outcome": "failed",
                            "status": "failed",
                            "build_num": 99,
                            "vcs_revision": "f8a6c13bc0389b5905eb8a918aab28c069897f88",
                            "pushed_at": "2020-06-30T16:21:50.000Z",
                            "is_workflow_job": true,
                            "is_2_0_job": true,
                            "added_at": "2020-06-30T16:23:53.229Z"
                        },
                        "latest_completed_workflows": {
                            "Build%2C%20Test%20%26%20Run": {
                                "status": "failed",
                                "created_at": "2020-05-01T10:53:50.747Z",
                                "id": "563680ef-50ff-4338-aa62-6a275b4d26cf"
                            },
                            "Build%20Error": {
                                "status": "failed",
                                "created_at": "2020-06-30T16:15:12.232Z",
                                "id": "981858e9-13d8-45ac-9e47-259716f6300e"
                            },
                            "UAT%20Build%2C%20Deploy": {
                                "status": "success",
                                "created_at": "2020-05-05T13:33:31.944Z",
                                "id": "1a5a1c1e-6835-46b9-88e6-65383ebd83d2"
                            },
                            "CI%20Build%2C%20Deploy": {
                                "status": "success",
                                "created_at": "2020-05-05T13:33:31.943Z",
                                "id": "798fb2d3-4dcb-45d6-acb6-70e90319b2c6"
                            },
                            "Build%20and%20deploy": {
                                "status": "success",
                                "created_at": "2020-07-08T15:14:14.948Z",
                                "id": "dc24bde5-5f4e-4ba1-99f2-7b5437e0dab0"
                            },
                            "E2E%20tests": {
                                "status": "success",
                                "created_at": "2020-07-10T17:32:43.701Z",
                                "id": "204e1d00-c756-47e4-aa61-cd7d2e2df434"
                            }
                        },
                        "last_success": {
                            "outcome": "success",
                            "status": "success",
                            "build_num": 134,
                            "vcs_revision": "c9d332dcf3ab42d79e7f6b82b3318ce5f994234d",
                            "pushed_at": "2020-07-10T17:32:43.000Z",
                            "is_workflow_job": true,
                            "is_2_0_job": true,
                            "added_at": "2020-07-10T17:33:17.999Z"
                        },
                        "is_using_workflows": true
                    }
                },
                "oss": false,
                "reponame": "atsdcf-ui",
                "parallel": 1,
                "username": "ITV",
                "has_usable_key": false,
                "vcs_type": "github",
                "language": null,
                "vcs_url": "https://github.com/ITV/atsdcf-ui",
                "following": true,
                "default_branch": "master"
            },
            {
                "branches": {
                    "master": {
                        "latest_workflows": {
                            "Build%20Error": {
                                "status": "failed",
                                "created_at": "2020-06-03T15:34:55.470Z",
                                "id": "86768912-e2c0-4910-9a34-2fc27d2364a7"
                            }
                        },
                        "pusher_logins": [
                            "harshimoola"
                        ],
                        "running_builds": [],
                        "recent_builds": [
                            {
                                "outcome": "failed",
                                "status": "failed",
                                "build_num": 155,
                                "vcs_revision": "7fef4fa14e6519f15bb492e134ffb3f98907c9bc",
                                "pushed_at": "2020-06-03T15:34:55.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-06-03T15:35:19.093Z"
                            },
                            {
                                "outcome": "failed",
                                "status": "failed",
                                "build_num": 152,
                                "vcs_revision": "b22b151978110c2908471e2661718b660ee17e73",
                                "pushed_at": "2020-05-20T14:57:30.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-05-20T14:57:46.344Z"
                            },
                            {
                                "outcome": "failed",
                                "status": "failed",
                                "build_num": 1,
                                "vcs_revision": "5f6f1fba528327e9b3bfb1a973ea1c59e6353daf",
                                "pushed_at": "2020-04-28T22:04:10.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-04-28T22:04:15.976Z"
                            }
                        ],
                        "last_non_success": {
                            "outcome": "failed",
                            "status": "failed",
                            "build_num": 155,
                            "vcs_revision": "7fef4fa14e6519f15bb492e134ffb3f98907c9bc",
                            "pushed_at": "2020-06-03T15:34:55.000Z",
                            "is_workflow_job": true,
                            "is_2_0_job": true,
                            "added_at": "2020-06-03T15:35:19.093Z"
                        },
                        "latest_completed_workflows": {
                            "Build%20Error": {
                                "status": "failed",
                                "created_at": "2020-06-03T15:34:55.470Z",
                                "id": "86768912-e2c0-4910-9a34-2fc27d2364a7"
                            }
                        },
                        "is_using_workflows": true
                    },
                    "AC-1402-cato-environment": {
                        "latest_workflows": {
                            "Build%20Error": {
                                "status": "failed",
                                "created_at": "2020-07-10T17:24:03.304Z",
                                "id": "4e552503-a486-49d6-96ca-489a2da17502"
                            },
                            "Build%2C%20Test%20%26%20Run": {
                                "status": "success",
                                "created_at": "2020-07-10T17:24:45.527Z",
                                "id": "0ef3ef3c-bcb8-4606-b53f-b11d6eeb3072"
                            },
                            "Infra": {
                                "status": "running",
                                "created_at": "2020-05-21T08:23:47.717Z",
                                "id": "6d2352e3-c0bd-443e-b4d0-0e71ee14d7b1"
                            }
                        },
                        "pusher_logins": [
                            "harshimoola",
                            "LaszloBogacsi",
                            "andyduncanitv"
                        ],
                        "running_builds": [],
                        "recent_builds": [
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 438,
                                "vcs_revision": "7c0849876fce6fc91c701eb3a810873788c92bc9",
                                "pushed_at": "2020-07-10T17:24:45.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-10T17:37:42.574Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 437,
                                "vcs_revision": "7c0849876fce6fc91c701eb3a810873788c92bc9",
                                "pushed_at": "2020-07-10T17:24:45.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-10T17:36:51.066Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 436,
                                "vcs_revision": "7c0849876fce6fc91c701eb3a810873788c92bc9",
                                "pushed_at": "2020-07-10T17:24:45.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-10T17:32:43.801Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 435,
                                "vcs_revision": "7c0849876fce6fc91c701eb3a810873788c92bc9",
                                "pushed_at": "2020-07-10T17:24:45.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-10T17:32:52.758Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 434,
                                "vcs_revision": "7c0849876fce6fc91c701eb3a810873788c92bc9",
                                "pushed_at": "2020-07-10T17:24:45.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-10T17:32:37.675Z"
                            }
                        ],
                        "last_non_success": {
                            "outcome": "failed",
                            "status": "failed",
                            "build_num": 429,
                            "vcs_revision": "a80b1e06385a80bd2c4024f9819ea80ccf2016c6",
                            "pushed_at": "2020-07-10T17:24:03.000Z",
                            "is_workflow_job": true,
                            "is_2_0_job": true,
                            "added_at": "2020-07-10T17:24:10.958Z"
                        },
                        "latest_completed_workflows": {
                            "Build%20Error": {
                                "status": "failed",
                                "created_at": "2020-07-10T17:24:03.304Z",
                                "id": "4e552503-a486-49d6-96ca-489a2da17502"
                            },
                            "Build%2C%20Test%20%26%20Run": {
                                "status": "success",
                                "created_at": "2020-07-10T17:24:45.527Z",
                                "id": "0ef3ef3c-bcb8-4606-b53f-b11d6eeb3072"
                            }
                        },
                        "last_success": {
                            "outcome": "success",
                            "status": "success",
                            "build_num": 438,
                            "vcs_revision": "7c0849876fce6fc91c701eb3a810873788c92bc9",
                            "pushed_at": "2020-07-10T17:24:45.000Z",
                            "is_workflow_job": true,
                            "is_2_0_job": true,
                            "added_at": "2020-07-10T17:37:42.574Z"
                        },
                        "is_using_workflows": true
                    }
                },
                "oss": false,
                "reponame": "atsdcf-services",
                "parallel": 1,
                "username": "ITV",
                "has_usable_key": false,
                "vcs_type": "github",
                "language": null,
                "vcs_url": "https://github.com/ITV/atsdcf-services",
                "following": true,
                "default_branch": "master"
            },
            {
                "branches": {
                    "master": {
                        "latest_workflows": {
                            "Build%20Error": {
                                "status": "failed",
                                "created_at": "2019-04-29T20:48:07.637Z",
                                "id": "bca9b85f-c548-4fc0-9467-146de67ad254"
                            },
                            "Welcome": {
                                "status": "success",
                                "created_at": "2019-04-28T15:00:56.231Z",
                                "id": "78c2d59b-6a16-41c2-b0b7-86db61620b72"
                            },
                            "CI_BUILD": {
                                "status": "success",
                                "created_at": "2019-05-27T12:46:38.029Z",
                                "id": "4c08eab4-0db7-4897-9fe2-7bfac4532b73"
                            }
                        },
                        "pusher_logins": [
                            "LaszloBogacsi"
                        ],
                        "running_builds": [],
                        "recent_builds": [
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 36,
                                "vcs_revision": "23a9a72dbf25f46247d529e6270dd840a5319af2",
                                "pushed_at": "2019-05-27T12:46:37.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2019-05-27T12:48:30.431Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 35,
                                "vcs_revision": "74532c198a65a1d2896b035bdee755ebcc2eae99",
                                "pushed_at": "2019-05-26T19:22:54.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2019-05-26T19:24:16.878Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 34,
                                "vcs_revision": "363fe9548e566d258d74f1b988a4f6f22c051572",
                                "pushed_at": "2019-05-23T22:38:14.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2019-05-23T22:39:50.297Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 33,
                                "vcs_revision": "a6504b2310fca0e1f9b8ec4ab0a4538ca75985c2",
                                "pushed_at": "2019-05-21T21:46:08.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2019-05-21T21:47:43.382Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 32,
                                "vcs_revision": "a9c9ebc4ea13edba008aed981d664ab0f4e1b872",
                                "pushed_at": "2019-05-21T21:29:27.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2019-05-21T21:31:02.954Z"
                            }
                        ],
                        "last_non_success": {
                            "outcome": "failed",
                            "status": "failed",
                            "build_num": 15,
                            "vcs_revision": "3fbe6f91b478534aabf677de2a14f0b0fe61aaac",
                            "pushed_at": "2019-05-05T18:38:53.000Z",
                            "is_workflow_job": true,
                            "is_2_0_job": true,
                            "added_at": "2019-05-05T18:39:58.385Z"
                        },
                        "latest_completed_workflows": {
                            "Build%20Error": {
                                "status": "failed",
                                "created_at": "2019-04-29T20:48:07.637Z",
                                "id": "bca9b85f-c548-4fc0-9467-146de67ad254"
                            },
                            "Welcome": {
                                "status": "success",
                                "created_at": "2019-04-28T15:00:56.231Z",
                                "id": "78c2d59b-6a16-41c2-b0b7-86db61620b72"
                            },
                            "CI_BUILD": {
                                "status": "success",
                                "created_at": "2019-05-27T12:46:38.029Z",
                                "id": "4c08eab4-0db7-4897-9fe2-7bfac4532b73"
                            }
                        },
                        "last_success": {
                            "outcome": "success",
                            "status": "success",
                            "build_num": 36,
                            "vcs_revision": "23a9a72dbf25f46247d529e6270dd840a5319af2",
                            "pushed_at": "2019-05-27T12:46:37.000Z",
                            "is_workflow_job": true,
                            "is_2_0_job": true,
                            "added_at": "2019-05-27T12:48:30.431Z"
                        },
                        "is_using_workflows": true
                    }
                },
                "oss": false,
                "reponame": "simpletasktracker",
                "parallel": 1,
                "username": "LaszloBogacsi",
                "has_usable_key": false,
                "vcs_type": "github",
                "language": null,
                "vcs_url": "https://github.com/LaszloBogacsi/simpletasktracker",
                "following": true,
                "default_branch": "master"
            },
            {
                "branches": {
                    "master": {
                        "latest_workflows": {
                            "build_and_deploy": {
                                "status": "success",
                                "created_at": "2019-10-30T18:06:56.828Z",
                                "id": "1e2218d8-3a08-4e7f-86d1-b822e41f1a63"
                            },
                            "Build%20Error": {
                                "status": "failed",
                                "created_at": "2019-10-29T13:16:20.489Z",
                                "id": "0af68f63-886d-4121-8b94-c59b4d0f7ac4"
                            }
                        },
                        "pusher_logins": [
                            "LaszloBogacsi"
                        ],
                        "running_builds": [],
                        "recent_builds": [
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 120,
                                "vcs_revision": "91746db4cf195a9b68db98fa6dc77d5a44557d03",
                                "pushed_at": "2019-10-30T16:59:04.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2019-10-30T18:12:11.760Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 119,
                                "vcs_revision": "91746db4cf195a9b68db98fa6dc77d5a44557d03",
                                "pushed_at": "2019-10-30T16:59:04.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2019-10-30T18:09:36.653Z"
                            },
                            {
                                "outcome": "failed",
                                "status": "failed",
                                "build_num": 118,
                                "vcs_revision": "91746db4cf195a9b68db98fa6dc77d5a44557d03",
                                "pushed_at": "2019-10-30T16:59:04.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2019-10-30T18:02:43.298Z"
                            },
                            {
                                "outcome": "failed",
                                "status": "failed",
                                "build_num": 117,
                                "vcs_revision": "91746db4cf195a9b68db98fa6dc77d5a44557d03",
                                "pushed_at": "2019-10-30T16:59:04.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2019-10-30T17:47:09.721Z"
                            },
                            {
                                "outcome": "failed",
                                "status": "failed",
                                "build_num": 116,
                                "vcs_revision": "91746db4cf195a9b68db98fa6dc77d5a44557d03",
                                "pushed_at": "2019-10-30T16:59:04.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2019-10-30T17:44:47.475Z"
                            }
                        ],
                        "last_non_success": {
                            "outcome": "failed",
                            "status": "failed",
                            "build_num": 118,
                            "vcs_revision": "91746db4cf195a9b68db98fa6dc77d5a44557d03",
                            "pushed_at": "2019-10-30T16:59:04.000Z",
                            "is_workflow_job": true,
                            "is_2_0_job": true,
                            "added_at": "2019-10-30T18:02:43.298Z"
                        },
                        "latest_completed_workflows": {
                            "build_and_deploy": {
                                "status": "success",
                                "created_at": "2019-10-30T18:06:56.828Z",
                                "id": "1e2218d8-3a08-4e7f-86d1-b822e41f1a63"
                            },
                            "Build%20Error": {
                                "status": "failed",
                                "created_at": "2019-10-29T13:16:20.489Z",
                                "id": "0af68f63-886d-4121-8b94-c59b4d0f7ac4"
                            }
                        },
                        "last_success": {
                            "outcome": "success",
                            "status": "success",
                            "build_num": 120,
                            "vcs_revision": "91746db4cf195a9b68db98fa6dc77d5a44557d03",
                            "pushed_at": "2019-10-30T16:59:04.000Z",
                            "is_workflow_job": true,
                            "is_2_0_job": true,
                            "added_at": "2019-10-30T18:12:11.760Z"
                        },
                        "is_using_workflows": true
                    }
                },
                "oss": true,
                "reponame": "home-hub-lambda",
                "parallel": 1,
                "username": "LaszloBogacsi",
                "has_usable_key": false,
                "vcs_type": "github",
                "language": null,
                "vcs_url": "https://github.com/LaszloBogacsi/home-hub-lambda",
                "following": true,
                "default_branch": "master"
            },
            {
                "branches": {
                    "master": {
                        "latest_workflows": {
                            "Build%20Error": {
                                "status": "running",
                                "created_at": "2019-09-24T11:10:33.595Z",
                                "id": "25e26597-20de-4dac-b123-59e006bd0baa"
                            },
                            "workflow": {
                                "status": "success",
                                "created_at": "2019-09-19T09:47:58.230Z",
                                "id": "b0c3e4f0-add4-4e13-8f02-7e15ecf7971f"
                            },
                            "build_and_deploy": {
                                "status": "success",
                                "created_at": "2019-10-04T16:03:24.545Z",
                                "id": "c6fea704-8301-4f88-a4e4-89f9eae4a7cd"
                            }
                        },
                        "pusher_logins": [
                            "harshimoola"
                        ],
                        "running_builds": [],
                        "recent_builds": [
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 428,
                                "vcs_revision": "7b10d377849cfdf6da4708fba27e14a91ece0735",
                                "pushed_at": "2019-10-04T16:03:24.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2019-10-04T16:10:27.714Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 427,
                                "vcs_revision": "7b10d377849cfdf6da4708fba27e14a91ece0735",
                                "pushed_at": "2019-10-04T16:03:24.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2019-10-04T16:09:39.280Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 426,
                                "vcs_revision": "7b10d377849cfdf6da4708fba27e14a91ece0735",
                                "pushed_at": "2019-10-04T16:03:24.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2019-10-04T16:08:03.912Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 425,
                                "vcs_revision": "7b10d377849cfdf6da4708fba27e14a91ece0735",
                                "pushed_at": "2019-10-04T16:03:24.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2019-10-04T16:06:58.632Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 424,
                                "vcs_revision": "7b10d377849cfdf6da4708fba27e14a91ece0735",
                                "pushed_at": "2019-10-04T16:03:24.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2019-10-04T16:05:13.000Z"
                            }
                        ],
                        "last_non_success": {
                            "outcome": "failed",
                            "status": "failed",
                            "build_num": 398,
                            "vcs_revision": "05adb2abfb12fbbecd19b6fd8786edaa97885edd",
                            "pushed_at": "2019-10-02T16:38:16.000Z",
                            "is_workflow_job": true,
                            "is_2_0_job": true,
                            "added_at": "2019-10-04T10:05:07.334Z"
                        },
                        "latest_completed_workflows": {
                            "Build%20Error": {
                                "status": "failed",
                                "created_at": "2019-09-24T11:06:54.291Z",
                                "id": "8e7fbdad-a863-4836-aee1-d0d16a3e4a28"
                            },
                            "workflow": {
                                "status": "success",
                                "created_at": "2019-09-19T09:47:58.230Z",
                                "id": "b0c3e4f0-add4-4e13-8f02-7e15ecf7971f"
                            },
                            "build_and_deploy": {
                                "status": "success",
                                "created_at": "2019-10-04T16:03:24.545Z",
                                "id": "c6fea704-8301-4f88-a4e4-89f9eae4a7cd"
                            }
                        },
                        "last_success": {
                            "outcome": "success",
                            "status": "success",
                            "build_num": 428,
                            "vcs_revision": "7b10d377849cfdf6da4708fba27e14a91ece0735",
                            "pushed_at": "2019-10-04T16:03:24.000Z",
                            "is_workflow_job": true,
                            "is_2_0_job": true,
                            "added_at": "2019-10-04T16:10:27.714Z"
                        },
                        "is_using_workflows": true
                    }
                },
                "oss": false,
                "reponame": "askitvlambdas",
                "parallel": 1,
                "username": "ITV",
                "has_usable_key": false,
                "vcs_type": "github",
                "language": null,
                "vcs_url": "https://github.com/ITV/askitvlambdas",
                "following": true,
                "default_branch": "master"
            },
            {
                "branches": {
                    "master": {
                        "latest_workflows": {
                            "Build%20Error": {
                                "status": "failed",
                                "created_at": "2019-09-19T11:22:02.426Z",
                                "id": "759c76ec-d87c-4056-a049-000ed3e3b72f"
                            },
                            "build_and_deploy": {
                                "status": "success",
                                "created_at": "2019-10-04T09:53:18.750Z",
                                "id": "0941e42a-dc8d-44d8-90ca-244e6e0b87d3"
                            }
                        },
                        "pusher_logins": [
                            "harshimoola"
                        ],
                        "running_builds": [],
                        "recent_builds": [
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 45,
                                "vcs_revision": "85c753ffb198c69b58dbe65336207916e9b15801",
                                "pushed_at": "2019-10-01T10:58:02.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2019-10-04T09:54:14.454Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 44,
                                "vcs_revision": "85c753ffb198c69b58dbe65336207916e9b15801",
                                "pushed_at": "2019-10-01T10:58:02.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2019-10-01T10:58:33.968Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 42,
                                "vcs_revision": "c98b4717b83ca3b8a319e45a24e426d2aca01199",
                                "pushed_at": "2019-09-23T09:57:57.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2019-09-23T09:58:20.582Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 41,
                                "vcs_revision": "8cc1844fa6fdf5b096f6817745cd5a1c4da2d402",
                                "pushed_at": "2019-09-23T09:55:09.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2019-09-23T09:55:31.841Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 40,
                                "vcs_revision": "f5f3fb30c9b26ee5f28b76ac3b00eeb4c63e1321",
                                "pushed_at": "2019-09-23T09:16:44.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2019-09-23T09:22:11.864Z"
                            }
                        ],
                        "last_non_success": {
                            "outcome": "failed",
                            "status": "failed",
                            "build_num": 39,
                            "vcs_revision": "f5f3fb30c9b26ee5f28b76ac3b00eeb4c63e1321",
                            "pushed_at": "2019-09-23T09:16:44.000Z",
                            "is_workflow_job": true,
                            "is_2_0_job": true,
                            "added_at": "2019-09-23T09:17:06.334Z"
                        },
                        "latest_completed_workflows": {
                            "Build%20Error": {
                                "status": "failed",
                                "created_at": "2019-09-19T11:22:02.426Z",
                                "id": "759c76ec-d87c-4056-a049-000ed3e3b72f"
                            },
                            "build_and_deploy": {
                                "status": "success",
                                "created_at": "2019-10-04T09:53:18.750Z",
                                "id": "0941e42a-dc8d-44d8-90ca-244e6e0b87d3"
                            }
                        },
                        "last_success": {
                            "outcome": "success",
                            "status": "success",
                            "build_num": 45,
                            "vcs_revision": "85c753ffb198c69b58dbe65336207916e9b15801",
                            "pushed_at": "2019-10-01T10:58:02.000Z",
                            "is_workflow_job": true,
                            "is_2_0_job": true,
                            "added_at": "2019-10-04T09:54:14.454Z"
                        },
                        "is_using_workflows": true
                    }
                },
                "oss": false,
                "reponame": "askitv-common-infra",
                "parallel": 1,
                "username": "ITV",
                "has_usable_key": false,
                "vcs_type": "github",
                "language": null,
                "vcs_url": "https://github.com/ITV/askitv-common-infra",
                "following": true,
                "default_branch": "master"
            },
            {
                "branches": {
                    "master": {
                        "latest_workflows": {
                            "workflow": {
                                "status": "failed",
                                "created_at": "2019-09-23T10:26:02.363Z",
                                "id": "81dfe12f-5ecf-4604-9cb5-58e074975a13"
                            },
                            "build_and_push_image": {
                                "status": "success",
                                "created_at": "2019-09-23T14:05:57.498Z",
                                "id": "ab493ebe-0edd-478b-b330-69cf387228f0"
                            },
                            "Build%20Error": {
                                "status": "failed",
                                "created_at": "2019-10-01T16:23:21.298Z",
                                "id": "b68ba010-da32-46d5-86ae-76837966dc3f"
                            },
                            "build_push_image_and_deploy": {
                                "status": "success",
                                "created_at": "2019-10-04T15:35:04.330Z",
                                "id": "5a3f71a7-f06a-46ed-90df-83bbdba85979"
                            }
                        },
                        "pusher_logins": [
                            "LaszloBogacsi",
                            "harshimoola"
                        ],
                        "running_builds": [],
                        "recent_builds": [
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 155,
                                "vcs_revision": "827d91a1b39b642fac3d6cf3a9df8c6bdce75845",
                                "pushed_at": "2019-10-04T15:35:04.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2019-10-04T15:49:34.478Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 154,
                                "vcs_revision": "827d91a1b39b642fac3d6cf3a9df8c6bdce75845",
                                "pushed_at": "2019-10-04T15:35:04.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2019-10-04T15:48:57.273Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 153,
                                "vcs_revision": "827d91a1b39b642fac3d6cf3a9df8c6bdce75845",
                                "pushed_at": "2019-10-04T15:35:04.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2019-10-04T15:48:35.611Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 152,
                                "vcs_revision": "827d91a1b39b642fac3d6cf3a9df8c6bdce75845",
                                "pushed_at": "2019-10-04T15:35:04.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2019-10-04T15:47:14.722Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 151,
                                "vcs_revision": "827d91a1b39b642fac3d6cf3a9df8c6bdce75845",
                                "pushed_at": "2019-10-04T15:35:04.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2019-10-04T15:45:17.186Z"
                            }
                        ],
                        "last_non_success": {
                            "outcome": "failed",
                            "status": "failed",
                            "build_num": 150,
                            "vcs_revision": "44eb54fbb78e6a8f26ee4cf5b1a5e6739960f585",
                            "pushed_at": "2019-10-02T16:32:13.000Z",
                            "is_workflow_job": true,
                            "is_2_0_job": true,
                            "added_at": "2019-10-04T15:27:12.625Z"
                        },
                        "latest_completed_workflows": {
                            "workflow": {
                                "status": "failed",
                                "created_at": "2019-09-23T10:26:02.363Z",
                                "id": "81dfe12f-5ecf-4604-9cb5-58e074975a13"
                            },
                            "build_and_push_image": {
                                "status": "success",
                                "created_at": "2019-09-23T14:05:57.498Z",
                                "id": "ab493ebe-0edd-478b-b330-69cf387228f0"
                            },
                            "Build%20Error": {
                                "status": "failed",
                                "created_at": "2019-10-01T16:23:21.298Z",
                                "id": "b68ba010-da32-46d5-86ae-76837966dc3f"
                            },
                            "build_push_image_and_deploy": {
                                "status": "success",
                                "created_at": "2019-10-04T15:35:04.330Z",
                                "id": "5a3f71a7-f06a-46ed-90df-83bbdba85979"
                            }
                        },
                        "last_success": {
                            "outcome": "success",
                            "status": "success",
                            "build_num": 155,
                            "vcs_revision": "827d91a1b39b642fac3d6cf3a9df8c6bdce75845",
                            "pushed_at": "2019-10-04T15:35:04.000Z",
                            "is_workflow_job": true,
                            "is_2_0_job": true,
                            "added_at": "2019-10-04T15:49:34.478Z"
                        },
                        "is_using_workflows": true
                    }
                },
                "oss": false,
                "reponame": "askitv-services",
                "parallel": 1,
                "username": "ITV",
                "has_usable_key": false,
                "vcs_type": "github",
                "language": null,
                "vcs_url": "https://github.com/ITV/askitv-services",
                "following": true,
                "default_branch": "master"
            },
            {
                "branches": {
                    "master": {
                        "latest_workflows": {
                            "Build%20Error": {
                                "status": "failed",
                                "created_at": "2019-11-05T17:06:41.047Z",
                                "id": "a3d944e6-f6c5-453d-916a-e5ae1829ea6a"
                            },
                            "Build%20and%20deploy": {
                                "status": "success",
                                "created_at": "2019-11-01T12:29:42.260Z",
                                "id": "502ed20c-ecb9-477b-8d38-10318ad814aa"
                            },
                            "Build%2C%20Test%20%26%20Run": {
                                "status": "success",
                                "created_at": "2020-04-24T06:15:23.447Z",
                                "id": "7ce8ab77-dd5c-429d-8a72-b4b42a4d8424"
                            }
                        },
                        "pusher_logins": [
                            "LaszloBogacsi",
                            "andyduncanitv",
                            "harshimoola",
                            "vyusuf",
                            "Jackil-Rajnicant",
                            "VeronicaOliveira",
                            "xiii",
                            "lewissaunders1"
                        ],
                        "running_builds": [],
                        "recent_builds": [
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 800,
                                "vcs_revision": "6e56adf6c5f755f214ef34dee112de183410a88f",
                                "pushed_at": "2020-04-23T23:20:27.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-04-24T06:18:47.491Z"
                            },
                            {
                                "outcome": "failed",
                                "status": "failed",
                                "build_num": 799,
                                "vcs_revision": "6e56adf6c5f755f214ef34dee112de183410a88f",
                                "pushed_at": "2020-04-23T23:20:27.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-04-23T23:55:29.768Z"
                            },
                            {
                                "outcome": "failed",
                                "status": "failed",
                                "build_num": 798,
                                "vcs_revision": "6e56adf6c5f755f214ef34dee112de183410a88f",
                                "pushed_at": "2020-04-23T23:20:27.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-04-23T23:26:43.732Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 797,
                                "vcs_revision": "6e56adf6c5f755f214ef34dee112de183410a88f",
                                "pushed_at": "2020-04-23T23:20:27.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-04-23T23:26:19.248Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 796,
                                "vcs_revision": "6e56adf6c5f755f214ef34dee112de183410a88f",
                                "pushed_at": "2020-04-23T23:20:27.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-04-23T23:23:52.826Z"
                            }
                        ],
                        "last_non_success": {
                            "outcome": "failed",
                            "status": "failed",
                            "build_num": 799,
                            "vcs_revision": "6e56adf6c5f755f214ef34dee112de183410a88f",
                            "pushed_at": "2020-04-23T23:20:27.000Z",
                            "is_workflow_job": true,
                            "is_2_0_job": true,
                            "added_at": "2020-04-23T23:55:29.768Z"
                        },
                        "latest_completed_workflows": {
                            "Build%20Error": {
                                "status": "failed",
                                "created_at": "2019-11-05T17:06:41.047Z",
                                "id": "a3d944e6-f6c5-453d-916a-e5ae1829ea6a"
                            },
                            "Build%20and%20deploy": {
                                "status": "success",
                                "created_at": "2019-11-01T12:29:42.260Z",
                                "id": "502ed20c-ecb9-477b-8d38-10318ad814aa"
                            },
                            "Build%2C%20Test%20%26%20Run": {
                                "status": "success",
                                "created_at": "2020-04-24T06:15:23.447Z",
                                "id": "7ce8ab77-dd5c-429d-8a72-b4b42a4d8424"
                            }
                        },
                        "last_success": {
                            "outcome": "success",
                            "status": "success",
                            "build_num": 800,
                            "vcs_revision": "6e56adf6c5f755f214ef34dee112de183410a88f",
                            "pushed_at": "2020-04-23T23:20:27.000Z",
                            "is_workflow_job": true,
                            "is_2_0_job": true,
                            "added_at": "2020-04-24T06:18:47.491Z"
                        },
                        "is_using_workflows": true
                    },
                    "integration": {
                        "latest_workflows": {
                            "Build%2C%20Test%20%26%20Run": {
                                "status": "success",
                                "created_at": "2020-04-07T08:52:34.682Z",
                                "id": "ea3229f2-4438-4f47-9315-dee2d3154c70"
                            }
                        },
                        "pusher_logins": [
                            "vyusuf"
                        ],
                        "running_builds": [],
                        "recent_builds": [
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 706,
                                "vcs_revision": "d1ae737eeff99ee9ad1019ce2a6ec48a84997399",
                                "pushed_at": "2020-04-07T08:52:34.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-04-07T08:53:33.683Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 705,
                                "vcs_revision": "d1ae737eeff99ee9ad1019ce2a6ec48a84997399",
                                "pushed_at": "2020-04-07T08:52:34.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-04-07T08:52:55.269Z"
                            }
                        ],
                        "last_success": {
                            "outcome": "success",
                            "status": "success",
                            "build_num": 706,
                            "vcs_revision": "d1ae737eeff99ee9ad1019ce2a6ec48a84997399",
                            "pushed_at": "2020-04-07T08:52:34.000Z",
                            "is_workflow_job": true,
                            "is_2_0_job": true,
                            "added_at": "2020-04-07T08:53:33.683Z"
                        },
                        "latest_completed_workflows": {
                            "Build%2C%20Test%20%26%20Run": {
                                "status": "success",
                                "created_at": "2020-04-07T08:52:34.682Z",
                                "id": "ea3229f2-4438-4f47-9315-dee2d3154c70"
                            }
                        },
                        "is_using_workflows": true
                    }
                },
                "oss": false,
                "reponame": "ats-spice",
                "parallel": 1,
                "username": "ITV",
                "has_usable_key": false,
                "vcs_type": "github",
                "language": null,
                "vcs_url": "https://github.com/ITV/ats-spice",
                "following": true,
                "default_branch": "master"
            },
            {
                "branches": {
                    "master": {
                        "latest_workflows": {
                            "Build%2C%20Test%20%26%20Run": {
                                "status": "success",
                                "created_at": "2020-01-23T17:43:31.326Z",
                                "id": "e9be9c49-f8b6-4fe1-93d0-f1762f3ee3f5"
                            },
                            "Build%20Error": {
                                "status": "failed",
                                "created_at": "2020-01-22T16:21:26.579Z",
                                "id": "7505bf0b-7c80-4278-8c4d-8cd44ae9e190"
                            }
                        },
                        "pusher_logins": [
                            "harshimoola",
                            "LaszloBogacsi"
                        ],
                        "running_builds": [],
                        "recent_builds": [
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 194,
                                "vcs_revision": "d8f944457a7790abb51ac4fcb2f7584baa979a7c",
                                "pushed_at": "2020-01-23T17:43:31.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-01-23T17:45:34.865Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 193,
                                "vcs_revision": "d8f944457a7790abb51ac4fcb2f7584baa979a7c",
                                "pushed_at": "2020-01-23T17:43:31.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-01-23T17:45:02.389Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 192,
                                "vcs_revision": "d8f944457a7790abb51ac4fcb2f7584baa979a7c",
                                "pushed_at": "2020-01-23T17:43:31.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-01-23T17:44:14.493Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 191,
                                "vcs_revision": "d8f944457a7790abb51ac4fcb2f7584baa979a7c",
                                "pushed_at": "2020-01-23T17:43:31.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-01-23T17:44:22.747Z"
                            },
                            {
                                "outcome": "failed",
                                "status": "failed",
                                "build_num": 195,
                                "vcs_revision": "eacf3b4f8d5030b833c612a38a1419c837e026b9",
                                "pushed_at": "2020-01-23T17:41:47.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-01-23T17:44:58.941Z"
                            }
                        ],
                        "last_non_success": {
                            "outcome": "failed",
                            "status": "failed",
                            "build_num": 195,
                            "vcs_revision": "eacf3b4f8d5030b833c612a38a1419c837e026b9",
                            "pushed_at": "2020-01-23T17:41:47.000Z",
                            "is_workflow_job": true,
                            "is_2_0_job": true,
                            "added_at": "2020-01-23T17:44:58.941Z"
                        },
                        "latest_completed_workflows": {
                            "Build%2C%20Test%20%26%20Run": {
                                "status": "success",
                                "created_at": "2020-01-23T17:43:31.326Z",
                                "id": "e9be9c49-f8b6-4fe1-93d0-f1762f3ee3f5"
                            },
                            "Build%20Error": {
                                "status": "failed",
                                "created_at": "2020-01-22T16:21:26.579Z",
                                "id": "7505bf0b-7c80-4278-8c4d-8cd44ae9e190"
                            }
                        },
                        "last_success": {
                            "outcome": "success",
                            "status": "success",
                            "build_num": 194,
                            "vcs_revision": "d8f944457a7790abb51ac4fcb2f7584baa979a7c",
                            "pushed_at": "2020-01-23T17:43:31.000Z",
                            "is_workflow_job": true,
                            "is_2_0_job": true,
                            "added_at": "2020-01-23T17:45:34.865Z"
                        },
                        "is_using_workflows": true
                    }
                },
                "oss": false,
                "reponame": "adtech-inventory-locking",
                "parallel": 1,
                "username": "ITV",
                "has_usable_key": false,
                "vcs_type": "github",
                "language": null,
                "vcs_url": "https://github.com/ITV/adtech-inventory-locking",
                "following": true,
                "default_branch": "master"
            },
            {
                "branches": {
                    "master": {
                        "latest_workflows": {
                            "workflow": {
                                "status": "success",
                                "created_at": "2020-01-29T10:40:59.385Z",
                                "id": "e4c537a4-0d74-43b5-af80-d1d3b11ca215"
                            },
                            "Build%20Error": {
                                "status": "failed",
                                "created_at": "2020-01-28T11:36:12.826Z",
                                "id": "16ecc5e9-7e5f-48a6-867a-fec117091466"
                            }
                        },
                        "pusher_logins": [
                            "harshimoola",
                            "andyduncanitv"
                        ],
                        "running_builds": [],
                        "recent_builds": [
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 26,
                                "vcs_revision": "223a6c803db9427fdd803d848a9ef7e821d65b4d",
                                "pushed_at": "2020-01-29T10:40:59.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-01-29T10:42:39.838Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 25,
                                "vcs_revision": "b0b39b205b425a5c50ac2c0804af310e0b1af752",
                                "pushed_at": "2020-01-29T10:32:28.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-01-29T10:34:11.034Z"
                            },
                            {
                                "outcome": "failed",
                                "status": "failed",
                                "build_num": 24,
                                "vcs_revision": "58c76bfd35e273cb563683a0c3b7495c4a745f3c",
                                "pushed_at": "2020-01-29T10:01:05.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-01-29T10:30:56.761Z"
                            },
                            {
                                "outcome": "failed",
                                "status": "failed",
                                "build_num": 23,
                                "vcs_revision": "58c76bfd35e273cb563683a0c3b7495c4a745f3c",
                                "pushed_at": "2020-01-29T10:01:05.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-01-29T10:02:32.656Z"
                            },
                            {
                                "outcome": "canceled",
                                "status": "canceled",
                                "build_num": 22,
                                "vcs_revision": "231e224a9171fe240219c09e761fda7eac3f8d9e",
                                "pushed_at": "2020-01-28T15:28:57.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-01-28T15:52:47.792Z"
                            }
                        ],
                        "last_non_success": {
                            "outcome": "failed",
                            "status": "failed",
                            "build_num": 24,
                            "vcs_revision": "58c76bfd35e273cb563683a0c3b7495c4a745f3c",
                            "pushed_at": "2020-01-29T10:01:05.000Z",
                            "is_workflow_job": true,
                            "is_2_0_job": true,
                            "added_at": "2020-01-29T10:30:56.761Z"
                        },
                        "latest_completed_workflows": {
                            "workflow": {
                                "status": "success",
                                "created_at": "2020-01-29T10:40:59.385Z",
                                "id": "e4c537a4-0d74-43b5-af80-d1d3b11ca215"
                            },
                            "Build%20Error": {
                                "status": "failed",
                                "created_at": "2020-01-28T11:36:12.826Z",
                                "id": "16ecc5e9-7e5f-48a6-867a-fec117091466"
                            }
                        },
                        "last_success": {
                            "outcome": "success",
                            "status": "success",
                            "build_num": 26,
                            "vcs_revision": "223a6c803db9427fdd803d848a9ef7e821d65b4d",
                            "pushed_at": "2020-01-29T10:40:59.000Z",
                            "is_workflow_job": true,
                            "is_2_0_job": true,
                            "added_at": "2020-01-29T10:42:39.838Z"
                        },
                        "is_using_workflows": true
                    }
                },
                "oss": false,
                "reponame": "inventory-locking-poc",
                "parallel": 1,
                "username": "ITV",
                "has_usable_key": false,
                "vcs_type": "github",
                "language": null,
                "vcs_url": "https://github.com/ITV/inventory-locking-poc",
                "following": true,
                "default_branch": "master"
            },
            {
                "branches": {
                    "master": {
                        "latest_workflows": {
                            "Build%20and%20test": {
                                "status": "success",
                                "created_at": "2020-04-30T10:00:29.306Z",
                                "id": "bdbcd202-ca8e-46df-b406-422e1de1189c"
                            },
                            "Build%20Error": {
                                "status": "failed",
                                "created_at": "2020-04-27T15:49:12.568Z",
                                "id": "22b019c7-55e5-4d4f-8d1e-34acf2b69ace"
                            },
                            "Build%20and%20deploy": {
                                "status": "success",
                                "created_at": "2020-07-08T14:42:57.930Z",
                                "id": "bf69fe9d-cbf5-4f6b-8850-3fa1aa918405"
                            }
                        },
                        "pusher_logins": [
                            "andyduncanitv",
                            "harshimoola",
                            "LaszloBogacsi"
                        ],
                        "running_builds": [],
                        "recent_builds": [
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 243,
                                "vcs_revision": "fddb87329fd2afc616490996d463ce855be5d979",
                                "pushed_at": "2020-07-08T14:42:57.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-08T14:46:01.620Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 242,
                                "vcs_revision": "fddb87329fd2afc616490996d463ce855be5d979",
                                "pushed_at": "2020-07-08T14:42:57.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-08T14:45:40.271Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 241,
                                "vcs_revision": "fddb87329fd2afc616490996d463ce855be5d979",
                                "pushed_at": "2020-07-08T14:42:57.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-08T14:45:34.979Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 240,
                                "vcs_revision": "fddb87329fd2afc616490996d463ce855be5d979",
                                "pushed_at": "2020-07-08T14:42:57.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-08T14:45:27.417Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 239,
                                "vcs_revision": "fddb87329fd2afc616490996d463ce855be5d979",
                                "pushed_at": "2020-07-08T14:42:57.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-08T14:45:47.053Z"
                            }
                        ],
                        "last_success": {
                            "outcome": "success",
                            "status": "success",
                            "build_num": 243,
                            "vcs_revision": "fddb87329fd2afc616490996d463ce855be5d979",
                            "pushed_at": "2020-07-08T14:42:57.000Z",
                            "is_workflow_job": true,
                            "is_2_0_job": true,
                            "added_at": "2020-07-08T14:46:01.620Z"
                        },
                        "latest_completed_workflows": {
                            "Build%20and%20test": {
                                "status": "success",
                                "created_at": "2020-04-30T10:00:29.306Z",
                                "id": "bdbcd202-ca8e-46df-b406-422e1de1189c"
                            },
                            "Build%20Error": {
                                "status": "failed",
                                "created_at": "2020-04-27T15:49:12.568Z",
                                "id": "22b019c7-55e5-4d4f-8d1e-34acf2b69ace"
                            },
                            "Build%20and%20deploy": {
                                "status": "success",
                                "created_at": "2020-07-08T14:42:57.930Z",
                                "id": "bf69fe9d-cbf5-4f6b-8850-3fa1aa918405"
                            }
                        },
                        "last_non_success": {
                            "outcome": "failed",
                            "status": "failed",
                            "build_num": 214,
                            "vcs_revision": "da433c6cc9599fd2b0ef4685af6ef2ea87f45ce8",
                            "pushed_at": "2020-07-06T16:02:40.000Z",
                            "is_workflow_job": true,
                            "is_2_0_job": true,
                            "added_at": "2020-07-06T16:06:45.049Z"
                        },
                        "is_using_workflows": true
                    }
                },
                "oss": false,
                "reponame": "cato-private-s3-static-resources",
                "parallel": 1,
                "username": "ITV",
                "has_usable_key": false,
                "vcs_type": "github",
                "language": null,
                "vcs_url": "https://github.com/ITV/cato-private-s3-static-resources",
                "following": true,
                "default_branch": "master"
            },
            {
                "branches": {
                    "dockerize": {
                        "latest_workflows": {
                            "Build%20Error": {
                                "status": "failed",
                                "created_at": "2020-06-11T12:18:20.090Z",
                                "id": "63f954f8-f89d-4630-b3a5-82c85132faae"
                            }
                        },
                        "pusher_logins": [
                            "LaszloBogacsi"
                        ],
                        "running_builds": [],
                        "recent_builds": [
                            {
                                "outcome": "failed",
                                "status": "failed",
                                "build_num": 7,
                                "vcs_revision": "ffa001277fe73d232c85a0b355775c0dddfd7931",
                                "pushed_at": "2020-06-11T12:18:19.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-06-11T12:18:35.645Z"
                            },
                            {
                                "outcome": "failed",
                                "status": "failed",
                                "build_num": 6,
                                "vcs_revision": "2ead373b114bd3bc2f5e8f733e3d85b84af0f516",
                                "pushed_at": "2020-06-10T11:23:51.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-06-10T11:24:02.691Z"
                            },
                            {
                                "outcome": "failed",
                                "status": "failed",
                                "build_num": 5,
                                "vcs_revision": "5a460c075c1905f50b20127122c340845a3d8ac4",
                                "pushed_at": "2020-06-09T16:00:47.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-06-09T16:01:31.909Z"
                            }
                        ],
                        "last_non_success": {
                            "outcome": "failed",
                            "status": "failed",
                            "build_num": 7,
                            "vcs_revision": "ffa001277fe73d232c85a0b355775c0dddfd7931",
                            "pushed_at": "2020-06-11T12:18:19.000Z",
                            "is_workflow_job": true,
                            "is_2_0_job": true,
                            "added_at": "2020-06-11T12:18:35.645Z"
                        },
                        "latest_completed_workflows": {
                            "Build%20Error": {
                                "status": "failed",
                                "created_at": "2020-06-11T12:18:20.090Z",
                                "id": "63f954f8-f89d-4630-b3a5-82c85132faae"
                            }
                        },
                        "is_using_workflows": true
                    },
                    "master": {
                        "latest_workflows": {
                            "workflow": {
                                "status": "success",
                                "created_at": "2020-06-15T09:52:31.086Z",
                                "id": "5bf8dcc7-9c35-4e70-ac1f-57f95ab7ae29"
                            },
                            "Build%2C%20Test%20%26%20Deploy": {
                                "status": "success",
                                "created_at": "2020-06-18T12:19:02.690Z",
                                "id": "b380f52c-18c3-4b6b-98a8-eb291e56e60d"
                            }
                        },
                        "pusher_logins": [
                            "harshimoola",
                            "LaszloBogacsi"
                        ],
                        "running_builds": [],
                        "recent_builds": [
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 84,
                                "vcs_revision": "c121b2a56dae26279e68be0931e3cc26fe6d2511",
                                "pushed_at": "2020-06-18T12:19:02.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-06-18T12:23:17.026Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 83,
                                "vcs_revision": "c121b2a56dae26279e68be0931e3cc26fe6d2511",
                                "pushed_at": "2020-06-18T12:19:02.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-06-18T12:20:32.888Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 18,
                                "vcs_revision": "bdc84320697390c560931d8a7bfaef8f5d69f4c5",
                                "pushed_at": "2020-06-15T09:52:30.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-06-15T09:53:44.062Z"
                            }
                        ],
                        "last_success": {
                            "outcome": "success",
                            "status": "success",
                            "build_num": 84,
                            "vcs_revision": "c121b2a56dae26279e68be0931e3cc26fe6d2511",
                            "pushed_at": "2020-06-18T12:19:02.000Z",
                            "is_workflow_job": true,
                            "is_2_0_job": true,
                            "added_at": "2020-06-18T12:23:17.026Z"
                        },
                        "latest_completed_workflows": {
                            "workflow": {
                                "status": "success",
                                "created_at": "2020-06-15T09:52:31.086Z",
                                "id": "5bf8dcc7-9c35-4e70-ac1f-57f95ab7ae29"
                            },
                            "Build%2C%20Test%20%26%20Deploy": {
                                "status": "success",
                                "created_at": "2020-06-18T12:19:02.690Z",
                                "id": "b380f52c-18c3-4b6b-98a8-eb291e56e60d"
                            }
                        },
                        "is_using_workflows": true
                    }
                },
                "oss": false,
                "reponame": "cato-chic",
                "parallel": 1,
                "username": "ITV",
                "has_usable_key": false,
                "vcs_type": "github",
                "language": null,
                "vcs_url": "https://github.com/ITV/cato-chic",
                "following": true,
                "default_branch": "master"
            },
            {
                "branches": {
                    "circleCI_setupVPNInfra": {
                        "latest_workflows": {
                            "Build%2C%20Test%20%26%20Run": {
                                "status": "failed",
                                "created_at": "2020-07-09T14:11:10.877Z",
                                "id": "e8ca32c2-3449-4f3b-be2f-6dc1d1a9cbc0"
                            }
                        },
                        "pusher_logins": [
                            "NehaChaudhary-itv"
                        ],
                        "running_builds": [],
                        "recent_builds": [
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 196,
                                "vcs_revision": "882646e9de426907ebd39b39c722ab3d84740e4b",
                                "pushed_at": "2020-07-09T14:11:10.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-09T14:13:04.159Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 194,
                                "vcs_revision": "882646e9de426907ebd39b39c722ab3d84740e4b",
                                "pushed_at": "2020-07-09T14:11:10.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-09T14:12:43.080Z"
                            },
                            {
                                "outcome": "failed",
                                "status": "failed",
                                "build_num": 193,
                                "vcs_revision": "882646e9de426907ebd39b39c722ab3d84740e4b",
                                "pushed_at": "2020-07-09T14:11:10.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-09T14:14:01.532Z"
                            }
                        ],
                        "last_success": {
                            "outcome": "success",
                            "status": "success",
                            "build_num": 196,
                            "vcs_revision": "882646e9de426907ebd39b39c722ab3d84740e4b",
                            "pushed_at": "2020-07-09T14:11:10.000Z",
                            "is_workflow_job": true,
                            "is_2_0_job": true,
                            "added_at": "2020-07-09T14:13:04.159Z"
                        },
                        "last_non_success": {
                            "outcome": "failed",
                            "status": "failed",
                            "build_num": 193,
                            "vcs_revision": "882646e9de426907ebd39b39c722ab3d84740e4b",
                            "pushed_at": "2020-07-09T14:11:10.000Z",
                            "is_workflow_job": true,
                            "is_2_0_job": true,
                            "added_at": "2020-07-09T14:14:01.532Z"
                        },
                        "latest_completed_workflows": {
                            "Build%2C%20Test%20%26%20Run": {
                                "status": "failed",
                                "created_at": "2020-07-09T14:11:10.877Z",
                                "id": "e8ca32c2-3449-4f3b-be2f-6dc1d1a9cbc0"
                            }
                        },
                        "is_using_workflows": true
                    },
                    "AC-1561_okta": {
                        "latest_workflows": {
                            "Build%2C%20Test%20%26%20Run": {
                                "status": "failed",
                                "created_at": "2020-07-10T14:57:27.025Z",
                                "id": "5357b292-d355-4a32-83e3-ed8ecde046f4"
                            }
                        },
                        "pusher_logins": [
                            "LaszloBogacsi"
                        ],
                        "running_builds": [],
                        "recent_builds": [
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 254,
                                "vcs_revision": "5698e5ae6d09986f3d3abfa7f2f1542da2fb332e",
                                "pushed_at": "2020-07-10T14:57:26.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-10T15:01:23.681Z"
                            },
                            {
                                "outcome": "failed",
                                "status": "failed",
                                "build_num": 249,
                                "vcs_revision": "5698e5ae6d09986f3d3abfa7f2f1542da2fb332e",
                                "pushed_at": "2020-07-10T14:57:26.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-10T15:12:38.018Z"
                            }
                        ],
                        "last_success": {
                            "outcome": "success",
                            "status": "success",
                            "build_num": 254,
                            "vcs_revision": "5698e5ae6d09986f3d3abfa7f2f1542da2fb332e",
                            "pushed_at": "2020-07-10T14:57:26.000Z",
                            "is_workflow_job": true,
                            "is_2_0_job": true,
                            "added_at": "2020-07-10T15:01:23.681Z"
                        },
                        "last_non_success": {
                            "outcome": "failed",
                            "status": "failed",
                            "build_num": 249,
                            "vcs_revision": "5698e5ae6d09986f3d3abfa7f2f1542da2fb332e",
                            "pushed_at": "2020-07-10T14:57:26.000Z",
                            "is_workflow_job": true,
                            "is_2_0_job": true,
                            "added_at": "2020-07-10T15:12:38.018Z"
                        },
                        "latest_completed_workflows": {
                            "Build%2C%20Test%20%26%20Run": {
                                "status": "failed",
                                "created_at": "2020-07-10T14:57:27.025Z",
                                "id": "5357b292-d355-4a32-83e3-ed8ecde046f4"
                            }
                        },
                        "is_using_workflows": true
                    },
                    "mock_saop_service": {
                        "latest_workflows": {
                            "Build%20Error": {
                                "status": "failed",
                                "created_at": "2020-07-10T15:12:33.451Z",
                                "id": "ab9eca6d-8ac0-4080-9af2-15010b16968b"
                            }
                        },
                        "pusher_logins": [
                            "harshimoola"
                        ],
                        "running_builds": [],
                        "recent_builds": [
                            {
                                "outcome": "failed",
                                "status": "failed",
                                "build_num": 256,
                                "vcs_revision": "5fc6fe8edb58178a8d5d95f397d9956bdfd79e99",
                                "pushed_at": "2020-07-10T15:12:33.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-10T15:12:40.457Z"
                            }
                        ],
                        "last_non_success": {
                            "outcome": "failed",
                            "status": "failed",
                            "build_num": 256,
                            "vcs_revision": "5fc6fe8edb58178a8d5d95f397d9956bdfd79e99",
                            "pushed_at": "2020-07-10T15:12:33.000Z",
                            "is_workflow_job": true,
                            "is_2_0_job": true,
                            "added_at": "2020-07-10T15:12:40.457Z"
                        },
                        "latest_completed_workflows": {
                            "Build%20Error": {
                                "status": "failed",
                                "created_at": "2020-07-10T15:12:33.451Z",
                                "id": "ab9eca6d-8ac0-4080-9af2-15010b16968b"
                            }
                        },
                        "is_using_workflows": true
                    },
                    "mock_service_attempt": {
                        "latest_workflows": {
                            "Build%20Error": {
                                "status": "failed",
                                "created_at": "2020-07-10T10:23:10.792Z",
                                "id": "e6e08769-83cf-445d-857d-8fdb3be03630"
                            }
                        },
                        "pusher_logins": [
                            "harshimoola"
                        ],
                        "running_builds": [],
                        "recent_builds": [
                            {
                                "outcome": "failed",
                                "status": "failed",
                                "build_num": 223,
                                "vcs_revision": "57a18c12416e6c44db3ea8ddd0ce389a251f3d52",
                                "pushed_at": "2020-07-10T10:23:10.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-10T10:23:38.622Z"
                            },
                            {
                                "outcome": "failed",
                                "status": "failed",
                                "build_num": 214,
                                "vcs_revision": "b197aef5ef0006a088e289cfbdecea9c34f9a7c1",
                                "pushed_at": "2020-07-09T17:22:50.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-09T17:29:33.749Z"
                            },
                            {
                                "outcome": "failed",
                                "status": "failed",
                                "build_num": 213,
                                "vcs_revision": "bd7d918554668808021f7ba4c7927141def7b8a9",
                                "pushed_at": "2020-07-09T17:07:19.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-09T17:07:27.286Z"
                            },
                            {
                                "outcome": "failed",
                                "status": "failed",
                                "build_num": 207,
                                "vcs_revision": "54838e3e0081988e5c1361d274d615e4aa5f4949",
                                "pushed_at": "2020-07-09T15:32:12.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-09T15:32:21.479Z"
                            },
                            {
                                "outcome": "failed",
                                "status": "failed",
                                "build_num": 170,
                                "vcs_revision": "ff07f20ff8921f4716e25169a5aae774ea2e20b8",
                                "pushed_at": "2020-07-09T10:58:36.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-09T10:58:50.956Z"
                            }
                        ],
                        "last_non_success": {
                            "outcome": "failed",
                            "status": "failed",
                            "build_num": 223,
                            "vcs_revision": "57a18c12416e6c44db3ea8ddd0ce389a251f3d52",
                            "pushed_at": "2020-07-10T10:23:10.000Z",
                            "is_workflow_job": true,
                            "is_2_0_job": true,
                            "added_at": "2020-07-10T10:23:38.622Z"
                        },
                        "latest_completed_workflows": {
                            "Build%20Error": {
                                "status": "failed",
                                "created_at": "2020-07-10T10:23:10.792Z",
                                "id": "e6e08769-83cf-445d-857d-8fdb3be03630"
                            }
                        },
                        "is_using_workflows": true
                    },
                    "AC-1560": {
                        "latest_workflows": {
                            "Build%20Error": {
                                "status": "failed",
                                "created_at": "2020-07-07T12:55:12.650Z",
                                "id": "c9fc6ab6-988b-46c1-90c5-7a15c9ba1b78"
                            },
                            "Build%2C%20Test%20%26%20Run": {
                                "status": "failed",
                                "created_at": "2020-07-10T23:09:28.978Z",
                                "id": "1c90d6ef-719a-47c9-b649-d0d213b5d73a"
                            }
                        },
                        "pusher_logins": [
                            "vyusuf"
                        ],
                        "running_builds": [],
                        "recent_builds": [
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 266,
                                "vcs_revision": "1112ba6ce9a9f34da1343fdf111fa092aef1bc85",
                                "pushed_at": "2020-07-10T12:30:43.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-10T23:10:51.419Z"
                            },
                            {
                                "outcome": "failed",
                                "status": "failed",
                                "build_num": 265,
                                "vcs_revision": "1112ba6ce9a9f34da1343fdf111fa092aef1bc85",
                                "pushed_at": "2020-07-10T12:30:43.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-10T23:14:49.370Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 264,
                                "vcs_revision": "1112ba6ce9a9f34da1343fdf111fa092aef1bc85",
                                "pushed_at": "2020-07-10T12:30:43.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-10T23:10:37.458Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 248,
                                "vcs_revision": "1112ba6ce9a9f34da1343fdf111fa092aef1bc85",
                                "pushed_at": "2020-07-10T12:30:43.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-10T12:32:37.492Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 247,
                                "vcs_revision": "1112ba6ce9a9f34da1343fdf111fa092aef1bc85",
                                "pushed_at": "2020-07-10T12:30:43.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-10T12:32:06.727Z"
                            }
                        ],
                        "last_non_success": {
                            "outcome": "failed",
                            "status": "failed",
                            "build_num": 265,
                            "vcs_revision": "1112ba6ce9a9f34da1343fdf111fa092aef1bc85",
                            "pushed_at": "2020-07-10T12:30:43.000Z",
                            "is_workflow_job": true,
                            "is_2_0_job": true,
                            "added_at": "2020-07-10T23:14:49.370Z"
                        },
                        "latest_completed_workflows": {
                            "Build%20Error": {
                                "status": "failed",
                                "created_at": "2020-07-07T12:55:12.650Z",
                                "id": "c9fc6ab6-988b-46c1-90c5-7a15c9ba1b78"
                            },
                            "Build%2C%20Test%20%26%20Run": {
                                "status": "failed",
                                "created_at": "2020-07-10T23:09:28.978Z",
                                "id": "1c90d6ef-719a-47c9-b649-d0d213b5d73a"
                            }
                        },
                        "last_success": {
                            "outcome": "success",
                            "status": "success",
                            "build_num": 266,
                            "vcs_revision": "1112ba6ce9a9f34da1343fdf111fa092aef1bc85",
                            "pushed_at": "2020-07-10T12:30:43.000Z",
                            "is_workflow_job": true,
                            "is_2_0_job": true,
                            "added_at": "2020-07-10T23:10:51.419Z"
                        },
                        "is_using_workflows": true
                    },
                    "attempt_with_profiles": {
                        "latest_workflows": {
                            "Build%20Error": {
                                "status": "failed",
                                "created_at": "2020-07-10T17:59:21.728Z",
                                "id": "8b9d79b3-6414-4a76-8db2-ad1dd57f684a"
                            }
                        },
                        "pusher_logins": [
                            "harshimoola",
                            "Jackil-Rajnicant"
                        ],
                        "running_builds": [],
                        "recent_builds": [
                            {
                                "outcome": "failed",
                                "status": "failed",
                                "build_num": 263,
                                "vcs_revision": "02f1c5ce41c63c379a306d21b451967593ce27fe",
                                "pushed_at": "2020-07-10T17:59:21.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-10T17:59:36.927Z"
                            },
                            {
                                "outcome": "failed",
                                "status": "failed",
                                "build_num": 258,
                                "vcs_revision": "08d117c7eae59e2f063055dcd864c51096be2d10",
                                "pushed_at": "2020-07-10T17:07:49.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-10T17:07:56.098Z"
                            },
                            {
                                "outcome": "failed",
                                "status": "failed",
                                "build_num": 257,
                                "vcs_revision": "aa44546ee25587386affb324a51f7056f4698f20",
                                "pushed_at": "2020-07-10T15:59:48.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-10T15:59:59.254Z"
                            },
                            {
                                "outcome": "failed",
                                "status": "failed",
                                "build_num": 233,
                                "vcs_revision": "30fc6397df057163b3569b1825efccf5d8668ea1",
                                "pushed_at": "2020-07-10T11:12:58.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-10T11:13:14.979Z"
                            },
                            {
                                "outcome": "failed",
                                "status": "failed",
                                "build_num": 232,
                                "vcs_revision": "d99542a1a807d6bebcc33cbf3515cd5e81f7e9de",
                                "pushed_at": "2020-07-10T11:11:18.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-10T11:11:37.072Z"
                            }
                        ],
                        "last_non_success": {
                            "outcome": "failed",
                            "status": "failed",
                            "build_num": 263,
                            "vcs_revision": "02f1c5ce41c63c379a306d21b451967593ce27fe",
                            "pushed_at": "2020-07-10T17:59:21.000Z",
                            "is_workflow_job": true,
                            "is_2_0_job": true,
                            "added_at": "2020-07-10T17:59:36.927Z"
                        },
                        "latest_completed_workflows": {
                            "Build%20Error": {
                                "status": "failed",
                                "created_at": "2020-07-10T17:59:21.728Z",
                                "id": "8b9d79b3-6414-4a76-8db2-ad1dd57f684a"
                            }
                        },
                        "is_using_workflows": true
                    },
                    "AC-1561_okta-alb-auth": {
                        "latest_workflows": {
                            "Build%2C%20Test%20%26%20Run": {
                                "status": "success",
                                "created_at": "2020-07-10T17:12:25.773Z",
                                "id": "30913b57-f11e-4353-b53f-3e7ce32df083"
                            }
                        },
                        "pusher_logins": [
                            "LaszloBogacsi"
                        ],
                        "running_builds": [],
                        "recent_builds": [
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 262,
                                "vcs_revision": "092c25480eb7e42733b1fc2d050024ca7dc84af8",
                                "pushed_at": "2020-07-10T17:12:25.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-10T17:21:28.702Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 261,
                                "vcs_revision": "092c25480eb7e42733b1fc2d050024ca7dc84af8",
                                "pushed_at": "2020-07-10T17:12:25.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-10T17:14:09.405Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 260,
                                "vcs_revision": "092c25480eb7e42733b1fc2d050024ca7dc84af8",
                                "pushed_at": "2020-07-10T17:12:25.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-10T17:19:06.653Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 259,
                                "vcs_revision": "092c25480eb7e42733b1fc2d050024ca7dc84af8",
                                "pushed_at": "2020-07-10T17:12:25.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-10T17:13:47.793Z"
                            }
                        ],
                        "last_success": {
                            "outcome": "success",
                            "status": "success",
                            "build_num": 262,
                            "vcs_revision": "092c25480eb7e42733b1fc2d050024ca7dc84af8",
                            "pushed_at": "2020-07-10T17:12:25.000Z",
                            "is_workflow_job": true,
                            "is_2_0_job": true,
                            "added_at": "2020-07-10T17:21:28.702Z"
                        },
                        "latest_completed_workflows": {
                            "Build%2C%20Test%20%26%20Run": {
                                "status": "success",
                                "created_at": "2020-07-10T17:12:25.773Z",
                                "id": "30913b57-f11e-4353-b53f-3e7ce32df083"
                            }
                        },
                        "is_using_workflows": true
                    },
                    "master": {
                        "latest_workflows": {
                            "Build%20Error": {
                                "status": "failed",
                                "created_at": "2020-07-03T10:32:22.567Z",
                                "id": "361700c6-b404-464a-ad60-7e540211ab98"
                            },
                            "Build%2C%20Test%20%26%20Run": {
                                "status": "success",
                                "created_at": "2020-07-10T14:58:23.040Z",
                                "id": "392bfcb1-9b30-4e58-be47-0f02d0477496"
                            }
                        },
                        "pusher_logins": [
                            "LaszloBogacsi",
                            "NehaChaudhary-itv"
                        ],
                        "running_builds": [],
                        "recent_builds": [
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 255,
                                "vcs_revision": "28bebe99753e211e47b30f0f38218c1fa6d2db10",
                                "pushed_at": "2020-07-10T14:58:22.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-10T15:06:25.359Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 253,
                                "vcs_revision": "28bebe99753e211e47b30f0f38218c1fa6d2db10",
                                "pushed_at": "2020-07-10T14:58:22.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-10T15:00:08.504Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 252,
                                "vcs_revision": "28bebe99753e211e47b30f0f38218c1fa6d2db10",
                                "pushed_at": "2020-07-10T14:58:22.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-10T14:59:47.090Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 251,
                                "vcs_revision": "28bebe99753e211e47b30f0f38218c1fa6d2db10",
                                "pushed_at": "2020-07-10T14:58:22.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-10T15:04:38.295Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 245,
                                "vcs_revision": "5f970d63fc3caeb0b52a1391fad30fd1905279e4",
                                "pushed_at": "2020-07-10T12:19:34.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-10T12:27:58.583Z"
                            }
                        ],
                        "last_non_success": {
                            "outcome": "failed",
                            "status": "failed",
                            "build_num": 186,
                            "vcs_revision": "eeb6b0ebf9d9b0ea968dece879876ce2f2146e9f",
                            "pushed_at": "2020-07-09T13:57:28.000Z",
                            "is_workflow_job": true,
                            "is_2_0_job": true,
                            "added_at": "2020-07-09T13:59:09.011Z"
                        },
                        "latest_completed_workflows": {
                            "Build%20Error": {
                                "status": "failed",
                                "created_at": "2020-07-03T10:32:22.567Z",
                                "id": "361700c6-b404-464a-ad60-7e540211ab98"
                            },
                            "Build%2C%20Test%20%26%20Run": {
                                "status": "success",
                                "created_at": "2020-07-10T14:58:23.040Z",
                                "id": "392bfcb1-9b30-4e58-be47-0f02d0477496"
                            }
                        },
                        "last_success": {
                            "outcome": "success",
                            "status": "success",
                            "build_num": 255,
                            "vcs_revision": "28bebe99753e211e47b30f0f38218c1fa6d2db10",
                            "pushed_at": "2020-07-10T14:58:22.000Z",
                            "is_workflow_job": true,
                            "is_2_0_job": true,
                            "added_at": "2020-07-10T15:06:25.359Z"
                        },
                        "is_using_workflows": true
                    },
                    "inmemorydb_int_test": {
                        "latest_workflows": {
                            "Build%2C%20Test%20%26%20Run": {
                                "status": "success",
                                "created_at": "2020-07-09T11:10:36.111Z",
                                "id": "291db3e3-6689-4407-9c6a-7aab3e80585d"
                            }
                        },
                        "pusher_logins": [
                            "NehaChaudhary-itv"
                        ],
                        "running_builds": [],
                        "recent_builds": [
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 178,
                                "vcs_revision": "60e927a22e334b4e0785b1be09b9377cda28c6c0",
                                "pushed_at": "2020-07-09T11:10:35.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-09T11:13:41.562Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 176,
                                "vcs_revision": "60e927a22e334b4e0785b1be09b9377cda28c6c0",
                                "pushed_at": "2020-07-09T11:10:35.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-09T11:11:38.977Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 175,
                                "vcs_revision": "60e927a22e334b4e0785b1be09b9377cda28c6c0",
                                "pushed_at": "2020-07-09T11:10:35.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-09T11:13:22.749Z"
                            },
                            {
                                "outcome": "success",
                                "status": "success",
                                "build_num": 174,
                                "vcs_revision": "939b619cd12008963d86517caaeaec79686a771d",
                                "pushed_at": "2020-07-09T11:01:12.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-09T11:03:45.140Z"
                            },
                            {
                                "outcome": "failed",
                                "status": "failed",
                                "build_num": 172,
                                "vcs_revision": "939b619cd12008963d86517caaeaec79686a771d",
                                "pushed_at": "2020-07-09T11:01:12.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-09T11:01:23.428Z"
                            }
                        ],
                        "last_non_success": {
                            "outcome": "failed",
                            "status": "failed",
                            "build_num": 172,
                            "vcs_revision": "939b619cd12008963d86517caaeaec79686a771d",
                            "pushed_at": "2020-07-09T11:01:12.000Z",
                            "is_workflow_job": true,
                            "is_2_0_job": true,
                            "added_at": "2020-07-09T11:01:23.428Z"
                        },
                        "last_success": {
                            "outcome": "success",
                            "status": "success",
                            "build_num": 178,
                            "vcs_revision": "60e927a22e334b4e0785b1be09b9377cda28c6c0",
                            "pushed_at": "2020-07-09T11:10:35.000Z",
                            "is_workflow_job": true,
                            "is_2_0_job": true,
                            "added_at": "2020-07-09T11:13:41.562Z"
                        },
                        "latest_completed_workflows": {
                            "Build%2C%20Test%20%26%20Run": {
                                "status": "success",
                                "created_at": "2020-07-09T11:10:36.111Z",
                                "id": "291db3e3-6689-4407-9c6a-7aab3e80585d"
                            }
                        },
                        "is_using_workflows": true
                    },
                    "AC-1518": {
                        "latest_workflows": {
                            "Build%20Error": {
                                "status": "failed",
                                "created_at": "2020-07-07T16:21:49.110Z",
                                "id": "c046d5ca-b85f-4764-b34b-877938e5d9d9"
                            }
                        },
                        "pusher_logins": [
                            "Jackil-Rajnicant"
                        ],
                        "running_builds": [],
                        "recent_builds": [
                            {
                                "outcome": "failed",
                                "status": "failed",
                                "build_num": 118,
                                "vcs_revision": "d40d097077c6a3a8b1e317c9bd900f74292ede43",
                                "pushed_at": "2020-07-07T16:21:49.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-07T16:21:54.895Z"
                            },
                            {
                                "outcome": "failed",
                                "status": "failed",
                                "build_num": 77,
                                "vcs_revision": "625693186d9751dd26c5b00d201a833805d75c75",
                                "pushed_at": "2020-07-06T17:04:01.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-06T17:04:13.217Z"
                            },
                            {
                                "outcome": "failed",
                                "status": "failed",
                                "build_num": 61,
                                "vcs_revision": "03cb8ee027082b991c13d11997c01fd5057db6a0",
                                "pushed_at": "2020-07-06T14:00:18.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-06T14:03:35.231Z"
                            },
                            {
                                "outcome": "failed",
                                "status": "failed",
                                "build_num": 60,
                                "vcs_revision": "22bf92fc7a8419eb2b52c45b3d3544763ec135a5",
                                "pushed_at": "2020-07-06T12:20:01.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-06T12:20:10.041Z"
                            },
                            {
                                "outcome": "failed",
                                "status": "failed",
                                "build_num": 53,
                                "vcs_revision": "ee6be0c6b5b0d9a1ce1e356ff6c32a2238926d22",
                                "pushed_at": "2020-07-06T09:07:24.000Z",
                                "is_workflow_job": true,
                                "is_2_0_job": true,
                                "added_at": "2020-07-06T09:07:29.882Z"
                            }
                        ],
                        "last_non_success": {
                            "outcome": "failed",
                            "status": "failed",
                            "build_num": 118,
                            "vcs_revision": "d40d097077c6a3a8b1e317c9bd900f74292ede43",
                            "pushed_at": "2020-07-07T16:21:49.000Z",
                            "is_workflow_job": true,
                            "is_2_0_job": true,
                            "added_at": "2020-07-07T16:21:54.895Z"
                        },
                        "latest_completed_workflows": {
                            "Build%20Error": {
                                "status": "failed",
                                "created_at": "2020-07-07T16:21:49.110Z",
                                "id": "c046d5ca-b85f-4764-b34b-877938e5d9d9"
                            }
                        },
                        "is_using_workflows": true
                    }
                },
                "oss": false,
                "reponame": "adtech-cia",
                "parallel": 1,
                "username": "ITV",
                "has_usable_key": false,
                "vcs_type": "github",
                "language": null,
                "vcs_url": "https://github.com/ITV/adtech-cia",
                "following": true,
                "default_branch": "master"
            }
        ]
    }

    return apiData;
}

async function get<T>(url: string, params: { [key: string]: string } = {}): Promise<T> {
    const result = await axios.get(url, {params});
    return result.data as T
}

function App() {
    const initial: Collaboration[] = [];
    const [options, setOptions] = useState(initial);
    const [apiToken, setApiToken] = useState("");
    const previouslySelectedOrg = getSelectedOrgFromLocalStorage();
    const initialSelected = previouslySelectedOrg ? previouslySelectedOrg : options.length ? options[0] : {} as Collaboration;

    const [selectedOrg, setSelectedOrg] = useState(initialSelected);

    useEffect(() => {


        async function getOptions(): Promise<Collaboration[]> {
            //afb2b32c1b1d5edc6704ce0035089fa9a9a03963
            console.log(apiToken);
            if (inMockMode) {
                return getOptionsData();
            } else {
                return get<Collaboration[]>("http://localhost:4000/options")
            }
        }

        const loadOptions = async () => {
            let collaborations = await getOptions();
            setOptions(collaborations);
            if (!previouslySelectedOrg) {
                setSelectedOrg(collaborations[0])
            }

        }
        loadOptions();
    }, [apiToken])

    // console.log(apiData);

    async function getOptionsData(): Promise<Collaboration[]> {
        // https://circleci.com/api/v2/me/collaborations
        // Circle-Token: <token>
        return [{
            "vcs_type": "github",
            "name": "diok22",
            "avatar_url": "https://avatars2.githubusercontent.com/u/19917827?v=4"
        }, {
            "vcs_type": "github",
            "name": "ITV",
            "avatar_url": "https://avatars1.githubusercontent.com/u/625148?v=4"
        }, {
            "vcs_type": "github",
            "name": "LaszloBogacsi",
            "avatar_url": "https://avatars1.githubusercontent.com/u/15179731?v=4"
        }, {
            "vcs_type": "github",
            "name": "makersacademy",
            "avatar_url": "https://avatars2.githubusercontent.com/u/3636186?v=4"
        }];
    }

    return (
        <Router>

            <div className="App">
                <header className="App-header">
                    CIRCLECI BUILD DASHBOARD
                </header>
                <div className={styles.inputSelectors}>
                    <OrgSelector options={options} setSelectedOrg={setSelectedOrg} selectedOrg={selectedOrg}/>
                    <APITokenInput setApiToken={setApiToken}/>
                </div>

                <Route path="/" exact component={Dashboard}/>
                <Route path="/add" exact render={() => <AddProjects selectedOrg={selectedOrg}/>}/>

            </div>
        </Router>

    );
}

interface SelectedProject {
    name: string
    branch: string
}

interface AddProjectProps {
    selectedOrg: Collaboration
}

export const AddProjects = (props: AddProjectProps) => {
    const {selectedOrg} = props;
    const initial = [] as SelectedProject[];
    const [selectedProjects, setSelectedProjects] = useState(initial);
    const projects = useFollowedProjects();
    const processFollowedProjectsData = (followedProjectsData: FollowedProjectsData[]): FollowedProjects[] => {
        return followedProjectsData.filter(followedProject => followedProject.username === selectedOrg.name).map(project => ({
            branches: Object.keys(project.branches),
            projectName: project.reponame,
        }));
    }

    function addSelectedProject(project: SelectedProject) {
        setSelectedProjects([...selectedProjects.filter(selected => selected.name !== project.name || selected.branch !== project.branch), project])
    }

    const removeASelectedProject = (item: SelectedProject) => setSelectedProjects(selectedProjects.filter(project => project !== item))

    return (
        <div>
            <SelectedProjectsList data={selectedProjects} remove={removeASelectedProject}/>
            <ProjectSelector data={processFollowedProjectsData(projects)} add={addSelectedProject}/>
            <Link to="/">
                <button>Back</button>
            </Link>

        </div>
    );
};

interface SelectedProjectsListProps {
    data: SelectedProject[]
    remove: (item: SelectedProject) => void
}
export const SelectedProjectsList = (props: SelectedProjectsListProps) => {
    const {data, remove} = props;
    return (
        <div>
            <ul>
                {data.map((item, index) => <li key={index}>{item.name}-{item.branch} <button onClick={() => remove(item)}>X</button> </li>)}
            </ul>
        </div>
    );
};

interface ProjectSelectorProps {
    data: FollowedProjects[]
    add: (selected: SelectedProject) => void;
}

function ProjectSelector(props: ProjectSelectorProps) {
    const {data, add} = props;
    const [selectedProject, setSelectedProject] = useState("");
    const [selectedBranch, setSelectedBranch] = useState("");
    useEffect(() => {
        if (data.length) {
            setSelectedProject(data[0].projectName);
            setSelectedBranch(data[0].branches[0]);
        }
    }, [data])

    return (
        <div>
            <label htmlFor="select">PROJECT</label>
            <div>
                <Select value={selectedProject} onChange={(event: ChangeEvent<HTMLSelectElement> ) => {
                    console.log(event.target.value);
                    setSelectedProject(event.target.value);
                }}>
                    {data.map((option, index) => <option key={index} value={option.projectName}>{option.projectName}</option>)}
                </Select>
            </div>
            <label htmlFor="select">BRANCH</label>
            <div>
                <Select value={selectedBranch} onChange={(event: ChangeEvent<HTMLSelectElement> ) => {
                    console.log(event.target.value);
                    setSelectedBranch(event.target.value);
                }}>
                    {data.find(d => d.projectName === selectedProject) ? data.find(d => d.projectName === selectedProject)!.branches.map((option, index) => <option key={index} value={option}>{option}</option>) : []}
                </Select>
            </div>

            <button onClick={() => add({name:selectedProject, branch: selectedBranch})}>Save</button>

        </div>
    )
}

function Dashboard() {
    const apiData = useApiData();
    const processAPIData: (apiData: ApiData[]) => WidgetData[] = apiData => {
        return apiData.map(data => {
            const getWidgetWorkflows: (data: ApiData) => WidgetWorkflow[] = (data: ApiData) => {
                return data.workflows.map(workflow => {
                    return {
                        name: workflow.name,
                        id: workflow.id,
                        url: `https://app.circleci.com/pipelines/${workflow.project_slug}/${workflow.pipeline_number}/workflows/${workflow.id}`,
                        createdAt: workflow.created_at,
                        status: workflow.status,
                        stoppedAt: workflow.stopped_at || undefined,
                        jobs: data.jobs.filter(workflowJobs => workflowJobs.workflowId === workflow.id).flatMap(workflowJobs => {
                            return workflowJobs.jobs.map(job => {
                                return {
                                    name: job.name,
                                    startedAt: job.started_at,
                                    status: job.status,
                                    stoppedAt: job.stopped_at,
                                    type: job.type,
                                    url: job.job_number ? `https://app.circleci.com/pipelines/${workflow.project_slug}/${workflow.pipeline_number}/workflows/${workflow.id}/jobs/${job.job_number}` : undefined
                                } as WidgetJob
                            })
                        })

                    } as WidgetWorkflow
                });
            }
            const widgetWorkflows = getWidgetWorkflows(data);
            const latestPipeline = data.pipelines.length ? data.pipelines[0] : undefined
            const getDuration = (workflows: any[]): number => {
                if (!workflows.length) return 0;

                const earliestStartTime = workflows.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt))[0].createdAt;
                const latestStoppedTime = workflows.every(wf => wf.createdAt && wf.stoppedAt) ? workflows.sort((a, b) => Date.parse(b.stoppedAt) - Date.parse(a.stoppedAt))[0].stoppedAt : new Date().toISOString();
                return (Date.parse(latestStoppedTime) - Date.parse(earliestStartTime));
            }

            const getFormattedDuration = (durationInMillies: number): string => {
                const difference = new Date(durationInMillies);
                const padNumber = (num: number): string => num < 10 ? `0${num}` : `${num}`
                return `${padNumber((difference.getUTCDate() - 1) * 24 + difference.getUTCHours())}:${padNumber(difference.getUTCMinutes())}:${padNumber(difference.getUTCSeconds())}`;
            }
            const getSince = (workflows: any[]): number => {
                if (!workflows.length) return 0;

                const now = new Date().toISOString();
                const latestStoppedTime = workflows.every(wf => wf.createdAt && wf.stoppedAt) ? workflows.sort((a, b) => Date.parse(b.stoppedAt) - Date.parse(a.stoppedAt))[0].stoppedAt : now;
                return (Date.parse(now) - Date.parse(latestStoppedTime));
            }

            const getFormattedSince = (sinceInMillies: number): string => {
                const since = new Date(sinceInMillies);
                const months = since.getMonth();
                if (months > 0) return months > 1 ? `${months} months ago` : `${months} month ago`

                const days = since.getDate() - 1;
                if (days > 0) return days > 1 ? `${days} days ago` : `${days} day ago`

                const hours = since.getHours();
                if (hours > 0) return hours > 1 ? `${hours} hours ago` : `${hours} hour ago`

                const minutes = since.getMinutes();
                if (minutes > 0) return minutes > 1 ? `${minutes} minutes ago` : `${minutes} minute ago`

                const seconds = since.getSeconds();
                return seconds > 0 ? seconds > 1 ? `${seconds} seconds ago` : `${seconds} second ago` : "";
            }

            return {
                projectName: data.project.toLocaleUpperCase(),
                pipelineNumber: latestPipeline ? `#${latestPipeline?.number}` : "",
                branch: latestPipeline?.vcs.branch,
                commitSubject: latestPipeline?.vcs.commit.subject,
                actorName: latestPipeline?.trigger.actor.login,
                repoUrl: latestPipeline?.vcs.origin_repository_url,
                revisionUrl: `${latestPipeline?.vcs.origin_repository_url}/commit/${latestPipeline?.vcs.revision}`,
                duration: getFormattedDuration(getDuration(widgetWorkflows)),
                since: getFormattedSince(getSince(widgetWorkflows)),
                widgetWorkflows: widgetWorkflows

            } as WidgetData;
        })
    }

    return (
        <div>
            <div>
                <h1>PROJECTS</h1>
                <Link to="/add">
                    <button>Add</button>
                </Link>
            </div>
            <WidgetContainer widgetData={processAPIData(apiData)}/>
        </div>
    );
};


interface WidgetJob {
    name: string
    status: string
    type: string
    url?: string
    startedAt: string
    stoppedAt?: string
}


interface WidgetWorkflow {
    name: string
    id: string
    url: string
    createdAt: string
    status: string
    stoppedAt?: string
    jobs: WidgetJob[]
}

interface WidgetData {
    projectName: string
    pipelineNumber: string
    branch: string
    commitSubject: string
    actorName: string
    repoUrl: string
    revisionUrl: string
    duration: string
    since: string
    widgetWorkflows: WidgetWorkflow[]
}


interface WidgetContainerProps {
    widgetData: WidgetData[]
}

export const WidgetContainer = (props: WidgetContainerProps) => {
    return (
        <div className={wcStyles.flexContainer}>
            {props.widgetData.map((data, index) => <Widget key={index} data={data}/>)}
        </div>
    );
};


interface Job {
    dependencies: string[]
    id: string
    job_number?: number
    name: string
    project_slug: string
    started_at: string | null
    status: string
    stopped_at?: string
    type: string
}

interface Workflow {
    created_at: string
    id: string
    name: string
    pipeline_id: string
    pipeline_number: number
    project_slug: string
    started_by: string
    status: string
    stopped_at: string
}

interface Pipeline {
    created_at: string
    errors: { message: string, type: string }[]
    id: string
    number: number
    project_slug: string
    state: string
    trigger: { actor: { login: string, avatar_url: string }, received_at: string, type: string }
    updated_at: string
    vcs: { branch: string, commit: { body: string, subject: string }, origin_repository_url: string, provider_name: string, revision: string, target_repository_url: string }
}

interface WidgetProps {
    data: WidgetData
}

enum WorkflowStatus {
    SUCCESS = "success",
    RUNNING = "running",
    NOT_RUN = "not_run",
    FAILED = "failed",
    ERROR = "error",
    FAILING = "failing",
    ON_HOLD = "on_hold",
    CANCELLED = "cancelled",
    UNAUTHORIZED = "unathorized"
}

enum ProjectStatus {
    SUCCESS = "success",
    RUNNING = "running",
    FAILED = "failed",
    ON_HOLD = "on_hold",
    CANCELLED = "cancelled"
}

enum JobStatus {
    SUCCESS = "success",
    RUNNING = "running",
    FAILED = "failed",
    ON_HOLD = "on_hold",
    CANCELLED = "cancelled"
}

export function getProjectStatus(workflows: { name: string, status: string }[]): ProjectStatus {
    const uniqueByName = workflows.filter((v, i, a) => a.findIndex(workflow => workflow.name === v.name) === i);
    if (uniqueByName.some(wf => wf.status === WorkflowStatus.RUNNING)) {
        return ProjectStatus.RUNNING;
    } else if (uniqueByName.some(wf => wf.status === WorkflowStatus.CANCELLED)) {
        return ProjectStatus.CANCELLED;
    } else if (uniqueByName.some(wf => wf.status === WorkflowStatus.ON_HOLD)) {
        return ProjectStatus.ON_HOLD;
    } else if (uniqueByName.every(wf => wf.status === WorkflowStatus.SUCCESS)) {
        return ProjectStatus.SUCCESS;
    } else {
        return ProjectStatus.FAILED;
    }
}


export const Widget = (props: WidgetProps) => {
    const {data} = props;
    const statusIcons = {
        "success": success, "failed": failed, "cancelled": cancelled, "on_hold": on_hold, "running": running
    }
    // console.log(data);
    const projectStatus = getProjectStatus(data.widgetWorkflows.map(wwf => ({status: wwf.status, name: wwf.name})))
    const jobStatus = (jobStatus: string) => {
        switch (jobStatus) {
            case JobStatus.SUCCESS:
                return statusIcons[JobStatus.SUCCESS];
            case JobStatus.FAILED:
                return statusIcons[JobStatus.FAILED];
            case JobStatus.CANCELLED:
                return statusIcons[JobStatus.CANCELLED];
            case JobStatus.ON_HOLD:
                return statusIcons[JobStatus.ON_HOLD];
            case JobStatus.RUNNING:
                return statusIcons[JobStatus.RUNNING]
            default:
                return statusIcons[JobStatus.FAILED];

        }
    }
    return (
        <div className={`${styles.widget} ${styles[projectStatus]}`}>
            <h2><a href={data.repoUrl}>{data.projectName}</a></h2>
            <div className={styles.widgetSummary}>
                <div>{data.pipelineNumber}</div>
                <div>{data.branch}</div>
                <div>{data.actorName}</div>
                <div><a href={data.revisionUrl}>{data.commitSubject}</a></div>
            </div>
            <div className={styles.workflowsContainer}>{data.widgetWorkflows.map((wf, index) => {
                return (
                    <div className={styles.workflowContainer} key={index}>
                        <div className={styles.workflowName}><a href={wf.url}>{wf.name}</a></div>
                        <div className={styles.jobs}>{wf.jobs.map((job, index) => {
                            return (
                                <a key={index} href={job.url} title={job.name}>
                                    <div>
                                        <object data={jobStatus(job.status)} type="image/svg+xml" className={styles.svg}>icon</object>
                                    </div>
                                </a>
                            )
                        })}</div>
                    </div>
                )
            })}</div>
            <div className={styles.timeMetricsContainer}>
                <div>{data.duration}</div>
                <div>{data.since}</div>
            </div>
        </div>
    );
};


interface Collaboration {
    vcs_type: string;
    name: string
    avatar_url: string
}

export default App;

interface OrgSelectorProps {
    options: Collaboration[]
    setSelectedOrg: (collaboration: Collaboration) => void
    selectedOrg: Collaboration
}

function OrgSelector(props: OrgSelectorProps): ReactElement {
    const {options, setSelectedOrg, selectedOrg} = props;

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        let collaboration = options.find(option => option.name === event.target.value)!;
        setSelectedOrg(collaboration);
        saveSelectedOrgToLocalStorage(collaboration);
    }
    return (
        <div>
            <label htmlFor="select">ORG</label>
            <div>
                <Select
                    value={selectedOrg.name}
                    onChange={handleChange}>
                    {options.map((option, index) => <option key={index} value={option.name}>{option.name}</option>)}
                </Select>
            </div>

        </div>

    )
}

interface SelectProps {
    value: string
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void
    children: ReactElement[]
}

function Select(props: SelectProps) {
    const {value, onChange} = props;
    return (
        <select value={value} onChange={onChange}>
            {props.children}
        </select>
    )
}

function saveSelectedOrgToLocalStorage(selectedOrg: Collaboration): void {
    saveToLocalStorage("circleci-dashboard-collab-storage", JSON.stringify(selectedOrg));
}

function getSelectedOrgFromLocalStorage(): Collaboration | undefined {
    return getFromLocalStorage("circleci-dashboard-collab-storage");
}

function saveToLocalStorage(key: string, value: string) {
    window.localStorage.setItem(key, value);
}

function getFromLocalStorage(key: string): Collaboration | undefined {
    const item = localStorage.getItem(key)
    return item !== null ? JSON.parse(item) as any as Collaboration : undefined;
}

interface APITokenInputProps {
    setApiToken: (token: string) => void;
}

function APITokenInput(props: APITokenInputProps): ReactElement {
    const initialState = "";
    const [inputValue, setInputValue] = useState(initialState);

    const onClick: () => void = () => {
        props.setApiToken(inputValue);
        setInputValue(initialState);
    }
    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => setInputValue(event.target.value || "");
    return (
        <div className={styles.tokenInputContainer}>
            <label htmlFor="input">API Token</label>
            <div className={styles.tokenInput}>
                <input value={inputValue} onChange={onInputChange} type="text" placeholder="circleci api token"/>
                <button onClick={onClick}>+</button>
            </div>

        </div>
    )
}
