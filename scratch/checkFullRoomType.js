async function checkFullRoomTypeObject() {
  try {
    const today = new Date();
    const startDate = today.toISOString().split('T')[0];
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const endDate = tomorrow.toISOString().split('T')[0];

    const res = await fetch(`https://uz-ibe.hopenapi.com/ApiWebDistribution/AvailabilityCalendar/room_type_availability_2?aggregate_dates=false&currency=UZS&end_date=${endDate}&hotel=506781&max_nights=1&start_date=${startDate}&shared=false`);
    const data = await res.json();
    
    // Log the entire first room type object
    if (data.room_type_availability && data.room_type_availability.length > 0) {
      console.log("FULL ROOM TYPE OBJECT:", JSON.stringify(data.room_type_availability[0], null, 2));
    } else {
      console.log("No data found.");
    }
  } catch (e) {
    console.error(e);
  }
}

checkFullRoomTypeObject();
