# 🎓 Rate My Professor Chat Assistant

A modern, AI-powered chat interface that helps students find and learn about professors using RAG (Retrieval Augmented Generation) technology. Get personalized professor recommendations and insights based on the Rate My Professor database.

![Rate My Professor Chat](https://img.shields.io/badge/Status-In%20Development-yellow)
![Next.js](https://img.shields.io/badge/Next.js-13.0-black)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-blue)
![Pinecone](https://img.shields.io/badge/Pinecone-Vector%20DB-purple)

## 🌟 Features

- 🤖 AI-powered chat interface for professor inquiries
- 📚 Real-time professor recommendations based on student feedback
- 🔍 Smart search using RAG technology
- 💬 Interactive chat experience with markdown support
- 📊 Detailed professor ratings and reviews
- 🎯 Personalized recommendations based on specific criteria

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Pinecone account
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/stonewerner/rag-rmp.git
cd rag-rmp
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
# Create a .env.local file with:
PINECONE_API_KEY=your_pinecone_api_key
OPENAI_API_KEY=your_openai_api_key
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

## 🏗️ Architecture

### Frontend
- Built with Next.js and Material-UI
- Real-time chat interface with message streaming
- Markdown rendering support
- Responsive design

### Backend
- Next.js API routes for handling chat requests
- RAG implementation using Pinecone vector database
- OpenAI embeddings and GPT-4 for natural language processing
- Streaming response implementation

## 💻 Technology Stack

- **Frontend Framework**: Next.js
- **UI Components**: Material-UI
- **Markdown Rendering**: React-Markdown
- **Vector Database**: Pinecone
- **AI Model**: OpenAI GPT-4
- **API**: REST with streaming support

## 🔧 Configuration

The application uses a system prompt that can be customized to modify the AI assistant's behavior. The current configuration includes:

- Top 3 professor recommendations per query
- Detailed professor information including:
  - Name
  - Department/Subject
  - Overall rating
  - Student feedback summary
  - Key positive/negative points

## 📝 Usage

1. Start the application
2. Enter your question about professors in the chat interface
3. Receive real-time responses with professor recommendations
4. Continue the conversation for more detailed information

Example queries:
- "Who are the best Computer Science professors for introductory courses?"
- "Which professors have the highest ratings in the Mathematics department?"
- "Can you recommend professors who are known for clear explanations?"

## 🛠️ Development

### Project Structure
```
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.js    # API endpoint for chat
│   └── page.js             # Main chat interface
├── public/
└── package.json
```

### API Endpoint

The `/api/chat` endpoint handles:
- Vector similarity search using Pinecone
- OpenAI embeddings generation
- Response streaming
- Context management

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ✨ Acknowledgments

- OpenAI for providing the GPT-4 model
- Pinecone for vector database capabilities
- Rate My Professor for the original inspiration

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainers.
