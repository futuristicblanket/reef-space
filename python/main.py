import io
import json
import urllib

#Add the JSON output files
dataFiles = ["data/waveData.json",
						"data/soilData.json",
						"data/waterchemistryData.json",
						"data/faunaData.json",
						"data/faunataxaData.json"]
#Add the URLS to get the CSV files
dataUrls = ["http://www.ehp.qld.gov.au/data-sets/waves/wave-7dayopdata.csv?timestamp=2017-07-29EST11-06-50?",
					 "http://www.ehp.qld.gov.au/data-sets/aquatic-fauna-db/site-details.csv",
					 "http://www.ehp.qld.gov.au/data-sets/aquatic-fauna-db/water-chemistry.csv",
					 "http://www.ehp.qld.gov.au/data-sets/aquatic-fauna-db/fauna-record.csv",
					 "http://www.ehp.qld.gov.au/data-sets/aquatic-fauna-db/fauna-taxa.csv"]
#Add the column name of the heading of the JSON file
dataHead = ["Site",
					 "Site Name",
					 "Site ID",
					 "Site ID",
					 "Taxon ID"]
#Add the column names of the data of the JSON file
dataBody = [["DateTime", "Latitude", "Longitude", "SST",  "Hsig", "Hmax"],
					 ["Latitude",	"Longitude", "Elevation",	"Total depth of the bore", "Stratigraphy Sampled", "Lithology Sampled"],
					 ["Sample Number", "Water level (mbgl)", "Temperature", "pH",	"Electrical conductivity", "Dissolved oxygen (mg/L)",	"Dissolved oxygen (%/saturation)", "Total Nitrogen", "Total organic carbon", "Total phosphorus", "Filterable reactive phosphorus", "Ammonium", "Nitrates", "Redox potential"],
					 ["Sample Number", "Taxon ID", "Taxon Name", "Abundance"],
					 ["Taxon Name", "Taxon Detail", "Common Name", "Stygofauna", "Stygofauna group", "Phylum", "Sub-Phylum", "Superclass", "Class", "Sub-Class", "Superorder", "Order", "Sub-Order", "Family", "Sub-family", "Genus", "Species"]]


def main():
	for f in range(len(dataFiles)):
		allData = []
		dataRows = urlToLines(dataUrls[f])
		if (dataFiles[f] == "data/waveData.json"):
			dataDict = rowToDictArr(dataRows, (dataRows[1].split(', ')))
		else:
			dataDict = rowToDictArr(dataRows, (dataRows[0].split(',')))
		clearFile(dataFiles[f])
		for d in range(len(dataDict)):
			if (dataFiles[f] == "data/waveData.json"):
				if (d > 0):
					JSONDict = formatJSON(dataDict[d], dataHead[f], dataBody[f])
					allData.append(JSONDict)
			else:
				JSONDict = formatJSON(dataDict[d], dataHead[f], dataBody[f])
				allData.append(JSONDict)
		dictToJSON(allData, dataFiles[f])
			
def rowToDictArr(row, columnNames):
	dictArr = []
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