"use client";

// pages/DashboardPage.tsx
import { useState, useEffect } from "react";
import { Box, useToast } from "@chakra-ui/react";
import axios from "axios";
import Navbar from "../components/navbar2";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import BackgroundWrapper from "../components/BackgroundWrapper";
import ActionButtons from "../components/ActionButtons";
import AddTransactionDrawer from "../components/AddTransactionDrawer";
import RecentTransactionsList from "../components/RecentTransactionsList";
import ViewAllTransactionsDrawer from "../components/ViewAllTransactionsDrawer";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

interface Transaction {
  id: number;
  amount: string;
  type: string;
  date: string;
  description: string;
}

const DashboardPage = () => {
  const toast = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<number>(0);
  const [newTransaction, setNewTransaction] = useState({
    amount: "",
    type: "INCOME",
    date: new Date().toISOString().split("T")[0],
    description: "",
  });
  const [isIncomeOpen, setIsIncomeOpen] = useState(false);
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isViewAllOpen, setIsViewAllOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filterDate, setFilterDate] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);

  const handleLogout = () => {
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("username");
    window.location.href = "/login";
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get<Transaction[]>(
        "http://localhost:8080/finance/transactions",
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("auth-token")}`,
          },
        },
      );
      const sortedTransactions = response.data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
      setTransactions(sortedTransactions);
      calculateBalance(sortedTransactions);
    } catch (error) {
      toast({
        title: "Error loading transactions",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const calculateBalance = (transactions: Transaction[]) => {
    const totalIncome = transactions.reduce(
      (sum, transaction) =>
        transaction.type === "INCOME"
          ? sum + Number.parseFloat(transaction.amount)
          : sum,
      0,
    );
    const totalExpense = transactions.reduce(
      (sum, transaction) =>
        transaction.type === "EXPENSE"
          ? sum + Number.parseFloat(transaction.amount)
          : sum,
      0,
    );
    setBalance(totalIncome - totalExpense);
  };

  const handleAddTransaction = async () => {
    if (!newTransaction.amount || !newTransaction.description) {
      toast({
        title: "Required fields",
        description: "Please fill in all fields.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/finance/transaction",
        newTransaction,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("auth-token")}`,
          },
        },
      );
      const newTransactionData = response.data;
      setTransactions([newTransactionData, ...transactions]);
      calculateBalance([newTransactionData, ...transactions]);
      setNewTransaction({
        amount: "",
        type: "INCOME",
        date: new Date().toISOString().split("T")[0],
        description: "",
      });
      setIsIncomeOpen(false);
      setIsExpenseOpen(false);
      toast({
        title: "Transaction added!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error adding transaction",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTransaction = async () => {
    if (deleteId === null) return;

    setIsLoading(true);
    try {
      await axios.delete(
        `http://localhost:8080/finance/transaction/${deleteId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("auth-token")}`,
          },
        },
      );
      const updatedTransactions = transactions.filter(
        (transaction) => transaction.id !== deleteId,
      );
      setTransactions(updatedTransactions);
      calculateBalance(updatedTransactions);
      toast({
        title: "Transaction removed!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setDeleteId(null);
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast({
        title: "Error removing transaction",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const resetTransactionForm = () => {
    setNewTransaction({
      amount: "",
      type: "INCOME",
      date: new Date().toISOString().split("T")[0],
      description: "",
    });
  };

  const handleIncomeClick = () => {
    resetTransactionForm();
    setNewTransaction((prev) => ({ ...prev, type: "INCOME" }));
    setIsIncomeOpen(true);
  };

  const handleExpenseClick = () => {
    resetTransactionForm();
    setNewTransaction((prev) => ({ ...prev, type: "EXPENSE" }));
    setIsExpenseOpen(true);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <Box>
      <Navbar onLogout={handleLogout} />
      <HeroSection balance={balance} />

      <BackgroundWrapper>
        <ActionButtons
          onIncomeClick={handleIncomeClick}
          onExpenseClick={handleExpenseClick}
          transactions={transactions}
          balance={balance}
        />

        <RecentTransactionsList
          transactions={transactions}
          onViewAllClick={() => setIsViewAllOpen(true)}
        />
      </BackgroundWrapper>

      <Footer />

      {/* Add Income Drawer */}
      <AddTransactionDrawer
        isOpen={isIncomeOpen}
        onClose={() => setIsIncomeOpen(false)}
        type="INCOME"
        transaction={newTransaction}
        onTransactionChange={setNewTransaction}
        onAddTransaction={handleAddTransaction}
        isLoading={isLoading}
      />

      {/* Add Expense Drawer */}
      <AddTransactionDrawer
        isOpen={isExpenseOpen}
        onClose={() => setIsExpenseOpen(false)}
        type="EXPENSE"
        transaction={newTransaction}
        onTransactionChange={setNewTransaction}
        onAddTransaction={handleAddTransaction}
        isLoading={isLoading}
      />

      {/* View All Transactions Drawer */}
      <ViewAllTransactionsDrawer
        isOpen={isViewAllOpen}
        onClose={() => setIsViewAllOpen(false)}
        transactions={transactions}
        filterDate={filterDate}
        filterType={filterType}
        onFilterDateChange={setFilterDate}
        onFilterTypeChange={setFilterType}
        onDeleteTransaction={handleDeleteClick}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteTransaction}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default DashboardPage;
