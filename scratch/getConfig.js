async function getConfig() {
  try {
    const res = await fetch("https://uz-ibe.hopenapi.com/SmartWidgetApi/Integration/config?key=c2634b2d-086d-43c1-8664-00001cb80200&language=en");
    const data = await res.json();
    
    // Find all room types in the config
    function findRoomTypes(obj) {
      let results = [];
      if (typeof obj !== 'object' || obj === null) return results;
      
      if (obj.id && obj.name && (obj.id.toString().startsWith("50") || obj.id.toString().startsWith("10"))) {
        results.push({ id: obj.id, name: obj.name });
      }
      
      for (let key in obj) {
        results.push(...findRoomTypes(obj[key]));
      }
      return results;
    }

    const roomTypes = findRoomTypes(data);
    console.log(JSON.stringify(roomTypes, null, 2));
  } catch (e) {
    console.error(e);
  }
}

getConfig();
