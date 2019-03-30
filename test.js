/*test('adding positive numbers is not zero', () => {
    const a = 1
    const b = 2
    expect(a + b).not.toBe(0);
});*/
var fetch = require('node-fetch')

/*test('test',()=>{

    let data = igetDataFromAPI();
    expect(data).not.toBe({});
    
    
    })*/



/*async function getDataFromAPI() {
    let response = await fetch(`${baseURL}/api/EducationalOrganisation`)
    let data = await response.json()
    console.log(JSON.stringify(data, null, "\t"))
}*/

async function postFromAPI() {
    let response = await fetch("http://localhost:3000/api/EducationalOrganisation", {
        method: "POST",
        body: JSON.stringify( { 
        name: 'x1ssss',
        email: 'x1@starbucks.com'
       }),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      })
    let data = await response.json()
     console.log(data)
    return data
}

async function getDataFromAPI() {
    let response = await fetch("http://localhost:3000/api/EducationalOrganisation", {
        method: "GET",
      
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      })
    let data = await response.json()
     console.log(data)
    return data
}

test('test',()=>{

    let data = getDataFromAPI();
    expect(data).not.toBeNull()
    
    
    })


async function updateDataFromAPI() {
    let response = await fetch("http://localhost:3000/api/EducationalOrganisation", {
        method: "POST",
        body: JSON.stringify( { 
        name: 'x1ssss',
        email: 'x1@starbucks.com'
       }),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      })
    let data = await response.json()
     console.log(data)
    return data
}

async function deleteDataFromAPI() {
    let response = await fetch("http://localhost:3000/api/EducationalOrganisation", {
        method: "POST",
        body: JSON.stringify( { 
        name: 'x1ssss',
        email: 'x1@starbucks.com'
       }),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      })
    let data = await response.json()
     console.log(data)
    return data
}



//getDataFromAPI();

