import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

const data = [
  { name: 'Jan', sales: 30 },
  { name: 'Feb', sales: 45 },
  { name: 'Mar', sales: 60 },
];

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <LineChart width={400} height={200} data={data}>
        <Line type="monotone" dataKey="sales" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>
    </div>
  );
}

export default Dashboard;

