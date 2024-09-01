import json

with open('package.json', 'r') as f:
    data = json.load(f)

if 'dependencies' in data:
    for key, value in data['dependencies'].items():
        data['dependencies'][key] = 'latest'
else:
    print("dependencies property not found in package.json")

if 'devDependencies' in data:
    for key, value in data['devDependencies'].items():
        data['devDependencies'][key] = 'latest'
else:
    print("devDependencies property not found in package.json")

with open('package.json', 'w') as f:
    json.dump(data, f, indent=4)