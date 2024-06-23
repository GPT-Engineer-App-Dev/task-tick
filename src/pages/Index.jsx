import React, { useState } from "react";
import { Container, VStack, HStack, Input, Button, Text, IconButton, Box } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editingText, setEditingText] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask }]);
      setNewTask("");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (task) => {
    setEditingTask(task.id);
    setEditingText(task.text);
  };

  const saveTask = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, text: editingText } : task)));
    setEditingTask(null);
    setEditingText("");
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <HStack width="100%">
          <Input
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Button onClick={addTask} colorScheme="teal">
            Add Task
          </Button>
        </HStack>
        <VStack spacing={4} width="100%">
          {tasks.map((task) => (
            <HStack key={task.id} width="100%" justifyContent="space-between">
              {editingTask === task.id ? (
                <Input
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
              ) : (
                <Text>{task.text}</Text>
              )}
              <HStack>
                {editingTask === task.id ? (
                  <Button onClick={() => saveTask(task.id)} colorScheme="teal">
                    Save
                  </Button>
                ) : (
                  <IconButton
                    aria-label="Edit"
                    icon={<FaEdit />}
                    onClick={() => editTask(task)}
                  />
                )}
                <IconButton
                  aria-label="Delete"
                  icon={<FaTrash />}
                  onClick={() => deleteTask(task.id)}
                />
              </HStack>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;