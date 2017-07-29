import json

def main():
	timeRecords = findDataTimes("data/waveData.json")
	latestData = findLatestData("data/waveData.json", timeRecords[-1])
	createJSONFile("data/waveData_latest.json", latestData)

def findDataTimes(jsonFileName):
	jsonFile = open(jsonFileName)
	lineNo = 0
	time = []
	for l in jsonFile:
		if (lineNo % 8 == 2):
			if l not in time:
				time.append(l)
		lineNo += 1
	jsonFile.close()
	return time

def findLatestData(jsonFileName, time):
	data = []
	jsonFile = open(jsonFileName)
	lineNo = 0
	for l in jsonFile:
		if l == time:
			lineNo = 1
		if ((lineNo < 9) and (lineNo != 4)):
			data.append(l)
		lineNo += 1
	jsonFile.close()
	return data

def createJSONFile(fileName, data):
	jsonFile = open(fileName, 'w')
	for d in data:
		jsonFile.write(d)
	jsonFile.write(",")
	jsonFile.close()

main()