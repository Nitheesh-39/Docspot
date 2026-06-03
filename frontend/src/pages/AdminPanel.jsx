import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Typography, Card, message, Empty } from 'antd';

const { Title } = Typography;

function AdminPanel() {
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('docspotUser'));

  const fetchPending = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/admin/doctors/pending', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setPendingDoctors(data);
    } catch (error) {
      message.error('Failed to load pending doctors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleApprove = async (doctorId) => {
    try {
      await axios.post(
        `/api/admin/doctors/approve`,
        { doctorId },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      message.success('Doctor approved');
      fetchPending();
    } catch (err) {
      message.error('Approval failed');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: ['user', 'name'],
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: ['user', 'email'],
      key: 'email',
    },
    {
      title: 'Specialization',
      dataIndex: 'specialization',
      key: 'specialization',
    },
    {
      title: 'Experience (yrs)',
      dataIndex: 'experience',
      key: 'experience',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button type="primary" size="small" onClick={() => handleApprove(record._id)}>
          Approve
        </Button>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 1100, margin: '40px auto', padding: '0 20px' }}>
      <Card>
        <Title level={3}>Admin Panel – Approve Doctors</Title>
        {pendingDoctors.length === 0 ? (
          <Empty description="No pending applications." style={{ marginTop: 40 }} />
        ) : (
          <Table
            dataSource={pendingDoctors}
            columns={columns}
            rowKey="_id"
            loading={loading}
            pagination={{ pageSize: 5 }}
            bordered
          />
        )}
      </Card>
    </div>
  );
}

export default AdminPanel;
