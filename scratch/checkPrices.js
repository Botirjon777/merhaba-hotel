async function checkPrices() {
  try {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const startDate = today.toISOString().split('T')[0];
    const endDate = tomorrow.toISOString().split('T')[0];

    const res = await fetch(`https://uz-ibe.hopenapi.com/ApiWebDistribution/AvailabilityCalendar/room_type_availability_2?aggregate_dates=true&currency=UZS&end_date=${endDate}&hotel=506785&max_nights=1&start_date=${startDate}&shared=false`);
    const data = await res.json();
    
    console.log(JSON.stringify(data.room_type_availability.find(rt => rt.id_room_type === 5039999), null, 2));
  } catch (e) {
    console.error(e);
  }
}

checkPrices();
