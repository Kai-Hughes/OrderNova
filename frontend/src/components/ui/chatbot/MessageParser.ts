class MessageParser {
    actionProvider: any;
  
    constructor(actionProvider: any) {
      this.actionProvider = actionProvider;
    }
  
    parse(message: string) {
      const lowerCaseMessage = message.toLowerCase();
      console.log("User message:", lowerCaseMessage); // Log the user input
  
      if (lowerCaseMessage.includes("orders help")) {
        console.log("Detected intent: orders help");
        this.actionProvider.handleOrdersHelp();
        return; // Exit after handling the intent
      }
      
      if (lowerCaseMessage.includes("invoices help")) {
        console.log("Detected intent: invoices help");
        this.actionProvider.handleInvoicesHelp();
        return; // Exit after handling the intent
      }

      // Handle "hello" intent
      if (lowerCaseMessage.includes("hello")) {
        console.log("Detected intent: hello");
        this.actionProvider.handleHello();
        return; // Exit after handling the intent
      }
  
      // Handle "my name is" intent
      if (lowerCaseMessage.includes("my name is")) {
        const nameMatch = lowerCaseMessage.match(/my name is (\w+)/);
        if (nameMatch) {
          const username = nameMatch[1];
          localStorage.setItem('username', username);
          console.log('Username saved to localStorage:', username);
          this.actionProvider.handleHelloWithName(username);
          return; // Exit after handling the intent
        }
      }
  
      // Handle "bulk order" intent
      if (lowerCaseMessage.includes("bulk order")) {
        this.actionProvider.handleNavigateToBulkOrder();
        return; // Exit after handling the intent
      }
  
      if (
        lowerCaseMessage.includes("your orders") ||
        lowerCaseMessage.includes("my orders") ||
        lowerCaseMessage.includes("view orders") ||
        lowerCaseMessage.includes("show orders") ||
        lowerCaseMessage.includes("orders")
      ) {
        this.actionProvider.handleNavigateToYourOrders();
        return;
      }
  
      // // Handle "go to dashboard" intent
      // if (lowerCaseMessage.includes("dashboard") || lowerCaseMessage.includes("show me my dashboard")) {
      //   console.log("Detected intent: dashboard");
      //   this.actionProvider.handleNavigateToDashboard();
      //   return; // Exit after handling the intent
      // }
  
      // if (lowerCaseMessage.includes("analytics")) {
      //   this.actionProvider.handleNavigateToAnalytics();
      //   return;
      // }
  
      if (lowerCaseMessage.includes("create order")) {
        this.actionProvider.handleNavigateToCreateOrder();
        return;
      }
      
      // if (lowerCaseMessage.includes("open profile")) {
      //   this.actionProvider.handleNavigateToProfile();
      //   return;
      // }
      
      // if (lowerCaseMessage.includes("open settings")) {
      //   this.actionProvider.handleNavigateToSettings();
      //   return;
      // }
      
      if (lowerCaseMessage.includes("create invoice")) {
        this.actionProvider.handleNavigateToCreateInvoice();
        return;
      }
      
      if (lowerCaseMessage.includes("view invoice")) {
        this.actionProvider.handleNavigateToViewInvoice();
        return;
      }
      
      if (lowerCaseMessage.includes("api docs")) {
        this.actionProvider.handleOpenApiDocs();
        return;
      }
  
      // // Handle "create an order" intent
      // if (lowerCaseMessage.includes("how to create an order")) {
      //   console.log("Detected intent: create an order");
      //   this.actionProvider.handleCreateOrderInfo();
      //   return; // Exit after handling the intent
      // }
  
      // // Handle "check invoice" intent
      // if (lowerCaseMessage.includes("how to check invoice")) {
      //   console.log("Detected intent: check invoice");
      //   this.actionProvider.handleCheckInvoiceInfo();
      //   return; // Exit after handling the intent
      // }

      if (lowerCaseMessage.includes("contact support")) {
        console.log("Detected intent: contact support");
        this.actionProvider.handleContactSupport();
        return;
      }
  
      // Handle "help" intent
      if (lowerCaseMessage.includes("help")) {
        console.log("Detected intent: help");
        this.actionProvider.handleHelp();
        return; // Exit after handling the intent
      }
  
      // Handle unknown messages
      console.log("Detected intent: unknown");
      this.actionProvider.handleUnknown();
    }
  }
  
  export default MessageParser;
  