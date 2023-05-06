import json
from dotenv import dotenv_values

env = dotenv_values("./.env")

def load_configs(file_path):
    with open(file_path, "r") as f:
        return json.load(f)

_configs = load_configs("./configs.json")
configs = {
    'llm': _configs["llm"],
    'connectors': {con["id"]: con for con in _configs["connectors"]}
}
