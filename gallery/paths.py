import os
import json

def path_to_dict(path):
    print(os.path.basename(path))
    d = {'name': os.path.basename(path)}
    if os.path.isdir(path):
        d['type'] = "directory"
        d['children'] = [path_to_dict(os.path.join(path,x)) for x in os.listdir\
(path)]
    else:
        d['type'] = "file"
    return d

paths = "var paths = "
paths = paths + json.dumps(path_to_dict('./gallery/assets/img/img')) 
print(paths)