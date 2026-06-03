import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Card, Typography, Form, Input, DatePicker, TimePicker, Button, Spin } from 'antd';
import dayjs from 'dayjs';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

function BookAppointment() {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const { data } = await axios.get('/api/doctors');
        const doc = data.find((d) => d._id === doctorId);
        if (doc) {
          setDoctor(doc);
        } else {
          toast.error('Doctor not found');
        }
      } catch (error) {
        toast.error('Error loading doctor details');
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [doctorId]);

  const handleSubmit = async (values) => {
    try {
      const token = JSON.parse(localStorage.getItem('docspotUser')).token;
      await axios.post(
        '/api/appointments/book',
        {
          doctorId,
          date: values.date.format('YYYY-MM-DD'),
          time: values.time.format('HH:mm'),
          symptoms: values.symptoms,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Appointment booked successfully');
      navigate('/appointments/my');
    } catch (error) {
      toast.error('Failed to book appointment');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: '0 20px' }}>
      <Card>
        {loading ? (
          <Spin tip="Loading doctor details..." />
        ) : doctor ? (
          <>
            <Title level={4}>Book Appointment</Title>
            <Paragraph>
              <strong>Dr. {doctor.user.name}</strong><br />
              {doctor.specialization} ({doctor.experience} years)<br />
              Phone: {doctor.phone}
            </Paragraph>

            <Form layout="vertical" form={form} onFinish={handleSubmit}>
              <Form.Item label="Date" name="date" rules={[{ required: true, message: 'Please select a date' }]}>
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item label="Time" name="time" rules={[{ required: true, message: 'Please select a time' }]}>
                <TimePicker use12Hours format="h:mm A" style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                label="Symptoms / Reason"
                name="symptoms"
                rules={[{ required: true, message: 'Please enter symptoms or reason' }]}
              >
                <TextArea rows={3} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Confirm Appointment
                </Button>
              </Form.Item>
            </Form>
          </>
        ) : (
          <Paragraph>Doctor not found.</Paragraph>
        )}
      </Card>
    </div>
  );
}

export default BookAppointment;
