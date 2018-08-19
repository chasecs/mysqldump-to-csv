const fs = require("fs")
const rl = require("readline")
if(process.argv.length < 4 ){
	console.log('Input params error. Usage:')
	console.log('node ' + __filename + ' <input file> <output directory>')
	process.exit(-1)
}


const outputDir = process.argv[3]

try{
	var inputFilePath = process.argv[2]
	var readStream = fs.createReadStream(inputFilePath)
  !fs.lstatSync(process.argv[3]).isDirectory()
}	
catch(e){
	console.log(e)
	process.exit(-1)
}

 
const lineReader = rl.createInterface({
	input: readStream
})

const getTableName = (str) => {
	return str.split('`')[1]
}



const writeKeyToFile = (fileName, str, isFirst) => {
	if(str.trimStart()[0] === '`'){
		var key = str.split('`')[1]
		isFirst ? writeStreams[fileName].write(key) : writeStreams[fileName].write(','+key)
		return true
	}else{
		writeStreams[fileName].write('\n')
		return false
	}
}

const createFileForTable = (str) => {
		var fileName = getTableName(str)
		console.log(`creating file ${fileName} for Table ${fileName}`)
		writeStreams[fileName] = fs.createWriteStream( outputDir+'/'+ fileName + '.csv',  {
			flags: 'a',
			encoding: 'utf-8'
		})
		return fileName
}

const writeValueToFile = (str) => {
	var fileName = getTableName(str)
	var value = str.match(/VALUES \(.+\)/)[0].slice(8, -1) + '\n'

	/*
	var v = value.split(', ').map( item => {
		i = item.trim().replace(/,/g, ';')
			return /'.+'/.test(i) ? i.slice(1,-1) : i;
		}).join(',')+'\n'
	*/
	try{
			writeStreams[fileName].write(value)
		}catch(e){
			console.log('error',e)
			console.log('in table ==> ', writeStreams[fileName])
			console.log('in value ==> ', str)
			process.exit(-1)
		}
}

var writeStreams = {}
var	isCreating = false;
var isFirstKeySet = false;
var fileName


lineReader.on("line", (str) => {
  if(str.indexOf('CREATE TABLE') !== -1){
		isCreating = true
		isFirstKeySet = false
		//create a file for talbe
		fileName = createFileForTable(str)
		return
	}else if(str.indexOf('INSERT INTO') !== -1){
		writeValueToFile(str)
	}
	
	if(isCreating){
		isCreating = writeKeyToFile(fileName, str, !isFirstKeySet)
		isFirstKeySet = true
	}

})

lineReader.on("close", ()=> {
	console.log("closing")
	for(let i in writeStreams){
		writeStreams[i].end()
	}
})
