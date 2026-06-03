import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Typography, Badge, Card, Empty } from 'antd';

const { Title } = Typography;

function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('docspotUser'));

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get('/api/appointments/my', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setAppointments(data);
      } catch (error) {
        console.error('Error loading appointments:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [user.token]);

  const getStatusBadge = (status) => {
    const statusMap = {
      scheduled: 'processing',
      completed: 'success',
      cancelled: 'error',
    };
    return <Badge status={statusMap[status] || 'default'} text={status} />;
  };

  const columns = [
    {
      title: 'Doctor',
      dataIndex: ['doctor', 'user', 'name'],
      key: 'doctor',
      render: (text) => `Dr. ${text || 'N/A'}`,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Symptoms',
      dataIndex: 'symptoms',
      key: 'symptoms',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: getStatusBadge,
    },
  ];

  return (
    <div style={{ maxWidth: 1000, margin: '40px auto', padding: '0 20px' }}>
      <Card>
        <Title level={3}>My Appointments</Title>
        {appointments.length === 0 ? (
          <Empty description="No appointments found." style={{ marginTop: 40 }} />
        ) : (
          <Table
            dataSource={appointments}
            columns={columns}
            rowKey="_id"
            loading={loading}
            pagination={{ pageSize: 6 }}
          />
        )}
      </Card>
    </div>
  );
}

export default AppointmentsPage;
