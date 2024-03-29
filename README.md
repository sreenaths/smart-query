# Smart Query

Smart Query integrates a database and a LLM, and provides a set of APIs to interact with them.

## Server Scripts

Must be run inside `./server` directory. On Python 3.9.16 or higher.

### Activate Server Environment
```
source ./activate.sh
```
Activate would setup & activate a Python venv, install requirements and set PYTHONPATH environment variable.

### Start Server
venv must be active before running the server.
```
uvicorn --app-dir ./src app:app --reload
```

Server would start running on http://127.0.0.1:8000.

### Deactivate Server Environment
```
deactivate
```

### Update requirements.txt
```
pip freeze > requirements.txt
```
Must be run after adding a new pip dependency.

### Connection test

After activating the server, run the following to test Hive connection. It would quickly check if all the activation steps went fine.
```
cd sample_dbs/model_store/test/
python test_hive_connection.py
```

### Linux Prerequisites
Install Python 3.9.16 - https://computingforgeeks.com/install-latest-python-on-centos-linux/

```
alias python=/usr/local/bin/python3.9
alias pip=/usr/local/bin/pip3.9
yum install cyrus-sasl-devel
```

## UI Scripts

Must be run inside `./ui` directory.

### Start Server
```
npm start
```

UI would be started in dev mode on port 3000, and you can now view it in the browser at http://localhost:3000.

## Samples DBs

Smart Query comes with a set of sample databases that includes both schema and data for various dialects to try out the features.

1. [Model Store](./sample_dbs/model_store/README.md) - Hive, MySQL
