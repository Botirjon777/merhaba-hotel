async function getRoomInfo() {
  const id = "5036375";
  try {
    const res = await fetch(`https://uz-ibe.hopenapi.com/ApiWebDistribution/Hotel/room_type_information?hotel=506781&room_type=${id}&shared=false`);
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (e) {
    console.error(e);
  }
}

getRoomInfo();
