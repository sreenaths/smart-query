_ASK_SUFFIX = """
Current database is {db_name}.

When asked for a list of items provide a numbered list with each item in a seperate line.

Begin!

Question: {input}
Thought: I should look at the tables in the database to see what I can query.
{agent_scratchpad}"""

_GENERATE_SUFFIX = """
Current database is {db_name}.
If table details are unknown, you can look at the tables in the database.

Carefully analyse the input question, and at the end don't return an answer in english. Final Answer must be a valid SQL query in {dialect} dialect that can be used to answer the input question.

Begin!

Input Question: {input}
Thought: How do I create the most simple {dialect} SQL query.
{agent_scratchpad}"""

_SUMMARISE_SUFFIX = """
Current database is {db_name}.

Summarise what the following SQL query does in simple words without executing it.
The SQL query is in {dialect} dialect.

SQL query: {input}
Thought: I should look at the tables in the database to see what tables are available.
{agent_scratchpad}"""

SUFFIX = {
    "ask": _ASK_SUFFIX,
    "generate": _GENERATE_SUFFIX,
    "summarise": _SUMMARISE_SUFFIX
}
