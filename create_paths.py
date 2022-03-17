import os
import json
from unicodedata import category
import imagesize

def path_to_dict(path):
    obj = []
    categories = set()
    id = 1
    for dir in os.listdir(path):
        for file in os.listdir(os.path.join(path, dir)):
            obj.append({
                'id': id,
                'name': file,
                'type': 'image' if file.split('.')[-1] in ['jpeg', 'jpg', 'gif'] else 'video',
                'width': imagesize.get(os.path.join(path, dir, file))[0],
                'height': imagesize.get(os.path.join(path, dir, file))[1],
                'category': dir,
                'src': f'/images/{dir}/{file}'
            })
            categories.add(dir)
            id += 1
    return obj, categories

paths = "export var paths = "
media_objs, categories = path_to_dict('./public/images')
paths += json.dumps(media_objs) + "\n"
paths += "export var categories = " + json.dumps(list(categories))
print(paths)
