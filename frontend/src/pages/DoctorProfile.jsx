import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card, Typography } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';

const { Title } = Typography;

function DoctorProfile() {
  const user = JSON.parse(localStorage.getItem('docspotUser'));
  const [profile, setProfile] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get('/api/doctors/profile', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        if (data) {
          setProfile(data);
          form.setFieldsValue({
            phone: data.phone,
            specialization: data.specialization,
            experience: data.experience,
          });
        }
      } catch (err) {
        // Not yet a doctor, no profile
      }
    };
    fetchProfile();
  }, [user.token, form]);

  const onFinish = async (values) => {
    try {
      const { data } = await axios.post(
        '/api/doctors/apply',
        values,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      toast.success('Application submitted');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Application failed');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f2f5'
    }}>
      <Card
        style={{ width: 500, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
        bordered={false}
      >
        <Title level={3} style={{ textAlign: 'center' }}>
          {profile ? 'Update Doctor Profile' : 'Apply as Doctor'}
        </Title>
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: 'Please enter phone number' }]}
          >
            <Input placeholder="Enter your phone number" />
          </Form.Item>

          <Form.Item
            label="Specialization"
            name="specialization"
            rules={[{ required: true, message: 'Please enter your specialization' }]}
          >
            <Input placeholder="e.g. Cardiologist" />
          </Form.Item>

          <Form.Item
            label="Experience (in years)"
            name="experience"
            rules={[{ required: true, message: 'Please enter experience in years' }]}
          >
            <Input type="number" placeholder="e.g. 5" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {profile ? 'Update Profile' : 'Submit Application'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default DoctorProfile;
