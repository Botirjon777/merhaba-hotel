async function checkRootResponse() {
  try {
    const today = new Date();
    const startDate = today.toISOString().split('T')[0];
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const endDate = tomorrow.toISOString().split('T')[0];

    const res = await fetch(`https://uz-ibe.hopenapi.com/ApiWebDistribution/AvailabilityCalendar/room_type_availability_2?aggregate_dates=false&currency=UZS&end_date=${endDate}&hotel=506785&max_nights=1&start_date=${startDate}&shared=false`);
    const data = await res.json();
    
    // Log the root keys
    console.log("ROOT KEYS:", Object.keys(data));
    if (data.promotions) {
       console.log("PROMOTIONS FOUND:", JSON.stringify(data.promotions, null, 2));
    }
  } catch (e) {
    console.error(e);
  }
}

checkRootResponse();
