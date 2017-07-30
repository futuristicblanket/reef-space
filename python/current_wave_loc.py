import json
import io

def main():
	jsonData = JSONtoArrDict("data/waveData.json")
	latestTime = findLatestTime(jsonData)
	latestData = findLatestData(latestTime, jsonData)
	clearFile("data/waveData_latest.json")
	dictToJSON(latestData, "data/waveData_latest.json")

def clearFile(fileName):
	file = open(fileName, 'w')
	file.write('')
	file.close()
	
def dictToJSON(dictionary, file):
	try:
		to_unicode = unicode
	except NameError:
		to_unicode = str
	with io.open(file, 'a', encoding='utf8') as jsonFile:
		str_ = json.dumps(dictionary, indent=4, separators=(',', ': '), ensure_ascii=False, sort_keys=False)
		jsonFile.write(to_unicode(str_))
	
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
		if (l["Data"][0] == time):
			allData.append(l)
	return allData

main()