<h1 align="center">
Zotero-ChatPDF
</h1>
Zotero-ChatPDF is an advanced tool that integrates seamlessly with Zotero, enabling effortless interaction with PDF documents through state-of-the-art (SOTA) large language models (LLMs). It offers users the ability to ask questions, extract insights, and converse with PDFs directly, providing a powerful research assistant for scholars, researchers, and anyone who deals with large amounts of text in PDF format.

# Key Features
Effortless PDF Interaction: Chat with your PDFs directly in Zotero, asking questions and receiving detailed answers in natural language.  
 
SOTA Language Models: Powered by cutting-edge LLMs, such as gpt-4o, claude-3.5-sonnet and gemini-1.5-pro, offering highly accurate and contextually relevant responses.   
For Mac users, there are some excellent free and open-source models built in, such as llama3.1, gemma2, phi-3.5, etc. Now after free registration, they can be automatically downloaded, installed and used with just one click on the plugin page, and the model data is all locally stored, ensuring absolute privacy and security of the data 

Annotations and Highlights: Extract annotations and highlights from your PDFs and use them for deeper analysis and conversation.

Full-text Search: Automatically scan and index the full text of PDFs to enable more precise question-answering.

Seamless Zotero Integration: Syncs directly with your Zotero library, making it easy to manage and query your documents without leaving the Zotero interface.
  

# How to Use
Installation: Download [here](), Open Zotero. In the top menu bar, click on `Tools > Add-ons`.  
              
              Click on the gear icon at the top right of the window. Click on `Install Add-on From File` and open the downloaded plugin file zotero-chatpdf.xpi.

Startup: In Zotero, press the keys to start the plugin, MacOS(command + enter), Windows(ctrl + enter). 

Select LLM models: For Windows users, after registering the OpenAI, Claude, and Gemini models can all be accessed and switched by one click.  

                   For Mac users, after registering llama3.1, gemma2, phi-3.5 and mistral can all be used by just one click in plugin without extra need to install many additional tools or softwares.  
                   Now the registration is open and free!
 
Chat with PDFs: Open any PDF and start asking questions. Zotero-ChatPDF will process the document and provide insightful responses.

Manage Insights: Save, export, or share the extracted insights, answers, and annotations from your conversations.

Quit: Press esc key to exit. 


# Build the plugin
If you like to build the plugin by yourself, do as the below commands:

```bash
git clone https://github.com/ljeagle/zotero-chatpdf.git
cd zotero-chatpdf
npm install
npm run build
```
The plugin file(zotero-chatpdf.xpi) will be built and generated into the build directory
 
 
# Use Cases
Research Assistance: Summarize research papers, identify key concepts, and quickly get answers to your questions.

Academic Writing: Generate insights for literature reviews or dive deep into specific sections of papers.  

Collaborative Projects: Share annotated PDFs and responses with colleagues and teams for smoother collaboration.
  
# Contributions
Contributions to Zotero-ChatPDF are welcome! Please follow the standard GitHub process for submitting pull requests or reporting issues.

