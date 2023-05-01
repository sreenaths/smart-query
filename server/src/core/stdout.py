from io import StringIO
import sys
import re

ansi_escape = re.compile(r'\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])')

def trap_stdout():
    trap = StringIO()
    sys.stdout = trap
    return trap

def get_stdout(trap):
      sys.stdout = sys.__stdout__
      out = trap.getvalue()
      out = ansi_escape.sub('', out).strip()
      return "\n".join(out.split("\n")[1:-1]).strip()
