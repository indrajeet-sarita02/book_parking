require('dotenv').config();
const bcrypt = require('bcryptjs');
const { sequelize, User, Location, ParkingSlot, Booking, Payment } = require('./index');

async function seed() {
  await sequelize.sync({ force: true });

  const hash = await bcrypt.hash('admin123', 10);

  const users = [
    { name: 'Super Admin', email: 'admin@parking.com', mobile: '9999999999', role: 'super_admin', status: 'active' },
    { name: 'Rahul Sharma', email: 'rahul@parking.com', mobile: '9876543210', role: 'admin', status: 'active' },
    { name: 'Priya Patel', email: 'priya@parking.com', mobile: '9876543211', role: 'admin', status: 'active' },
    { name: 'Amit Singh', email: 'amit@parking.com', mobile: '9876543212', role: 'staff', status: 'active' },
    { name: 'Sneha Reddy', email: 'sneha@parking.com', mobile: '9876543213', role: 'staff', status: 'active' },
    { name: 'Vikram Joshi', email: 'vikram@parking.com', mobile: '9876543214', role: 'staff', status: 'active' },
    { name: 'Test User', email: 'user@parking.com', mobile: '8888888888', role: 'customer', status: 'active' },
    { name: 'Neha Gupta', email: 'neha@example.com', mobile: '8765432101', role: 'customer', status: 'active' },
    { name: 'Rajesh Kumar', email: 'rajesh@example.com', mobile: '8765432102', role: 'customer', status: 'active' },
    { name: 'Anita Desai', email: 'anita@example.com', mobile: '8765432103', role: 'customer', status: 'active' },
    { name: 'Suresh Iyer', email: 'suresh@example.com', mobile: '8765432104', role: 'customer', status: 'active' },
    { name: 'Deepa Nair', email: 'deepa@example.com', mobile: '8765432105', role: 'customer', status: 'active' },
    { name: 'Manish Verma', email: 'manish@example.com', mobile: '8765432106', role: 'customer', status: 'inactive' },
    { name: 'Kavita Joshi', email: 'kavita@example.com', mobile: '8765432107', role: 'customer', status: 'active' },
    { name: 'Rohan Mehta', email: 'rohan@example.com', mobile: '8765432108', role: 'customer', status: 'active' },
    { name: 'Pooja Singh', email: 'pooja@example.com', mobile: '8765432109', role: 'customer', status: 'inactive' },
  ];

  await User.bulkCreate(users.map(u => ({ ...u, password: hash })));

  const locations = [
    { name: 'City Center Parking', address: '123 MG Road, Near Gateway of India', city: 'Mumbai', state: 'Maharashtra', opening_time: '06:00', closing_time: '23:00', total_slots: 20 },
    { name: 'Railway Station Parking', address: 'Platform 1, Central Railway', city: 'Delhi', state: 'Delhi', opening_time: '00:00', closing_time: '23:59', total_slots: 45 },
    { name: 'Mall Parking', address: 'Phoenix Market City, Whitefield', city: 'Bangalore', state: 'Karnataka', opening_time: '08:00', closing_time: '22:00', total_slots: 30 },
    { name: 'Airport Parking', address: 'Terminal 2, Chhatrapati Shivaji Airport', city: 'Mumbai', state: 'Maharashtra', opening_time: '00:00', closing_time: '23:59', total_slots: 100 },
    { name: 'Hospital Parking', address: 'Apollo Hospital, Jubilee Hills', city: 'Hyderabad', state: 'Telangana', opening_time: '00:00', closing_time: '23:59', total_slots: 25 },
  ];

  for (const locData of locations) {
    const loc = await Location.create({ ...locData, status: 'active' });
    const slotsPerType = Math.floor(locData.total_slots / 2);
    const slotData = [];
    for (let i = 1; i <= locData.total_slots; i++) {
      slotData.push({
        location_id: loc.id,
        slot_number: i <= slotsPerType ? `C${i}` : `B${i - slotsPerType}`,
        floor: 'Ground',
        vehicle_type: i <= slotsPerType ? 'car' : 'bike',
        status: i <= 3 ? 'occupied' : 'available',
        price_per_hour: i <= slotsPerType ? 50 : 20,
      });
    }
    await ParkingSlot.bulkCreate(slotData);
  }

  const allUsers = await User.findAll({ where: { role: 'customer', status: 'active' } });
  const allLocations = await Location.findAll();
  const allSlots = await ParkingSlot.findAll({ where: { status: 'available' } });

  const dateStr = (d) => d.toISOString().split('T')[0];
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  const fiveDaysAgo = new Date(today);
  fiveDaysAgo.setDate(today.getDate() - 5);
  const threeDaysAgo = new Date(today);
  threeDaysAgo.setDate(today.getDate() - 3);
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  const vehicleNumbers = ['MH01AB1234', 'DL02CD5678', 'KA03EF9012', 'MH04GH3456', 'TS05IJ7890', 'MH06KL1234'];

  const paymentStatuses = { pending: 'pending', confirmed: 'paid', checked_in: 'paid', completed: 'paid', cancelled: 'refunded' };

  const sampleBookings = [
    { status: 'completed', date: fiveDaysAgo, start: '09:00', end: '12:00' },
    { status: 'completed', date: threeDaysAgo, start: '10:00', end: '13:00' },
    { status: 'confirmed', date: tomorrow, start: '08:00', end: '11:00' },
    { status: 'checked_in', date: today, start: '07:00', end: '10:00' },
    { status: 'pending', date: nextWeek, start: '14:00', end: '17:00' },
    { status: 'pending', date: nextWeek, start: '09:00', end: '12:00' },
    { status: 'cancelled', date: yesterday, start: '11:00', end: '14:00' },
    { status: 'confirmed', date: tomorrow, start: '15:00', end: '18:00' },
    { status: 'pending', date: nextWeek, start: '10:00', end: '12:00' },
    { status: 'completed', date: sevenDaysAgo, start: '08:00', end: '11:00' },
  ];

  const bookingData = [];
  const paymentData = [];

  for (let i = 0; i < sampleBookings.length; i++) {
    const booking = sampleBookings[i];
    const customer = allUsers[i % allUsers.length];
    const location = allLocations[i % allLocations.length];
    const slot = allSlots[i % allSlots.length];

    const startH = parseInt(booking.start);
    const endH = parseInt(booking.end);
    const hours = endH - startH;
    const amount = hours * parseFloat(slot.price_per_hour);
    const tax = amount * 0.18;
    const total = amount + tax;

    const bookingNum = `PBK${dateStr(booking.date).replace(/-/g, '').slice(2)}${String(i + 1).padStart(4, '0')}`;

    bookingData.push({
      booking_number: bookingNum,
      user_id: customer.id,
      location_id: location.id,
      slot_id: slot.id,
      vehicle_number: vehicleNumbers[i % vehicleNumbers.length],
      vehicle_type: slot.vehicle_type,
      date: dateStr(booking.date),
      start_time: booking.start,
      end_time: booking.end,
      hours,
      amount,
      tax,
      total_amount: Math.round(total * 100) / 100,
      payment_status: paymentStatuses[booking.status] || 'pending',
      booking_status: booking.status,
    });

    paymentData.push({
      booking_id: null,
      transaction_id: `TXN${bookingNum}`,
      amount: Math.round(total * 100) / 100,
      payment_method: 'razorpay',
      status: paymentStatuses[booking.status] === 'paid' ? 'success' : 'pending',
    });
  }

  const createdBookings = await Booking.bulkCreate(bookingData);
  for (let i = 0; i < createdBookings.length; i++) {
    paymentData[i].booking_id = createdBookings[i].id;
  }
  await Payment.bulkCreate(paymentData);

  console.log('Seed data inserted successfully');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
