import React, {ChangeEvent, ReactElement, useEffect, useState} from 'react';
import './App.css';
import checkmark from './right.svg'

import styles from './widget.module.css';
import wcStyles from './widget-container.module.css';

interface ApiData {
    project: string
    pipelines: Pipeline[]
    workflows: Workflow[]
    jobs: { workflowId: string, jobs: Job[] }[]
}

function useApiData() {
    const initialApiData: ApiData[] = [];

    async function getApiData(): Promise<ApiData[]> {
        const projects = ["atsdcf-services"];

        const pipelines = await getPipelinesForProject();
        const workflows = await getWorkflowsForPipeline();
        const jobs = await getJobsForWorkflow();
        return projects.map(project => ({
            project,
            pipelines: pipelines.items,
            workflows: workflows.items,
            jobs: [{workflowId: "ae768c71-303e-44e0-a223-5bc3d7a35354", jobs: jobs.items}]
        }));
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
                    "status": "success",
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
                    "status": "success",
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
                    "status": "success",
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
                    "status": "success",
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

function App() {
    const initial: Collaboration[] = [];
    const [options, setOptions] = useState(initial);
    const [apiToken, setApiToken] = useState("");
    const initialOrg = {} as Collaboration
    const [selectedOrg, setSelectedOrg] = useState(initialOrg);
    const apiData = useApiData();

    useEffect(() => {
        (async () => setOptions(await getOptions()))()
    }, [])

    // console.log(apiData);

    async function getOptions(): Promise<Collaboration[]> {
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

    const processAPIData: (apiData: ApiData[]) => WidgetData[] = apiData => {
        return apiData.map(data => {
            const latestPipeline = data.pipelines.length ? data.pipelines[0] : undefined
            const maybeCreatedAt = latestPipeline?.created_at || "";
            return {
                projectName: data.project.toLocaleUpperCase(),
                pipelineNumber: latestPipeline ? `#${latestPipeline?.number}` : "",
                branch: latestPipeline?.vcs.branch,
                commitSubject: latestPipeline?.vcs.commit.subject,
                actorName: latestPipeline?.trigger.actor.login,
                repoUrl: latestPipeline?.vcs.origin_repository_url,
                revisionUrl: `${latestPipeline?.vcs.origin_repository_url}/commit/${latestPipeline?.vcs.revision}`,
                projectStatus: "", // calculate from workflow states
                duration: `${Date.now() - Date.parse(maybeCreatedAt)}`,
                since: "10 days ago",
                widgetWorkflows: data.workflows.map(workflow => {
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
                })

            } as WidgetData;
        })
    }


    return (
        <div className="App">
            <header className="App-header">
                CIRCLECI BUILD DASHBOARD
            </header>
            <div className={styles.inputSelectors}>
                <OrgSelector options={options} selectedOrg={setSelectedOrg} previouslySelected={getSelectedOrgFromLocalStorage()}/>
                <APITokenInput setApiToken={setApiToken}/>
            </div>
            <h1>PROJECTS</h1>
            <WidgetContainer widgetData={processAPIData(apiData)}/>
        </div>
    );
}


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
    projectStatus: string
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

export const Widget = (props: WidgetProps) => {
    const {data} = props;
    // console.log(data);
    const projectStatus = "success"
    return (
        <div className={`${styles.widget} ${styles[projectStatus]}`}>
            <h2><a href={data.repoUrl}>{data.projectName}</a></h2>
            <div className={styles.widgetSummary}>
                <div>{data.pipelineNumber}</div>
                <div>{data.branch}</div>
                <div>{data.actorName}</div>
                <div><a href={data.revisionUrl}>{data.commitSubject}</a></div>
            </div>
            {/*<div>{data.revision}</div>*/}
            <div className={styles.workflowsContainer}>{data.widgetWorkflows.map((wf, index) => {
                return (
                    <div className={styles.workflowContainer} key={index}>
                        <div className={styles.workflowName}><a href={wf.url}>{wf.name}</a></div>
                        <div className={styles.jobs}>{wf.jobs.map((job, index) => {
                            return (
                                <a href={job.url} title={job.name}>
                                <div key={index}>
                                        <object data={checkmark} type="image/svg+xml" className={styles.svg}>Checkmark</object>
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
    selectedOrg: (collaboration: Collaboration) => void
    previouslySelected?: Collaboration
}

function OrgSelector(props: OrgSelectorProps): ReactElement {
    const {options, previouslySelected} = props;
    const initialSelected = previouslySelected ? previouslySelected : options.length ? options[0] : {} as Collaboration;
    console.log(initialSelected);
    const [selected, setSelected] = useState(initialSelected);
    console.log(selected);

    useEffect(() => {
        if (!previouslySelected && options.length){
            setSelected(options[0]);
        }
    }, [options, previouslySelected])
    if (!previouslySelected && selected && selected.name) {
        saveSelectedOrgToLocalStorage(selected);
    }
    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        let collaboration = options.find(option => option.name === event.target.value)!;
        console.log(collaboration);
        setSelected(collaboration);
        saveSelectedOrgToLocalStorage(collaboration);
    }
    return (
        <div>
            <label htmlFor="select">ORG</label>
            <div>
                <select value={selected.name} onChange={handleChange}>
                    {options.map((option, index) => <option key={index} value={option.name}>{option.name}</option>)}
                </select>
            </div>

        </div>

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
