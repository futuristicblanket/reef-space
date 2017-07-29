import json
import io

def main():
	jsonData = JSONtoArrDict("data/waveData.json")
	latestTime = findLatestTime(jsonData)
	latestData = findLatestData(latestTime, jsonData)
	dictToJSON(latestData, "data/waveData_latest.json")

def dictToJSON(dictionary, file):
	try:
		to_unicode = unicode
	except NameError:
		to_unicode = str
	
	with io.open(file, 'a', encoding='utf8') as jsonFile:
		str_ = json.dumps(dictionary, indent=4, separators=(',', ': '), ensure_ascii=False, sort_keys=False)
	
def JSONtoArrDict(fileName):
	with open(fileName) as jsonFile:    
		data = json.load(jsonFile)
	return data

def findLatestTime(data):
	times = []
	for l in data:
		times.append(l["Data"][0])
	return times[-1]

def findLatestData(time, data):
	allData = []
	for l in data:
		if l["Data"][0] is time:
			allData.append(l)
	return allData

main()