import re
with open(r'E:\space project\src\data\destinations.ts', 'r', encoding='utf-8') as f:
    content = f.read()

entries = re.findall(r'node_id:\s*"(\w+)".*?hospitality:\s*\{[^}]*hotel_nodes:\s*\[(.*?)\]', content, re.DOTALL)
for node_id, hotels_section in entries:
    hotels = re.findall(r'id:\s*"([^"]+)".*?name:\s*"([^"]+)".*?tier:\s*"([^"]+)"', hotels_section, re.DOTALL)
    for hid, hname, htier in hotels:
        print(f'{node_id}: {hid} - {hname} ({htier})')
