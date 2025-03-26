import React from "react";
import { Button, Icon, useMediaQuery } from "@chakra-ui/react";
import { FaDownload } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../images/logo.jpg";

interface DownloadPdfButtonProps {
  transactions: any[];
  balance: number;
}

const DownloadPdfButton: React.FC<DownloadPdfButtonProps> = ({
  transactions,
  balance,
}) => {
  const handleDownloadPdf = () => {
    const doc = new jsPDF();

    // Logo (Assuming you have a base64-encoded logo or image URL)
    // Replace 'logoBase64' with your actual logo data or use doc.addImage with a URL/path
    const logoBase64 = "your_base64_logo_string_here"; // Placeholder
    doc.addImage(logo, "jpg", 10, 10, 40, 20); // Adjust size/position as needed

    // Header Section
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 51, 102); // Dark blue color
    doc.text("Financial Transactions Report", 55, 20);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(50, 50, 50); // Dark gray
    doc.text(
      "A detailed summary of your financial activities and account status",
      55,
      30,
    );
    doc.text(`Report Generated: ${new Date().toLocaleDateString()}`, 55, 38);

    // Divider Line
    doc.setLineWidth(0.5);
    doc.setDrawColor(0, 51, 102);
    doc.line(10, 45, 200, 45);

    // Balance Summary
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Account Overview", 10, 55);
    doc.setFontSize(12);
    doc.text("Current Balance:", 10, 65);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(34, 139, 34); // Forest green for balance
    doc.text(`$${balance.toFixed(2)}`, 60, 65);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(50, 50, 50);
    doc.text(
      "This balance reflects all recorded transactions up to the report date.",
      10,
      75,
    );

    // Transactions Table
    const tableData = [
      ["Date", "Description", "Type", "Amount"],
      ...transactions.map((transaction) => [
        new Date(transaction.date).toLocaleDateString(),
        transaction.description,
        transaction.type,
        transaction.type === "INCOME"
          ? `+$${transaction.amount.toFixed(2)}`
          : `-$${transaction.amount.toFixed(2)}`,
      ]),
    ];

    autoTable(doc, {
      head: [tableData[0]],
      body: tableData.slice(1),
      startY: 85,
      styles: {
        fontSize: 10,
        cellPadding: 3,
        textColor: [50, 50, 50],
        lineWidth: 0.1,
        lineColor: [200, 200, 200],
      },
      headStyles: {
        fillColor: [0, 51, 102], // Dark blue header
        textColor: [255, 255, 255], // White text
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245], // Light gray for alternate rows
      },
      didParseCell: (data) => {
        if (data.column.index === 2) {
          const cellText = data.cell.text.toString();
          if (cellText === "INCOME") {
            data.cell.styles.fillColor = [230, 255, 230]; // Very light green
          } else if (cellText === "EXPENSE") {
            data.cell.styles.fillColor = [255, 230, 230]; // Very light red
          }
        }
        if (data.column.index === 3) {
          data.cell.styles.halign = "right"; // Right-align amounts
        }
      },
    });

    // Additional Insights
    const finalY = (doc as any).lastAutoTable.finalY || 85;
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Transaction Summary", 10, finalY + 15);
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);
    const totalIncome = transactions
      .filter((t) => t.type === "INCOME")
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions
      .filter((t) => t.type === "EXPENSE")
      .reduce((sum, t) => sum + t.amount, 0);
    doc.text(`Total Income: $${totalIncome.toFixed(2)}`, 10, finalY + 25);
    doc.text(`Total Expenses: $${totalExpense.toFixed(2)}`, 10, finalY + 33);
    doc.text(
      `Net Change: $${(totalIncome - totalExpense).toFixed(2)}`,
      10,
      finalY + 41,
    );

    // Footer
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFillColor(0, 51, 102);
    doc.rect(0, pageHeight - 25, 210, 25, "F"); // Blue footer background
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text(
      "© 2025 xAI Financial Services | All Rights Reserved",
      10,
      pageHeight - 15,
    );
    doc.text(
      "Contact Us: support@xai-finance.com | Phone: (123) 456-7890",
      10,
      pageHeight - 8,
    );
    doc.text(
      "Confidential: This document is intended solely for the recipient.",
      140,
      pageHeight - 15,
      { align: "right" },
    );

    doc.save("Financial_Transactions_Report.pdf");
  };

  const [isSmallScreen] = useMediaQuery("(max-width: 600px)");
  const fontSize = isSmallScreen ? "sm" : "md";

  return (
    <Button
      bg="black"
      border="1px solid #1a1a1d"
      color="white"
      borderRadius="10px"
      _hover={{ bg: "#0C0F15" }}
      _active={{ bg: "#1a1a1d" }}
      onClick={handleDownloadPdf}
      leftIcon={
        <Icon
          as={FaDownload}
          color="blue.500"
          boxSize={{ base: "16px", md: "20px", lg: "24px" }}
        />
      }
      size="lg"
      height={{ base: "60px", md: "75px", lg: "90px" }}
      width={{ base: "100px", md: "115px", lg: "130px" }}
      fontSize={{ base: "12px", md: "14px", lg: "16px" }}
    >
      Download Report
    </Button>
  );
};

export default DownloadPdfButton;
