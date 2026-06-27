// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


class ActionProvider {
    createChatBotMessage: any;
    setState: any;
  
    constructor(createChatBotMessage: any, setStateFunc: any) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
    }
  
    handleNavigateToCreateOrder() {
      const message = this.createChatBotMessage(
        "Sure! Redirecting you to the Create Order page..."
      );
      this.setState((prevState: any) => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }));
      setTimeout(() => {
        window.location.href = "/orders/create"; // Navigate to Create Order page
      }, 1500);
    }
  
    handleNavigateToBulkOrder() {
      const message = this.createChatBotMessage("Sure! Redirecting you to the Bulk Order page...");
      this.setState((prevState: any) => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }));
      setTimeout(() => {
        window.location.href = '/orders/bulk'; // Navigate to Delete Order page
      }, 1500);
    }
  
    handleNavigateToYourOrders() {
      const message = this.createChatBotMessage("Got it! Taking you to your Orders page...");
      this.setState((prevState: any) => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }));
      setTimeout(() => {
        window.location.href = '/orders/view'; // Navigate to Your Orders page
      }, 1500);
    }
    
    // handleNavigateToDashboard() {
    //   const message = this.createChatBotMessage("Sure! Redirecting you to your Dashboard...");
    //   this.setState((prevState: any) => ({
    //     ...prevState,
    //     messages: [...prevState.messages, message],
    //   }));
    //   setTimeout(() => {
    //     window.location.href = "/dashboard"; // Navigate to Dashboard page
    //   }, 1500);
    // }
    
    handleNavigateToCreateInvoice() {
      const message = this.createChatBotMessage("Sure! Taking you to the Create Invoice page.");
      this.setState((prevState: any) => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }));
      setTimeout(() => {
        window.location.href = "/invoices/create";
      }, 1500);
    }
    
    handleNavigateToViewInvoice() {
      const message = this.createChatBotMessage("Redirecting to the View Invoice page...");
      this.setState((prevState: any) => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }));
      setTimeout(() => {
        window.location.href = "/invoices/view";
      }, 1500);
    }
    
    handleOpenApiDocs() {
      const message = this.createChatBotMessage("Opening the API docs in a new tab...");
      this.setState((prevState: any) => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }));
      setTimeout(() => {
        // window.open(`${API_BASE_URL}/api-docs`, "_blank");
      }, 1500);
    }
  
    handleHello() {
      const username = localStorage.getItem('username') || 'there'; // Default to "there" if username is not found
      const message = this.createChatBotMessage(`Hello, ${username}! 😊 How can I assist you today?`);
      this.setState((prevState: any) => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }));
    }
  
    handleHelloWithName(username: string) {
      const message = this.createChatBotMessage(`Nice to meet you, ${username}! 😊 How can I assist you today?`);
      this.setState((prevState: any) => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }));
    }
  
    // handleNavigateToAnalytics() {
    //   const message = this.createChatBotMessage("Redirecting to the analytics page...");
    //   this.setState((prevState: any) => ({
    //     ...prevState,
    //     messages: [...prevState.messages, message],
    //   }));
    //   setTimeout(() => {
    //     window.location.href = "/analytics";
    //   }, 1500);
    // }
  
    handleHelp() {
      const message = this.createChatBotMessage(`
        Here’s what I can help you with:- 
        1 - "Orders Help"
        2 - "Invoices Help"
        3 - "Open API docs"
        4 - "Contact Support"
        5 - "Create Order"
        6 - "Create Invoice"
        7 - "View Invoice"
        8 - "Bulk Order"
        9 - "View Orders"
      `);
    
      this.setState((prevState: any) => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }));
    }

    handleContactSupport() {
      const message = this.createChatBotMessage(
        "You can contact our support team at support@ordernova.com or call us at +1-800-114-4667."
      );
      this.setState((prevState: any) => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }));
    }
  
    // handleCreateOrderInfo() {
    //   const message = this.createChatBotMessage(
    //     "To create an order, go to the 'Orders' section, fill in the buyer and seller details, add items, and submit the form. Or simply type 'go to create order'."
    //   );
    //   this.setState((prevState: any) => ({
    //     ...prevState,
    //     messages: [...prevState.messages, message],
    //   }));
    // }

    handleOrdersHelp() {
      const message = this.createChatBotMessage(`
        Here’s what you can do in the Orders section:
        1. "Create Order" - Create an order at the Create Order page.
        2. "View Orders" - See a list of all your orders.
        3. "Bulk Order" - Upload bulk orders using a CSV or XLSX file.
      `);
      this.setState((prevState: any) => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }));
    }
    
    handleInvoicesHelp() {
      const message = this.createChatBotMessage(`
        Here’s what you can do in the Invoices section:
        1. "Create Invoice" - Create an Invoice at the page.
        2. "View Invoices" - See a list of all your invoices.
      `);
      this.setState((prevState: any) => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }));
    }
  
    // handleCheckInvoiceInfo() {
    //   const message = this.createChatBotMessage(
    //     "To check an order invoice, go to the 'Invoices' section, enter the order ID, and view the invoice details."
    //   );
    //   this.setState((prevState: any) => ({
    //     ...prevState,
    //     messages: [...prevState.messages, message],
    //   }));
    // }
  
    handleUnknown() {
      const message = this.createChatBotMessage(
        "I'm sorry, I didn't understand that. Can you please rephrase?"
      );
      this.setState((prevState: any) => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }));
    }
  }
  
  export default ActionProvider;
  