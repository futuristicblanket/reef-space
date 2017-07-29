import io
import json
import urllib

def main():
	waveData()

def rowToDictArr(row):
	dictArr = []
	columnNames = ['Site', 'SiteNumber', 'DateTime', 'Latitude', 'Longitude', 'Hsig', 'Hmax', 'Tp', 'Tz', 'SST', 'Direction']
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
		str_ = json.dumps(dictionary, indent=4, separators=(',', ': '), ensure_ascii=False)
		jsonFile.write(to_unicode(str_))

def urlToLines(url):
	data = urllib.urlopen(url)
	rows = data.readlines()
		
	return rows

def waveData():
	clearFile("waveData.json")
	wavedataRows = urlToLines("http://www.ehp.qld.gov.au/data-sets/waves/wave-7dayopdata.csv?timestamp=2017-07-29EST11-06-50?")
	waveDataDict = rowToDictArr(wavedataRows)
	for d in range(len(waveDataDict)):
		if d != 0:
			dictToJSON(waveDataDict[d], "waveData.json")
		
main()