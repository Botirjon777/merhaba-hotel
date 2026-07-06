async function checkAvailability() {
  const ids = ["5036377", "5036376", "5051545"];
  try {
    const today = new Date();
    const future = new Date(today);
    future.setDate(today.getDate() + 30);
    const startDate = today.toISOString().split('T')[0];
    const endDate = future.toISOString().split('T')[0];

    // Searching for any availability in next 30 days
    const res = await fetch(`https://uz-ibe.hopenapi.com/ApiWebDistribution/AvailabilityCalendar/room_type_availability_2?aggregate_dates=false&currency=UZS&end_date=${endDate}&hotel=506785&max_nights=1&start_date=${startDate}&shared=false`);
    const data = await res.json();
    
    const results = data.room_type_availability.filter(rt => ids.includes(rt.id_room_type.toString())).map(rt => ({
      id: rt.id_room_type,
      available_dates: rt.availability_date?.filter(a => a.is_available).length
    }));
    console.log(JSON.stringify(results, null, 2));
  } catch (e) {
    console.error(e);
  }
}

checkAvailability();
