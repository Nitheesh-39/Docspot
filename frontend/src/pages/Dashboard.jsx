import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, Alert, Space } from 'antd';

const { Title, Text } = Typography;

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const localData = localStorage.getItem('docspotUser');
    if (!localData) return navigate('/login');
    setUser(JSON.parse(localData));
  }, [navigate]);

  return (
    <div style={{ padding: '32px', maxWidth: 700, margin: '0 auto' }}>
      <Card bordered={false} style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <Title level={3}>Welcome, {user?.name}</Title>
        <Space direction="vertical" size="middle">
          <Text>Email: <strong>{user?.email}</strong></Text>
          <Text>Role: <strong>{user?.role}</strong></Text>

          {user?.role === 'admin' && (
            <Alert
              message="Admin Panel"
              description="Visit Admin Panel to approve doctor applications."
              type="info"
              showIcon
            />
          )}

          {user?.role === 'doctor' && (
            <Alert
              message="Doctor Dashboard"
              description="View your profile and manage appointments."
              type="success"
              showIcon
            />
          )}

          {user?.role === 'user' && (
            <Alert
              message="User Dashboard"
              description="Browse doctors and book appointments."
              type="primary"
              showIcon
            />
          )}
        </Space>
      </Card>
    </div>
  );
}

export default Dashboard;
