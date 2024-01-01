let tasks = [
    { id: 1, text: 'Task 1', completed: false },
    { id: 2, text: 'Task 2', completed: true },
];

export const getTasks = () => {
    return [...tasks];
};

export const addTask = (text) => {
    const newTask = {
        id: tasks.length + 1,
        text,
        completed: false,
    };
    tasks.push(newTask);
    return [...tasks];
};

export const deleteTask = (id) => {
    tasks = tasks.filter(task => task.id !== id);
    return [...tasks];
};

export const toggleTaskStatus = (id) => {
    const taskIndex = tasks.findIndex(task => task.id === id);
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    return [...tasks];
};
