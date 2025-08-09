import React from "react";
import { Button, Icon, useMediaQuery, Box, Flex } from "@chakra-ui/react";
import { FaDownload } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../images/fpdf.png"; // Ensure this path is correct

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

    // Logo - Left Side
    const logoWidth = 31;
    const logoHeight = 27;
    doc.addImage(logo, "JPG", 10, 10, logoWidth, logoHeight); // Left-aligned at x=10

    // Header Section
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 51, 102); // Dark blue
    doc.text("Financial Transactions Report", 55, 20); // Adjusted to align with logo

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
    doc.setDrawColor(0, 51, 102); // Dark blue
    doc.line(10, 45, pageWidth - 10, 45);

    // Balance Summary
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0); // Black
    doc.text("Account Overview", 10, 55);
    doc.setFontSize(12);
    doc.text("Current Balance:", 10, 65);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(34, 139, 34); // Forest green
    doc.text(`$${balance.toFixed(2)}`, 60, 65);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(50, 50, 50); // Dark gray
    doc.text(
      "This balance reflects all recorded transactions up to the report date.",
      10,
      75,
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
      startY: 85,
      styles: {
        fontSize: 9, // Reduced font size
        cellPadding: 1.5, // Reduced padding for smaller rows
        textColor: [50, 50, 50], // Dark gray
        lineWidth: 0.1,
        lineColor: [200, 200, 200], // Light gray
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
    doc.setTextColor(0, 0, 0); // Black
    doc.text("Transaction Summary", 10, finalY + 10);
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50); // Dark gray
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
    doc.setFillColor(0, 51, 102); // Dark blue
    doc.rect(0, pageHeight - 20, pageWidth, 20, "F"); // Reduced height to 20
    doc.setFontSize(8); // Smaller font to fit
    doc.setTextColor(255, 255, 255); // White
    doc.text(
      "© 2025 Spendee Financial Services | All Rights Reserved",
      10,
      pageHeight - 13,
    );
    doc.text(
      "Contact Us: spendee@gmail.com | Phone: (+258) 844214237",
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

  return (
    <>
      {/* Desktop Version */}
      <Button
        display={{ base: "none", md: "flex" }}
        bg="linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)"
        color="white"
        borderRadius="16px"
        boxShadow="0 8px 25px rgba(0, 198, 255, 0.25)"
        _hover={{
          bg: "linear-gradient(135deg, #00b4e6 0%, #0066e6 100%)",
          transform: "translateY(-3px)",
          boxShadow: "0 12px 35px rgba(0, 198, 255, 0.35)",
        }}
        _active={{
          bg: "linear-gradient(135deg, #00a3cc 0%, #0059cc 100%)",
          transform: "translateY(-1px)",
        }}
        onClick={handleDownloadPdf}
        leftIcon={<Icon as={FaDownload} color="white" boxSize="24px" />}
        size="lg"
        height="90px"
        width="130px"
        fontSize="16px"
        fontWeight="600"
        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      >
        Download
      </Button>

      {/* Mobile Version - Ícone Redondo com mesmo tamanho */}
      <Flex
        display={{ base: "flex", md: "none" }}
        flexDirection="column"
        alignItems="center"
        gap={1}
      >
        <Box
          as="button"
          onClick={handleDownloadPdf}
          bg="linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)"
          borderRadius="full"
          p={3} // Mesmo tamanho que os botões Income/Expense
          boxShadow="0 4px 15px rgba(0, 198, 255, 0.3)"
          _hover={{
            transform: "scale(1.1)",
            boxShadow: "0 6px 20px rgba(0, 198, 255, 0.4)",
          }}
          _active={{
            transform: "scale(0.95)",
          }}
          transition="all 0.2s ease"
          cursor="pointer"
          width="48px" // Mesmo tamanho que os botões Income/Expense
          height="48px" // Mesmo tamanho que os botões Income/Expense
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={FaDownload} color="white" boxSize="20px" />
        </Box>
        <Box
          fontSize="10px"
          color="gray.300" // Cor mais clara para contrastar com fundo preto
          fontWeight="500"
          textAlign="center"
        >
          PDF
        </Box>
      </Flex>
    </>
  );
};

export default DownloadPdfButton;
