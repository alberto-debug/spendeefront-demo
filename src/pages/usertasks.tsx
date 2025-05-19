import { Box, Text, Button, Table, Thead, Tbody, Tr, Th, Td, Heading, TableContainer, useMediaQuery, Link } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface UserSummary {
  id: number;
  name: string;
  email: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
}

const UserTasks = () => {
  const [users, setUsers] = useState<UserSummary[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserSummary | null>(null);
  const navigate = useNavigate();
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const { email } = useParams();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<UserSummary[]>("http://localhost:8080/admin/users", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("auth-token")}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    if (email) {
      const fetchUserTasks = async () => {
        try {
          const response = await axios.get<Task[]>(`http://localhost:8080/admin/users/${email}/tasks`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("auth-token")
