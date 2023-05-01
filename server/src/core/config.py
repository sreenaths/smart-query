import json
from dotenv import dotenv_values

env = dotenv_values("../.env")

def load_configs(file_path):
    with open(file_path, "r") as f:
        return json.load(f)

configs = load_configs("../configs.json")
