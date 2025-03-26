import React from "react";
import { Button, Icon, useMediaQuery } from "@chakra-ui/react";
import { FaDownload } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../images/logo.jpg"; // Ensure this path is correct

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
    const pageWidth = doc.internal.pageSize.getWidth();

    // Logo - Centered
    const logoWidth = 40;
    const logoHeight = 20;
    const logoX = (pageWidth - logoWidth) / 2; // Center horizontally
    doc.addImage(logo, "JPG", logoX, 10, logoWidth, logoHeight);

    // Header Section
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 51, 102); // Dark blue
    doc.text("Financial Transactions Report", pageWidth / 2, 40, {
      align: "center",
    });

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(50, 50, 50); // Dark gray
    doc.text(
      "A detailed summary of your financial activities and account status",
      pageWidth / 2,
      48,
      { align: "center" },
    );
    doc.text(
      `Report Generated: ${new Date().toLocaleDateString()}`,
      pageWidth / 2,
      56,
      {
        align: "center",
      },
    );

    // Divider Line
    doc.setLineWidth(0.5);
    doc.setDrawColor(0, 51, 102);
    doc.line(10, 62, pageWidth - 10, 62);

    // Balance Summary
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Account Overview", 10, 70);
    doc.setFontSize(12);
    doc.text("Current Balance:", 10, 80);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(34, 139, 34); // Forest green
    doc.text(`$${balance.toFixed(2)}`, 60, 80);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(50, 50, 50);
    doc.text(
      "This balance reflects all recorded transactions up to the report date.",
      10,
      88,
    );

    // Transactions Table - Smaller Row Heights
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
      startY: 95,
      styles: {
        fontSize: 9, // Reduced font size
        cellPadding: 1.5, // Reduced padding for smaller rows
        textColor: [50, 50, 50],
        lineWidth: 0.1,
        lineColor: [200, 200, 200],
      },
      headStyles: {
        fillColor: [0, 51, 102], // Dark blue header
        textColor: [255, 255, 255], // White text
        fontStyle: "bold",
        fontSize: 10,
        cellPadding: 2,
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245], // Light gray for alternate rows
      },
      didParseCell: (data) => {
        if (data.column.index === 2) {
          const cellText = data.cell.text.toString();
          if (cellText === "INCOME") {
            data.cell.styles.fillColor = [230, 255, 230]; // Light green
          } else if (cellText === "EXPENSE") {
            data.cell.styles.fillColor = [255, 230, 230]; // Light red
          }
        }
        if (data.column.index === 3) {
          data.cell.styles.halign = "right"; // Right-align amounts
        }
      },
    });

    // Additional Insights
    const finalY = (doc as any).lastAutoTable.finalY || 95;
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Transaction Summary", 10, finalY + 10);
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);
    const totalIncome = transactions
      .filter((t) => t.type === "INCOME")
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions
      .filter((t) => t.type === "EXPENSE")
      .reduce((sum, t) => sum + t.amount, 0);
    doc.text(`Total Income: $${totalIncome.toFixed(2)}`, 10, finalY + 18);
    doc.text(`Total Expenses: $${totalExpense.toFixed(2)}`, 10, finalY + 25);
    doc.text(
      `Net Change: $${(totalIncome - totalExpense).toFixed(2)}`,
      10,
      finalY + 32,
    );

    // Footer - Fixed to Avoid Overlap
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFillColor(0, 51, 102);
    doc.rect(0, pageHeight - 20, pageWidth, 20, "F"); // Reduced height to 20
    doc.setFontSize(8); // Smaller font to fit
    doc.setTextColor(255, 255, 255);
    doc.text(
      "© 2025 xAI Financial Services | All Rights Reserved",
      10,
      pageHeight - 13,
    );
    doc.text(
      "Contact Us: support@xai-finance.com | Phone: (123) 456-7890",
      10,
      pageHeight - 6,
    );
    doc.text(
      "Confidential: For recipient use only",
      pageWidth - 10,
      pageHeight - 6,
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
