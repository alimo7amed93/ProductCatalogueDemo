# 💬 Chat with your Product Catalogue -TMF-620 Compliant- Demo using NextJs & MCP Server

This project demonstrates how to **talk to your product catalogue** using natural language — ask questions, make updates, and perform complex actions, all through a conversational interface.  

Built on **TMF-620 Product Catalogue Specification**, this demo ties together a **Next.js backend**, a **React frontend**, and a **Python MCP server** to show how conversational product management can work in practice.  

---

## ✨ Features  
- **TMF-620 Compliant API (Node.js)**  
  - Manage product specifications, product offerings, and offering prices  
  - Secured with simple username/password authentication  

- **Database Seeding**  
  - Preloaded with sample product data: broadband packages, CPE devices, static IP add-ons  

- **React Frontend**  
  - Displays product catalogue details in a simple UI  

- **MCP Server (Python + fastmcp)**  
  - Conversational interface over catalogue APIs  
  - Ask questions and perform CRUD operations with natural language  

- **MCP Client**  
  - Claude Desktop  
---

## 🛠️ Tech Stack  
- **Backend:** Next.js 
- **Frontend:** React  
- **Conversational Layer:** Python, fastmcp, Claude desktop
- **Specification:** TMF-620 Product Catalogue  

---

## 🎥 Demo  
[![Watch the demo on YouTube](https://img.youtube.com/vi/tIWHlRqjNes/0.jpg)](https://www.youtube.com/watch?v=tIWHlRqjNes) 

---

## 💬 Example Interactions  

- **Based on our catalogue what broadband products do we have and what are their prices?**
- **What is the cheapest bundle do we have?**
- **Add CPE Basic instead to this bundle and change it's price to 100$**

---
## Run

### NextJs

```bash
npm run dev
```

### MCP server (Python)
```bash
fastmcp run .\server.py
```
### claude_desktop_config.json

```json
{
    "mcpServers": {
      "product-catalogue-mcp": {
        "command": "fastmcp",
        "args": ["run", "{{Path}}\\server.py"]
      }
    }
}
```