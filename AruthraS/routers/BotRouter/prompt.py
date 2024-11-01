from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

history_prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "Answer questions only about SQL and databases, based on this table structure: {structure}. If the question is unrelated to SQL, prompt the user to ask an SQL-specific question.",
        ),
        MessagesPlaceholder(variable_name="history"),
        ("human", "{input}")
    ]
)

no_history_prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "Answer questions only about SQL and databases, based on this table structure: {structure}. If the question is unrelated to SQL, prompt the user to ask an SQL-specific question.",
        ),
        ("human", "{input}")
    ]
)
