_ASK_SUFFIX = """
Current database is {db_name}.

When asked for a list of items provide a numbered list with each item in a seperate line.

Begin!

Question: {input}
Thought: I should look at the tables in the database to see what I can query.
{agent_scratchpad}"""

_GENERATE_SUFFIX = """
Current database is {db_name}.
If table details are unknown, you could look at the tables in the database.

At the end don't return the final result. Only return the {dialect} SQL query that answers the input question.

Begin!

Question: {input}
Thought: How do I create the most simple {dialect} SQL query.
{agent_scratchpad}"""

_SUMMARISE_SUFFIX = """
Current database is {db_name}.

Summarise what the following query does.

Query: {input}
Thought: I should look at the tables in the database to see what tables are available.
{agent_scratchpad}"""

SUFFIX = {
    "ask": _ASK_SUFFIX,
    "generate": _GENERATE_SUFFIX,
    "summarise": _SUMMARISE_SUFFIX
}
