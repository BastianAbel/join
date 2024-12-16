let tasks = {
    /*Generated Id*/ : {
        "type": "userStory", // || "technicalTask"
        "title": "Kochwelt Page & Recipe Recommender",
        "description": "Build start page recipe recommendation",
        "dueDate": "10.05.2023",
        "priority": "medium", // || "urgent" || "low"
        "assignedTo": ["Emmanuel Mauer", "Marcel Bauer", "Anton Mayer"],
        "subtasks": [
            {
                "description": "Implement Recipe Recommendation",
                "checked": true
            },
            {
                "description": "Start Page Layout",
                "checked": false
            }
        ],
        "state": "backlog", // || "todo" || "testing" || "done"
    },
    {
        id: 1,
        type: "technicalTask",
        title: "CSS Archiceture Planning",
        description: "Define CSS naming conventions and structure",
        dueDate: "02.09.2023",
        priority: "urgent",
        assignedTo: ["Sofia Müller (You)", "Benedikt Ziegler"],
        subtasks: ["Establish CSS Methodology", "Setup Base Styles"],
        state: "todo",
    },
    {
        id: 2,
        type: "technicalTask",
        title: "Implement Recipe Recommendation",
        description: "Define Recipe Recommendation structure and generate render-function",
        dueDate: "12.09.2023",
        priority: "medium",
        assignedTo: ["Anja Schulz", "David Eisenberg"],
        subtasks: [],
        state: "todo",
    },
};
