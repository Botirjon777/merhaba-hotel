async function checkPriceObject() {
  try {
    const today = new Date();
    const startDate = today.toISOString().split('T')[0];
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const endDate = tomorrow.toISOString().split('T')[0];

    const res = await fetch(`https://uz-ibe.hopenapi.com/ApiWebDistribution/AvailabilityCalendar/room_type_availability_2?aggregate_dates=false&currency=UZS&end_date=${endDate}&hotel=506781&max_nights=1&start_date=${startDate}&shared=false`);
    const data = await res.json();
    
    // Find a room with a price and log the whole thing
    const sample = data.room_type_availability?.find(rt => rt.availability_date?.some(a => a.price));
    if (sample) {
      const priceObj = sample.availability_date.find(a => a.price).price;
      console.log("FULL PRICE OBJECT:", JSON.stringify(priceObj, null, 2));
    } else {
      console.log("No price data found for today.");
    }
  } catch (e) {
    console.error(e);
  }
}

checkPriceObject();
