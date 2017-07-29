import io
import json
import urllib

#Add the JSON output files
dataFiles = ["data/waveData.json"]
#Add the URLS to get the CSV files
dataUrls = ["http://www.ehp.qld.gov.au/data-sets/waves/wave-7dayopdata.csv?timestamp=2017-07-29EST11-06-50?"]
#Add the column name of the heading of the JSON file
dataHead = ["Site"]
#Add the column names of the data of the JSON file
dataBody = [["DateTime", "Latitude", "Longitude", "SST"]]


def main():
	for f in range(len(dataFiles)):
		clearFile(dataFiles[f])
		dataRows = urlToLines(dataUrls[f])
		dataDict = rowToDictArr(dataRows)
		for d in range(len(dataDict)):
			if d > 0:
				JSONDict = formatJSON(dataDict[d], dataHead[f], dataBody[f])
				dictToJSON(JSONDict, dataFiles[f])
	
def rowToDictArr(row):
	dictArr = []
	columnNames = (row[1].split(', '))
	for r in range(len(row)):
		dictionary = dict(zip(columnNames, row[r].split(',')))
		dictArr.append(dictionary)
	return dictArr

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

def formatJSON(dictionary, headName, bodyNames):
	tempArray = []
	for n in bodyNames:
		tempArray.append(dictionary[n])
	jsonDict = {
		headName:dictionary[headName],
		"Data":tempArray
	}
	return jsonDict

def urlToLines(url):
	data = urllib.urlopen(url)
	rows = data.readlines()
		
	return rows

			
main()