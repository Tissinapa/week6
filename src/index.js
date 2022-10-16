
//import  {Chart}  from 'frappe-charts'  //dist/frappe-charts.min.esm
const jsonQuery = {
    "query": [
        {
            "code": "Vuosi",
            "selection": {
                "filter": "item",
                "values": [
                    "2000",
                    "2001",
                    "2002",
                    "2003",
                    "2004",
                    "2005",
                    "2006",
                    "2007",
                    "2008",
                    "2009",
                    "2010",
                    "2011",
                    "2012",
                    "2013",
                    "2014",
                    "2015",
                    "2016",
                    "2017",
                    "2018",
                    "2019",
                    "2020",
                    "2021"
                ]
            }
        },
        {
            "code": "Alue",
            "selection": {
                "filter": "item",
                "values": [
                    "SSS"
                ]
            }
        },
        {
            "code": "Tiedot",
            "selection": {
                "filter": "item",
                "values": [
                    "vaesto"
                ]
            }
        }
    ],
    "response": {
        "format": "json-stat2"
    }
}
const fetchData = async() =>{
	const url = "https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px"
	const response = await fetch(url, {
		method: "POST"
		//headers: {"content-type": "index/json"},
		//body: JSON.stringify(jsonQuery)
	})
	if(!response.ok){
		return;
	}
	const data = await response.json()
	
	return data
}

const buildChart = async () => {
	const data = await fetchData()
	console.log(data)

	//const test = data.variables
	//const year =  Object.values(data.dimension.Vuosi.category.label)
	//const area = Object.values(data.dimension.Alue.category.label)
	//const info = Object.values(data.dimension.Tiedot.category.label)
	//const population = data.value
	//console.log(test)
	//console.log(year)
	//console.log(area)
	//console.log(info)
	//console.log(population)
	const yyear = data.variables
    const year = yyear[0]
    const area = yyear[1]
    const info = yyear[2]
	console.log(yyear)
    //console.log(year)
    //console.log(area)
    //console.log(info)

    const yearObject = Object.values(year.values)
    const areaObject = Object.values(area.valueTexts)
    const infoObject = Object.values(info.values)
    
    console.log(yearObject)
    console.log(areaObject)
    console.log(infoObject)

    yearObject.forEach((yearData, index) =>{
        let wholeData = []
        for(let i = 10 ; i <= 32 ; i++){
            wholeData.push(yearObject[i * 310 + index])
        }
        yearObject[index] = {
            year: yearData,
            values:  areaObject,
            info: infoObject
        }
    })
    console.log(yearObject)

    const chartData = {
        labels: areaObject,
        dataset: yearObject
    }
    const chart = new frappe.Chart("#chart",{
        title: "country data",
        data: chartData,
        type: line,
        height: 450,
        color: '#eb5146'
    
    })

}

buildChart()