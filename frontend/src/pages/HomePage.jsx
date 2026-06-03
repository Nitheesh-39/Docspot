import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Typography, Button, Empty } from 'antd';

const { Title, Text } = Typography;

function HomePage() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get('/api/doctors');
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div style={{ padding: '32px' }}>
      <Title level={2} className="page-title">Available Doctors</Title>

      {doctors.length === 0 ? (
        <Empty description="No doctors available at the moment." />
      ) : (
        <Row gutter={[24, 24]}>
          {doctors.map((doc) => (
            <Col xs={24} sm={12} md={8} key={doc._id}>
              <Card
                hoverable
                title={`Dr. ${doc.user?.name}`}
                bordered={false}
                style={{ borderRadius: 8 }}
              >
                <p>
                  <Text strong>Specialization:</Text> {doc.specialization}<br />
                  <Text strong>Experience:</Text> {doc.experience} years<br />
                  <Text strong>Phone:</Text> {doc.phone}
                </p>
                <Link to={`/appointments/book/${doc._id}`}>
                  <Button type="primary" block>
                    Book Appointment
                  </Button>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default HomePage;
